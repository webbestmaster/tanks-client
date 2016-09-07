"use strict";

import collector from 'services/collector';
import template from 'services/template';

var Backbone = require('backbone');
var _ = require('lodash');

var idCounter = 0;

export default Backbone.View.extend({

	//----
	// initialization
	//----
	initialize: function () {

		var view = this;

		view._attr = {};

		view._tween = {};

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

	},

	//----
	//	tweens
	//----
	setTween: function (id, tween) {

		var view = this;

		// check if id has not been passed
		if (!tween) {
			return view.setTween(view.createId(), id);
		}

		view.killTweenById(id);

		return view._tween[id] = tween;

	},

	getTween: function (id) {
		return this._tween[id];
	},

	killTween: function (tween) {
		return tween.kill();
	},

	killTweenById: function (id) {

		var view = this,
			tween = view._tween[id];

		if (tween) {
			view.killTween(tween);
		}

	},

	killAllTweens: function () {

		var view = this;

		_.each(view._tween, view.killTween);

	},

	reverseTween: function (tween) {
		return tween && tween.reverse();
	},

	reverseAllTweens: function () {

		var view = this;

		_.each(view._tween, view.reverseTween);

	},

	//----
	// helpers
	//----
	createId: function () {
		return idCounter += 1;
	},

	get: function (key) {
		return this._attr[key];
	},

	set: function (key, value) {
		return this._attr[key] = value;
	}

});
