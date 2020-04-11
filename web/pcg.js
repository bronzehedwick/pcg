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

  /**
   * Event handler for game object pointerup events.
   * @param {Event} event - The pointerup event.
   * @return {void}
   */
  function gameObjectClickCallback(event) {
    const verb = document.body.dataset.verbActive;
    if (!verb) return;
    const textElement = event.target.closest('game-object')
      .querySelector(`[data-verb-trigger="${verb}"`);
    let textContent = `That couldn't possibly work.`;
    if (textElement) {
      textContent = textElement.textContent;
    }
    document.querySelector('text-display').setAttribute('text', textContent);
  }

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

      shadow.innerHTML = `<style>
      :host {
        position: absolute;
        width: 100px;
        height: 100px;
        top: ${this.getAttribute('y') ? this.getAttribute('y') : 0}px;
        left: ${this.getAttribute('x') ? this.getAttribute('x') : 0}px;
      }
      slot[name="text"] {
        display: none;
      }
      </style>`;

      const template = this.getAttribute('template') ?
        document.getElementById(this.getAttribute('template')).content : false;

      if (template) {
        shadow.appendChild(template.cloneNode(true));
      }

      this.addEventListener('pointerup', gameObjectClickCallback, false);
    }
  }
  customElements.define('game-object', GameObject);

  renderRoom(document.querySelector('[data-initial]').id);
  // renderRoom('room-2');

})();
