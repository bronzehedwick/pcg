import { loadRoom } from '../../pcg.mjs';
import { GameObject } from '../game-object/game-object.mjs';

/**
 * Class that loads a new room when specified.
 * Pass in the id of the room to room, and optionally triggering-verbs to
 * specify verbs that trigger moving to the new room. If left unspecified the
 * default verb will be used.
 * @example
 *     <room-portal x="200" y="800" room="my-room" triggering-verbs="push"></room-portal>
 */
export class RoomPortal extends GameObject {

  /**
   * Create the room portal.
   */
  constructor() {
    super();

    this.room = this.getAttribute('room');
    this.triggeringVerbs = this.getAttribute('triggering-verbs');
    if (this.triggeringVerbs) {
      this.triggeringVerbs = this.triggeringVerbs.split(' ');
    }

    this.registerInteractCallback(this.roomCallback);
  }

  /**
   * Load given room when given verb is applied to this element.
   *
   * @returns {void}
   */
  roomCallback() {
    const activeVerb = document.body.dataset.verbActive;
    if (!activeVerb) return;
    if (activeVerb in this.triggeringVerbs) {
      loadRoom(this.room);
    }
  }
}
customElements.define('room-portal', RoomPortal);
