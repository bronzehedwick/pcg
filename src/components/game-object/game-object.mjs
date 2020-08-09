// import { state } from '../../pcg.mjs';

// Add a single template to the DOM for all game objects to reference.
const gameObjectTemplate = document.createElement('template');
gameObjectTemplate.id = 'game-object-template';
gameObjectTemplate.innerHTML = `
  <slot name="graphic"></slot>
  <slot name="text"></slot>
`;
document.body.appendChild(gameObjectTemplate);

/**
 * Base class for all game objects.
 */
export class GameObject extends HTMLElement {

  /**
   * Create the game object.
   */
  constructor() {
    super();

    const shadow = this.attachShadow({mode: 'open'});

    shadow.innerHTML = `<style>
    :host {
      position: absolute;
      top: ${this.getAttribute('y') ? this.getAttribute('y') : 0}px;
      left: ${this.getAttribute('x') ? this.getAttribute('x') : 0}px;
    }
    slot[name="text"] {
      display: none;
    }
    </style>`;

    const template = document.getElementById('game-object-template');
    shadow.appendChild(template.content.cloneNode(true));

    this.triggeringActions = this.getAttribute('triggering-actions');
    if (this.triggeringActions) {
      this.triggeringActions = this.triggeringActions.split(' ');
    }

    this.callbacks = [];
    this.addEventListener('pointerup', this.delegateInteraction, false);
    this.registerInteractCallback(this.displayText);
  }

  /**
   * Call all registered interaction callbacks.
   *
   * @param {Event} event The pointerup event.
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
   * @param {Function} fn callback function.
   * @returns {void}
   */
  registerInteractCallback(fn) {
    this.callbacks.push(fn);
  }

  /**
   * Sends the given text for the triggered action to the text-display component.
   *
   * @param {Event} event The pointerup event.
   * @returns {void}
   */
  displayText(event) {
    const action = document.body.dataset.activeAction;
    if (!action) return;
    const textElement = event.target.closest(this.localName)
      .querySelector(`[data-action-trigger="${action}"`);
    if (!textElement) return;
    const textContent = textElement.textContent;
    if (!textContent) return;
    document.body.dataset.activeAction = 'default';
    document.querySelector('text-display').setAttribute('text', textContent);
  }

}
customElements.define('game-object', GameObject);
