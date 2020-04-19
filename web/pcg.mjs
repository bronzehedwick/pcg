const stageElement = document.getElementById('stage');

const roomLinks = new Map();
Array.from(document.getElementsByTagName('link'))
  .filter(link => link.rel === 'room')
  .map(link => {
    let key = link.href.replace(link.baseURI, '');
    if (link.id) key = link.id;
    return roomLinks.set(key, link.href);
  });

/**
 * Load the given room.
 * @param {string} id - the id of the `<link>` tag referencing the room file you want to load, or the href of `<link>` if no id is given.
 * @return {void}
 */
export async function loadRoom(id) {
  const response = await window.fetch(roomLinks.get(id));
  if (!response.ok) return console.error(response.statusText);
  const data = await response.text();
  stageElement.innerHTML = data;
}
