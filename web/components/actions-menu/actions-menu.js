/**
 * Class represeting the utility bar for verbs and inventory.
 */
class ActionsMenu extends HTMLElement {

  /**
   * Create the text display.
   */
  constructor() {
    super();

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

    this.innerHTML = `<ul role="menubar" class="actions-menu">${contents}</ul>`;

    // Add state of current active verb to the stage data attribute.
    this.addEventListener('pointerup', event => {
      const element = event.target.closest('button');
      if (!element) return;
      const active = this.querySelector('.verb[aria-checked="true"]');
      if (active) {
        active.setAttribute('aria-checked', 'false');
      }
      element.setAttribute('aria-checked', 'true');
      document.body.dataset.verbActive = element.id;
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
