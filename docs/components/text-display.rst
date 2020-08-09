Text Display
============

The *Text Display* component handles displaying in-game text to the
player. Other components utilize this automatically, so you may not need
to interact with it directly.

It prints text inside a text box appearing at the bottom of the player's
screen. Text is auto-paged, adding a continue button to keep displaying
more, and a done button when there is no more text to display. It prints
one character at a time, simulating a typewriter.

Right now, this component is required.

Usage
-----

Add the tag inside ``<body>``, but outside :doc:`../usage/stage`.

.. code-block:: html

  <text-display text=""></text-display>

To render text in the compontent, add your content to the ``text`` attribute.

If you add this text to the attribute statically in your HTML, the text
will render immediately on page load. Generally this is not desired.
Instead, the text is changed dynamically in JavaScript, which is how the
other components utilize text display.

.. code-block:: javascript

  document.querySelector('text-display').setAttribute('text', 'My text');

.. note:: No formatting of text is currently supported. Any HTML markup
          added to the text sent to this component will be discarded.

There are currently no configuration options.

HTML attributes
---------------

text
  The text to render. Required.

JavaScript code signature
-------------------------

The component extends `HTMLElement
<https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement>`_.

.. js:autoclass:: TextDisplay
  :members:
