#!/bin/bash

HEROKU_APP_NAME="designa-labs-angular-www-production"
HEROKU_GIT_URL="https://git.heroku.com/$HEROKU_APP_NAME.git"
BRANCH="production"

git checkout $BRANCH

echo " "
echo "========> Adicionando git remote do heroku..."
git remote add heroku $HEROKU_GIT_URL

echo " "
echo "========> Atualizando o projeto no heroku..."
git push heroku $BRANCH:master

echo " "
echo "========> Ambiente atualizado com sucesso!"

heroku open -a $HEROKU_APP_NAME
git remote remove heroku
