import axios from "axios";

const server = axios.create({
  baseURL: import.meta.env.MODE === 'development' ? 
    "http://localhost:3042" : 'https://week1-ecdsa-node.vercel.app/',
});

export default server;
