/// <reference types="cypress" />

export default class Stubs {
    static stubGeolocation = (win, coords) => {
        cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((callback) => {
            return callback({ coords });
        });
    }

    static stubGeolocationDenial = (win) => {
        cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((_, callbackError) => {
            return callbackError();
        })
    }

    static stubWeather = (weatherResponse) => {
        cy.server({ urlMatchingOptions: {matchBase: false}});
        cy.route({
            method: 'get',
            url: '/api/weather**',
            response: weatherResponse
        }).as('weather');
    };

    static stubForecast = (forecastResponse) => {
        cy.server({ urlMatchingOptions: {matchBase: false}});
        cy.route({
            method: 'get',
            url: '/api/forecast**',
            response: forecastResponse
        }).as('forecast');
    };
}
