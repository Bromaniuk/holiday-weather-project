import app from './server.js';
import mongodb from "mongodb";
import dotenv from 'dotenv';
import express from 'express';
import WeatherDAO from './dao/weatherDAO.js';
import path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);


dotenv.config();
const MongoClient = mongodb.MongoClient;
const port = 5000 || 8000;
MongoClient.connect(
  'mongodb+srv://admin:7RYZIGcAEgJvnClB@cluster0.3uxtl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
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
      app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
      })
    }
    await WeatherDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    })
  });