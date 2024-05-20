FROM node:20


WORKDIR /frontend

COPY yarn.lock /frontend/
COPY package.json /frontend/



RUN yarn 

COPY . /frontend/

CMD ["yarn", "dev"]
