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

    document.body.dataset.activeAction = 'default';

    let verbsContents = '';
    this.getAttribute('verbs').split(' ').forEach(verb => {
      verbsContents += `
        <li role="none" class="submenu__item">
          <button id="${verb.toLowerCase()}" class="verb menu-button" role="menuitemradio" aria-checked="false">
            ${verb.charAt().toUpperCase()}${verb.slice(1, verb.length)}
          </button>
        </li>
      `;
    });

    this.innerHTML = `<link rel="stylesheet" href="/src/components/actions-menu/actions-menu.css" />
    <ul role="menubar" class="menu">
      <li role="menuitem" class="menu-item menu-item--verbs">
        <ul role="menu" class="submenu submenu--verbs">
          ${verbsContents}
        </ul>
      </li>
      <li role="menuitem" class="menu-item menu-item--inventory">
        <ul id="inventory-menu" role="menu" class="submenu submenu--inventory">
        </ul>
      </li>
      <li role="menuitem" class="menu-item menu-item--settings">
        <button id="settings" class="settings menu-button">Settings</button>
      </li>
    </ul>`;

    // Add state of current active verb to the stage data attribute.
    document.documentElement.addEventListener('pointerup', event => {
      const activeAction = event.target.closest('.menu-button');
      const previousActive = document
        .querySelector('.menu-button[aria-checked="true"]');
      // Disable any previously enabled verbs.
      if (previousActive) {
        document.body.dataset.activeAction = 'default';
        previousActive.setAttribute('aria-checked', 'false');
      }
      // If a non-button element was clicked, we're done.
      if (!activeAction) return;
      // If the button was clicked, enable it and disable any previously
      // clicked buttons.
      if (!activeAction.hasAttribute('just-added')) {
        activeAction.setAttribute('aria-checked', 'true');
        document.body.dataset.activeAction = activeAction.id;
      } else {
        activeAction.removeAttribute('just-added');
      }
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
  attributeChangedCallback(name, oldValue, newValue) {
    if (!newValue) return;
    const inventoryMenu = document.getElementById('inventory-menu');
    const li = document.createElement('li');
    li.setAttribute('class', 'submenu__item');
    li.setAttribute('role', 'none');
    const button = document.createElement('button');
    button.setAttribute('id', newValue);
    button.setAttribute('class', 'item menu-button');
    button.setAttribute('role', 'menuitemradio');
    button.setAttribute('aria-checked', 'false');
    button.setAttribute('just-added', '');
    button.setAttribute('title', `${newValue.charAt().toUpperCase()}${newValue.slice(1, newValue.length)}`);
    const item = document.getElementById(newValue);
    item.removeAttribute(newValue);
    button.appendChild(item);
    li.appendChild(button);
    inventoryMenu.appendChild(li);
  }
}
customElements.define('actions-menu', ActionsMenu);
