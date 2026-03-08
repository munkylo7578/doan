# syntax=docker/dockerfile:1
FROM node:14-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps --no-audit --no-fund

COPY . .
RUN npx ng build --configuration production

FROM nginx:1.25-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*
# Angular outputPath is dist/Client for this app
COPY --from=build /app/dist/Client /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

