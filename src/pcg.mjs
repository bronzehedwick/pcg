const stageElement = document.getElementById('stage');

const sceneLinks = new Map();
Array.from(document.getElementsByTagName('link'))
  .filter(link => link.rel === 'scene')
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
    return sceneLinks.set(key, link.href);
  });

/**
 * Load the given scene.
 *
 * @param {string} id - the id of the link tag referencing the scene file
 * you want to load, or the file name without extension of the link
 * href if no id is given.
 * @returns {void}
 */
export async function loadScene(id) {
  const response = await window.fetch(sceneLinks.get(id));
  if (!response.ok) return console.error(response.statusText);
  const data = await response.text();
  stageElement.innerHTML = data;
  // Change class/data attribute for styles/scripts to point to loaded scene.
  stageElement.classList.remove(document.body.dataset.scene);
  stageElement.classList.add(`scene--${id}`);
  document.body.setAttribute('data-scene', id);
}
