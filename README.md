# PCG - Point and Click Game engine

[![Documentation Status](https://readthedocs.org/projects/pcg/badge/?version=latest)](https://pcg.readthedocs.io/en/latest/?badge=latest)

A simple **P**oint and **C**lick **G**ame engine for the web.

:warning: Consider this alpha software. There will be breaking changes,
things won't work, and there are missing all over the place.

Read the full [documentation](https://pcg.readthedocs.io/en/latest/index.html).

## Quick start

1. Click the green "Clone or download" button, and select "Download Zip".
2. Unzip the download on your computer - usually you just need to double click it.
3. In the `web` folder, open the `index.html` file in a text or code editor. Some examples of suitable free, friendly editors are below.
  - [Atom](https://atom.io/) (multi-platform)
  - [Brackets](http://brackets.io/) (multi-platform)
  - [notepad++](https://notepad-plus-plus.org/) (windows)
  - [Visual Studio Code](https://code.visualstudio.com/) (multi-platform)
  - You can also you the default text editor on your OS, either Text Edit or Notepad.
4. Also open the `index.html` file in a modern browser (see below).
5. In the browser you will see some boring demo content. Check out **Usage** to make this more interesting!

**NOTE**: Remember to refresh your browser after you make a change in your editor!

## Browser support

PCG supports modern browsers, and targets the last two versions of
Firefox, Chrome, Safari, and Edge.

It does not work in any version of Internet Explorer.

## Usage

Currently you can define the *verbs* for your game, add *game objects*,
which can have an image and respond with different text depending on
which verb was used to click them.

It helps to know some [HTML](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics).

### Verbs

Verbs are the way the player interacts with your game. By clicking one,
and then clicking a *game object*, you can have different actions occur.

What things happen in response to each verb on each game object is
entirely up to you.

Verbs appear in the *actions menu*, which appears on the left side or
bottom of the screen, depending on your screen's aspect ratio.

To change the verbs for you appear in the sidebar, edit this line in `index.html`:

```html
<actions-menu verbs="push pull talk take open close give look"></actions-menu>
```

Change the text inside the `verbs` property to your list of verbs. Make
sure each one is separated by a space.

### Game Objects

A *game object* is anything that the player can interact with: a person,
a lamp, a goat - even a person with the head of a goat and the body of a
lamp. You decide.

You can add as many game objects as you like.

To add one, copy the code below, and paste it right above the closing
`</body>` tag (note the `/`).

```html
<game-object template="game-object-template" x="[x-position]" y="[y-position]">
  <span slot="graphic">
    <img src="[url]">
  </span>
  <span slot="text">
    <span data-verb-trigger="[my-verb]">[My verb response]</span>
  </span>
</game-object>
```

Then, replace the placeholders - `[x-position]`, `[y-position]`,
`[url]`, `[my-verb]`, `[My verb response]` - as described below.

#### Position

This controls where on the stage your game object appears, using x and y
coordinates.

Replace `[x-position]` and `[y-position]` with a positive integers.
Note if you make them really big, you will also increase the size of
the stage as well, and players will have to scroll more to find your
objects.

#### Image

This is what visually represents your object. It can be any image.

You can either:

1. Reference an image on the internet
2. Reference an image on your computer

##### Internet image

Find a URL of an image (it must end in `jpg`, `jpeg`, `webp`, `gif`, or
`svg`), and replace `[url]` with it.

##### Your computer image

Copy the image to `web/images`, then replace the `[url]` placeholder
with `./images/[your-image]`, where `[your-image]` is the file name of,
well, your image.

#### Responding to different verbs

Currently the only thing that works here is responding with different
text shown to the player.

You can define different textual responses to the player via the
`data-verb-trigger` property.

They look like this:

```html
<span data-verb-trigger="[my-verb]">[My verb response]</span>
```

Replace `[my-verb]` with the *verb* you want to trigger the response. It
should exactly match the verb text you want to use.

Replace `[My verb response]` with the text you want displayed.

You can have as many of these response elements as you
have verbs defined. Just copy and paste the whole `<span
data-verb-trigger="[my-verb]">[My verb response]</span>` element, and
replace `[my-verb]` and `[My verb response]` with another verb you
defined.

## License

PCG is licensed under the terms of the MIT Public License.
