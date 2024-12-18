FROM nginx:alpine

# Copy the custom nginx.conf into the container
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 to allow traffic
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
