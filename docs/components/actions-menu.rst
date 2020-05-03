Actions Menu
============

The *Actions Menu* `custom element
<https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custo
m_elements>`_ adds the tool bar where the player can select *verbs* and
inventory *items* to use on the game world.

The actions menu changes location,
depending on the player's `screen orientation
<https://developer.mozilla.org/en-US/docs/Web/CSS/@media/orientation>`_,
optimized to show as much of the game area as possible. If the screen
orientation is *portrait*, the menu will appear on the bottom. If the
screen orientation is *landscape*, it will appear on the left.

The theme of the component will change
depending on if `light or dark mode
<https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-s
cheme>`_ is specified in the player's operating system. It defaults to a
light theme.

Usage
-----

The tag should be added inside the ``<body>`` tag, and outside the *stage*
element.

The elements takes a single attribute - ``verbs`` - the
contents of which should be a space seperated list
of words, in the same mannor as the standard `class
<https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement>`_
attribute.

Each word in the ``verbs`` attribute will be made available to players as
ways to interact with the game world. See other components for options
on how you can utilize these verbs to respond to player actions.

Any content added inside the tag will be ignored.

Example
-------

.. code-block:: html

  <actions-menu verbs="push pull talk take open close give look"></actions-menu>

HTML attributes
---------------

verbs
  Space seperated list of words to be transformed into player actions.

JavaScript code signature
-------------------------

The component extends `HTMLElement
<https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement>`_.

.. js:autoclass:: ActionsMenu
  :members:
