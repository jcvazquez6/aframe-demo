/* global AFRAME */

AFRAME.registerComponent('star-controller', {

  schema: {
    rotation: {type: 'number', default: 0},
    visible: {type: 'boolean', default: false},
    wobble: {type: 'boolean', default: false}
  },

  // Create event listeners for the events
  init: function() {
    this.el.addEventListener('fire-star', this.fireStar.bind(this));
    this.el.addEventListener('destroy-star', this.starHitSlime.bind(this));
  },

  // Move the star as required
  tick: function(time, delta) {
    // If star is visible, move across the field
    if (this.data.visible) {
      this.move(delta);
      this.broadcastPosition(this.el);
      this.starInBoundsCheck();
    }
    // If the star hit something, make it wobble
    if (this.data.wobble) {
      this.wobble();
    }
  },

  // Check to see if the star is in bounds.  If not, make it invisible
  starInBoundsCheck: function() {
    var position = this.el.getAttribute('position');
    if (position.z < -Z_SIZE || Math.abs(position.x) > X_SIZE) {
      this.el.setAttribute('visible', false);
    }    
  },

  // Fire a star
  fireStar: function(evt) {
    // Get camera rotation
    this.data.rotation = evt.detail.viewRotation.y;

    // Compute starting position of star so that it appears directly
    // in front of the camera no matter where the camera is pointing
    var pos = {y:0.5};
    pos.x = -STAR_THROW_RADIUS * Math.sin(evt.detail.viewRotation.y * Math.PI / 180);
    pos.z = -STAR_THROW_RADIUS * Math.cos(evt.detail.viewRotation.y * Math.PI / 180);
    this.el.setAttribute('position', pos);
    this.data.visible = true;
    this.el.setAttribute('visible', true);
    this.el.components.sound.playSound();
  },

  // Move the star
  move: function(delta) {
    var pos = this.el.getAttribute('position');
    var dx = delta * STAR_SPEED / 1000.0;
    // If the star is wobbling, make it move slower
    if (this.data.wobble) {
      dx /= 10;
    }
    pos.x += dx * Math.sin(-this.data.rotation * Math.PI / 180);
    pos.z -= dx * Math.cos(-this.data.rotation * Math.PI / 180);
    this.el.setAttribute('position', pos);
    // Broadcast the new position to all the slimes
    for (var i=0; i<SLIME_COUNT; i++) {
      this.broadcastPosition(this.el);
    }    
  },

  // Broadcast star position to all the slimes
  // Input
  //  star (obj):  Star sending the message
  broadcastPosition: function(star) {
    var pos = star.getAttribute('position');
    for (var i=0; i<SLIME_COUNT; i++) {
      var slime = document.querySelector('#slime'+i);
      slime.emit('star-position', {pos: pos, star: star});
    }        
  },

  // Star has hit a slime, make it wobble and set a delay before disappearing
  starHitSlime: function(evt) {
    this.data.wobble = true;
    setTimeout(this.destroyStar.bind(this), 1000);
  },

  // Wobble the star by changing the x and z rotation axes
  wobble: function() {
    var rot = this.el.getAttribute('rotation');
    rot.x += 15;
    rot.z += 5;
    this.el.setAttribute('rotation', rot);
  },

  // Remove the star from the playing field
  destroyStar: function() {
    this.data.visible = false;
    this.data.wobble = false;
    this.el.setAttribute('visible', false);
    this.el.setAttribute('position', {x:0, y:1.2, z: 5});   
    this.el.setAttribute('rotation', {x:0, y:0, z:0});
  }

});
  
