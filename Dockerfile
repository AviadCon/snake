# Use an official Nginx image as the base
FROM nginx:alpine

# Set the working directory inside the container
WORKDIR /usr/share/nginx/html

# Copy the Snake game files to the Nginx web directory
COPY . .

# Expose port 80 for the web server
EXPOSE 80

# The default command to run Nginx will serve your game
