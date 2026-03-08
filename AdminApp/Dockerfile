# syntax=docker/dockerfile:1
FROM node:16-alpine AS build

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm install --no-audit --no-fund

# Copy the rest of the sources and build in production mode
COPY . .
RUN npx ng build --configuration production

FROM nginx:1.25-alpine AS runtime

# Replace default server config with SPA-friendly config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Clean default html and copy build output
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

