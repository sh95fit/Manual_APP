#!/bin/bash

# 인증서 발급
certbot certonly --standalone --agree-tos --email tpgns2007@naver.com -d manual.itsmore.co.kr:9015 -n

# Nginx 설정 파일에 SSL 정보 추가
echo "server {
    listen 9015 ssl;
    server_name manual.itsmore.co.kr;
    ssl_certificate /etc/letsencrypt/live/manual.itsmore.co.kr/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/manual.itsmore.co.kr/privkey.pem;

    location / {
        return 301 https://$host$request_uri;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_redirect off;
        proxy_buffering off;
        proxy_pass http://unix:/tmp/gunicorn.sock;
    }

}" > /etc/nginx/conf.d/default.conf

# Nginx 설정이 유효한지 확인
nginx -t

# Nginx 리로드
if [ $? -eq 0 ]; then
    systemctl reload nginx
fi