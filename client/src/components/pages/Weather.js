import React, { useState, useEffect } from 'react';
import WeatherDataService from '../../services/WeatherDataService';
import Switch from '@material-ui/core/Switch';
import '../../App.css';
import MonthlyAveragesTable from '../MonthlyAveragesTable';
import TemperatureAveragesGraph from '../TemperatureAveragesGraph';


const Weather = props => {
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [monthlyAverages, setMonthlyAverages] = useState([]);
    const [monthlyAveragesCelsius, setMonthlyAveragesCelsius] = useState([]);
    const [monthlyAveragesFahrenheit, setMonthlyAveragesFahrenheit] = useState([]);
    const [monthlyAveragesGraphData, setMonthlyAveragesGraphData] = useState([]);
    const [dailyAveragesGraphData, setDailyAveragesGraphData] = useState([]);
    const [selectMonthIndex, setSelectMonthIndex] = useState(0);

    // True is Celsius ; False is Fahrenheit
    const [toggleTemp, setToggleTemp] = useState(true);

    // True is Monthly ; False is Daily
    const [toggleMonthlyOrDaily, setToggleMonthlyOrDaily] = useState(true);


    // const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const toggleTemperature = () => {
        setToggleTemp(!toggleTemp);
    };

    const toggleMonthlyOrDailyData = (data, index) => {
        setToggleMonthlyOrDaily(!toggleMonthlyOrDaily);
        setSelectMonthIndex(index);
    };

    useEffect(() => {
        // Get city and country from URL route props
        setCity(props.match.params.city);
        setCountry(props.match.params.country);
        WeatherDataService.getCityData(props.match.params.country, props.match.params.city)
            .then(response => {
                setMonthlyAverages(response.data.monthlyAverages);
                setMonthlyAveragesGraphData(response.data.monthlyAveragesGraphData);
                setDailyAveragesGraphData(response.data.dailyAveragesGraphData);
            })

    }, [props.match.params.city, props.match.params.country])

    useEffect(() => {
        setMonthlyAveragesCelsius(monthlyAverages.map(month => +((month - 273.15).toFixed(2))))
        setMonthlyAveragesFahrenheit(monthlyAverages.map(month => +((((month - 273.15) * (9 / 5) + 32).toFixed(2)))))
    }, [monthlyAverages])

    return (
        <div className='weather-wrapper'>
            <h4 className='location-header'>{city}, {country}</h4>
            <span>F</span>
            <Switch
                checked={toggleTemp}
                onChange={toggleTemperature}
            />
            <span>C</span>
            <div className='month-avg-wrapper'>
                <MonthlyAveragesTable
                    toggleTemp={toggleTemp}
                    monthlyAveragesCelsius={monthlyAveragesCelsius}
                    monthlyAveragesFahrenheit={monthlyAveragesFahrenheit}
                />
                {toggleMonthlyOrDaily
                    ? <TemperatureAveragesGraph
                        toggleTemp={toggleTemp}
                        data={monthlyAveragesGraphData}
                        clickFunction={toggleMonthlyOrDailyData}/>
                    : <TemperatureAveragesGraph
                        toggleTemp={toggleTemp}
                        data={dailyAveragesGraphData[selectMonthIndex]}
                        clickFunction={toggleMonthlyOrDailyData} />

                }

            </div>
        </div>
    )
};

export default Weather;