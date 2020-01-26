(function main() {
  'use strict';

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

  renderRoom(document.querySelector('[data-initial]').id);
  // renderRoom('room-2');

})();
