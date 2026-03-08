# syntax=docker/dockerfile:1
FROM node:14-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --no-audit --no-fund

COPY . .
RUN npx ng build --configuration production

# --- Runtime Stage ---
FROM node:14-alpine AS runtime

WORKDIR /app

# Install a lightweight static server
RUN npm install -g serve

# Copy only the build output from the build stage
# Note: Angular usually outputs to dist/[project-name]. 
# Check your angular.json to confirm the exact path.
COPY --from=build /app/dist /app/dist

EXPOSE 8001

# Run 'serve' on the build folder
# -s flag handles Single Page Application (SPA) routing
CMD ["serve", "-s", "dist", "-l", "8001"]