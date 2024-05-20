FROM node:20

WORKDIR /backend

# RUN apt-get -y update
# RUN apt-get install -y openssl libssl-dev

COPY . /backend/

RUN yarn install

CMD ["yarn", "start"]
