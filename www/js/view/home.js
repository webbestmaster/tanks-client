import BaseView from 'core/base-view';

var gsap = require('gsap'),
	TimelineLite = gsap.TimelineLite,
	Back = gsap.Back;

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

		this.setTween(
			(new TimelineLite())
				.to('h1', 0, {y: 200})
				.to('h1', 1.8, {y: 100, ease: Back.easeOut.config(1.4), force3D: true})
				.to('h1', 1.8, {y: 50, ease: Back.easeOut.config(1.4), force3D: true})
		);

		setTimeout(()=> this.killAllTweens(), 700);

		console.log('show animation');

	}

});
