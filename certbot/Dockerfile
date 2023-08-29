# Certbot Dockerfile

FROM certbot/certbot

COPY init-certbot.sh /init-certbot.sh
RUN chmod +x /init-certbot.sh

CMD ["/init-certbot.sh"]