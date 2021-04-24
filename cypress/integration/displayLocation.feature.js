
describe('Weather info for user\'s location', () => {
  beforeEach(() => {
    cy.intercept('https://api.openweathermap.org/data/2.5/**', { fixture: 'open_weather.json' })
    cy.intercept('https://api.opencagedata.com/geocode/v1/json/**', { fixture: 'open_cage.json' })

  })

  it('is expected to be displayed on initial render', () => {
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
      cy.get('[data-cy=data]').should('contain', 'Virum')
      cy.get('[data-cy=data]').should('contain', "22℃")
      cy.get('[data-cy=weather]').should('contain', "Snow")
    })

  })
})