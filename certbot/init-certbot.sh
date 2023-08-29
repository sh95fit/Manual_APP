#!/bin/bash

set -e

# Start nginx in the background
nginx

# Register and/or renew the certificates
certbot renew --webroot --webroot-path=/var/www/html

# Reload nginx to apply any changes
nginx -s reload