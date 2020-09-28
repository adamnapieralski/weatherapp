FROM python:slim-buster

WORKDIR /usr/src/robot-framework

COPY requirements.txt ./
COPY tests ./

RUN python3 -m pip install -r requirements.txt
RUN webdrivermanager chrome firefox
