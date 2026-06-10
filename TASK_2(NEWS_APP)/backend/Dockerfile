# Node image
FROM node:20-alpine

# Working directory
WORKDIR /usr/src/app

# Copy package.json
COPY package*.json ./
RUN npm install --include=dev

# copy the rest of code
COPY . .

# Expose port
EXPOSE 5000

# Start server
CMD ["npm", "run", "dev"]