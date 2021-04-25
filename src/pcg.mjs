const stageElement = document.getElementById('stage');

/**
 * Load the given scene.
 *
 * @param {string} url - The URL of the HTML fragment page.
 * @returns {void}
 */
export async function loadScene(url) {
  const response = await window.fetch(url);
  if (!response.ok) return console.error(response.statusText);
  const data = await response.text();
  stageElement.innerHTML = data;
}

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

    this.innerHTML = `<style>${this.constructor.styles}</style>
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
   * Get CSS styles for the component.
   *
   * @return {string}
   */
  static get styles() {
    return `
      .menu {
        display: flex;
        flex-flow: column wrap;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        overflow: auto;
        background-color: #b08870;
      }

      .menu inventory-item {
        position: static;
      }

      .menu img,
      .menu svg {
        width: calc(var(--actions-menu-size) / 2);
        height: auto;
      }

      .submenu--verbs {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
      }

      @media screen and (orientation: portrait) {
        body {
          --actions-menu-size: 5em;
        }

        .stage {
          height: calc(100vh - var(--actions-menu-size));
        }

        .menu {
          bottom: 0;
          width: 100vw;
          height: var(--actions-menu-size);
        }

        .submenu--verbs {
          align-content: center;
        }

      }

      @media screen and (orientation: landscape) {
        body {
          --actions-menu-size: 16ch;
        }

        .stage {
          width: calc(100vw - var(--actions-menu-size));
          margin-left: var(--actions-menu-size);
        }

        .menu {
          top: 0;
          width: var(--actions-menu-size);
          height: 100vh;
        }

        .submenu--verbs {
          align-content: flex-start;
        }
      }

      .settings,
      li {
        margin: 3px;
      }

      .menu > li {
        margin: 0;
      }

      button {
        font-family: monospace, monospace;
        font-size: 1.4rem;
        border: 1px solid #000;
        background: #94705a;
        box-shadow: 2px 2px 0px #726f6f;
        padding: 1ch;
        color: #fff;
        cursor: pointer;
      }

      button:hover {
        color: #fcfa7a;
      }

      button[aria-checked="true"] {
        background-color: #674e3e;
        box-shadow: inset 1px 1px 2px #000;
      }`;
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

/**
 * Class represeting the box to display text from all game elements.
 */
class TextDisplay extends HTMLElement {

  /**
   * Create the text display.
   */
  constructor() {
    super();

    const shadow = this.attachShadow({mode: 'open'});

    shadow.innerHTML = `<style>${this.constructor.styles}</style>
    <p id="text-box" class="text-box" hidden></p>
    <div id="accessible-text-box" class="accessible-text-box" role="region" aria-live="assertive" aria-atomic="true" aria-relevant="additions"></div>
    <button id="continue" class="continue" hidden>Continue…</button>`;

    this.continueButton = shadow.getElementById('continue');
    this.textBox = shadow.getElementById('text-box');
    this.accessibleTextBox = shadow.getElementById('accessible-text-box');

    const self = this;
    this.continueButton.addEventListener('pointerup', event => {
      if (this.textBox.hasAttribute('data-complete')) {
        this.continueButton.hidden = true;
        this.textBox.hidden = true;
        this.textBox.removeAttribute('data-complete');
        return;
      }
      Array.from(self.shadowRoot.querySelectorAll('.visible'))
        .map(item => item.hidden = true);
      event.target.hidden = true;
      self.showLetters();
    }, {passive: true});
  }

  /**
   * Get CSS styles for the component.
   *
   * @return {string}
   */
  static get styles() {
    return `
      :host {
        --primary-color: #000;
        --secondary-color: #fff;
        contain: strict;
      }

      @media (prefers-color-scheme: dark) {
        :host {
          --primary-color: #fff;
          --secondary-color: #000;
        }
      }

      .text-box,
      .continue {
        position: fixed;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        font-family: monospace, monospace;
        border: 2px solid var(--primary-color);
        box-shadow: 1px 1px 0px var(--secondary-color), -1px -1px 0px var(--secondary-color);
      }

      .text-box {
        padding: 1em;
        background-color: var(--secondary-color);
        color: var(--primary-color);
        line-height: 1.2;
        width: 40ch;
        height: 9.5em;
        box-sizing: border-box;
        hyphens: auto;
      }

      @media screen and (orientation: portrait) {
        .text-box {
          bottom: var(--utility-bar-size);
        }
      }

      .char {
        opacity: 0;
        visibility: hidden;
      }

      .char.visible {
        opacity: 1;
        visibility: visible;
      }

      .ellipsis-before::before {
        content: '…';
      }

      .ellipsis-after::after {
        content: '…';
      }

      .continue {
        cursor: pointer;
        border: 2px solid var(--primary-color);
        font-family: monospace;
        font-size: 1em;
        color: var(--primary-color);
        background-color: var(--secondary-color);
        bottom: 1em;
      }

      .continue:hover {
        background-color: var(--primary-color);
        color: var(--secondary-color);
      }

      .accessible-text-box {
        clip: rect(1px, 1px, 1px, 1px);
        clip-path: inset(50%);
        height: 1px;
        width: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
      }
    `;
  }

  /**
   * Set the attributes to watch for changes.
   *
   * @returns {Array} An array of attributes.
   */
  static get observedAttributes() { return ['text']; }

  /**
   * Generator to retrieve the next letter in the sequence.
   *
   * @param {Array} letters - An array of characters.
   * @yields {string} The next letter in sequence.
   */
  *letterGenerator(letters) {
    let index = 0;
    while (index < letters.length) {
      yield letters[index];
      index++;
    }
  }

  /**
   * Print letters in typewriter effect. Automatically page content to fit
   * the dimesions of the box.
   */
  showLetters() {
    let index = 1;
    // Try to break pages on a whitespace character.
    let lookForWhitespaceChar = false;
    const intervalID = window.setInterval(() => {
      let letter = this.letters.next();
      if (letter.done) {
        this.continueButton.textContent = 'Done';
        this.continueButton.hidden = false;
        this.textBox.setAttribute('data-complete', '');
        return window.clearInterval(intervalID);
      }
      lookForWhitespaceChar = lookForWhitespaceChar ? lookForWhitespaceChar : false;
      if (index % 200 === 0) lookForWhitespaceChar = true;
      letter.value.classList.add('visible');
      if (lookForWhitespaceChar && !letter.value.textContent.trim()) {
        window.clearInterval(intervalID);
        letter.value.previousElementSibling.classList.add('ellipsis-after');
        letter.value.nextElementSibling.classList.add('ellipsis-before');
        this.continueButton.hidden = false;
        return index;
      }
      index++;
    }, 25);
  }

  /**
   * Respond to attribute changes.
   *
   * @param {string} name - The name of the attribute changed.
   * @param {string} oldValue - The previous value of the attrbute.
   * @param {string} newValue - The just-changed value of the attribute.
   * @see {@linkcode TextDisplay#observedAttributes}
   * @returns {void}
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (!newValue) return;
    this.accessibleTextBox.textContent = newValue;
    this.continueButton.textContent = 'Continue…';
    this.textBox.hidden = false;
    this.textBox.innerHTML = newValue
      .trim()
      .split('')
      .map(char => `<span class="char">${char}</span>`)
      .join('');
    this.letters = this.letterGenerator(Array.from(this.textBox.children));
    this.showLetters();
  }
}
customElements.define('text-display', TextDisplay);

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

    shadow.innerHTML = `<style>${this.styles}</style>`;

    const template = document.getElementById('game-object-template');
    shadow.appendChild(template.content.cloneNode(true));

    this.triggeringActions = this.getAttribute('triggering-actions');
    if (this.triggeringActions) {
      this.triggeringActions = this.triggeringActions.split(' ');
    }

    this.appearsBefore = this.getAttribute('appears-before');
    this.appearsAfter = this.getAttribute('appears-after');

    this.callbacks = [];
    this.addEventListener('pointerup', this.delegateInteraction, false);
    this.registerInteractCallback(this.displayText);
  }

  /**
   * Get CSS styles for the component.
   *
   * @return {string}
   */
  get styles() {
    return `
      :host {
        position: absolute;
        top: ${this.getAttribute('y') ? this.getAttribute('y') : 0}px;
        left: ${this.getAttribute('x') ? this.getAttribute('x') : 0}px;
      }
      slot[name="text"] {
        display: none;
      }`;
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
    const textElement = event.target.closest(this.localName)
      .querySelector(`[data-action-trigger="${document.body.dataset.activeAction}"`);
    if (!textElement) return;
    const textContent = textElement.textContent;
    if (!textContent) return;
    document.querySelector('text-display').setAttribute('text', textContent);
  }

}
customElements.define('game-object', GameObject);

/**
 * Class that represents an item that can be put in the player's inventory.
 */
export class InventoryItem extends GameObject {

  /**
   * Create the inventory item.
   */
  constructor() {
    super();
    this.registerInteractCallback(this.obtainCallback);
  }

  /**
   * Add the item to the player's inventory.
   *
   * @returns {void}
   */
  obtainCallback() {
    if (!this.triggeringActions) return;
    if (!this.triggeringActions.includes(
      document.body.dataset.activeAction)
    ) return;
    // Create the items property on actions-menu if it doesn't exist.
    const actionsMenu = document.getElementsByTagName('actions-menu')[0];
    if (!actionsMenu.getAttribute('items')) {
      actionsMenu.setAttribute('items', '');
    }
    // actions-menu identifies this item via it's ID, so log an error without
    // throwing one. This causes the app to continue running, but still alerts
    // the developer.
    if (!this.id) return console.error('Inventory item requires an ID', this);
    // Set the id value of this item to the action-menu's items property.
    // Action-menu listens for this event, and moves the item.
    actionsMenu
      .setAttribute(
        'items',
        `${actionsMenu.getAttribute('items')} ${this.id}`.trim()
      );
  }

}
customElements.define('inventory-item', InventoryItem);

/**
 * Class that loads a new scene when specified.
 * Pass in the id of the scene to scene, and optionally triggering-actions to
 * specify actions that trigger moving to the new scene. If left unspecified the
 * default action will be used.
 */
export class ScenePortal extends GameObject {

  /**
   * Create the scene portal.
   */
  constructor() {
    super();

    this.scenePath = this.getAttribute('scene-path');
    this.registerInteractCallback(this.sceneCallback);
  }

  /**
   * Load given scene when given action is applied to this element.
   *
   * @returns {void}
   */
  sceneCallback() {
    const action = document.body.dataset.activeAction;
    if (!action) return;
    if (this.triggeringActions.includes(action)) {
      loadScene(this.scenePath);
    }
  }
}
customElements.define('scene-portal', ScenePortal);
