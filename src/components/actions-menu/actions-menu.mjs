// import { state } from '../../pcg.mjs';

/**
 * Class represeting the utility bar for verbs and inventory.
 */
class ActionsMenu extends HTMLElement {

  /**
   * Create the text display.
   */
  constructor() {
    super();

    document.body.dataset.verbActive = 'default';

    let contents = '';
    this.getAttribute('verbs').split(' ').forEach(verb => {
      contents += `
        <li role="none">
          <button id="${verb.toLowerCase()}" class="verb" role="menuitemradio" aria-checked="false">
            ${verb.charAt().toUpperCase()}${verb.slice(1, verb.length)}
          </button>
        </li>
      `;
    });

    this.innerHTML = `<link rel="stylesheet" href="/src/components/actions-menu/actions-menu.css" />
    <ul role="menubar" class="actions-menu">${contents}</ul>`;

    // Add state of current active verb to the stage data attribute.
    document.documentElement.addEventListener('pointerup', event => {
      const activeVerb = event.target.closest('button.verb');
      const previousActive = document.querySelector('button.verb[aria-checked="true"]');
      // Disable any previously enabled verbs.
      if (previousActive) {
        document.body.dataset.verbActive = 'default';
        previousActive.setAttribute('aria-checked', 'false');
      }
      // If a non-button element was clicked, we're done.
      if (!activeVerb) return;
      // If the button was clicked, enable it and disable any previously clicked buttons.
      activeVerb.setAttribute('aria-checked', 'true');
      document.body.dataset.verbActive = activeVerb.id;
    }, false);

  }

  /**
   * Set the attributes to watch for changes.
   *
   * @returns {Array} An array of attributes.
   */
  static get observedAttributes() { return ['items']; }

  /**
   * Respond to attribute changes.
   *
   * @param {string} name - The name of the attribute changed.
   * @param {string} oldValue - The previous value of the attrbute.
   * @param {string} newValue - The just-changed value of the attribute.
   * @see {@linkcode ActionsMenu#observedAttributes}
   * @returns {void}
   */
  // attributeChangedCallback(name, oldValue, newValue) {
  // }
}
customElements.define('actions-menu', ActionsMenu);
