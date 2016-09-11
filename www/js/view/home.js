import BaseView from 'core/base-view';

import mediator from 'services/mediator';

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

		setTimeout(()=> {
			mediator.publish('route', 'page');
		}, 3000)

	},

	showAnimation: function () {

		this.setTween(
			(new TimelineLite({onComplete: () => console.log('11111'), onReverseComplete: ()=> console.log('222222')}))
				.to(this.get('$h1'), 0, {y: 200})
				.to(this.get('$h1'), 0.8, {y: 100, ease: Back.easeOut.config(1.4), force3D: true})
				.to(this.get('$h1'), 0.8, {y: 50, ease: Back.easeOut.config(1.4), force3D: true})
		);

		// setTimeout(()=> this.killAllTweens(), 700);

		console.log('show animation');

	}

});
