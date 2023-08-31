#!/bin/bash

# 인증서 발급
# certbot certonly --standalone --agree-tos --email tpgns2007@naver.com -d manual.itsmore.co.kr -n
certbot certonly --webroot --webroot-path /var/www/html --agree-tos --email tpgns2007@naver.com -d manual.itsmore.co.kr -n

# Nginx 설정 파일에 SSL 정보 추가
echo "server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name manual.itsmore.co.kr;
    server_tokens off;

    ssl_certificate /etc/letsencrypt/live/manual.itsmore.co.kr/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/manual.itsmore.co.kr/privkey.pem;
    # include /etc/letsencrypt/options-ssl-nginx.conf;
    # ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-CHACHA20-POLY1305-SHA256:ECDHE-RSA-AES128-SHA';
    ssl_prefer_server_ciphers off;

    location / {
        proxy_pass http://unix:/tmp/gunicorn.sock;  # Flask 컨테이너로 설정
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }
}" > /etc/nginx/conf.d/ssl-open.conf

# Nginx 설정이 유효한지 확인
nginx -t

# Nginx 리로드
if [ $? -eq 0 ]; then
    systemctl reload nginx
fi