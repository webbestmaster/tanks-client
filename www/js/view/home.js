import BaseView from 'core/base-view';

var TweenMax = require('gsap');

export default BaseView.extend({

	selectors: {

		'$h1': 'h1'

	},

	initialize: function () {

		var view = this;

		BaseView.prototype.initialize.apply(view, arguments);

		view.defineElement('home', {dd: 34});

		view.show();

		view.showAnimation();

	},

	showAnimation: function () {

		TweenMax.staggerFromTo('h1', 1.8, {y: 100}, {y: 0, ease: Back.easeOut.config(1.4), force3D: true}, 0.1);

		console.log('show animation');

	}

});
