import { state, loadRoom } from '../../pcg.mjs';
import { GameObject } from '../game-object/game-object.mjs';

/**
 * Class that loads a new room when specified.
 * Pass in the id of the room to room, and optionally triggering-verbs to
 * specify verbs that trigger moving to the new room. If left unspecified the
 * default verb will be used.
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
    if (state.getActiveVerb() in this.triggeringVerbs) {
      loadRoom(this.room);
    }
  }
}
customElements.define('room-portal', RoomPortal);
