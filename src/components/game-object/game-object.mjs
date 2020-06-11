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
      width: 100px;
      height: 100px;
      top: ${this.getAttribute('y') ? this.getAttribute('y') : 0}px;
      left: ${this.getAttribute('x') ? this.getAttribute('x') : 0}px;
    }
    slot[name="text"] {
      display: none;
    }
    </style>`;

    const template = document.getElementById('game-object-template');
    shadow.appendChild(template.content.cloneNode(true));

    this.triggeringVerbs = this.getAttribute('triggering-verbs');
    if (this.triggeringVerbs) {
      this.triggeringVerbs = this.triggeringVerbs.split(' ');
    }

    this.callbacks = [];
    this.addEventListener('pointerup', this.delegateInteraction, false);
    this.registerInteractCallback(this.displayVerbText);
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
   * Sends the given text for the triggered verb to the text-display component.
   *
   * @param {Event} event The pointerup event.
   * @returns {void}
   */
  displayVerbText(event) {
    const verb = document.body.dataset.verbActive;
    if (!verb) return;
    const textElement = event.target.closest(this.localName)
      .querySelector(`[data-verb-trigger="${verb}"`);
      // .querySelector(`[data-verb-trigger="${state.getActiveVerb()}"`);
    if (!textElement) return;
    const textContent = textElement.textContent;
    if (!textContent) return;
    document.body.dataset.verbActive = 'default';
    // state.setActiveVerb('default');
    document.querySelector('text-display').setAttribute('text', textContent);
  }

}
customElements.define('game-object', GameObject);
