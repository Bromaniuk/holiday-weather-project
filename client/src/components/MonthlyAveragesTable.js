import React from 'react';
import Table from 'react-bootstrap/Table'


function MonthlyAveragesTable({ toggleTemp, monthlyAveragesCelsius, monthlyAveragesFahrenheit }) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


    return (
        <div className='month-avg-table'>
            {/* This is the same table but horizontal, leaving just in case
            <Table bordered striped hover size='sm'>
                <thead>
                    <tr>
                        <th>Temp</th>
                        {months.map(month => {
                            return (
                                <th>{month.substring(0, 3)}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>C°</td>
                        {monthlyAveragesCelsius.map(month => {
                            return (
                                <td>
                                    {month}°
                                </td>
                            )
                        }, [city, country])}
                    </tr>
                    <tr>
                        <td>F°</td>
                        {monthlyAveragesFahrenheit.map(month => {
                            return (
                                <td>
                                    {month}°
                                </td>
                            )
                        }, [city, country])}
                    </tr>
                </tbody>
            </Table> */}
            <Table bordered striped hover size='sm'>
                <thead>
                    <tr>
                        <th>Month</th>
                        {toggleTemp
                            ? <th>Celsius</th>
                            : <th>Fahrenheit</th>}
                    </tr>
                </thead>
                <tbody>
                    {months.map((month, index) => {
                        return (
                            <tr key={index}>
                                <th>{month.substring(0, 3)}</th>
                                {toggleTemp
                                    ? <td>{monthlyAveragesCelsius[index]}°</td>
                                    : <td>{monthlyAveragesFahrenheit[index]}°</td>
                                }
                            </tr>
                        )
                    }, [toggleTemp])}
                </tbody>
            </Table>
        </div>
    )
};

export default MonthlyAveragesTable;