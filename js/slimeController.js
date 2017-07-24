/* global AFRAME */

AFRAME.registerComponent('slime-controller', {

  // Component schema
  // visible: Is slime visible
  // isDying: Is slime dying -- hit by star, but not invisible yet
  schema: {
    visible: {type: 'boolean', default: false},
    isDying: {type: 'boolean', default: false}
  },

  // Set up event listeners for spawn new slime, and when slime has been hit
  init: function() {
    this.el.addEventListener('spawn', this.spawn.bind(this));
    this.el.addEventListener('slime-is-hit', this.hit.bind(this));    
  },

  // On each scene update tick, move the slime and wobble if slime is dying  
  tick: function(time, delta) {
  	if (this.data.visible) {
  		this.move(delta);
	  }
    if (this.data.isDying) {
      this.deathWobble();
    }
  },

  // Move the slime.  If slime is dying, move it slower
  // Input
  //  delta (float):    Time between last update tick (in ms)
  move: function(delta) {
    // Compute new position and set the slime position
    var dx = delta * SLIME_SPEED / 1000;
    if (this.data.isDying) {
      dx /= 10;
    }
  	var position = this.el.getAttribute('position');
  	position.z += dx;
  	this.el.setAttribute('position', position);  	
  },

  // Slime has been hit by a star
  hit: function() {
    this.data.isDying = true;
    this.el.components.sound.playSound()    // Play 'oof' sound
    this.el.setAttribute('material', 'src:materials/bloodred.png'); // Change color
    setTimeout(this.reset.bind(this), HIT_DELAY_BEFORE_DISAPPEARING); // Set timer for disappearing
  },

  // Move the slime in a death wobble by changing the rotation
  // in the x- and z-axes
  deathWobble: function() {
    var rot = this.el.getAttribute('rotation');
    rot.x += -1;
    rot.z += 1;
    this.el.setAttribute('rotation', rot);          
  },

  // Reset the slime for the next spawn
  reset: function() {
    this.data.visible = false;
    this.data.isDying = false;
    this.el.setAttribute('rotation', {x:0, y:0, z:0}); 
    this.el.setAttribute('material', 'src:materials/slimetexture.png');
    this.el.setAttribute('visible', false);
  },

  // Spawn this slime
  // Input:
  //  evt (obj): Event object from message
  spawn: function(evt) {
    if (this.data.index == evt.detail.index) {
      var slime = this.el;
      var xPos = Math.random() * X_SIZE * ((Math.random() < 0.5) ? -1 : 1);
      var position = {x: xPos, y: 0, z: -Z_SIZE}
      this.el.setAttribute('material', 'src:materials/slimetexture.png');
      slime.setAttribute('position', position);
      slime.setAttribute('visible', true);
      this.data.visible = true;
    }
  }
  
});