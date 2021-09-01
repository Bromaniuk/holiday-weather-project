import React from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';


function MonthlyAveragesGraph({ toggleTemp, data, clickFunction }) {

    return (
        <div className='month-avg-graph'>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="4" />
                    <XAxis dataKey="name" />
                    <YAxis type="number" domain={['dataMin', 'auto']}/>
                    <Tooltip />
                    <Legend />
                    {toggleTemp
                        ? <Bar dataKey="celsius" fill="#8884d8" onClick={clickFunction} cursor={'pointer'}/>
                        : <Bar dataKey="fahrenheit" fill="#82ca9d" onClick={clickFunction} cursor={'pointer'}/>
                    }
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
};

export default MonthlyAveragesGraph;