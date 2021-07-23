#!/bin/bash

HEROKU_APP_NAME="designa-labs-angular-www-internal"
HEROKU_GIT_URL="https://git.heroku.com/$HEROKU_APP_NAME.git"
BRANCH="internal"
ENV="internal"
DOMAIN="www-internal.vanguardareporter.com.br"

git checkout $BRANCH

./scripts/heroku-login.sh

echo " "
echo "========> Apagando ambiente no heroku..."
heroku apps:destroy $HEROKU_APP_NAME --confirm $HEROKU_APP_NAME

echo " "
echo "========> Criando ambiente no heroku..."
heroku create $HEROKU_APP_NAME

echo " "
echo "========> Configurando variáveis de ambiente no heroku..."
heroku config:set \
  NODE_ENV="production" \
  ENV="$ENV" \
  -a $HEROKU_APP_NAME

echo "========> Adicionando git remote do heroku..."
git remote add heroku $HEROKU_GIT_URL

echo " "
echo "========> Enviando o projeto para o heroku..."
git push heroku $BRANCH:master

echo " "
echo "========> Configurando domínio..."
heroku domains:add  $DOMAIN -a $HEROKU_APP_NAME
heroku domains:wait $DOMAIN -a $HEROKU_APP_NAME

echo " "
echo "========> Concedendo acesso ao heroku a administradores..."
heroku access:add fabio.info@gmail.com -a $HEROKU_APP_NAME
heroku access:add miller.miac@gmail.com -a $HEROKU_APP_NAME
heroku access:add michel.amaral@gmail.com -a $HEROKU_APP_NAME

echo " "
echo "========> Ambiente criado com sucesso!"

heroku open -a $HEROKU_APP_NAME
git remote remove heroku
