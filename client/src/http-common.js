import axios from 'axios';

export default axios.create({
    baseURL: "https://warm-ravine-98532.herokuapp.com/api/v1/weather",
    headers: {
        "Content-type": "application/json"
    }
});