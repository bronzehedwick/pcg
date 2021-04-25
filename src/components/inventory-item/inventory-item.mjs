import { GameObject } from '../game-object/game-object.mjs';

/**
 * Class that represents an item that can be put in the player's inventory.
 */
export class InventoryItem extends GameObject {

  /**
   * Create the inventory item.
   */
  constructor() {
    super();
    this.registerInteractCallback(this.obtainCallback);
  }

  /**
   * Add the item to the player's inventory.
   *
   * @returns {void}
   */
  obtainCallback() {
    if (!this.triggeringActions) return;
    if (!this.triggeringActions.includes(
      document.body.dataset.activeAction)
    ) return;
    // Create the items property on actions-menu if it doesn't exist.
    const actionsMenu = document.getElementsByTagName('actions-menu')[0];
    if (!actionsMenu.getAttribute('items')) {
      actionsMenu.setAttribute('items', '');
    }
    // actions-menu identifies this item via it's ID, so log an error without
    // throwing one. This causes the app to continue running, but still alerts
    // the developer.
    if (!this.id) return console.error('Inventory item requires an ID', this);
    // Set the id value of this item to the action-menu's items property.
    // Action-menu listens for this event, and moves the item.
    actionsMenu
      .setAttribute(
        'items',
        `${actionsMenu.getAttribute('items')} ${this.id}`.trim()
      );
  }

}
customElements.define('inventory-item', InventoryItem);
