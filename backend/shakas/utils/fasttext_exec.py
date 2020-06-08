import gensim
import json
from collections import OrderedDict
import codecs
import CaboCha

# ファイルパス定義
zen_aku_dic_path = './shakas/resource/zenaku.json'
hinsi_list_path = './shakas/resource/pos-id.def'
fasttext_corps_path = './shakas/resource/fasttext_wiki_20200503.bin'


# 7つの大罪
bad_noun_list = [('傲慢', -100), ('強欲', -100), ('嫉妬', -100), ('憤怒', -100), ('色欲', -100), ('暴食', -100), ('怠惰', -100)]
bad_verb_list = [('思い上がる', -100), ('欲する', -100), ('妬む', -100), ('怒る', -100), ('犯す', -100), ('貪る', -100), ('怠ける', -100)]
bad_adjective_list = [('図々しい', -100), ('欲しい', -100), ('妬ましい', -100), ('腹立たしい', -100), ('いやらしい', -100), ('気だるい', -100)]

# 7つの美徳
good_noun_list = [('博愛', 100), ('希望', 100), ('信仰', 100), ('知恵', 100), ('公正', 100), ('勇気', 100), ('節制', 100)]
good_verb_list = [('愛する', 100), ('望む', 100), ('信じる', 100), ('学ぶ', 100), ('守る', 100), ('挑む', 100), ('控える', 100)]
good_adjective_list = [('愛しい', 100), ('望ましい', 100), ('信ずる', 100), ('賢い', 100), ('正しい', 100), ('控えめ', 100)]

# 極性辞書で検索する品詞IDの指定
calc_hinsi_list = ['2', '10', '12', '31', '36', '37', '40']

# 点数を逆転させる否定の助動詞リスト
reversal_word_list = ['なかろ', 'なかっ', 'なく', 'ない', 'なけれ', 'まい', 'ず', 'ぬ', 'ね', 'ん']


# 品詞一覧を取得する
def load_category(path):

    cat_od = OrderedDict()

    try:
        with codecs.open(path, 'r', 'euc_jp') as f:
            lines = f.readlines()

        for l in lines:
            l_split = l.split()
            id = int(l_split[1].strip())
            cat_l = l_split[0].split(',')
            cat_od.update({id: cat_l})

    except Exception as e:
        if hasattr(e, 'message'):
            print(e.message)
        else:
            print(e)

        exit()

    return cat_od


# IPA辞書の品詞IDから一致する品詞IDを求める
def get_category_id(cat_od, features):
    
    for id in range(len(cat_od)):
        if is_target_category(cat_od[id], features, level=2):
            return str(id)
 
    # 「BOS/EOS」
    return str(-1)


# 形態素解析した語の品詞が対象の品詞と一致するか確認
def is_target_category(cat_l, features, level):    
    return all(list(map(lambda id_cat: id_cat[1] == features[id_cat[0]], enumerate(cat_l[0:level]))))


# 善悪辞書を用いた点数計算に含める品詞であるかを確認
def is_calc_point_hinsi(hinsi_id):
    return hinsi_id in calc_hinsi_list


# 否定の助動詞か確認
def is_reversal_word(word):
    features = word[1].split(',')
    if ((features[0] == '助動詞') and ( word[0] in reversal_word_list)):
        return True

    return False 
    

# 善悪辞書作成
def make_zen_aku_dic():

    # fasttextコーパス読み込み
    model = gensim.models.KeyedVectors.load_word2vec_format(fasttext_corps_path, binary=True)

    # 初期の単語を登録
    origin_word_list = bad_noun_list + bad_verb_list + bad_adjective_list + good_noun_list + good_verb_list + good_adjective_list

    # 初期辞書の中身を辞書登録
    good_bad_dic = {}
    good_bad_dic.update(origin_word_list)

    # 初期の単語から10階層まで深堀
    for ten_count in range(10):

        temp_origin_word_list = []
        print(ten_count)

        for origin_word in origin_word_list:

            result_list = model.most_similar(positive=[origin_word[0]])

            for count in range(5):

                point = result_list[count][1] * origin_word[1]

                if not ((result_list[count][0] in good_bad_dic) and (abs(point) < abs(good_bad_dic[result_list[count][0]]))):

                    good_bad_dic[result_list[count][0]] = point
                    temp_origin_word_list.append((result_list[count][0], point))
            
        origin_word_list = temp_origin_word_list
        
    # JSONファイルに出力、善悪辞書作成
    with open(zen_aku_dic_path, 'w') as f:
        json.dump(good_bad_dic, f, indent=4, ensure_ascii=False)


# 入力された文の善悪ポイント計算
def calc_zen_aku_point(analyze_result):

    # 善悪辞書の読み込み
    with open(zen_aku_dic_path) as f:
        zen_aku_dic = json.load(f)

    # 品詞一覧を取得
    cat_od = load_category(hinsi_list_path)

    # 係受け管理リスト
    relational_dic = {}

    for index, chunk in enumerate(analyze_result):

        zen_aku_point = 0
        is_reversal = False

        for word in chunk['words']:
            if is_calc_point_hinsi(get_category_id(cat_od, word[1].split(','))):
                if word[0] in zen_aku_dic:
                    zen_aku_point = zen_aku_point + zen_aku_dic[word[0]]

            # ここで否定の助動詞か確認
            if is_reversal_word(word):
                is_reversal = True

        if index in relational_dic:
            zen_aku_point = zen_aku_point + relational_dic[index]
        
        if is_reversal:
            zen_aku_point = zen_aku_point * -1

        if chunk['relation_chunk_index'] == -1:
            break

        else:
            if chunk['relation_chunk_index'] in relational_dic:
                relational_dic[chunk['relation_chunk_index']] = relational_dic[chunk['relation_chunk_index']] + zen_aku_point

            else:
                relational_dic[chunk['relation_chunk_index']] = zen_aku_point
    
    return zen_aku_point


# 文を構文解析、形態素解析して点数計算に適した形式に変換
def analyze_sentence(sentence):

    # CaboChaパーサー作成
    cabocha_parser = CaboCha.Parser()

    # Treeクラスを取得
    tree =  cabocha_parser.parse(sentence)

    # 解析結果をリストに格納
    analyze_result = []

    for chunk_index in range(tree.chunk_size()):
        chunk = tree.chunk(chunk_index)

        words = []
    
        for word_index  in range(chunk.token_pos,chunk.token_pos + chunk.token_size):
            
            words.append((tree.token(word_index).surface, tree.token(word_index).feature))

            if tree.token(word_index).chunk:
                chunk_link_num = tree.token(word_index).chunk.link

        analyze_result.append({'relation_chunk_index':chunk_link_num, 'words':words})
    
    return analyze_result


if __name__ == '__main__':

    # 辞書作成
    # make_zen_aku_dic()

    # CaboChaで形態素解析と構文解析、係受け関係と各単語の形態素を取得
    analyze_result = analyze_sentence(sentence)

    # 解析結果から善悪ポイント計算
    print(calc_zen_aku_point(analyze_result))
    
