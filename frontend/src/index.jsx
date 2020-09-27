import React from 'react';
import ReactDOM from 'react-dom';

import Weather from './components/Weather/index';
import Forecast from './components/Forecast/index';
import ErrorBoundary from './components/ErrorBoundary/index';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <ErrorBoundary>
          <Weather />
        </ErrorBoundary>
        <ErrorBoundary>
          <Forecast />
        </ErrorBoundary>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
