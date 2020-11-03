FROM ubuntu:18.04

# tzdata対策環境変数
ENV DEBIAN_FRONTEND=noninteractive

# ラベル
LABEL version="1.0"
LABEL description="釈迦AIバックエンド"

# aptの更新
RUN apt update -y && \
    apt upgrade -y

# Ubuntu日本語化
RUN apt install -y language-pack-ja-base language-pack-ja && \
    locale-gen ja_JP.UTF-8
ENV LANG=ja_JP.UTF-8

# 必要なライブラリ
RUN apt install -y sudo git make g++ curl xz-utils file wget

# Python
RUN apt install -y python3 python3-pip && \
    pip3 install --upgrade pip

# MeCab
RUN apt install -y mecab libmecab-dev mecab-ipadic-utf8

WORKDIR /tmp

# MeCab辞書(mecab-ipadic-NEologd)
# RUN git clone --depth 1 https://github.com/neologd/mecab-ipadic-neologd.git && \
#     cd mecab-ipadic-neologd && \
#     ./bin/install-mecab-ipadic-neologd -n -a -y

# CRF++
RUN wget "https://drive.google.com/uc?export=download&id=0B4y35FiV1wh7QVR6VXJ5dWExSTQ" -O CRF++-0.58.tar.gz && \
    tar zxfv CRF++-0.58.tar.gz && \
    cd CRF++-0.58 && \
    ./configure && \
    make && \
    sudo make install

# CaboCha
RUN curl -sc /tmp/gcokie "https://drive.google.com/uc?export=download&id=0B4y35FiV1wh7SDd1Q1dUQkZQaUU" > /dev/null && \
    getcode="$(awk '/_warning_/ {print $NF}' /tmp/gcokie)" && \
    curl -Lb /tmp/gcokie "https://drive.google.com/uc?export=download&confirm=${getcode}&id=0B4y35FiV1wh7SDd1Q1dUQkZQaUU" -o cabocha-0.69.tar.bz2 && \
    tar xvf cabocha-0.69.tar.bz2 && \
    cd cabocha-0.69 && \
    ./configure --with-mecab-config=`which mecab-config` --with-charset=UTF8 && \
    echo "/usr/local/lib" >> /etc/ld.so.conf && \
    sudo ldconfig && \
    make && \
    make install && \
    cd python && \
    python3 setup.py build && \
    python3 setup.py install

# fasttext
RUN git clone https://github.com/facebookresearch/fastText.git && \
    cd fastText && \
    make

# wikiextractor
# ※2020/10/23時点で最新バージョンに不具合。過去バージョンを使用。
RUN git clone https://github.com/attardi/wikiextractor.git && \
    cd wikiextractor && \
    git checkout 16186e2

# Wikipediaダンプデータ取得
RUN wget https://dumps.wikimedia.org/jawiki/latest/jawiki-latest-pages-articles.xml.bz2

# ダンプデータからコーパス作成
RUN python3 wikiextractor/WikiExtractor.py -b 500M -o path/to/corpus jawiki-latest-pages-articles.xml.bz2

# コーパスの統合
RUN cd ./path/to/corpus/AA && \
    cat * > wiki && \
    mecab -b 81920 -O wakati wiki -o wiki_wakati

# fasttextでモデル作成
RUN ./fastText/fasttext skipgram -input ./path/to/corpus/AA/wiki_wakati -output model -dim 300

# pip
ADD requirements.txt .
RUN pip3 install -r requirements.txt

# fasttext用モデル作成
ADD make_fasttext_binary.py .
RUN python3 make_fasttext_binary.py

# 善悪辞書作成
ADD make_zen_aku_dict.py .
RUN python3 make_zen_aku_dict.py

# リソースの追加、移動
WORKDIR /
RUN mkdir resource
WORKDIR /resource
ADD pos-id.def .
RUN mv /tmp/zen_aku_dict.json .

WORKDIR /home/