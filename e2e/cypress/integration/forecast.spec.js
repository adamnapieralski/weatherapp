/// <reference types="cypress" />

import Stubs from "../support/stubs";

let location = {};
let forecastData = [];

describe('Forecast display validation test.', () => {
    Cypress.Server.defaults({
        urlMatchingOptions: { matchBase: false, dot: true }
    });

    it('Visit weatherapp homepage having stubbed geolocation and forecast.', () => {
        cy.fixture('geolocation.json').then((geo) => {
            location = geo[0];
        });

        cy.fixture('forecast.json').then((forecasts) => {
            forecastData = forecasts[0];
            Stubs.stubForecast(forecastData);
        });
        
        cy.visit('/', {
            onBeforeLoad(win) {
                Stubs.stubGeolocation(win, location.coords);
            }
        })
        .wait('@forecast');
    });

    it('Displayed forecast icons and datetimes match the ones based on fixtured forecast data.', () => {
        cy.get('.forecast').find('tr').children().each((el, id, _) => {
            if (forecastData[id]) {
                console.log(forecastData[id].weather[0].icon);
                cy.wrap(el).find('img').should('have.attr', 'src').should('include', `${forecastData[id].weather[0].icon.slice(0, -1)}.svg`);
                cy.wrap(el)
                    .should('include.text', Cypress.moment(forecastData[id].dt_txt).format('DD/MM'))
                    .should('include.text', Cypress.moment(forecastData[id].dt_txt).format('HH:mm'));
            }
        });
    });
});