# MonocleReveal #

## Hover functionality for Touchscreens ##

### When you need this. ###

* When there is hidden content that is more than simply asthetic. I.E. important info, a link, .etc
* It responds to hover/tap/click and you need it to function universally for touchscreens, traditional displays, and computers with Touchscreen Monitors
* When there is a link that could inadvertently be clicked upon showing the hidden content.


### Setup ###

* Give the containing element a class of .monocle-anchor
* Give the "hidden" element a class of .monocle-target
* Make sure your "target" element is nested within the "anchor" element
* Supports any number of nested anchor/target pairs including sibling anchor/target pairs
```

<div class="monocle-anchor">
    <p>Hover over me to see more</p>
    <div class="monocle-target">
        <p>I am hidden content</p>
        <a href="#">Some hidden link you don't want to accidentally press</a>
        <div class="monocle-anchor">
            <p>I too have hidden content</p>
            <p class="monocle-target">I'm a two deep hidden element</p>
        </div>
    </div>
</div>

```

* Link to jQuery.

* Link to the plugin in your website or copy/paste the function into your scripts file.

* Assign .monocle-target { display: none; }

* Style the classes ".monocle-reveal, .monocle-active" (Both of them) instead of using :hover pseudo-classes.

```

.monocle-target {
    display: none;
}

.monocle-reveal,
.monocle-active {
    display: whatever;
}

```

* Nothing else to configure. monocleReveal does the rest.


### Citation ###
Big Thanks to Osvaldas Valutis

His plugin [doubleTapToGo](https://osvaldas.info/drop-down-navigation-responsive-and-touch-friendly) was the building block for MonocleReveal.

### Dependencies ###
jQuery 1.7


### Have a question? ###

dave@davecarney.net

Copyright 2017 Dave Carney

Licensed under the MIT license