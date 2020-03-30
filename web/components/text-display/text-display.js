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
    linkElement.setAttribute('href', 'components/text-display/text-display.css');

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
