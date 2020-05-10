Design Goals
============

After a lot of thought, writing, re-writing, trial and error, and
leveraging embarrassingly earned career experience, I settled on some
design principles for PCG.

The thought of even having design principles was something hard earned,
but one I strongly believe in: a north star for how you go about making
something out of nothing.

Leverage core web technologies (HTML/CSS/JS)
--------------------------------------------

Rely as much as possible on existing browser features and APIs,
instead of writing a new system.

While new systems may offer benefits, building off existing ones usually
means a more familiar, fast, and pleasant player experience, and a
developer experience that can save work by not reinventing the wheel.

It also welcomes a wider range of developers who have knowledge of core
web technologies, instead of mandating a new mental model.

PCG will always be built without a framework in plain vanilla HTML, CSS
and JavaScript.

Accessibility as a first class citizen
--------------------------------------

The web is accessible by default, with a rich API for extensions. This
enables us to build games that can be accessed by those with visual,
auditory, motor, or other disabilities.

Accessibility is sadly an afterthought in a lot of digital design, and
seems entirely absent in the gaming space. Treating accessibility as a
core feature makes the experience `better for everyone`_, and expands the
notion of who can and should be a "gamer".

Thorough documentation
----------------------

Digital systems are complex. Games, even more so. Complete documentation
not only helps new developers understand the system, but helps me better
understand the code I'm writing. This has already helped me catch
logical errors or nonsensical system designs.

Also, a well documented system is an understood system, and an
understood system can be utilized with vastly more power and confidence
than a black box. You must understand your tools well to utilize them to
their fullest.

Player experience over developer experience
-------------------------------------------

The developer experience is important, and is key to attracting
a thriving community, but it cannot take precedence over the end
result that players will consume. This may seem obvious, however many
frameworks neglect this. Keeping this as a core principle ensures that
the players come first.

This includes the importance of accessible design, mentioned above.

Framework agnostic
------------------

Many projects are built on top of an existing web or game framework.
This eases development, at least initially.

However, there are many downsides, including being tied solely to
that framework's ecosystem of developers and support, being less
interoperable, ultimately requiring more code for players to need to
download and execute, and generally running into design constraints of
the framework's higher layer of abstraction.

Since PCG's adventure game genre has comparatively simple requirements,
in video game terms, this is an easy call.

Script kiddie friendly
----------------------

A "script kiddie" is someone who copies and maybe slightly modifies code
other people write without really understanding any of what they're
doing. They know just enough to get a result.

This type of person has generally been derided in programming circles,
and it may seem like a contradiction to cater to these folks after my
focus on system understanding, but remaining friendly to novices is an
essential part of growing a healthy community.

The web itself is such an example.

As the web has corporatized and professionalized, many new and exciting
capabilities have opened up. It has also raised the barrier to entry.
Creating something fun and expressive that can be utilized at a basic
level to good results, while still offering a much larger world of
possibility for those interested in learning, I think strikes the right
balance.

Open source, open heart
-----------------------

That title makes me puke, but I think it's important.

First, it's crucial to be kind to other people. And not just being nice
or being polite, but actually lifting each other up. As long as no one's
being a dick, it shouldn't matter who you are. Everyone deserves space.
This isn't so much a software thing, as a life thing.

I don't believe in the cult of rock star developers. No one's a genius,
and overwork produces under-value. Let's make something fun.

Second, for a project to really grow, especially a tiny one like this, it needs
to be open source. This opens the door for a wider range of developers
to contribute, and allows game makers to easily leverage the tool for
their projects.

The source code is `a gift`_.

I extend this philosophy not only to the code, but to the entire
development process.

.. _a gift: http://www.redotheweb.com/2011/11/13/open-source-is-a-gift.html
.. _better for everyone: http://www.mediaaccess.org.au/digitalaccessibilityservices/why-accessible-design-is-better-design/
