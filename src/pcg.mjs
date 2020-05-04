const stageElement = document.getElementById('stage');

const roomLinks = new Map();
Array.from(document.getElementsByTagName('link'))
  .filter(link => link.rel === 'room')
  .map(link => {
    let key;
    if (link.id) {
      // If there's an ID on the link, use it.
      key = link.id
    }
    else {
      // If there's no ID, use the base file name without extension.
      key = link.href.replace(link.baseURI, '').split('/').pop().split('.')[0];
    }
    return roomLinks.set(key, link.href);
  });

/**
 * State management.
 *
 * @namespace {object} State
 * @property {Function} getVerbs - Get all defined verbs.
 * @property {Function} getActiveVerb - Get the currently active verb.
 * @property {Function} setActiveVerb - Set the active verb.
 */
function State() {

  let verbs = document
    .getElementsByTagName('actions-menu')[0]
    .getAttribute('verbs')
    .split(' ');

  let activeVerb = 'default';

  return {

    /**
     * Get all defined verbs.
     *
     * @memberof State
     * @returns {Array.<string>} All defined verbs.
     */
    getVerbs: function getVerbs() {
      return verbs;
    },

    /**
     * Get currently selected verb.
     *
     * @memberof State
     * @returns {string} The name of the verb.
     */
    getActiveVerb: function getActiveVerb() {
      if (activeVerb in verbs) {
        return activeVerb;
      }
      return 'default';
    },

    /**
     * Set the current verb.
     *
     * @memberof State
     * @param {string} verb - Name of the verb to set.
     * @returns {void}
     */
    setActiveVerb: function setActiveVerb(verb) {
      activeVerb = verb;
    },

  };
};

// Use a closure to create private variables, and an export of the function
// invokation - which returns an object - to create a pseudo-singleton pattern.
// const state = State();
// export { state };

/**
 * Load the given room.
 *
 * @param {string} id - the id of the link tag referencing the room file
 * you want to load, or the file name without extension of the link
 * href if no id is given.
 * @returns {void}
 */
export async function loadRoom(id) {
  const response = await window.fetch(roomLinks.get(id));
  if (!response.ok) return console.error(response.statusText);
  const data = await response.text();
  stageElement.innerHTML = data;
}
