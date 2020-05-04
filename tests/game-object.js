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

    assert.equal((stageRect.x - gameObject1Rect.x) * -1, gameObject1.getAttribute('x'));
    assert.equal((stageRect.y - gameObject1Rect.y) * -1, gameObject1.getAttribute('y'));

    assert.equal((stageRect.x - gameObject2Rect.x) * -1, gameObject2.getAttribute('x'));
    assert.equal((stageRect.y - gameObject2Rect.y) * -1, gameObject2.getAttribute('y'));

    assert.equal((stageRect.x - gameObject3Rect.x) * -1, gameObject3.getAttribute('x'));
    assert.equal((stageRect.y - gameObject3Rect.y) * -1, gameObject3.getAttribute('y'));
  });

});
