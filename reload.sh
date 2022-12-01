#!/bin/bash

git pull
docker build . -t reblochons/front
docker rm -f front
docker run -d --name "front" -p 80:80 reblochons/front
