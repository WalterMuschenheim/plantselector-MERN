const production = "https://plantselector.herokuapp.com/";
const development = "http://localhost:9000/";
const baseUrl = process.env.NODE_ENV ? production : development;

export default baseUrl;
