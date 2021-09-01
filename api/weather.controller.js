import WeatherDAO from "../dao/weatherDAO.js";

export default class WeatherController {
    static async apiGetWeather(req, res, next) {
        const country = req.query.country;
        const city = req.query.city;

        const { celsiusMonthlyAveragesMedianTableData, celsiusMonthlyAveragesMinTableData, celsiusMonthlyAveragesMaxTableData, 
            fahrenheitMonthlyAveragesMedianTableData, fahrenheitMonthlyAveragesMinTableData, fahrenheitMonthlyAveragesMaxTableData, 
            celsiusMonthlyAveragesGraphData, fahrenheitMonthlyAveragesGraphData,
            celsiusDailyAveragesGraphData, fahrenheitDailyAveragesGraphData } = await WeatherDAO.getWeather({
            country,
            city
        })
        let response = {
            celsiusMonthlyAveragesMedianTableData: celsiusMonthlyAveragesMedianTableData,
            celsiusMonthlyAveragesMinTableData: celsiusMonthlyAveragesMinTableData,
            celsiusMonthlyAveragesMaxTableData: celsiusMonthlyAveragesMaxTableData, 

            fahrenheitMonthlyAveragesMedianTableData: fahrenheitMonthlyAveragesMedianTableData,
            fahrenheitMonthlyAveragesMinTableData: fahrenheitMonthlyAveragesMinTableData,
            fahrenheitMonthlyAveragesMaxTableData: fahrenheitMonthlyAveragesMaxTableData, 

            celsiusMonthlyAveragesGraphData: celsiusMonthlyAveragesGraphData,
            fahrenheitMonthlyAveragesGraphData: fahrenheitMonthlyAveragesGraphData,

            celsiusDailyAveragesGraphData: celsiusDailyAveragesGraphData,
            fahrenheitDailyAveragesGraphData: fahrenheitDailyAveragesGraphData
        }
        res.json(response);
    }
}