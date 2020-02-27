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
        .verbActive = element.id;
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

      const template = document.getElementById('game-object-template').content;

      template.getElementById('inline-styles').textContent = `.wrapper {
        top: ${this.getAttribute('y') ? this.getAttribute('y') : 0}px;
        left: ${this.getAttribute('x') ? this.getAttribute('x') : 0}px;
      }`;

      this.attachShadow({mode: 'open'})
        .appendChild(template.cloneNode(true));
    }
  }
  customElements.define('game-object', GameObject);

  /**
   * Class represeting the box to display text from all game elements.
   * @extends HTMLElement
   */
  class TextDisplay extends HTMLElement {

    /**
     * Create the text display.
     */
    constructor() {
      super();

      const shadow = this.attachShadow({mode: 'open'});
      const linkElement = document.createElement('link');
      linkElement.setAttribute('rel', 'stylesheet');
      linkElement.setAttribute('href', 'components/text-display.css');
      const textBox = document.createElement('p');
      textBox.setAttribute('id', 'text-box');
      textBox.setAttribute('class', 'text-box');
      textBox.setAttribute('hidden', '');
      const accessibleTextBox = document.createElement('div');
      accessibleTextBox.setAttribute('id', 'accessible-text-box');
      accessibleTextBox.setAttribute('class', 'accessible-text-box');
      accessibleTextBox.setAttribute('role', 'region');
      accessibleTextBox.setAttribute('aria-live', 'assertive');
      accessibleTextBox.setAttribute('aria-atomic', 'true');
      accessibleTextBox.setAttribute('aria-relevant', 'additions');
      const continueButton = document.createElement('button');
      continueButton.setAttribute('id', 'continue');
      continueButton.setAttribute('class', 'continue');
      continueButton.hidden = true;
      continueButton.textContent = 'Continue…';
      shadow.appendChild(linkElement);
      shadow.appendChild(textBox);
      shadow.appendChild(accessibleTextBox);
      shadow.appendChild(continueButton);
      this.continueButton = continueButton;
      this.textBox = textBox;
      this.accessibleTextBox = accessibleTextBox;

      const self = this;
      continueButton.addEventListener('pointerup', event => {
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
     * Set the attributes to watch for changes.
     * @return {Array} An array of attributes.
     */
    static get observedAttributes() { return ['text']; }

    /**
     * Generator to retrieve the next letter in the sequence.
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
     * @return {number} either the current index if we haven't reached the end
     * of the page, or the intervalID if we have.
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
     * @param {string} name - The name of the attribute changed.
     * @param {string} oldValue - The previous value of the attrbute.
     * @param {string} newValue - The just-changed value of the attribute.
     * @see {@linkcode TextDisplay#observedAttributes}
     * @return {void}
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

  renderRoom(document.querySelector('[data-initial]').id);
  // renderRoom('room-2');

})();
