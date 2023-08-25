FROM python:3.11

# root 권한
# 유저 추가 (패스워드를 입력하지 않아도 되도록 설정 + 홈디렉토리 자동생성)
RUN adduser --disabled-password python
RUN apt-get update
RUN apt-get upgrade
RUN apt-get install -y wget

RUN wget https://github.com/wkhtmltopdf/wkhtmltopdf/releases/download/0.12.4/wkhtmltox-0.12.4_linux-generic-amd64.tar.xz
RUN tar -xvf wkhtmltox-0.12.4_linux-generic-amd64.tar.xz
RUN wget http://archive.ubuntu.com/ubuntu/pool/main/libj/libjpeg-turbo/libjpeg-turbo8_2.0.3-0ubuntu1.20.04.3_amd64.deb
RUN dpkg -i libjpeg-turbo8_2.0.3-0ubuntu1.20.04.3_amd64.deb
RUN wget http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.0g-2ubuntu4_amd64.deb
RUN dpkg -i libssl1.1_1.1.0g-2ubuntu4_amd64.deb

# ENV DEBIAN_FRONTEND=noninteractive
# RUN wget https://github.com/wkhtmltopdf/wkhtmltopdf/releases/download/0.12.5/wkhtmltox_0.12.5-1.bionic_amd64.deb
# RUN apt-get update && apt-get install -y ./wkhtmltox_0.12.5-1.bionic_amd64.deb

RUN cp wkhtmltox/bin/wkhtmltopdf /usr/bin/
RUN chmod +x /usr/bin/wkhtmltopdf
RUN chown python:python /usr/bin/wkhtmltopdf

# 유저 전환 (root -> 생성 유저)
USER python

# 의존성 패키지 복사
COPY ./requirements.txt /tmp/requirements.txt

# python 의존성 패키지 설치 + gunicorn 설치
RUN python -m pip install --upgrade pip
RUN pip install --user -r /tmp/requirements.txt
RUN pip install --user gunicorn==20.1.0

# 프로젝트 소스 복사
COPY --chown=python:python ./ /var/www/manual_app

# 복사한 프로젝트 디렉토리로 이동
WORKDIR /var/www/manual_app

# 설치한 패키지 명령어를 사용하기 위해 환경변수 등록
ENV PATH="/home/python/.local/bin:${PATH}"

# etc/docker-entrypoint.sh 실행을 위한 권한 변경
RUN chmod +x ./etc/docker-entrypoint.sh

# 9015 포트 노출
EXPOSE 9015

# gunicorn 실행 (etc/docker-entrypoint.sh로 명령어를 한번에 실행)
# CMD gunicorn --bind :9015 --workers 2 --threads 8 'manual_app:create_app()'