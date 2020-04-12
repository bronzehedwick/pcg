(function main() {
  'use strict';

  /**
   * Render the given room
   * @param {string} id - The identifier for the room to render.
   * @return {void}
   */
  function renderRoom(id) {
    const template = document.getElementById(id).content.cloneNode(true);
    const stage = document.getElementById('stage');
    stage.innerHTML = '';
    stage.appendChild(template);
  }

  renderRoom(document.querySelector('[data-initial]').id);
  // renderRoom('room-2');

})();
