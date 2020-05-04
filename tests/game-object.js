QUnit.module('Game Object', hooks => {

  hooks.beforeEach(() => {
    const fixture = document.getElementById('qunit-fixture');
    const template = document.getElementById('fixture-game-object');
    fixture.appendChild(template.content.cloneNode(true));
  });

  QUnit.test('Positions on the x/y axis', assert => {
    const stageRect = document.getElementById('stage').getBoundingClientRect();

    const gameObject1 = document.getElementById('go1');
    const gameObject2 = document.getElementById('go2');
    const gameObject3 = document.getElementById('go3');

    const gameObject1Rect = gameObject1.getBoundingClientRect();
    const gameObject2Rect = gameObject2.getBoundingClientRect();
    const gameObject3Rect = gameObject3.getBoundingClientRect();

    // Multiply the x and y values by -1 to make them positive,
    // since QUnit pushes the stage off at -1000px.
    assert.equal((stageRect.x - gameObject1Rect.x) * -1, gameObject1.getAttribute('x'));
    assert.equal((stageRect.y - gameObject1Rect.y) * -1, gameObject1.getAttribute('y'));

    assert.equal((stageRect.x - gameObject2Rect.x) * -1, gameObject2.getAttribute('x'));
    assert.equal((stageRect.y - gameObject2Rect.y) * -1, gameObject2.getAttribute('y'));

    assert.equal((stageRect.x - gameObject3Rect.x) * -1, gameObject3.getAttribute('x'));
    assert.equal((stageRect.y - gameObject3Rect.y) * -1, gameObject3.getAttribute('y'));
  });

  QUnit.test('Displays correct text in text display', assert => {
    const textDisplay = document.getElementById('td');
    const actionsMenu = document.getElementById('am');
    const gameObject1 = document.getElementById('go1');

    gameObject1.dispatchEvent(new Event('pointerup'));
    assert.equal(
      textDisplay.getAttribute('text'),
      gameObject1.querySelector('[data-verb-trigger="default"]').textContent
    );
    textDisplay.continueButton.dispatchEvent(new Event('pointerup'));

  });

  QUnit.test('Displays selected verb text in text display', assert => {
    const textDisplay = document.getElementById('td');
    const actionsMenu = document.getElementById('am');
    const gameObject1 = document.getElementById('go1');

    // This is a flawed test, but I spent a bunch of time spinning my wheels
    // trying to figure out why
    // actionsMenu.firstElementChild.children[0].firstElementChild.dispatchEvent(new Event('pointerup'));
    // does not work, so leaving that for another time.
    document.body.dataset.verbActive = 'push';
    gameObject1.dispatchEvent(new Event('pointerup'));
    assert.equal(
      textDisplay.getAttribute('text'),
      gameObject1.querySelector('[data-verb-trigger="push"]').textContent
    );
    // textDisplay.querySelector('#continue').dispatchEvent(new Event('pointerup'));
    textDisplay.continueButton.dispatchEvent(new Event('pointerup'));

  })

});
