#! /bin/bash
git reset HEAD --hard
git pull

git submodule init
git submodule update

chmod +x ./run.sh

npm install

make clean && make all

dir="$(basename $PWD)"

pm2 stop $dir
pm2 start index.js --name $dir
pm2 info $dir
