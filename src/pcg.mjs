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
  // Change class/data attribute for styles/scripts to point to loaded room.
  stageElement.classList.remove(document.body.dataset.room);
  stageElement.classList.add(`room--${id}`);
  document.body.setAttribute('data-room', id);
}
