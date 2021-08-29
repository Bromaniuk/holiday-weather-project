import app from './server.js';
import mongodb from "mongodb";
import dotenv from 'dotenv';
import WeatherDAO from './dao/weatherDAO.js';

dotenv.config();

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
  await WeatherDAO.injectDB(client);
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  })
});