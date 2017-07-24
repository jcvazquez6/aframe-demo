AFRAME.registerComponent('box', {
	schema: {
		delta: {type: 'number', default: 5}
	},

	init: function() {
		this.data.yRotation = 0;
	},

	tick: function(time, timeDelta) {
		this.rotate();
	},

	rotate: function() {
		var currentRotation = this.el.getAttribute('rotation');
		currentRotation.y += this.data.delta;
		this.el.setAttribute('rotation', currentRotation);		
	},

	update: function(oldData) {
		console.log('update');
	}
});