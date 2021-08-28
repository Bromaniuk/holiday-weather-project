import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:5000/api/v1/weather",
    headers: {
        "Content-type": "application/json"
    }
});