#!/bin/bash

set -e

gunicorn --bind unix:/tmp/gunicorn.sock --workers 2 --threads 8 --reload --access-logfile - 'manual_app:create_app()'