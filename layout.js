(function layout() {
  'use strict';

  document
    .querySelectorAll('.stage .game-object')
    .forEach(element => {
      element.style.top = element.dataset.positionY + 'px';
      element.style.left = element.dataset.positionX + 'px';
    });

})();
