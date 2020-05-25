/// <reference types="cypress" />

context('Game Object', () => {
  beforeEach(() => {
    cy.visit('/game-object.html');
  });

  it('Positions on the x/y axis', () => {

    cy.get('#go1').then(elements => {
      const el = elements[0];
      const x = Math.ceil(parseFloat(el.attributes.x.value));
      const y = Math.ceil(parseFloat(el.attributes.y.value));
      expect(el.offsetLeft).to.equal(x);
      expect(el.offsetTop).to.equal(y);
    });

    cy.get('#go2').then(elements => {
      const el = elements[0];
      const x = Math.ceil(parseFloat(el.attributes.x.value));
      const y = Math.ceil(parseFloat(el.attributes.y.value));
      expect(el.offsetLeft).to.equal(x);
      expect(el.offsetTop).to.equal(y);
    });

    cy.get('#go3').then(elements => {
      const el = elements[0];
      const x = Math.ceil(parseFloat(el.attributes.x.value));
      const y = Math.ceil(parseFloat(el.attributes.y.value));
      expect(el.offsetLeft).to.equal(x);
      expect(el.offsetTop).to.equal(y);
    });

  })
});
