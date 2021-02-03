describe('Display the location', () => {
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
      cy.get('[data-cy="location"]').should('contain', 'Copenhagen'),
      cy.get('[data-cy="temp"]').should('contain', "22℃")
    })
  })
})

// cy.get('[data-cy=""]')