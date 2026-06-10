# Using a lightweight Node image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend source code
COPY . .

# Expose Vite's default dev port
EXPOSE 5173

# Run Vite in development mode and expose it to the network host
CMD ["npm", "run", "dev", "--", "--host"]