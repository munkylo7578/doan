# syntax=docker/dockerfile:1
FROM node:16-bullseye-slim AS build

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./

# Make npm more resilient to flaky network/proxy conditions in CI/docker builds
RUN npm config set fetch-retries 5 \
    && npm config set fetch-retry-factor 2 \
    && npm config set fetch-retry-mintimeout 20000 \
    && npm config set fetch-retry-maxtimeout 120000 \
    && npm config set network-timeout 600000

# Deterministic install from lockfile
RUN npm ci --legacy-peer-deps --no-audit --no-fund

# Copy the rest of the sources and build in production mode
COPY . .
ENV NODE_OPTIONS=--max-old-space-size=4096
ENV NG_BUILD_MAX_WORKERS=2
RUN npm run build -- --configuration production

FROM nginx:1.25-alpine AS runtime

# Replace default server config with SPA-friendly config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Clean default html and copy build output
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/ /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

