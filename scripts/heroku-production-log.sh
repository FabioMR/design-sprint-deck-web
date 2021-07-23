#!/bin/bash

HEROKU_APP_NAME="designa-labs-angular-www-production"

echo " "
echo "========> Exibindo log do heroku..."
heroku logs -t -a $HEROKU_APP_NAME
