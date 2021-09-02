import express from 'express';
import cors from 'cors';
import weather from "./api/weather.route.js";

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/v1/weather', weather);


// app.use('*', (req, res ) => res.status(404).json({ error: "ain't found" }));

export default app;