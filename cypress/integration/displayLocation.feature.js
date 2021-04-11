describe('Display the location', () => {
  beforeEach(() => {
    cy.server()
    cy.route(
      'GET',
      'https://api.openweathermap.org/data/2.5/**',
      'fx:open_weather.json'
    )
    cy.route(
      'GET',
      'https://api.opencagedata.com/geocode/v1/json/**',
      'fx:open_cage.json'
    )
  })

  it('on initial render', () => {
    cy.visit('/', ({
      onBeforeLoad(window) {
        const stubLocation = {
          coords: {
            latitude: 55.7842,
            longitude: 12.4518
          }
        };
        cy.stub(window.navigator.geolocation, "getCurrentPosition").callsFake(
          callback => {
            return callback(stubLocation)
          }
        )
      }
    }))

    cy.get('[data-cy="weather-display"]').within(() => {
      cy.get('[data-cy="data"]').should('contain', 'Virum')
      cy.get('[data-cy="data"]').should('contain', "22℃")
      cy.get('[data-cy="weather"]').should('contain', "Snow")
    })

  })
})