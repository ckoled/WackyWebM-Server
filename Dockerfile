FROM ubuntu:18.04

WORKDIR /wacky

COPY . .

RUN apt update
RUN apt install ffmpeg curl -y
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt install nodejs -y
RUN npm i

EXPOSE 8080
CMD ["node", "server.js"]