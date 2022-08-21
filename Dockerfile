FROM ubuntu:18.04 as wackybuild

RUN apt update
RUN apt install ffmpeg curl -y
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt install nodejs -y

FROM wackybuild

WORKDIR /wacky

COPY . .
RUN npm i
RUN cd web && npm i && npm run build

EXPOSE 8080
CMD ["node", "server.js"]