# Dockerfile

FROM nginx:latest

# Certbot 설치
RUN chmod 777 /tmp
RUN apt-get update && apt-get install -y certbot python3-certbot-nginx cron
RUN apt-get update && apt-get install -y cron

# 스크립트 복사
# COPY ./nginx/init-certbot.sh /usr/local/bin/
# RUN chmod +x /var/www/html/init-certbot.sh

# 크론탭 파일 복사
COPY ./nginx/certbot-cron /etc/cron.d/certbot-cron
RUN chmod 0644 /etc/cron.d/certbot-cron

EXPOSE 80 443

# Nginx 실행
CMD ["sh", "-c", "cron && /var/www/html/init-certbot.sh && nginx -g 'daemon off;'"]
# CMD ["sh", "-c", "cron && nginx -g 'daemon off;'"]