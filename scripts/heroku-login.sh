#!/bin/bash

HEROKU_USER="vanguarda.reporter.adm@gmail.com"

echo " "
echo "========> Realizando login no heroku..."
function herokuLogin() {
    _HEROKU_USER=$1
    _HEROKU_LOGGED_USER=$(echo $(heroku whoami 2>/dev/null) | egrep $_HEROKU_USER)

    if [ ! -z $_HEROKU_LOGGED_USER ]; then
        echo "Heroku logged user: $_HEROKU_USER"
    else
        echo ""
        echo "heroku logout"
        heroku logout

        echo ""
        echo "heroku login -i"
        heroku login -i || exit 1
    fi
}

herokuLogin $HEROKU_USER
