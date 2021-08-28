import http from '../http-common.js';

class WeatherDataService {
    getCityData(country, city) {
        return http.get(`?country=${country}&city=${city}`)
    }
};

export default new WeatherDataService();