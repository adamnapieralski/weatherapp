/// <reference types="cypress" />

import Stubs from "../support/stubs";

let location = {};
let weatherData = {};

describe('Weather display validation test.', () => {
    it('Visit weatherapp homepage having stubbed geolocation and weather.', () => {
        cy.fixture('geolocation.json').then((geo) => {
            location = geo[0];
        });

        cy.fixture('weather.json').then((weathers) => {
            weatherData = weathers[0];
            Stubs.stubWeather(weatherData);
        });
        
        cy.visit('/', {
            onBeforeLoad(win) {
                Stubs.stubGeolocation(win, location.coords);
            }
        })
        .wait('@weather');
    });

    it('Displayed weather icon matches the one based on fixtured weather data.', () => {
        cy.get('.icon').find('img').should('have.attr', 'src').should('include', `${weatherData.icon.slice(0, -1)}.svg`);
    });
});
