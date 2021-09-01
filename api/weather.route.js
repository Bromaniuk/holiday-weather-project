import express from 'express';
import WeathersCtrl from './weather.controller.js';

const router = express.Router();

router.route('/').get(WeathersCtrl.apiGetWeather);

export default router;