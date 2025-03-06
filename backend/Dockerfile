# Use Node.js 18 or later as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 5000
EXPOSE 5000

# Command to run the application
CMD ["node", "app.js"]

