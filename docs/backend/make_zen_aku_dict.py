import gensim
import json


# ファイルパス定義
zen_aku_dict_path = '/tmp/zen_aku_dict.json'
fasttext_model_path = '/tmp/fasttext.bin'


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


# 善悪辞書作成
def make_zen_aku_dict():

    # fasttextコーパス読み込み
    model = gensim.models.KeyedVectors.load_word2vec_format(fasttext_model_path, binary=True)

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

            try:
                result_list = model.most_similar(positive=[origin_word[0]])
            except KeyError as error:
                print(error)

            for count in range(5):

                new_word = result_list[count][0]
                new_point = result_list[count][1] * origin_word[1]

                # 単語が善悪辞書に登録済みかチェック
                if new_word in good_bad_dic:

                    # 新規ポイント < 登録済みポイントなら更新しない
                    registered_point = good_bad_dic[new_word]
                    if abs(new_point) < abs(registered_point):
                        continue

                good_bad_dic[new_word] = new_point
                temp_origin_word_list.append((new_word, new_point))
            
        origin_word_list = temp_origin_word_list
        
    # JSONファイルに出力、善悪辞書作成
    with open(zen_aku_dict_path, 'w') as f:
        json.dump(good_bad_dic, f, indent=4, ensure_ascii=False)


if __name__ == '__main__':

    # 辞書作成
    make_zen_aku_dict()
