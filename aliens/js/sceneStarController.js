/* global AFRAME */

AFRAME.registerComponent('scene-star-controller', {
  
  // Set up the event listener for the 'click' event when the player 
  // wants to fire a new Ninja star
  init: function() {
    this.el.addEventListener('click', this.spawnNextStar.bind(this));  
  },
  
  // Sends a 'fire-star' message to the star we want to spawn
  // Input: 
  //  evt (event):    Event object from the message
  spawnNextStar: function(evt) {
    // Find the next available star
    var index = this.findNextStar();
    // Get the current camera rotation object
    var viewRotation = document.querySelector('#camera').getAttribute('rotation');
    // If a star is available, send the message
    if (index >= 0) {
      var el = document.querySelector('#star'+index);
      el.emit('fire-star', {viewRotation: viewRotation});
    }
  },

  // Finds the next available star that we can use.  Nothing is fired if
  // all stars are currently visible.
  findNextStar: function() {
    var found = false;
    var i = 0;
    while (!found && i < STAR_COUNT) {
      var star = document.querySelector('#star'+i);
      if (!star.getAttribute('visible')) {
        return i;
      }
      i++;
    }
    return -1;
  }
  
});