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

  // Add state of current active verb to the stage data attribute.
  document
    .getElementById('utility-bar')
    .addEventListener('pointerup', event => {
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
    }, false);

  /**
   * `<game-object>` is the base object for all stage items.
   * Pass in `x` and `y` values to position it on the canvas.
   * If no value is passed, they default to `0`.
   * Example:
   *    <div class="stage">
   *            <game-object x="200" y="800"></game-object>
   * @customElement
   */
  class GameObject extends HTMLElement {
    constructor() {
      super();

      const shadow = this.attachShadow({mode: 'open'});

      const linkElement = document.createElement('link');
      linkElement.setAttribute('rel', 'stylesheet');
      linkElement.setAttribute('href', 'components/game-object.css');

      const wrapperElement = document.createElement('div');
      wrapperElement.setAttribute('class', 'wrapper');

      const styleElement = document.createElement('style');
      const y = this.getAttribute('y') ? this.getAttribute('y') : 0;
      const x = this.getAttribute('x') ? this.getAttribute('x') : 0;
      styleElement.textContent = `.wrapper {
        top: ${y}px;
        left: ${x}px;
        background-color: ${this.getAttribute('color')};
      }`;

      shadow.appendChild(linkElement);
      shadow.appendChild(styleElement);
      shadow.appendChild(wrapperElement);
    }
  }
  customElements.define('game-object', GameObject);

  renderRoom(document.querySelector('[data-initial]').id);
  // renderRoom('room-2');

})();
