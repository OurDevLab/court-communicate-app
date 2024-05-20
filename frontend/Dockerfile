FROM node:20

WORKDIR /frontend

# COPY yarn.lock /frontend/
# COPY package.json /frontend/

COPY . /frontend/

RUN yarn install

CMD ["yarn", "start"]
