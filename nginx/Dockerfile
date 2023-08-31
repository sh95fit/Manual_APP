# Dockerfile

FROM nginx:latest

# 시간대 환경 변수 설정
ENV TZ=Asia/Seoul

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
# &&는 순차 처리 &는 병렬 처리 (&&는 앞의 명령어가 완전히 완료되면 다음 명령어 수행, &는 병렬로 동시에 처리)
CMD ["sh", "-c", "nginx -g 'daemon off;' & sleep 20 && /var/www/html/init-certbot.sh && cron"]
# CMD ["sh", "-c", "nginx -g 'daemon off;' && sleep 20 && /var/www/html/init-certbot.sh && cron"]
# CMD ["sh", "-c", "cron && /var/www/html/init-certbot.sh"]