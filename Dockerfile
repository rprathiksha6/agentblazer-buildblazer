# Use official Node.js 24 Alpine image
FROM node:24-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build production React frontend
RUN npm run build

# Expose port (default 5000)
ENV PORT=5000
ENV NODE_ENV=production
EXPOSE 5000

# Start unified Node.js / Express server
CMD ["npm", "start"]
