import BaseView from 'core/base-view';

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

		console.log('show animation');

	}

});
