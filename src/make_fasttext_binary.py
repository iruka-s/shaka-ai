import gensim

# model.vecをload
model = gensim.models.KeyedVectors.load_word2vec_format('model_20200503.vec', binary=False)

# バイナリファイルとして保存
model.save_word2vec_format("fasttext_wiki_20200503.bin", binary=True)