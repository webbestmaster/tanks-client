"use strict";

import collector from 'services/collector';
import template from 'services/template';

var Backbone = require('backbone');
var _ = require('lodash');

import util from 'services/util';

export default Backbone.View.extend({

	//----
	// initialization
	//----
	initialize: function () {

		var view = this;

		view._attr = {};

		view._tween = {};

		view._bindEventListeners();

	},

	_bindEventListeners: function () {



	},

	defineElement: function (templateName, data) {

		var view = this;

		view.setElement(template(templateName, data));

		view._defineBySelectors();

		return view;

	},

	show: function () {

		var view = this;

		collector.get('$wrapper').append(view.$el);

		return view;

	},

	_defineBySelectorsFunction: function (selector, $nodeKey) {
		var view = this;
		view.set($nodeKey, view.$el.find(selector));
	},

	_defineBySelectors: function () {

		var view = this;

		_.each(view.selectors || {}, (selector, $nodeKey) => view._defineBySelectorsFunction(selector, $nodeKey));

		return view;

	},

	//----
	//	tweens
	//----
	setTween: function (id, tween) {

		var view = this;

		// check if id has not been passed
		if (!tween) {
			return view.setTween(util.createId(), id);
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

	get: function (key) {
		return this._attr[key];
	},

	set: function (key, value) {
		return this._attr[key] = value;
	}

});
