/* global AFRAME */

AFRAME.registerComponent('slime-is-slime-hit', {

	// Determines if a star has hit a slime. Each star broadcasts its location
	// after each clock tick update. The isSlimeHit handler responds to the
	// messages to see if the star that sent the message has hit the slime.
	init: function() {
		this.el.addEventListener('star-position', this.isSlimeHit.bind(this));
	},

	// Check to see if the star has hit this slime
	// Input:
	//  evt (obj): Event object sent by the message
	isSlimeHit: function(evt) {
		if (this.el.getAttribute('visible')) {
			// Get the positions of the slime and the star
			var slimePos = this.el.getAttribute('position');
			var starPos = evt.detail.pos;
			// Use the Pythagorean theorem to determine distance
			var dxSquared = Math.pow(slimePos.x - starPos.x, 2) + Math.pow(slimePos.z - starPos.z, 2);
			if (dxSquared < Math.pow(CLOSE_ENOUGH, 2)) {
				// It's a hit! Send messages to handle the hit in the slime and the star
				this.el.emit('slime-is-hit', {}, false);
				evt.detail.star.emit('destroy-star')
			}
		}
	}

});
  
