let weather

export default class WeatherDAO {
    static async injectDB(conn) {
        if (weather) {
            return
        }
        try {
            weather = await conn.db(process.env.WEATHER_NS)
        } catch (e) {
            console.error(
                `Unable to establish a connection in weatherDAO: ${e}`,
            )
        }

    }

    static async getWeather({
        country,
        city
    } = {}) {
        let query = { "city": { $eq: city } }

        let cursor

        try {
            cursor = await weather.collection(country)
                .findOne(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return {
                celsiusMonthlyAveragesMedianTableData: [],
                celsiusMonthlyAveragesMinTableData: [],
                celsiusMonthlyAveragesMaxTableData: [],

                fahrenheitMonthlyAveragesMedianTableData: [],
                fahrenheitMonthlyAveragesMinTableData: [],
                fahrenheitMonthlyAveragesMaxTableData: [],

                celsiusMonthlyAveragesGraphData: [],
                fahrenheitMonthlyAveragesGraphData: [],

                celsiusDailyAveragesGraphData: [],
                fahrenheitDailyAveragesGraphData: []
            }
        }

        const displayCursor = cursor

        try {
            const celsiusMonthlyAveragesMedianTableData = []
            const celsiusMonthlyAveragesMinTableData = []
            const celsiusMonthlyAveragesMaxTableData = []

            const fahrenheitMonthlyAveragesMedianTableData = []
            const fahrenheitMonthlyAveragesMinTableData = []
            const fahrenheitMonthlyAveragesMaxTableData = []

            const celsiusMonthlyAveragesGraphData = []
            const fahrenheitMonthlyAveragesGraphData = []

            const celsiusDailyAveragesGraphData = []
            const fahrenheitDailyAveragesGraphData = []


            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            for (let month = 1; month < 13; month++) {
                celsiusMonthlyAveragesMedianTableData.push(Math.round((await displayCursor["temp"]["month"][`${month}`]["month_average_median"] - 273.15)))
                celsiusMonthlyAveragesMinTableData.push(Math.round((await displayCursor["temp"]["month"][`${month}`]["month_average_min"] - 273.15)))
                celsiusMonthlyAveragesMaxTableData.push(Math.round((await displayCursor["temp"]["month"][`${month}`]["month_average_max"] - 273.15)))

                fahrenheitMonthlyAveragesMedianTableData.push(Math.round(((await displayCursor["temp"]["month"][`${month}`]["month_average_median"] - 273.15) * (9 / 5) + 32)))
                fahrenheitMonthlyAveragesMinTableData.push(Math.round(((await displayCursor["temp"]["month"][`${month}`]["month_average_min"] - 273.15) * (9 / 5) + 32)))
                fahrenheitMonthlyAveragesMaxTableData.push(Math.round(((await displayCursor["temp"]["month"][`${month}`]["month_average_max"] - 273.15) * (9 / 5) + 32)))


                celsiusMonthlyAveragesGraphData.push({
                    "name": months[month - 1],
                    "median": Math.round((await displayCursor["temp"]["month"][`${month}`]["month_average_median"] - 273.15)),
                    "low": Math.round((await displayCursor["temp"]["month"][`${month}`]["month_average_min"] - 273.15)),
                    "high": Math.round((await displayCursor["temp"]["month"][`${month}`]["month_average_max"] - 273.15))
                })
                fahrenheitMonthlyAveragesGraphData.push({
                    "name": months[month - 1],
                    "median": Math.round(((await displayCursor["temp"]["month"][`${month}`]["month_average_median"] - 273.15) * (9 / 5) + 32)),
                    "low": Math.round(((await displayCursor["temp"]["month"][`${month}`]["month_average_min"] - 273.15) * (9 / 5) + 32)),
                    "high": Math.round(((await displayCursor["temp"]["month"][`${month}`]["month_average_max"] - 273.15) * (9 / 5) + 32))
                })

                let celsiusCurrentMonthDailyAveragesGraphData = []
                let fahrenheitCurrentMonthDailyAveragesGraphData = []

                for (let day = 1; day < Object.keys(await displayCursor["temp"]["month"][`${month}`]).length - 3; day++) {
                    // Below if statements are to correctly format the numeric string of `month-day` by adding a 0 before single digits
                    let currentDay = ''
                    if (month < 10) {
                        currentDay += `0${month}`
                    } else {
                        currentDay += `${month}`
                    }
                    if (day < 10) {
                        currentDay += `-0${day}`
                    } else {
                        currentDay += `-${day}`
                    }

                    celsiusCurrentMonthDailyAveragesGraphData.push({
                        "name": currentDay,
                        "median": Math.round((await displayCursor["temp"]["month"][`${month}`][`${day}`]["median"] - 273.15)),
                        "low": Math.round((await displayCursor["temp"]["month"][`${month}`][`${day}`]["average_min"] - 273.15)),
                        "high": Math.round((await displayCursor["temp"]["month"][`${month}`][`${day}`]["average_max"] - 273.15))
                    })

                    fahrenheitCurrentMonthDailyAveragesGraphData.push({
                        "name": currentDay,
                        "median": Math.round(((await displayCursor["temp"]["month"][`${month}`][`${day}`]["median"] - 273.15) * (9 / 5) + 32)),
                        "low": Math.round(((await displayCursor["temp"]["month"][`${month}`][`${day}`]["average_min"] - 273.15) * (9 / 5) + 32)),
                        "high": Math.round(((await displayCursor["temp"]["month"][`${month}`][`${day}`]["average_max"] - 273.15) * (9 / 5) + 32))
                    })

                }
                celsiusDailyAveragesGraphData.push(celsiusCurrentMonthDailyAveragesGraphData)
                fahrenheitDailyAveragesGraphData.push(fahrenheitCurrentMonthDailyAveragesGraphData)
            }
            return {
                celsiusMonthlyAveragesMedianTableData, celsiusMonthlyAveragesMinTableData, celsiusMonthlyAveragesMaxTableData,
                fahrenheitMonthlyAveragesMedianTableData, fahrenheitMonthlyAveragesMinTableData, fahrenheitMonthlyAveragesMaxTableData,
                celsiusMonthlyAveragesGraphData, fahrenheitMonthlyAveragesGraphData,
                celsiusDailyAveragesGraphData, fahrenheitDailyAveragesGraphData
            }
        } catch (e) {
            console.error(
                e
            )
            return {
                celsiusMonthlyAveragesMedianTableData: [],
                celsiusMonthlyAveragesMinTableData: [],
                celsiusMonthlyAveragesMaxTableData: [],

                fahrenheitMonthlyAveragesMedianTableData: [],
                fahrenheitMonthlyAveragesMinTableData: [],
                fahrenheitMonthlyAveragesMaxTableData: [],

                celsiusMonthlyAveragesGraphData: [],
                fahrenheitMonthlyAveragesGraphData: [],

                celsiusDailyAveragesGraphData: [],
                fahrenheitDailyAveragesGraphData: []
            }
        }

    }
}