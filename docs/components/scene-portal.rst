Scene Portal
============

*Scene Portal* extends :doc:`game-object`. Every option available in
*Game Object* is available in *Scene Portal*.

Use it to move players from one :doc:`../usage/scenes` to another. Think:
a door.

Usage
-----

The tag should be added inside the ``<body>`` tag, and outside the
:doc:`../usage/stage` element, usually inside a :doc:`../usage/scenes`
file.

It accepts two unique attributes, ``scene`` and ``triggering-verbs``.
Use scene to specify the scene link ID you want the player to move
to. Use triggering verbs to specify which verbs should trigger the
scene move. The verbs listed here must be one of the verbs listed in
:doc:`actions-menu`.

Example
-------

.. code-block:: html

  <scene-portal x="200" y="800" scene="my-scene" triggering-verbs="push open">
    <span slot="graphic">
      <img alt="Door" src="door.gif">
    </span>
  </scene-portal>

HTML attributes
---------------

x
  X position of the *Game Object* in pixels, relative to the :doc:`../usage/stage`. Required.

y
  Y position of the *Game Object* in pixels, relative to the :doc:`../usage/stage`. Required.

scene
  The `id`_ of the :doc:`../usage/scenes` ``<link>`` to move to. Required.

triggering-verbs
  A list of space-seperated verbs that will trigger the scene move. Required.

slot="graphic"
  Used inside the *Game Object* to define the visual representation. Place a ``<img>`` or other graphic tag inside. Can be used on any element type, although ``<span>`` or ``<div>`` are generally used since they are generic containers. Required.

slot="text"
  Used inside the *Game Object* to define text responses to player actions. Can be used on any element type, although ``<span>`` or ``<div>`` are generally used since they are generic containers.

data-verb-trigger
  Used to signal which *verb* the element's text should apply to. Can be applied to as many elements as there are defined *verbs*, plus the *default* verb. Must live inside *Game Object* and inside an element with ``slot="text"``.

JavaScript code signature
-------------------------

*Scene Portal* extends :doc:`game-object`.

.. js:autoclass:: ScenePortal
  :members:

.. _id: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id
