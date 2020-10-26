FROM ubuntu:18.04

LABEL version="1.0"
LABEL description="釈迦AI：バックエンドサーバ"

RUN apt -y update && \
    apt -y upgrade

RUN apt install -y vim python3 python3-pip && \
    pip3 install --upgrade pip