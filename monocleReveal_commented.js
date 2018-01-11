/*
* monocleReveal() 1.0
*
* Copyright 2017
*
* By Dave Carney, http://www.fallingmonocle.com
* Mimics hover functionality for nested, hidden elements on touchscreens
* Available for use under the MIT License
*
* This only functions as a class switcher.
* No hide/show involved
* laid out that way to accodate different display attributes
*
* Instead of using pseudo-classes --> some_element:hover { display: whatever; }
* Use --> .monocle-reveal, .monocle-active { display: whatever; }
*
* Must place .monocle-anchor on the containing element
* Must place .monocle-target on the element you want hidden/revealed
*/

(function ( $ ) {
$.fn.monocleReveal = function() {
		this.each(function() {

			$(this).on('mouseenter', function(e) {

				// Checks for an "active" element somewhere up the DOM including itself.
				// Add secondary check for a "revealing" parent element (useful for fast moving mice or nested containers that may overlap).
				// If it can't find one, you've entered a container elsewhere on the page, close everything out before opening a new one.
				// Checking for .reveal on closest will return true everytime, so that would be kind of useless.
				if (!$(this).closest('.monocle-anchor').hasClass('monocle-active') &&
					!$(this).parents('.monocle-anchor').hasClass('monocle-active')) {
						if (!$(this).parents('.monocle-anchor').hasClass('monocle-reveal')) {
							$('.monocle-reveal, .monocle-active').removeClass('monocle-reveal monocle-active monocle-current monocle-previous');
						}
				}

				// Swap .current to .previous before assigning a new current.
				// Assgning the "state" checker classes from the "new item" function insures that the intended container is always current
				// Updating the states immediately eliminated several double-"where are we clicking"-checks. 
				$('.monocle-current').removeClass('monocle-current').addClass('monocle-previous');

				// This line is the juice of opening a sibling element.
				// Eliminates several "is previous" checks by closing the second tier on every new item.
				// The closest .previous container will be a parent one.
				// If you are still in the same tree, finding a second .previous container would be impossible.
				// I.E. the child of the closest .previous container would be the .current container.
				// However, if you have moved to another "stream" within the "active" parent container,
				// Traversing to the closest .previous would take you back to the fork.
				// Then use .find to move one more level down before removing everything from all subsequent .previous items,
				// while keeping the ones that came before the fork active.
				$(e.target).closest('.monocle-previous').find('.monocle-previous').removeClass('monocle-reveal monocle-active monocle-previous')
					.find('*').removeClass('monocle-reveal monocle-active');

				// Add .reveal and .current to the closest anchor
				// Find the target and add .reveal
				// The "state" classes only being assigned to the anchor simplified the checks and DOM traversal
				$(this).closest('.monocle-anchor').addClass('monocle-reveal monocle-current')
					.find('.monocle-target:first').addClass('monocle-reveal');

					// After enough time has passed for an initial click to conclude,
					// Swap .reveal with the .active class and allow clicks on links to occur.
					// Yes, this is the mouseenter function but it needs to match what we are doing for the click.
					setTimeout(function() {
						$('.monocle-reveal').removeClass('monocle-reveal').addClass('monocle-active');
					}, 500);
			});

			$(this).on('click', function(e) {
				// Identical code and logic as used for mouseenter
				if (!$(e.target).closest('.monocle-anchor').hasClass('monocle-active') &&
					!$(e.target).parents('.monocle-anchor').hasClass('monocle-active')) {
						if (!$(e.target).parents('.monocle-anchor').hasClass('monocle-reveal')) {
							$('.monocle-reveal, .monocle-active').removeClass('monocle-reveal monocle-active monocle-current monocle-previous');
						}
				}

				// Placing the "new item" code inside this check, keeps it from firing on insuing clicks within the same container
				if (!$(e.target).closest('.monocle-anchor').hasClass('monocle-active')) {

					// Prevent clicks to links if active class is not present
					e.preventDefault();

					// Identical code and logic as used for mouseenter except that an additional check was needed
					// mouseenter only fires once, but there is the possibility of clicking more than once on a container before the .active class is assigned.
					// The .current class isn't assigned until after this check so the first time through it passes, but fails for any insuing clicks
					if (!$(e.target).closest('.monocle-anchor').hasClass('monocle-current')) {
						$('.monocle-current').removeClass('monocle-current').addClass('monocle-previous');
						$(e.target).closest('.monocle-previous').find('.monocle-previous').removeClass('monocle-reveal monocle-active monocle-current monocle-previous')
							.find('*').removeClass('monocle-reveal monocle-active');
					}

					// Identical code and logic as used for mouseenter
					$(e.target).closest('.monocle-anchor').addClass('monocle-reveal monocle-current')
						.find('.monocle-target:first').addClass('monocle-reveal');
						setTimeout(function() {
							$('.monocle-reveal').removeClass('monocle-reveal').addClass('monocle-active');
						}, 500);
				}
			});

			$(document).on('click touchstart onpointerdown', function(e) {

				// If there is no anchor element up the DOM you've clicked elsewhere on the page.
				// Close everything out.
				// There are simular checks used when opening "new items", but this is needed because the "new item" code doesn't fire elsewhere on the page.
				if (!$(e.target).closest('.monocle-anchor').hasClass('monocle-anchor')) {
					$('.monocle-reveal, .monocle-active').removeClass('monocle-reveal monocle-active monocle-current monocle-previous');
				}

				// Wrap the inner check within "is previous present" just so that this code isn't firing all the time.
				if ($('.monocle-previous').length) {

					// Use this check for clicking back into "active" items
					// This is needed because the "state swapping" code only fires upon new item activation.
					if ($(e.target).closest('.monocle-anchor').hasClass('monocle-previous')) {

							// If you've clicked into a .previous container, make that container .current again,
							// find the target, and kill everything above it.
							$(e.target).closest('.monocle-anchor').removeClass('monocle-previous').addClass('monocle-current')
								.find('.monocle-target').find('*').removeClass('monocle-reveal monocle-active monocle-current monocle-previous');
					}
				}
			});

			$(document).on('mousemove', function(e) {

				// Identical code and logic as used for mouseenter
				if (!$(e.target).closest('.monocle-anchor').hasClass('monocle-anchor')) {
						$('.monocle-reveal, .monocle-active').removeClass('monocle-reveal monocle-active monocle-queued monocle-current monocle-previous');
				}

				// Again, just wrapping the inner check, so that this is not firing all the fucking time.
				if ($('.monocle-previous').length) {

					// Identical code and logic as used in the click check
					if (!$(e.target).closest('.monocle-anchor').hasClass('monocle-current')) {
							$(e.target).closest('.monocle-anchor').removeClass('monocle-previous').addClass('monocle-current')
								.find('.monocle-target').find('*').removeClass('monocle-reveal monocle-active monocle-current monocle-previous');
					}
				}
			});

		});
		return this;
	};
}( jQuery ));

$('.monocle-anchor').monocleReveal();

