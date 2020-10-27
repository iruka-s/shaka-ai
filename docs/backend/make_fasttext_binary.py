import gensim


if __name__ == "__main__":
    
    vec_path = '/tmp/model.vec'
    fasttext_model_path = '/tmp/fasttext.bin'

    # model.vecをload
    model = gensim.models.KeyedVectors.load_word2vec_format(vec_path, binary=False)

    # バイナリファイルとして保存
    model.save_word2vec_format(fasttext_model_path, binary=True)
