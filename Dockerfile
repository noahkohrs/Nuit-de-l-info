FROM nginx:alpine

#RUN apk add --no-cache nodejs npm
COPY nginx.conf /etc/nginx/nginx.conf

COPY index.html /home/
#COPY package.json /home/
#COPY tsconfig.json /home/
COPY js /home/js/
COPY css /home/css/
COPY img /home/img/
COPY data /home/data/

#WORKDIR /home
#RUN npm install
#RUN npm run build