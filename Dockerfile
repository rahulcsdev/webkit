# Use an official Node.js runtime as the base image
FROM node:18.4.0

# Set the working directory in the container
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose the port your KeystoneJS application will run on
EXPOSE 3000

# Define the command to run your application
CMD ["npm", "run", "start"]