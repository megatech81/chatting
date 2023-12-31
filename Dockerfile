# Use an official Node runtime as a parent image
FROM node:14-alpine AS builder

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install app dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Build the Angular app
RUN ng build --prod

# Use an official Nginx runtime as a parent image
FROM nginx:alpine

# Copy the build artifacts from the builder stage to the nginx public directory
COPY --from=builder /app/dist/ /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Define the command to start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
