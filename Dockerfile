# Use the official Node.js 20 image as the base image
FROM node:20

# Install PostgreSQL client utilities
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Prisma CLI globally (if using Prisma for migrations)
RUN npm install -g prisma

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Copy the entrypoint script
COPY entrypoint.sh /usr/src/app/entrypoint.sh

# Make the entrypoint script executable
RUN chmod +x /usr/src/app/entrypoint.sh

# Define the command to run the entrypoint script
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
