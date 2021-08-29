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
            for (let i = 1 ; i < 13 ; i++) {
                monthlyAverages.push(await displayCursor["temp"]["month"][`${i}`]["month_average"])
            }
            return { monthlyAverages }
        } catch (e) {
            console.error(
                `Issue in WeatherDAO`
            )
        }

    }
}