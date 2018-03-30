/*
* monocleReveal() 1.2
*
* Copyright 2017
*
* By Dave Carney, http://www.fallingmonocle.com
* Mimics hover functionality for nested, hidden elements on touchscreens
* Available for use under the MIT License
*
* Functions as a class switcher
* Assign --> .monocle-target { display: none; }
*
* Instead of using pseudo-classes --> some_element:hover { display: whatever; }
* Use --> .monocle-reveal, .monocle-active { display: whatever; }
*
* Must place .monocle-anchor on the containing element
* Must place .monocle-target on the element you want hidden/revealed
*/


(function( $ ) {
	$.fn.monocleReveal = function() {
		this.each(function() {

			$(this).on('mouseenter', function(e) {
				if (!$(this).closest('.monocle-anchor').hasClass('monocle-active') &&
					!$(this).parents('.monocle-anchor').hasClass('monocle-active')) {
						if (!$(this).parents('.monocle-anchor').hasClass('monocle-reveal')) {
							$('.monocle-reveal, .monocle-active').removeClass('monocle-reveal monocle-active monocle-current monocle-previous');
						}
				}
				$('.monocle-current').removeClass('monocle-current').addClass('monocle-previous');
				$(e.target).closest('.monocle-previous').find('.monocle-previous').removeClass('monocle-reveal monocle-active monocle-previous')
					.find('*').removeClass('monocle-reveal monocle-active');
				$(this).closest('.monocle-anchor').addClass('monocle-reveal monocle-current')
					.find('.monocle-target:first').addClass('monocle-reveal');
					setTimeout(function() {
						$('.monocle-reveal').removeClass('monocle-reveal').addClass('monocle-active');
					}, 500);
			});

			$(this).on('click', function(e) {
				if (!$(e.target).closest('.monocle-anchor').hasClass('monocle-active') &&
					!$(e.target).parents('.monocle-anchor').hasClass('monocle-active')) {
						if (!$(e.target).parents('.monocle-anchor').hasClass('monocle-reveal')) {
							$('.monocle-reveal, .monocle-active').removeClass('monocle-reveal monocle-active monocle-current monocle-previous');
						}
				}
				if (!$(e.target).closest('.monocle-anchor').hasClass('monocle-active')) {
					e.preventDefault();
					if (!$(e.target).closest('.monocle-anchor').hasClass('monocle-current')) {
						$('.monocle-current').removeClass('monocle-current').addClass('monocle-previous');
						$(e.target).closest('.monocle-previous').find('.monocle-previous').removeClass('monocle-reveal monocle-active monocle-current monocle-previous')
							.find('*').removeClass('monocle-reveal monocle-active');
					}
					$(e.target).closest('.monocle-anchor').addClass('monocle-reveal monocle-current')
						.find('.monocle-target:first').addClass('monocle-reveal');
						setTimeout(function() {
							$('.monocle-reveal').removeClass('monocle-reveal').addClass('monocle-active');
						}, 500);
				}
			});

			$(document).on('click touchstart onpointerdown', function(e) {
				if (!$(e.target).closest('.monocle-anchor').hasClass('monocle-anchor')) {
					$('.monocle-reveal, .monocle-active').removeClass('monocle-reveal monocle-active monocle-current monocle-previous');
				}
				if ($('.monocle-previous').length) {
					if ($(e.target).closest('.monocle-anchor').hasClass('monocle-previous')) {
							$(e.target).closest('.monocle-anchor').removeClass('monocle-previous').addClass('monocle-current')
								.find('.monocle-target').find('*').removeClass('monocle-reveal monocle-active monocle-current monocle-previous');
					}
				}
			});

			$(document).on('mousemove', function(e) {
				if (!$(e.target).closest('.monocle-anchor').hasClass('monocle-anchor')) {
						$('.monocle-reveal, .monocle-active').removeClass('monocle-reveal monocle-active monocle-queued monocle-current monocle-previous');
				}
				if ($('.monocle-previous').length) {
					if (!$(e.target).closest('.monocle-anchor').hasClass('monocle-current')) {
							$(e.target).closest('.monocle-anchor').removeClass('monocle-previous').addClass('monocle-current')
								.find('.monocle-target').find('*').removeClass('monocle-reveal monocle-active monocle-current monocle-previous');
					}
				}
			});

		});
		return this;
	};

	$('.monocle-anchor').monocleReveal();

})( jQuery );

