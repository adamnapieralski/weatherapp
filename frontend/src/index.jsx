import React from 'react';
import ReactDOM from 'react-dom';

const baseURL = process.env.ENDPOINT;

const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/weather`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

const getForecastFromApi = async (maxResults) => {
  try {
    const response = await fetch(maxResults ? `${baseURL}/forecast?maxResults=${maxResults}` : `${baseURL}/forecast`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
}

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: "",
      forecastData: []
    };
  }

  async componentDidMount() {
    const weather = await getWeatherFromApi();
    this.setState({icon: weather.icon.slice(0, -1)});

    const forecast = await getForecastFromApi(8);
    this.setState({ forecastData: forecast });
  }

  renderForecastCol(forecastData) {
    return forecastData.map((data, id) => {
      return (
        <td key={id}>
          <table>
            <tbody>
              <tr>
                <td>{data.dt_txt}</td>
              </tr>
              <tr>
                <td>
                  <img src={`/img/${data.weather[0].icon.slice(0, -1)}.svg`} />
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      )
    });
  }

  render() {
    const { icon, forecastData } = this.state;

    return (
      <div className="icon">
        { icon && <img src={`/img/${icon}.svg`} /> }
        <div>
          <table>
            <tbody>
              <tr>
                { this.renderForecastCol(forecastData) }
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
  document.getElementById('app')
);
