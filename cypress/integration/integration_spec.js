describe('Weather App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('successfully loads', () => {
    cy.get('.inputs').should('be.visible');
  });

  it('gets weather for New York and shows data', () => {
    cy.get('.city-input').type('new york{enter}');
    cy.get('.loader').should('be.visible');
    cy.get('.main').should('be.visible');
    cy.get('.city').should('contain', 'New York, US');
    cy.get('.loader').should('not.be.visible');
    cy.get('.weather-box .time').should('not.be.empty');
    cy.get('.weather-box .temp').should('not.be.empty');
    cy.get('.weather-box .desc').should('not.be.empty');
    cy.get('.weather-box .img').should('have.attr', 'src');
    cy.get('.weather-box .humidity').should('not.be.empty');
    cy.get('.weather-box .pressure').should('not.be.empty');
    cy.get('.weather-box .sunrise').should('not.be.empty');
    cy.get('.weather-box .sunset').should('not.be.empty');
  });

  it('shows 5-day forecast data', () => {
    cy.get('.city-input').type('new york{enter}');
    cy.get('.city').should('contain', 'New York, US');
    cy.get('.forecast-box').should('not.be.empty');
    cy.get('.forecast').should('have.length', 40);
    cy.get('.forecast .date').should('not.be.empty');
    cy.get('.forecast .time').should('not.be.empty');
    cy.get('.forecast .img').should('have.attr', 'src');
    cy.get('.forecast .temp').should('not.be.empty');
    cy.get('.forecast .tempImp').should('not.be.empty');
    cy.get('.forecast .desc').should('not.be.empty');
  });

  it('shows weather for current location', () => {
    cy.get('.curr-location').click();
    cy.get('.loader').should('be.visible');
    cy.get('.main').should('be.visible');
    cy.get('.city').should('not.be.empty');
    cy.get('.loader').should('not.be.visible');
    cy.get('.weather-box .time').should('not.be.empty');
    cy.get('.weather-box .temp').should('not.be.empty');
    cy.get('.weather-box .desc').should('not.be.empty');
    cy.get('.weather-box .humidity').should('not.be.empty');
    cy.get('.weather-box .pressure').should('not.be.empty');
    cy.get('.weather-box .sunrise').should('not.be.empty');
    cy.get('.weather-box .sunset').should('not.be.empty');
    cy.get('.forecast-box').should('not.be.empty');
  });

  it('shows error when city not found', () => {
    cy.get('.city-input').type('oijojnjjj{enter}');
    cy.get('.errors').should('be.visible');
    cy.get('.errors').should('contain', 'Sorry, city not found');
    cy.get('.loader').should('not.be.visible');
    cy.get('.main').should('not.be.visible');
  });

  it('shows error when it can not get location', () => {
    cy.window().then((win) => {
      win.fetch = () => Promise.resolve({ ok: false });
    });
    cy.get('.curr-location').click();
    cy.get('.errors').should('be.visible');
    cy.get('.errors').should('contain', 'Error getting current location...');
    cy.get('.loader').should('not.be.visible');
    cy.get('.main').should('not.be.visible');
  });

  it('swithes between °C and °F', () => {
    cy.get('.city-input').type('new york{enter}');
    cy.get('.celsius').should('be.visible');
    cy.get('.fahrenheit').should('be.visible');
    cy.get('.temp').should('be.visible').and('contain', '°C');
    cy.get('.tempImp').should('not.be.visible');
    cy.get('.fahrenheit').click();
    cy.get('.tempImp').should('be.visible').and('contain', '°F');
    cy.get('.celsius').click();
    cy.get('.temp').should('be.visible').and('contain', '°C');
  });
});
