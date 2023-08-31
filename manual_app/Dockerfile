FROM python:3.11

# root 권한
# 유저 추가 (패스워드를 입력하지 않아도 되도록 설정 + 홈디렉토리 자동생성)
RUN adduser --disabled-password --gecos '' python
RUN apt-get update
# RUN apt-get upgrade
RUN apt-get install -y wget

# wkhtmltopdf 의존성 패키지 설치
RUN apt-get install -y xfonts-75dpi xfonts-base


# 클라우드 서버의 경우 arm 기반 패키지로 설치하여야 한다! (아래 설치 파일 중 libssl1.1은 주석 처리)
# libjpeg-turbo8 설치 후 /etc/wkhtmltopdf 디렉터리 내 wkhtmltox_0.12.6.1-2.jammy_amd64.deb 파일 적용
# /usr/local/bin/wkhtmltopdf 경로 권한 설정 및 플라스크 코드 경로 수정

# amd 버전 설치 방법 (wkhtmltox)
# 설치 후 cp wkhtmltox/bin/wkhtmltopdf /usr/bin/를 통해 환경변수 PATH에 등록된 경로로 옮겨서 활용
# RUN wget https://github.com/wkhtmltopdf/wkhtmltopdf/releases/download/0.12.4/wkhtmltox-0.12.4_linux-generic-amd64.tar.xz
# RUN tar -xvf wkhtmltox-0.12.4_linux-generic-amd64.tar.xz

RUN wget http://archive.ubuntu.com/ubuntu/pool/main/libj/libjpeg-turbo/libjpeg-turbo8_2.1.2-0ubuntu1_amd64.deb
RUN dpkg -i libjpeg-turbo8_2.1.2-0ubuntu1_amd64.deb

# 해당 패키지는 필수 설치가 아니므로 에러 코드에 맞춰 적용
RUN wget http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.0g-2ubuntu4_amd64.deb
RUN dpkg -i libssl1.1_1.1.0g-2ubuntu4_amd64.deb

# 프로젝트 소스 복사
COPY --chown=python:python ./ /var/www/manual_app

# 복사한 프로젝트 디렉토리로 이동
WORKDIR /var/www/manual_app

# 해당 설치는 root 권한으로 실행
RUN dpkg -i ./etc/wkhtmltopdf/wkhtmltox_0.12.6.1-2.jammy_amd64.deb

# RUN cp wkhtmltox/bin/wkhtmltopdf /usr/bin/
RUN chmod +x /usr/local/bin/wkhtmltopdf
RUN chown python:python /usr/local/bin/wkhtmltopdf


# 유저 전환 (root -> 생성 유저)
USER python

# 의존성 패키지 복사
COPY ./requirements.txt /tmp/requirements.txt

# python 의존성 패키지 설치 + gunicorn 설치
RUN python -m pip install --upgrade pip
RUN pip install --user -r /tmp/requirements.txt
RUN pip install --user gunicorn==20.1.0

# 설치한 패키지 명령어를 사용하기 위해 환경변수 등록
ENV PATH="/home/python/.local/bin:${PATH}"

# etc/docker-entrypoint.sh 실행을 위한 권한 변경
RUN chmod +x ./etc/docker-entrypoint.sh

# 9015 포트 노출
EXPOSE 9015

# gunicorn 실행 (etc/docker-entrypoint.sh로 명령어를 한번에 실행)
# CMD gunicorn --bind :9015 --workers 2 --threads 8 'manual_app:create_app()'
