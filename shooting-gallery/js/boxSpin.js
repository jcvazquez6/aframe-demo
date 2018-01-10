/* global AFRAME, BOX_SPEED */

AFRAME.registerComponent('box-spin', {

  tick: function () {
    let rotation = this.el.getAttribute('rotation')
    rotation.y = (rotation.y + BOX_SPEED) % 360
    this.el.setAttribute('rotation', rotation)
  },
  
});