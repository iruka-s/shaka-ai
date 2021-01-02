釈迦AI
====

入力された日本語文の善悪を判断して点数付けするシステム。点数は加算され、自分がこれまでにどれだけの徳を積んでいるかを知ることができる。

# デモ動画

### ログイン
ログインは「ユーザ名」「メールアドレス」「パスワード」の3種類の情報を入力することで行う。

<br>

![login](https://user-images.githubusercontent.com/19168787/103466144-89092880-4d85-11eb-94d1-83fe333d5550.gif)

<br>

### 短文入力
「送信メッセージ」欄に短文を入力し、「送信」ボタンを押下することで短文をサーバに送信する。<br>
サーバで計算された善悪ポイントは、「送信メッセージ」入力欄の下部に表示される。<br>
合計ポイントと、合計ポイントに応じた来世の姿を「送信メッセージ」上部に表示する。<br>
「来世の姿」は合計ポイントが大きくなるにしたがって位が上がっていき、最終的に「釈迦」になる。

<br>

![up](https://user-images.githubusercontent.com/19168787/103466148-90c8cd00-4d85-11eb-8fec-9a97f15b9986.gif)

<br>

逆に、合計ポイントが小さくなるにしたがって位が下がっていき、最終的に「ミジンコ」になる。

<br>

![down](https://user-images.githubusercontent.com/19168787/103466162-d5ecff00-4d85-11eb-9ba7-12434d93dc50.gif)

<br>


# 点数付けアルゴリズム

<br>

### 【mecabによる構文解析、形態素解析】
構文解析ツールmecabにより、日本語文を単語ごとに分け、単語ごとの形態素を取得する。
例えば、「私は勉強した」という文の場合は次のような結果が得られる。

    私 : 名詞,代名詞,一般,*,*,*,私,ワタシ,ワタシ
    は : 助詞,係助詞,*,*,*,*,は,ハ,ワ
    勉強 : 名詞,サ変接続,*,*,*,*,勉強,ベンキョウ,ベンキョー
    し : 動詞,自立,*,*,サ変・スル,連用形,する,シ,シ
    た : 助動詞,*,*,*,特殊・タ,基本形,た,タ,タ
<br>

### 【CaboChaによる係受関係の取得】
CaboChaにより、文節ごとの係受け関係を取得できる。
例えば、「私と兄は仲が良い」という文の場合は以下の結果が得られる。

    私と-D    
    兄は---D
        仲が-D
        良い
<br>

### 【fasttextによる善悪辞書の作成】
wikipediaのダンプデータからfasttextの学習モデルを作成。  

次に、善い単語を７つの美徳(博愛,希望,信仰,知恵,公正,勇気,節制)に関連する語と、  
悪い単語を7つの大罪(傲慢,強欲,嫉妬,憤怒,色欲,暴食,怠惰)に関連する語と定義。  

7つの美徳、7つの大罪の語句に類似する単語をfasttextで取得し、  
類似度に応じて点数付。取得できた単語リストを善悪辞書として扱う。
<br><br>


### 【入力された文を善悪辞書を用いて点数付】
入力分をCabocha、mecabを用いて単語に分ける。

善悪判断が必要な品詞IDを「'2', '10', '12', '31', '36', '37', '40'」と定義。  
わけられた単語が上記の品詞であり、かつ善悪辞書に登録されていれば点数を加算する。

品詞IDの種類については次のURLを参照のこと。  
https://taku910.github.io/mecab/posid.html
<br><br>


### 【否定の助動詞に係受関係にある文節の点数の正負を反転】
次の例のように否定の意味を持つ助動詞がある場合、善悪の意味が逆になる。

    「私はさぼらなかった。」
    私 : 名詞,代名詞,一般,*,*,*,私,ワタシ,ワタシ
    は : 助詞,係助詞,*,*,*,*,は,ハ,ワ
    さぼら : 動詞,自立,*,*,五段・ラ行,未然形,さぼる,サボラ,サボラ
    なかっ : 助動詞,*,*,*,特殊・ナイ,連用タ接続,ない,ナカッ,ナカッ
    た : 助動詞,*,*,*,特殊・タ,基本形,た,タ,タ
    。 : 記号,句点,*,*,*,*,。,。,。

文節内に「なかっ」のような否定の助動詞を含む場合、「さぼらなかった。」という文節、及びその文節の子文節である「私は」の文節の点数の正負を反転させて計算する。
<br><br>

# 環境構築
本システムは`Windows10`と`Ubuntu18.04`のPCにて動作確認を実施した。<br>
環境構築をするに当たって`Docker`環境が必要なので、別途導入の上、下記を実行する。<br>

### 【フロントエンド】
Dockerコンテナ上で起動可能なReact + Material-UI環境を構築する。
`shaka-ai`フォルダ内でターミナルを開き、下記コマンドを実行する。
```
docker build -t shaka-frontend docs/frontend/
```
`shaka-frontend`というDockerイメージの作成が確認できれば環境構築成功。
<br><br>


### 【バックエンド】
Dockerコンテナ上で起動可能なDjango環境を構築する。<br>
`shaka-ai`フォルダ内でターミナルを開き、下記コマンドを実行する。<br>
※実行の完了まで5時間前後かかるので注意のこと
```
docker build -t shaka-backend docs/backend/
```
`shaka-backend`というDockerイメージの作成が確認できれば環境構築成功。
<br><br>


# 各サーバの起動
前項で作成したDockerイメージからDockerコンテナを作成し、Dockerコンテナ内でサーバを起動する。<br>
サーバー起動後、Webブラウザで```http://localhost:3000/```にアクセスする。<br>
ログイン時、ユーザー登録機能は未実装であるため、登録済みの下記テストユーザーを使用する。<br>
- ユーザー名：test
- メールアドレス：test@gmail.com
- パスワード：test00

### 【フロントエンドサーバ】
下記コマンドを実行する。
```
# Docker on Windows
docker run -it -v <※適切な絶対パス埋め込み>:/home/ -p 127.0.0.1:3000:3000 shaka-frontend

# Docker19.03 on Ubuntu
docker run -it -v $(pwd):/home/ -p 127.0.0.1:3000:3000 shaka-frontend
```
※Windowsではカレントディレクトリの指定がうまく行かず。`shaka-ai`までの絶対パスを埋め込んで起動する。<br>
　Cドライブ直下にクローンした例：`docker run -it -v C:\shaka-ai\:/home/ -p 127.0.0.1:3000:3000 shaka-frontend`

実行が正常に完了するとDockerコンテナが作成され、Dockerコンテナ内のシェルに接続される。<br>
Dockerコンテナのシェル上で下記コマンドを実行することで、Reactサーバが起動できる。
```
npm install
npm start
```
<br>


### 【バックエンドサーバ】

下記コマンドを実行する。
```
# Docker on Windows
docker run -it -v <※適切な絶対パス埋め込み>:/home/ -p 127.0.0.1:8000:8000 shaka-backend

# Docker19.03 on Ubuntu
sudo docker run --gpus 1 --privileged --device /dev/snd --group-add audio --net host -e DISPLAY=$DISPLAY -v /tmp/.X11-unix/:/tmp.X11-unix -it -v $(pwd):/home shaka-backend
```
※Windowsではカレントディレクトリの指定がうまく行かず。`shaka-ai`までの絶対パスを埋め込んで起動する。<br>
　Cドライブ直下にクローンした例：`docker run -it -v C:\shaka-ai\:/home/ -p 127.0.0.1:8000:8000 shaka-backend`

実行が正常に完了するとDockerコンテナが作成され、Dockerコンテナ内のシェルに接続される。<br>
Dockerコンテナのシェル上で下記コマンドを実行することで、Djangoサーバが起動できる。

```
python3 manage.py runserver 0.0.0.0:8000
```
<br>


# 作者

[iruka-s](https://github.com/iruka-s)