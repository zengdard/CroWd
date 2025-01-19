FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY vite.config.ts ./

RUN npm install
RUN npm install wait-on -g

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]