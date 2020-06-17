Backgrounds
===========

Backgrounds are important. They show the scenary of the scene. Duh.
Without them, every scene in your game will look like that load program
from *The Matrix*, and that gets old quick.

Since PCG is just regular HTML, the best way to implement a background
is to add a standard `img`_ tag to the top of each :doc:`../usage/scenes`
file, above all your game objects.

.. code-block:: html

  <img src="/demo/images/cave.jpg" width="1200" height="800" alt="cave">
  <game-object x="700" y="650">
    ...

.. warning::

  The size of the image is effectively the size of your scene canvas. If you place any :doc:`../components/game-object` (or any of it's derivitives) outside the bounds of the ``width`` and ``height`` of your image, they will appear to be floating in space outside the "world". That is, unless you've designed something clever I haven't thought of.

.. _img: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Img
