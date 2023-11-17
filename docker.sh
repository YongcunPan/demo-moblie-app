#!/bin/bash
if [ ! -d "node_modules" ]; then
    yarn
fi
yarn run build
docker build -t harbor.hwwt2.com/enterprise/$1-fis-mobile-app:1.0.0 .
docker login -u enterprise -p f2845BcC0917 harbor.hwwt2.com
docker push harbor.hwwt2.com/enterprise/$1-fis-mobile-app:1.0.0