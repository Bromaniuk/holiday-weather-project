import app from './server.js';
import mongodb from "mongodb";
import dotenv from 'dotenv';
import WeatherDAO from './dao/weatherDAO.js';
import path from 'path';

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
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static('client/build'))

      app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
      })
    }
    await WeatherDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    })
  });