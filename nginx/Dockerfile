# Use the lightweight Nginx image
FROM nginx:alpine

# Set the working directory
WORKDIR /etc/nginx

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/nginx.conf

# Expose port 80 for HTTP traffic
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
