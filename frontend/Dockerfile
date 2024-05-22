FROM node:20

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

EXPOSE 5173

CMD ["yarn", "preview", "--host", "0.0.0.0", "--port", "5173"]
