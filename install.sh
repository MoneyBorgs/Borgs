#!/bin/bash

mypath=`realpath $0`
mybase=`dirname $mypath`

# Questions
read -e -p "Enter the database name: " -i "borgs" dbname
read -e -p "Enter the host: " -i "localhost" host
read -e -p "Enter the port used to connect to the database: " -i "5432" port
read -e -p "Enter the user you used to create the database: " -i "vcm" user
read -e -p "Enter the password to connect to the database: " password

# Create .env file for backend
rm -f $mybase/borgs-backend/.env
touch $mybase/borgs-backend/.env
echo "PORT=8000" >> $mybase/borgs-backend/.env
echo "PGUSER=$user" >> $mybase/borgs-backend/.env
echo "PGHOST=$host" >> $mybase/borgs-backend/.env
echo "PGPASSWORD=$password" >> $mybase/borgs-backend/.env
echo "PGDATABASE=$dbname" >> $mybase/borgs-backend/.env
echo "PGPORT=$port" >> $mybase/borgs-backend/.env

# Create .env file for front-end
rm -f $mybase/borgs-frontend/.env
touch $mybase/borgs-frontend/.env
echo "PORT=3000" >> $mybase/borgs-frontend/.env

# Create .env file for the database
rm -f $mybase/borgs-db/.env
touch $mybase/borgs-db/.env
echo "DB_NAME=$dbname" >> $mybase/borgs-db/.env

### Install front-end
# NodeJS
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs

# Increase the amount of file watchers
echo fs.inotify.max_user_watches=100000 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

## Make sure you are into the correct directory
cd $mybase/borgs-frontend/
npm install

### Install front-end
cd $mybase/borgs-backend/
npm install