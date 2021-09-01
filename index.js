import mongodb from "mongodb";
import dotenv from 'dotenv';
import express from 'express';
import WeatherDAO from './dao/weatherDAO.js';
import path from 'path';
import cors from 'cors';
import weather from "./api/weather.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/v1/weather', weather);


app.use('*', (req, res ) => res.status(404).json({ error: "not found" }));

const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;

MongoClient.connect(
  process.env.WEATHER_DB_URI,
  {
    maxPoolSize: 50,
    wtimeoutMS: 2500
  }
)
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async client => {
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, 'build')))

      app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
      })
    }
    await WeatherDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    })
  });