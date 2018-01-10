/* global AFRAME */

AFRAME.registerComponent('click-on-box', {
  init: function () {
    this.el.addEventListener('click', this.boxClicked.bind(this));
  },
  
  getRn(min, max) {
    return parseInt(Math.random() * (max-min) + min, 10)
  },
  
  boxClicked: function(evt) {
    let position = this.el.getAttribute('position')
    position.x = this.getRn(-10, 10);
    position.y = this.getRn(1, 10);
    position.z = this.getRn(-10, 10);
    this.el.setAttribute('position', position);
  }
});
