FROM node:18.18-alpine

WORKDIR /app

COPY package*.json ./
# Ajouter --legacy-peer-deps pour éviter les problèmes de compatibilité
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]