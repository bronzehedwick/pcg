import { GameObject } from '../game-object/game-object.mjs';

/**
 * Class that represents an item that can be put in the players inventory.
 */
export class InventoryItem extends GameObject {

  /**
   * Create the inventory item.
   */
  constructor() {
    super();

    this.triggeringVerbs = this.getAttribute('triggering-verbs');
    if (this.triggeringVerbs) {
      this.triggeringVerbs = this.triggeringVerbs.split(' ');
    }

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

  connectedCallback() {
    if (!this.closest('actions-menu')) return;
  }

}
customElements.define('inventory-item', InventoryItem);

