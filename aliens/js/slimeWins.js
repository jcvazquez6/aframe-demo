/* global AFRAME */

AFRAME.registerComponent('slime-wins', {

  // Detect when a slime makes it to the red bar behind the camera.
  // Send the 'you-lose' function when then happens.  The function
  // isn't supported in the game currently -- the game will just
  // continue.
  init: function() {
    this.el.sceneEl.addEventListener('you-lose', function(evt) {

    });
  },

  // Check if the slime gets to the end of the path.  If so, then
  // send the 'you-lose' message
  tick: function(time, delta) {
    if (this.el.getAttribute('visible')) {    // Is it visible?
   		if (this.el.getAttribute('position').z >= 0) {   // Is it at the end?
		    var sceneEl = document.querySelector('a-scene'); 
  			sceneEl.emit('you-lose');
  			this.el.setAttribute('visible', false);
  		}
	  }
  },

});