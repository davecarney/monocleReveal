/*eslint-env jquery*/
/*eslint-disable no-console*/
/*
* monocleReveal() v 2.0
*
* Copyright 2018
*
* By Dave Carney, http://www.fallingmonocle.com
* Mimics hover functionality for nested, hidden elements on touchscreens
* Available for use under the MIT License
*
* Functions as a class switcher
* Assign --> .monocle-target { display: none; }
*
* Instead of using pseudo-classes --> .example_element:hover { display: whatever; }
* Use --> .example_element > .monocle-active { display: whatever; }
*
* Must place .monocle-anchor on the containing element
* Must place .monocle-target on the element you want hidden/revealed
*/


(function( $ ) {
	$.fn.monocleReveal = function() {

		var clickPause = [];

		// Create anchor objects
		var anchors = this;

		// Build anchor objects
		function buildAnchorObjects() {
			anchors.each(function() {

				// Cache the elements
				this.anchor = $(this);
				this.hiddenItem = $(this).find('.monocle-target:first');
				this.active = false;
				this.allowClickThrough = false;
				this.siblingAnchors = $(this).siblings('.monocle-anchor');
				this.childAnchors = $(this).find('.monocle-anchor');
				(!$(this).parents('.monocle-anchor').length) ? this.noParent = true : this.noParent = false;

				// Show an item
				this.reveal = function() {
					this.activeItemCheck();
					this.active = true;
					this.hiddenItem.addClass('monocle-active');
					observeEvents();
				}

				// Hide an item
				this.conceal = function() {
					this.active = false;
					this.allowClickThrough = false;
					this.hiddenItem.removeClass('monocle-active');
					this.childAnchors.each(function() {
						this.active = false;
						this.allowClickThrough = false;
						this.hiddenItem.removeClass('monocle-active');
					});
				}

				// Check for active ancestor and sibling anchors
				this.activeItemCheck = function() {
					if (this.noParent) {
						concealAll();
						return;
					}
					this.siblingAnchors.each(function() {
						if (this.active) {
							this.conceal();
						}
					});
				}

			// End of anchors.each()
			});
		}

		// Hide all items
		function concealAll() {
			anchors.each(function() {
				this.active = false;
				this.allowClickThrough = false;
				this.hiddenItem.removeClass('monocle-active');
			});
			ignoreEvents();
		}

		// Allow click throughs after an item is revealed
		function allowClick(anchor) {
			clickPause.push(setTimeout(function() {
				if (anchor.active) { anchor.allowClickThrough = true; }
			}, 500));
		}

		buildAnchorObjects();

		// Set Event Listeners
		$(anchors).on('click', function(e) {
			if (!this.allowClickThrough) {
				e.stopPropagation();
				e.preventDefault();
				allowClick(this);
			}
			if (!this.active) {
				this.reveal();
			}
		});

		$(anchors).on('mouseenter', function() {
			if (!this.allowClickThrough) { allowClick(this); }
			if (!this.active) { this.reveal(); }
		});

		function observeEvents() {
			$(document).on('click.outside touchstart.outside onpointerdown.outside', function(e) {
				if (!$(e.target).closest('.monocle-anchor').length) {
					concealAll();
				}
			});

			$(document).on('mousemove.outside', function(e) {
				if (!$(e.target).closest('.monocle-anchor').length) {
					concealAll();
				}
			});
		}

		function ignoreEvents() {
			$(document).off('click.outside touchstart.outside onpointerdown.outside');
			$(document).off('mousemove.outside');
		}

	};

	$('.monocle-anchor').monocleReveal();

})( jQuery );

