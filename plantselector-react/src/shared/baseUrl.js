const packageJSON = require("../../package.json");

const production = packageJSON.homepage;
const development = "http://localhost:9000/";
const baseUrl = process.env.NODE_ENV ? production : development;

export default baseUrl;
