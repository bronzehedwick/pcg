/**
 * Class represeting the utility bar for verbs and inventory.
 * @extends HTMLElement
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
          <button id="${verb.toLowerCase()}" role="menuitemradio" aria-checked="false" class="verb">
            ${verb.charAt().toUpperCase()}${verb.slice(1,verb.length)}
          </button>
        </li>
      `;
    });

    this.innerHTML = `<ul role="menubar" class="actions-menu">${contents}</ul>`;
  }

  /**
   * Set the attributes to watch for changes.
   * @return {Array} An array of attributes.
   */
  static get observedAttributes() { return ['items']; }

  /**
   * Respond to attribute changes.
   * @param {string} name - The name of the attribute changed.
   * @param {string} oldValue - The previous value of the attrbute.
   * @param {string} newValue - The just-changed value of the attribute.
   * @see {@linkcode ActionsMenu#observedAttributes}
   * @return {void}
   */
  attributeChangedCallback(name, oldValue, newValue) {
  }
}
customElements.define('actions-menu', ActionsMenu);
