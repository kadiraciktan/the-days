FROM node:lts-alpine
WORKDIR /api
COPY ./dist/apps/api .
RUN npm install --omit=dev
RUN npm install pg --save
RUN npm install ts-morph --save
CMD ["node", "main.js"]