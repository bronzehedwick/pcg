Room Portal
============

*Room Portal* extends :doc:`game-object`. Every option available in
*Game Object* is available in *Room Portal*.

Use it to move players from one :doc:`../usage/rooms` to another. Think:
a door.

Usage
-----

The tag should be added inside the ``<body>`` tag, and outside the
:doc:`../usage/stage` element, usually inside a :doc:`../usage/rooms`
file.

It accepts two unique attributes, ``room`` and ``triggering-verbs``.
Use room to specify the room link ID you want the player to move
to. Use triggering verbs to specify which verbs should trigger the
room move. The verbs listed here must be one of the verbs listed in
:doc:`actions-menu`.

Example
-------

.. code-block:: html

  <room-portal x="200" y="800" room="my-room" triggering-verbs="push open">
    <span slot="graphic">
      <img alt="Door" src="door.gif">
    </span>
  </room-portal>

HTML attributes
---------------

*Room Portal* extends :doc:`game-object`. Every attribute available in
*Game Object* is available in *Room Portal*.

room
  The `id`_ of the :doc:`../usage/rooms` ``<link>`` to move to. Required.

triggering-verbs
  A list of space-seperated verbs that will trigger the room move. Required.

JavaScript code signature
-------------------------

*Room Portal* extends :doc:`game-object`.

.. js:autoclass:: RoomPortal
  :members:

.. _id: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id
