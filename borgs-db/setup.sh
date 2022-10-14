#!/bin/bash

mypath=`realpath $0`
mybase=`dirname $mypath`
cd $mybase

source ./.env
dbname=$DB_NAME

echo "Creating database $dbname"
echo ""

if [[ -n `psql -lqt | cut -d \| -f 1 | grep -w "$dbname"` ]]; then
    dropdb $dbname
fi
createdb $dbname

psql -bf create.sql $dbname
cd $datadir
psql -bf $mybase/load.sql $dbname