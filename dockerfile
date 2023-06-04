FROM openjdk:8-jdk

# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

# Create app directory
WORKDIR /usr/src/app

# Copy app source (excluding node_modules)
COPY SCSL_backendServer/ ./
RUN rm -rf node_modules

# Install app dependencies
RUN npm install

# Run the app
CMD ["npm", "run", "dev"]