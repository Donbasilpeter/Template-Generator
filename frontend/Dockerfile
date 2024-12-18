# Use official Node.js image for building the React app
FROM node:20 AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --production
RUN npm install -g serve

# Copy the rest of the application files
COPY . .

# Build the React app for production
RUN npm run build

EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000" ]

