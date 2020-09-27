/* eslint-disable no-unused-vars */
const debug = require('debug',)('weathermap',);
// TODO add env variable for debug switching

const Koa = require('koa',);
const router = require('koa-router',)();
const fetch = require('node-fetch',);
const cors = require('kcors',);

const appId = process.env.APPID || '38aef137bf77952448eb7348401e5306';
const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';
const defaultCity = process.env.DEFAULT_CITY || 'Helsinki';
const defaultCountry = process.env.DEFAULT_COUNTRY || 'FI';

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors(),);

const fetchWeather = async (params,) => {
  const searchParams = new URLSearchParams(params,);
  const endpoint = `${mapURI}/weather?${searchParams}&appid=${appId}&`;
  const response = await fetch(endpoint,);

  // debug('weather\nendpoint: %s\nresponse: %o', endpoint, response,);

  return response ? response.json() : {};
};

const fetchForecast = async (params,) => {
  const searchParams = new URLSearchParams(params,);
  const endpoint = `${mapURI}/forecast?${searchParams}&appid=${appId}&`;
  const response = await fetch(endpoint,);

  // debug('forecast\nendpoint: %s\nresponse: %o', endpoint, response,);

  return response ? response.json() : {};
};

router.get('/api/weather', async (ctx,) => {
  const weatherData = await fetchWeather(makeLocationParamsFromQuery(ctx.request.query,),);

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = Object.assign({ city: weatherData.name, country: weatherData.sys.country, }, weatherData.weather[0],);
},);

router.get('/api/forecast', async (ctx,) => {
  const forecastData = await fetchForecast(makeLocationParamsFromQuery(ctx.request.query,),);

  ctx.type = 'application/json; charset=utf-8';
  let body = forecastData.list
    .map((el,) => ({
      weather: el.weather,
      dt_txt: el.dt_txt,
    }),);
  if (ctx.request.query.maxResults) {
    body = body.filter((_, id,) => id < ctx.request.query.maxResults,);
  }

  ctx.body = body;
},);

const makeLocationParamsFromQuery = (query,) => {
  let params;
  if (query.city) {
    params = { q: query.cityCountry, };
  } else if (query.latitude && query.longitude) {
    params = { lat: query.latitude, lon: query.longitude, };
  } else {
    params = { q: `${defaultCity},${defaultCountry}`, };
  }
  return params;
};

app.use(router.routes(),);
app.use(router.allowedMethods(),);

app.listen(port,);

console.log(`App listening on port ${port}`,);
