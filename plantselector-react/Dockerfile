# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:6.17
# Set the working directory to /plantselector-react
WORKDIR /plantselector-react
# copy package.json into the container at /plantselector-react
COPY package*.json /plantselector-react/
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /plantselector-react
COPY . /plantselector-react/
# Make port 3000 available to the world outside this container
EXPOSE 3000
# Run the app when the container launches
CMD ["npm", "start"]