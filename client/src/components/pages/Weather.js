import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WeatherDataService from '../../services/WeatherDataService';
import Switch from '@material-ui/core/Switch';
import '../../App.css';
import './Weather.css'
import MonthlyAveragesTable from '../MonthlyAveragesTable';
import TemperatureAveragesGraph from '../TemperatureAveragesGraph';


const Weather = props => {
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");

    // Used in onClick function for table rows, sets month index for daily graph data 
    const [selectMonthIndex, setSelectMonthIndex] = useState(0);

    // True is Celsius ; False is Fahrenheit
    const [toggleTemp, setToggleTemp] = useState(true);

    // True is Monthly ; False is Daily
    const [toggleMonthlyOrDaily, setToggleMonthlyOrDaily] = useState(true);

    const [celsiusMonthlyAveragesMedianTableData, setCelsiusMonthlyAveragesMedianTableData] = useState([]);
    const [celsiusMonthlyAveragesMinTableData, setCelsiusMonthlyAveragesMinTableData] = useState([]);
    const [celsiusMonthlyAveragesMaxTableData, setCelsiusMonthlyAveragesMaxTableData] = useState([]);

    const [fahrenheitMonthlyAveragesMedianTableData, setFahrenheitMonthlyAveragesMedianTableData] = useState([]);
    const [fahrenheitMonthlyAveragesMinTableData, setFahrenheitMonthlyAveragesMinTableData] = useState([]);
    const [fahrenheitMonthlyAveragesMaxTableData, setFahrenheitMonthlyAveragesMaxTableData] = useState([]);

    const [celsiusMonthlyAveragesGraphData, setCelsiusMonthlyAveragesGraphData] = useState([]);
    const [fahrenheitMonthlyAveragesGraphData, setFahrenheitMonthlyAveragesGraphData] = useState([]);

    const [celsiusDailyAveragesGraphData, setCelsiusDailyAveragesGraphData] = useState([]);
    const [fahrenheitDailyAveragesGraphData, setFahrenheitDailyAveragesGraphData] = useState([]);




    const toggleTemperature = () => {
        setToggleTemp(!toggleTemp);
    };

    const toggleMonthlyOrDailyData = (index) => {
        setToggleMonthlyOrDaily(!toggleMonthlyOrDaily);
        setSelectMonthIndex(index);
    };

    useEffect(() => {
        // Get city and country from URL route props
        setCity(props.match.params.city);
        setCountry(props.match.params.country);
        WeatherDataService.getCityData(props.match.params.country, props.match.params.city)
            .then(response => {
                setCelsiusMonthlyAveragesMedianTableData(response.data.celsiusMonthlyAveragesMedianTableData);
                setCelsiusMonthlyAveragesMinTableData(response.data.celsiusMonthlyAveragesMinTableData);
                setCelsiusMonthlyAveragesMaxTableData(response.data.celsiusMonthlyAveragesMaxTableData);

                setFahrenheitMonthlyAveragesMedianTableData(response.data.fahrenheitMonthlyAveragesMedianTableData);
                setFahrenheitMonthlyAveragesMinTableData(response.data.fahrenheitMonthlyAveragesMinTableData);
                setFahrenheitMonthlyAveragesMaxTableData(response.data.fahrenheitMonthlyAveragesMaxTableData);

                setCelsiusMonthlyAveragesGraphData(response.data.celsiusMonthlyAveragesGraphData);
                setFahrenheitMonthlyAveragesGraphData(response.data.fahrenheitMonthlyAveragesGraphData);

                setCelsiusDailyAveragesGraphData(response.data.celsiusDailyAveragesGraphData);
                setFahrenheitDailyAveragesGraphData(response.data.fahrenheitDailyAveragesGraphData);
            })
    }, [props.match.params.city, props.match.params.country])

    return (
        <div className='weather-wrapper'>
            <h3 className='location-header'>{city}, {country}</h3>
            <div className='month-avg-wrapper'>
                <div className='table-section'>
                    <div>
                        <span>°F</span>
                        <Switch
                            checked={toggleTemp}
                            onChange={toggleTemperature}
                        />
                        <span>°C</span>
                    </div>
                    <MonthlyAveragesTable
                        toggleTemp={toggleTemp}
                        clickFunction={toggleMonthlyOrDailyData}
                        monthlyMedianAveragesCelsius={celsiusMonthlyAveragesMedianTableData}
                        monthlyMinAveragesCelsius={celsiusMonthlyAveragesMinTableData}
                        monthlyMaxAveragesCelsius={celsiusMonthlyAveragesMaxTableData}

                        monthlyMedianAveragesFahrenheit={fahrenheitMonthlyAveragesMedianTableData}
                        monthlyMinAveragesFahrenheit={fahrenheitMonthlyAveragesMinTableData}
                        monthlyMaxAveragesFahrenheit={fahrenheitMonthlyAveragesMaxTableData}

                    />
                </div>

                {toggleMonthlyOrDaily
                    ? <TemperatureAveragesGraph
                        toggleTemp={toggleTemp}
                        celsiusData={celsiusMonthlyAveragesGraphData}
                        fahrenheitData={fahrenheitMonthlyAveragesGraphData}
                    />
                    : <TemperatureAveragesGraph
                        toggleTemp={toggleTemp}
                        celsiusData={celsiusDailyAveragesGraphData[selectMonthIndex]}
                        fahrenheitData={fahrenheitDailyAveragesGraphData[selectMonthIndex]}
                    />
                }
            </div>
            <p>Source: <Link to={{ pathname: "https://openweathermap.org/api/statistics-api" }} target="_blank" >OpenWeatherMap - Statistical Weather Data API</Link></p>
        </div>
    )
};

export default Weather;