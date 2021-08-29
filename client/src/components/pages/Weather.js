import React, { useState, useEffect } from 'react';
import WeatherDataService from '../../services/WeatherDataService';
import '../../App.css';



const Weather = props => {
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [monthlyAverages, setMonthlyAverages] = useState([]);
    const [monthlyAveragesCelsius, setMonthlyAveragesCelsius] = useState([]);
    const [monthlyAveragesFahrenheit, setMonthlyAveragesFahrenheit] = useState([]);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


    useEffect(() => {
        setCity(props.match.params.city);
        setCountry(props.match.params.country);
        WeatherDataService.getCityData(props.match.params.country, props.match.params.city)
            .then(response => {
                setMonthlyAverages(response.data);
            })
        setMonthlyAveragesCelsius(monthlyAverages.map(month => (month - 273.15).toFixed(2)))
        setMonthlyAveragesFahrenheit(monthlyAverages.map(month => (((month - 273.15) * (9/5) + 32).toFixed(2))))    
    }, [props.match.params.city, props.match.params.country, monthlyAverages])


    return (
        <div className='weather-wrapper'>
            <span>Weather Page</span>
            <h2>Monthly Averages: {city}, {country}</h2>
            <table>
                {monthlyAveragesCelsius.map((month, index) => {
                    return (
                        <tr>
                            <th>{months[index]}</th>
                            <td key={index}>{month}°</td>
                        </tr>
                    )
                }, [props.match.params.city, props.match.params.country])}
            </table>
        </div>
    )
};

export default Weather;