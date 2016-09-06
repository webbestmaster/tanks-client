"use strict";

import collector from 'services/collector';
import template from 'services/template';

var Backbone = require('backbone');

export default Backbone.View.extend({

	initialize: function () {

		var view = this;

		view._attr = {};

	},

	get: function (key) {

		return this._attr[key];

	},

	set: function (key, value) {

		return this._attr[key] = value;

	},

	defineElement: function (templateName, data) {

		var view = this;

		view.setElement(template(templateName, data));

		view.defineBySelectors();

		return view;

	},

	show: function () {

		var view = this;

		collector.get('$wrapper').append(view.$el);

		return view;

	},

	defineBySelectors: function () {

		var view = this,
			$el = view.$el,
			selectors = this.selectors || {};

		Object.keys(selectors).forEach(function (key) {
			view.set(key, $el.find(selectors[key]));
		});

		return view;

	}

});
