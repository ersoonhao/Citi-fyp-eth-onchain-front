import axios from "axios";

export default axios.create({
  baseURL: "http://3.229.199.112:3000/",
  headers: {
    "Content-type": "application/json"
  }
});