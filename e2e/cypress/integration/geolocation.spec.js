/// <reference types="cypress" />

import Stubs from "../support/stubs";

let location = {};

describe('Browser provided geolocation test.', () => {
    it('Visit weatherapp homepage having stubbed geolocation.', () => {
        cy.fixture('geolocation.json').then((geo) => {
            location = geo[0];
        });

        cy.server();
        cy.route('GET', '**/sockjs-node/info**').as('sockjs-node');
    
        cy.visit('/', {
            onBeforeLoad(win) {
                Stubs.stubGeolocation(win, location.coords);
            }
        })
        .wait('@sockjs-node');
    });

    it('Displayed location matches the one based on fixtured coordinates.', () => {
        cy.get('.location')
            .should('include.text', location.city)
            .should('include.text', location.country);
    });
});

describe('Browser denied geolocation test.', () => {
    it('Visit weatherapp homepage having denied geolocation access.', () => {
        cy.server();
        cy.route('GET', '**/sockjs-node/info**').as('sockjs-node');

        cy.visit('/', {
            onBeforeLoad(win) {
                Stubs.stubGeolocationDenial(win);
            }
        })
        .wait('@sockjs-node');
    });
    it('Displayed location matches the one based on fixtured coordinates.', () => {
        cy.get('.location')
            .should('include.text', Cypress.env('defaultCity'))
            .should('include.text', Cypress.env('defaultCountry'));
    });
});