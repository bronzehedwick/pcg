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
