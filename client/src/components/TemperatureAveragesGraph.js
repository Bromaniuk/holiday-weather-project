import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';


function MonthlyAveragesGraph({ toggleTemp, celsiusData, fahrenheitData }) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (celsiusData.length > 0 && fahrenheitData.length > 0) {
            setLoading(true);
        }
    }, [celsiusData, fahrenheitData])

    return (
        <div className='month-avg-graph' >
            {loading
                ? [toggleTemp
                    ? <ResponsiveContainer width="100%" height="100%" key={0} >
                        <LineChart data={celsiusData}>
                            <CartesianGrid strokeDasharray="4" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line dataKey="median" fill="#82ca9d" stroke='#82ca9d' />
                            <Line dataKey="low" fill="#8884d8" stroke='#8884d8' />
                            <Line dataKey="high" fill="#ff0000" stroke='#ff0000' />
                        </LineChart>
                    </ResponsiveContainer>
                    : <ResponsiveContainer width="100%" height="100%" key={1} >
                        <LineChart data={fahrenheitData}>
                            <CartesianGrid strokeDasharray="4" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line dataKey="median" fill="#82ca9d" stroke='#82ca9d' />
                            <Line dataKey="low" fill="#8884d8" stroke='#8884d8' />
                            <Line dataKey="high" fill="#ff0000" stroke='#ff0000' />
                        </LineChart>
                    </ResponsiveContainer>
                ]
                : <span></span>
            }
        </div>
    )
};

export default MonthlyAveragesGraph;