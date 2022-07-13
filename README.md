# Plantselector-MERN is a full stack implementation of the plantselector app

It adds an express server and mongoose database configuration so that users can create user accounts and save favorite plants and 'rooms' with specific lighting, care and size conditions.

You can see a production build of this app at [https://plantselector.herokuapp.com](https://plantselector.herokuapp.com)

This project was built with [Create React App](https://github.com/facebook/create-react-app) and [Express Application Generator](http://expressjs.com/en/starter/generator.html).

## Available Scripts

In the project directory, you can run:

### `docker compose up`

To spin up the server, client and database in networked containers. This command requires you to have Docker installed on your system. A development build of the client will be served to your local host.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build && npm start`

To create a production build of the app and start the server. On your local machine, the app is served at [http://localhost:9000](http://localhost:9000).\
For the app to function properly, it must be connected to a MongoDB database. You will need to set the MONGODB_URI environment variable or hardcode the mongoUrl property at ./plantselector-server/config.js to point the app to a working MongoDB database uri.
