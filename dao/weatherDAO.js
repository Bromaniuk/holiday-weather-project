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
        } catch(e) {
            console.error(`Unable to issue find command, ${e}`)
            return { monthlyAverages: [] }
        }

        const displayCursor = cursor

        try {
            const monthlyAverages = []
            const monthlyAveragesGraphData = []
            const dailyAveragesGraphData = []
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            for (let month = 1 ; month < 13 ; month++) {
                // monthlyAverages is an array of median Kelvin temperatures for each month for selected city
                // Celsius and Fahrenheit calculations are done in Weather.js page
                monthlyAverages.push(await displayCursor["temp"]["month"][`${month}`]["month_average"])

                // monthlyAveragesGraphData is an array of json objects that contain the month's name and cel/fah temperatures for the month average
                // Structured to fit the Rechart's BarGraph data object requirements
                monthlyAveragesGraphData.push({"name": months[month-1], "celsius": +((await displayCursor["temp"]["month"][`${month}`]["month_average"] - 273.15).toFixed(2)), "fahrenheit": +(((await displayCursor["temp"]["month"][`${month}`]["month_average"] - 273.15) * (9 / 5) + 32).toFixed(2))})
                
                // dailyAveragesGraphData creates data objects for Rechart's Bargraph with the individual day's median temps in cel/fah
                // the below for loop is the length of the month document minus one because within the month document there is a JSON object for
                // each individual day plus one value for the month average, which is obtained above.
                let currentMonth = []
                for (let day = 1 ; day < Object.keys(await displayCursor["temp"]["month"][`${month}`]).length - 1 ; day++) {

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
                    currentMonth.push({"name": currentDay, "celsius" : +((await displayCursor["temp"]["month"][`${month}`][`${day}`]["median"] - 273.15).toFixed(2)), "fahrenheit": +(((await displayCursor["temp"]["month"][`${month}`][`${day}`]["median"] - 273.15) * (9 / 5) + 32).toFixed(2))})
                }
                dailyAveragesGraphData.push(currentMonth)
            }
            return { monthlyAverages, monthlyAveragesGraphData, dailyAveragesGraphData }
        } catch (e) {
            console.error(
                `Issue in WeatherDAO`
            )
            return { monthlyAverages: [], monthlyAveragesGraphData: [], dailyAveragesGraphData: [] }
        }

    }
}