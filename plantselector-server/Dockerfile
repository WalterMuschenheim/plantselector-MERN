# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:6.17
# Set the working directory to /plantselector-server 
WORKDIR /plantselector-server 
# copy package.json into the container at /plantselector-server
COPY package*.json /plantselector-server/
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /plantselector-server
COPY . /plantselector-server/
# Make port 80 available to the world outside this container
EXPOSE 80
# Run the app when the container launches
CMD ["npm", "start"]