/* global AFRAME */

AFRAME.registerComponent('star-spin', {

	// Make a star rotation around its y-axis
  tick: function(time, delta) {
    var rot = this.el.getAttribute('rotation');
    rot.y += 25;
    this.el.setAttribute('rotation', rot)
  }
  
});