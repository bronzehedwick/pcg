Game Object
============

The base class that all :doc:`../usage/stage` elements extend. It is generally not
meant to be used directly, but can be used in a pintch.

Since it provides common interfaces for generally useful functionality,
it is a good candidate to extend for custom game elements.

The functionality is encapsulates is **positioning** on the x/y
axis, generic **graphics** support, and defining text that responds to
*verbs*, which is then shown in :doc:`text-display`.

Usage
-----

The tag should be added inside the ``<body>`` tag, and outside the :doc:`../usage/stage`
element, usually inside a :doc:`../usage/rooms` file.

Position
^^^^^^^^

The *Game Object* component supports two posititioning attributes, ``x``
and ``y``. These attributes take positive integers or 0, and, as one
might have guessed, position on the x/y axis inside the stage. All units
are in pixels. For example, ``<game-object x="0" y="400">`` will place
the object at the far left of the stage, 400 pixels down from the top.

Graphics
^^^^^^^^

The *Game Object* component supplies basic support for graphics - aka,
how the component will look.

Any standard HTML graphics format or tag can be used, including
`\<img\>`_, `\<picture\>`_, and `\<svg\>`_.

To define the graphic, place an element (usually ``<div>`` or
``<span>``) inside the ``<game-object>`` with the `slot`_ name
"graphic". Inside that, place your image tag.

.. code-block:: html

  <game-object x="300" y="300">
    <span slot="graphic">
      <img alt="Hello, world" src="my-image.png">
    </span>
  </game-object>

Responding to verbs
^^^^^^^^^^^^^^^^^^^

The *Game Object* provides functionality to respond to *verbs* selected
by the player, and responding by displaying text.

Other functionality is handled by elements that extend the *Game
Object*, such as :doc:`room-portal`.

To define the text, place an element (usually ``<div>`` or ``<span>``)
inside the ``<game-object>`` with the `slot`_ name "text". Inside that,
place any number of elements with the ``data-verb-trigger`` attribute.

.. code-block:: html

  <game-object x="200" y="150">
    <span slot="text">
      <span data-verb-trigger="greet">Hello!</span>
      <span data-verb-trigger="examine">It's pretty interesting.</span>
    </span>
  </game-object>

The value of each ``data-verb-trigger`` should be one of the verbs
defined in :doc:`actions-menu`, or ``default`` for the action when
nothing else is selected.

The contents of the element should contain the text you want
displayed in response to that verb. This text will be displayed in
:doc:`text-display`.

Full example
------------

.. code-block:: html

  <game-object x="200" y="150">
    <span slot="graphic">
      <img alt="My image" src="example.jpg">
    </span>
    <span slot="text">
      <span data-verb-trigger="default">This is the default.</span>
      <span data-verb-trigger="push">You push the thing.</span>
      <span data-verb-trigger="pull">You pull the thing.</span>
      <span data-verb-trigger="talk">You talk to the thing. It doesn't say much.</span>
      <span data-verb-trigger="take">You can't take this thing.</span>
      <span data-verb-trigger="open">It opens up, and talks about it's childhood.</span>
      <span data-verb-trigger="close">Yeah, enough of this, shut it down.</span>
      <span data-verb-trigger="give">What do you even give an abstract demo?</span>
      <span data-verb-trigger="look">It's an abstract demo.</span>
    </span>
  </game-object>

HTML attributes
---------------

x
  X position of the *Game Object* in pixels, relative to the :doc:`../usage/stage`. Required.

y
  Y position of the *Game Object* in pixels, relative to the :doc:`../usage/stage`. Required.

slot="graphic"
  Used inside the *Game Object* to define the visual representation. Place a ``<img>`` or other graphic tag inside. Can be used on any element type, although ``<span>`` or ``<div>`` are generally used since they are generic containers. Required.

slot="text"
  Used inside the *Game Object* to define text responses to player actions. Can be used on any element type, although ``<span>`` or ``<div>`` are generally used since they are generic containers.

data-verb-trigger
  Used to signal which *verb* the element's text should apply to. Can be applied to as many elements as there are defined *verbs*, plus the *default* verb. Must live inside *Game Object* and inside an element with ``slot="text"``.

JavaScript code signature
-------------------------

The component extends `HTMLElement
<https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement>`_.

.. js:autoclass:: GameObject
  :members:

.. _<img>: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Img
.. _<picture>: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Picture
.. _<svg>: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg
.. _slot: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Slot
