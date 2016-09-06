import BaseView from 'core/base-view';
import template from 'services/template';

export default BaseView.extend({

	initialize: function () {

		var html = template('home', {dd: 4});

		console.log(html);

		console.log('home view is run');

	}

});
