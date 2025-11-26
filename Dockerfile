# ---------- Stage 1: Build the Vite app ----------
FROM node:22-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm ci

# Copy the rest of source code
COPY . .

# Build the production static files (output goes to /app/dist by default in Vite)
RUN npm run build

# ---------- Stage 2: Serve with Nginx ----------
FROM nginx:stable-alpine

# Copy built assets from the build stage to Nginx's default html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx.conf for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 inside the container
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
