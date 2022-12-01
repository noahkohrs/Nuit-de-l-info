FROM nginx:alpine

RUN apk add --no-cache nodejs npm
COPY nginx.conf /etc/nginx/nginx.conf

COPY index.html /home/
COPY package.json /home/
COPY tsconfig.json /home/
COPY typescript /home/typescript/
COPY sass /home/sass/
COPY img /home/img/

WORKDIR /home
RUN npm install
RUN npm run build