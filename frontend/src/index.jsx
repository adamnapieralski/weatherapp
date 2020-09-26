import React from 'react';
import ReactDOM from 'react-dom';
import Moment from 'react-moment';

const baseURL = process.env.ENDPOINT;

const forecastMaxResultsDay = 8;

const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/weather`);
    return response.json();
  } catch (error) {
    // FIXME
    console.error(error);
  }

  return {};
};

const getForecastFromApi = async (maxResults) => {
  try {
    const response = await fetch(maxResults ? `${baseURL}/forecast?maxResults=${maxResults}` : `${baseURL}/forecast`);
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
        }, this.setWeatherDataAsync);
      });
    } else {
      // TODO handle geolocation not supported
    }
  }

  async setWeatherDataAsync() {
    const weather = await getWeatherFromApi();
    const forecast = await getForecastFromApi(forecastMaxResultsDay);

    this.setState({ icon: weather.icon.slice(0, -1), forecastData: forecast });
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
    const { icon } = this.state;

    return (
      <div className="icon">
        { icon && <img src={`/img/${icon}.svg`} alt="Current weather icon" /> }
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
