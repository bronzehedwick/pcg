/**
 * Class which is the base object for all stage items.
 * Pass in x and y values to position it on the canvas.
 * If no value is passed, they default to 0.
 * @example
 *    <game-object x="200" y="800"></game-object>
 */
export class GameObject extends HTMLElement {

  /**
   * Craete the game object.
   */
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

    this.callbacks = [];
    this.addEventListener('pointerup', this.delegateInteraction, false);
    this.registerInteractCallback(this.displayVerbText);
  }

  /**
   * Call all registered interaction callbacks.
   *
   * @param {Event} event - The pointerup event.
   * @returns {void}
   */
  delegateInteraction(event) {
    this.callbacks.forEach(callback => {
      callback.call(this, event);
    });
  }

  /**
   * Add a callback function to be called when the game object is interacted with.
   *
   * @param {Function} fn - callback function.
   * @returns {void}
   */
  registerInteractCallback(fn) {
    this.callbacks.push(fn);
  }

  /**
   * Sends the given text for the triggered verb to the text-display component.
   *
   * @param {Event} event - The pointerup event.
   * @returns {void}
   */
  displayVerbText(event) {
    const verb = document.body.dataset.verbActive;
    if (!verb) return;
    const textElement = event.target.closest(this.localName)
      .querySelector(`[data-verb-trigger="${verb}"`);
    if (!textElement) return;
    const textContent = textElement.textContent;
    if (!textContent) return;
    document.querySelector('text-display').setAttribute('text', textContent);
  }

}
customElements.define('game-object', GameObject);
