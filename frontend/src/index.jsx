import React from 'react';
import ReactDOM from 'react-dom';
import Moment from 'react-moment';

const baseURL = process.env.ENDPOINT;

const forecastMaxResultsDay = 8;

const getWeatherFromApiByCityCountry = async (cityCountry) => {
  try {
    const params = new URLSearchParams(cityCountry);
    const response = await fetch(`${baseURL}/weather?${params}`);
    return response.json();
  } catch (error) {
    // FIXME
    console.error(error);
  }

  return {};
};

const getWeatherFromApiByCoords = async (coords) => {
  try {
    const params = new URLSearchParams(coords);
    const response = await fetch(`${baseURL}/weather?${params}`);
    return response.json();
  } catch (error) {
    // FIXME
    console.error(error);
  }

  return {};
}

const getForecastFromApiByCityCountry = async (cityCountry, maxResults) => {
  try {
    const params = new URLSearchParams(
      Object.assign(maxResults ? { maxResults } : {}, { cityCountry }),
    );
    const response = await fetch(`${baseURL}/forecast?${params}`);
    return response.json();
  } catch (error) {
    // FIXME
    console.error(error);
  }

  return {};
};

const getForecastFromApiByCoords = async (coords, maxResults) => {
  try {
    const params = new URLSearchParams(Object.assign(maxResults ? { maxResults } : {}, coords));
    const response = await fetch(`${baseURL}/forecast?${params}`);
    return response.json();
  } catch (error) {
    // FIXME
    console.error(error);
  }

  return {};
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: '',
      city: '',
      country: '',
      forecastData: [],
      locationCoords: {},
    };
  }

  async componentDidMount() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          locationCoords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        }, this.setWeatherDataAsyncByCoords);
      },
      () => {
        // to get data for defaultCity from env
        this.setWeatherDataAsyncByCoords();
      });
    } else {
      // TODO handle geolocation not supported
    }
  }

  async setWeatherDataAsyncByCoords() {
    const { locationCoords } = this.state;
    const weather = await getWeatherFromApiByCoords(locationCoords);
    const forecast = await getForecastFromApiByCoords(locationCoords, forecastMaxResultsDay);

    this.setState({
      icon: weather.icon.slice(0, -1),
      city: weather.city,
      country: weather.country,
      forecastData: forecast,
    });
  }

  renderForecastCol() {
    const { forecastData } = this.state;
    return forecastData.map((data) => (
      <td key={data.dt_txt}>
        <table>
          <tbody>
            <tr>
              <td>
                <Moment format="DD/MM">{data.dt_txt}</Moment>
              </td>
            </tr>
            <tr>
              <td>
                <Moment format="HH:mm">{data.dt_txt}</Moment>
              </td>
            </tr>
            <tr>
              <td>
                <img src={`/img/${data.weather[0].icon.slice(0, -1)}.svg`} alt={`Forecast icon at ${data.dt_txt}`} />
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    ));
  }

  render() {
    const { icon, city, country } = this.state;

    return (
      <div className="icon">
        { icon && <img src={`/img/${icon}.svg`} alt="Current weather icon" /> }
        <div>
          {city}
          {country}
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                { this.renderForecastCol() }
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('app'),
);
