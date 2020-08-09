Inventory Item
==============

*Inventory Item* extends :doc:`game-object`. Every option available in
*Game Object* is available in *Inventory Item*.

Use it when you want players to be able to add the object to their inventory.

Usage
-----

The tag should be added inside the ``<body>`` tag, and outside the
:doc:`../usage/stage` element, usually inside a :doc:`../usage/scenes`
file.

Example
-------

.. code-block:: html

  <inventory-item x="200" y="800">
    <span slot="graphic">
      <img alt="Bean Can" src="bean-can.png">
    </span>
  </inventory-item>

HTML attributes
---------------

x
  X position of the *Game Object* in pixels, relative to the :doc:`../usage/stage`. Required.

y
  Y position of the *Game Object* in pixels, relative to the :doc:`../usage/stage`. Required.

triggering-actions
  A list of space-seperated verbs and/or items that will trigger the scene move. Required.

slot="graphic"
  Used inside the *Game Object* to define the visual representation. Place a ``<img>`` or other graphic tag inside. Can be used on any element type, although ``<span>`` or ``<div>`` are generally used since they are generic containers. Required.

slot="text"
  Used inside the *Game Object* to define text responses to player actions. Can be used on any element type, although ``<span>`` or ``<div>`` are generally used since they are generic containers.

data-action-trigger
  Used to signal which *verb* or *item* the element's text should apply to. Can be applied to as many elements as there are defined *verbs* or *items*, plus the *default* action. Must live inside *Game Object* and inside an element with ``slot="text"``.

JavaScript code signature
-------------------------

*Inventory Item* extends :doc:`game-object`.

.. js:autoclass:: InventoryItem
  :members:
