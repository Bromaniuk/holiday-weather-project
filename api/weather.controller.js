import WeatherDAO from "../dao/weatherDAO.js";

export default class WeatherController {
    static async apiGetWeather(req, res, next) {
        const country = req.query.country;
        const city = req.query.city;

        const { monthlyAverages, monthlyAveragesGraphData, dailyAveragesGraphData } = await WeatherDAO.getWeather({
            country,
            city
        })

        let response = {
            monthlyAverages: monthlyAverages,
            monthlyAveragesGraphData: monthlyAveragesGraphData,
            dailyAveragesGraphData: dailyAveragesGraphData
        }
        res.json(response);
    }
}