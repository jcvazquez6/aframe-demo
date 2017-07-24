/* global AFRAME */

AFRAME.registerComponent('scene-slime-controller', {
  
  schema: {
    spawnTime:      {type: 'number', default: SPAWN_TIME * TO_MILLISECONDS},
    spawnVariation: {type: 'number', default: SPAWN_VARIATION * TO_MILLISECONDS}
  },
  
  // Define the slimes and stars and insert into the scene.  They will be 
  // invisible to start and we'll only make one visible when it's spawned.
  // Once it's been used, we'll make it invisible again.  The slimes are
  // never destroyed during the life of the program.
  init: function() {
    var sceneEl = document.querySelector('a-scene');
    for (var i=0; i<SLIME_COUNT; i++) {
      var slime = this.createObject('slime', i);
      sceneEl.appendChild(slime);
      var star = this.createObject('star', i);
      sceneEl.appendChild(star);
    }
    // Set up the periodic insertion of additional slimes
    var variation = this.getIntervalVariation();
    setTimeout(this.spawnNextSlime.bind(this), this.data.spawnTime + variation);
  },
  
  // Creates a slime or star entity from the mixin defined in the HTML file
  // Inputs:
  //  type (str):     One of 'star' or 'slime'
  //  id (int):       Sequence number (slime0, slime1, slime2, etc)
  // Returns the created element
  createObject: function(type, id) {
    var el = document.createElement('a-entity');
    el.setAttribute('mixin','a-'+type+'-mixin');
    el.setAttribute('id', type+id+'');
    el.setAttribute(type+'-spawn', {index: id});
    el.setAttribute('visible',false);
    return el;    
  },
  
  // Compute a random number between +/- variation value
  // Input:
  //  variation (int):  Base variation value
  // Returns: random value between -variation <= x <= +variation
  getIntervalVariation: function(variation) {
    return Math.random() * variation * 2 - variation;
  },

  // Finds the next available slime that isn't displayed
  // Returns the index between 0 <= idx < SLIME_COUNT (defined in constants.js)
  findNextSlime: function() {
    var found = false, i=0;
    while (!found && i < SLIME_COUNT) {
      var slime = document.querySelector('#slime'+i);
      if (!slime.getAttribute('visible')) {
        return i;
      }
      i++;
    }
    return -1;
  },

  // Sends the 'spawn' message to the slime we want to spawn  
  spawnNextSlime: function() {
    // Find the next available slime and send the 'spawn' message
    var slimeId = this.findNextSlime();
    var slime = document.querySelector('#slime'+slimeId);
    if (slimeId >= 0) {
      slime.emit('spawn');
    }
    // Set the timer for the next spawn
    var variation = this.getIntervalVariation(this.data.spawnVariation);
    setTimeout(this.spawnNextSlime.bind(this), this.data.spawnTime + variation);
  },

});