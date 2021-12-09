const production = process.env.BASE_URL;
const development = "http://localhost:9000/";
const baseUrl = process.env.NODE_ENV ? production : development;

export default baseUrl;
