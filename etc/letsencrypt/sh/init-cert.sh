#!/bin/bash

# Nginx 시작
nginx -g "daemon off;" &

# Nginx 실행 대기
until [ -f /etc/nginx/conf.d/default.conf ]; do
  sleep 1
done

Webroot 경로 생성
mkdir -p /var/www/letsencrypt/.well-known/acme-challenge
chown python:python /var/www/letsencrypt/.well-known/acme-challenge

# SSL 인증서 발급 (최초 실행)
if [ ! -f /etc/letsencrypt/live/manual.itsmore.co.kr/fullchain.pem ]; then
  # certbot certonly --config-dir ~/.certbot/config --logs-dir ~/.certbot/logs --work-dir ~/.certbot/work --nginx -d manual.itsmore.co.kr --agree-tos --email tpgns2007@naver.com -n
  certbot certonly --config-dir ~/.certbot/config --logs-dir ~/.certbot/logs --work-dir ~/.certbot/work -a webroot --webroot-path /var/www/letsencrypt -d manual.itsmore.co.kr --agree-tos --email tpgns2007@naver.com -n
fi

# Cron 작업 추가
echo "0 0 * * 0 /usr/bin/renew-cert.sh && nginx -s reload" > /etc/cron.d/certbot

# Cron 시작
cron

# 컨테이너 실행
tail -f /dev/null