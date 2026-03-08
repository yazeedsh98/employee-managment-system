# Stage 1: Build the Angular application
FROM node:18-alpine AS build
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (use npm install instead of npm ci)
RUN npm install

# Copy source code
COPY . .

# Build the application for production
RUN npm run build -- --configuration production

# Stage 2: Serve with http-server
FROM node:18-alpine

# Install http-server globally
RUN npm install -g http-server

WORKDIR /app

# Copy built files from build stage
COPY --from=build /app/dist/employee-management ./dist

# Expose port
EXPOSE 8080

# Start http-server - bind to 0.0.0.0 to make it accessible from outside container
CMD ["http-server", "dist", "-p", "8080", "-a", "0.0.0.0"]