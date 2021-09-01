import React from 'react';
import Table from 'react-bootstrap/Table'


function MonthlyAveragesTable({ toggleTemp, clickFunction,
    monthlyMedianAveragesCelsius, monthlyMinAveragesCelsius, monthlyMaxAveragesCelsius, 
    monthlyMedianAveragesFahrenheit, monthlyMinAveragesFahrenheit, monthlyMaxAveragesFahrenheit }) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


    return (
        <div className='month-avg-table'>
            <h6><strong>Monthly Averages</strong></h6>
            <Table bordered striped hover size='sm'>
                <thead>
                    <tr>
                        <th>Month</th>
                        <th>Median</th>
                        <th>Low</th>
                        <th>High</th>
                    </tr>
                </thead>
                <tbody>
                    {months.map((month, index) => {
                        return (
                            <tr key={index} onClick={() => clickFunction(index)}>
                                <th>{month.substring(0, 3)}</th>
                                {toggleTemp
                                    ? <td>{monthlyMedianAveragesCelsius[index]}°</td>
                                    : <td>{monthlyMedianAveragesFahrenheit[index]}°</td>
                                }
                                {toggleTemp
                                    ? <td>{monthlyMinAveragesCelsius[index]}°</td>
                                    : <td>{monthlyMinAveragesFahrenheit[index]}°</td>
                                }
                                {toggleTemp
                                    ? <td>{monthlyMaxAveragesCelsius[index]}°</td>
                                    : <td>{monthlyMaxAveragesFahrenheit[index]}°</td>
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