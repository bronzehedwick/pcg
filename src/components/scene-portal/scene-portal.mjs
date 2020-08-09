// import { state, loadScene } from '../../pcg.mjs';
import { loadScene } from '../../pcg.mjs';
import { GameObject } from '../game-object/game-object.mjs';

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

    this.scene = this.getAttribute('scene');
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
      loadScene(this.scene);
    }
  }
}
customElements.define('scene-portal', ScenePortal);
