(function main() {
  'use strict';

  /**
   * Position game objects on the stage
   * @return {void}
   */
  function layoutGameObjects() {
    document
      .querySelectorAll('.stage .game-object')
      .forEach(element => {
        element.style.top = element.dataset.positionY + 'px';
        element.style.left = element.dataset.positionX + 'px';
      });
  }

  function renderRoom(id) {
    const template = document.getElementById(id).content.cloneNode(true);
    const stage = document.getElementById('stage');
    stage.innerHTML = '';
    stage.appendChild(template);
    layoutGameObjects();
  };

  function utilityBarCallback(event) {
    const element = event.target.closest('button');
    const active = document.querySelector('.utility-bar .active');
    if (active) {
      active.classList.remove('active');
    }
    element.classList.add('active');
    document
      .getElementById('stage')
      .dataset
      .verbActive = element.id.split('verb-')[1];
  }

  document
    .getElementById('utility-bar')
    .addEventListener('pointerup', utilityBarCallback, false);

  renderRoom(document.querySelector('[data-initial]').id);
  // renderRoom('room-2');

})();
