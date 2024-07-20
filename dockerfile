# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the SvelteKit app
#RUN npm run build
RUN npm run build

# Expose the port that the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "preview"]


