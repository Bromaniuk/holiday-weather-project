import React from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';


function MonthlyAveragesGraph({ toggleTemp, celsiusData, fahrenheitData }) {

    return (
        <div className='month-avg-graph' >
            {toggleTemp
                ? <ResponsiveContainer width="100%" height="100%" >
                    <LineChart data={celsiusData}>
                        <CartesianGrid strokeDasharray="4" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line dataKey="median" fill="#8884d8" stroke='#8884d8' />
                        <Line dataKey="low" fill="#82ca9d" stroke='#82ca9d' />
                        <Line dataKey="high" fill="#ff0000" stroke='#ff0000' />
                    </LineChart>
                </ResponsiveContainer>
                : <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={fahrenheitData}>
                        <CartesianGrid strokeDasharray="4" />
                        <XAxis dataKey="name" />
                        <YAxis type="number" domain={['auto', 'auto']} />
                        <Tooltip />
                        <Legend />
                        <Line dataKey="median" fill="#8884d8" stroke='#8884d8' />
                        <Line dataKey="low" fill="#82ca9d" stroke='#82ca9d' />
                        <Line dataKey="high" fill="#ff0000" stroke='#ff0000' />
                    </LineChart>
                </ResponsiveContainer>
            }
        </div>
    )
};

export default MonthlyAveragesGraph;