// import { state, loadScene } from '../../pcg.mjs';
import { loadScene } from '../../pcg.mjs';
import { GameObject } from '../game-object/game-object.mjs';

/**
 * Class that loads a new scene when specified.
 * Pass in the id of the scene to scene, and optionally triggering-verbs to
 * specify verbs that trigger moving to the new scene. If left unspecified the
 * default verb will be used.
 */
export class ScenePortal extends GameObject {

  /**
   * Create the scene portal.
   */
  constructor() {
    super();

    this.scene = this.getAttribute('scene');
    this.registerInteractCallback(this.sceneCallback);
  }

  /**
   * Load given scene when given verb is applied to this element.
   *
   * @returns {void}
   */
  sceneCallback() {
    const verb = document.body.dataset.verbActive;
    if (!verb) return;
    if (this.triggeringVerbs.includes(verb)) {
      loadScene(this.scene);
    }
  }
}
customElements.define('scene-portal', ScenePortal);
