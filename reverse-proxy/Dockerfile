# Stage 1: Build Stage (For dependencies)
FROM node:18 AS build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Stage 2: Production Stage (For running the app)
FROM node:18-slim AS production-stage

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build-stage /app /app

# Expose port 80 for the reverse proxy
EXPOSE 80

# Run the server.js file when the container starts
CMD ["node", "server.js"]
