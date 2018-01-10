/* global AFRAME, BOX_SELECTED_COLOR */
AFRAME.registerComponent('looking-at-box', {
 dependencies: ['raycaster'],
 init: function () {
   this.el.addEventListener('raycaster-intersected', this.intersected.bind(this))
 },
  
 intersected: function () {
   let material = this.el.getAttribute('material')
   material.color = BOX_SELECTED_COLOR
   this.el.setAttribute('material', material)
 }
  
});

