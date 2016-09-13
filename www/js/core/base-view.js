"use strict";

import collector from 'services/collector';
import template from 'services/template';

var Backbone = require('backbone');
var _ = require('lodash');

import util from 'services/util';
import mediator from 'services/mediator';

export default Backbone.View.extend({

	baseEvents: {
		'click [data-route]': 'domRoute'
	},

	domRoute: function (e) {
		mediator.publish('route', e.target.getAttribute('data-route'));
	},

	//----
	// initialization
	//----
	initialize: function () {

		var view = this;

		view._attr = {};

		view._tween = {};

		mediator.publish('hide-main-view');

		view._bindEventListeners();

	},

	_bindEventListeners: function () {

		var view = this;

		mediator.installTo(view);

		view.subscribe('hide-main-view', view.hide);
		view.subscribe('resize', view._onResize);

	},

	_onResize: function () {

		var view = this,
			device = collector.get('device');

		view.$el.width(device.get('width'));
		view.$el.height(device.get('height'));

	},

	hide: function () {

		var view = this;

        view.unsubscribe();
        view.undelegateEvents();
        mediator.uninstallFrom(view);

		view.reverseAllTweens().then(() => view.destroyView());

	},

	defineTemplate: function (templateName, data) {

		var view = this,
            device = collector.get('device');

		view.setElement(template(templateName, data));

        view.$el.width(device.get('width'));
        view.$el.height(device.get('height'));
        view.$el.addClass('view-wrapper');

		view._defineBySelectors();

		view.delegateEvents(_.extend({}, view.events || {}, this.baseEvents));

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

    destroyView: function () {

        var view = this;

        view.killAllTweens();

        // view.destroyAnimations();

        view.empty();

        view.$el.removeData().unbind().remove().empty(); // use with jQuery
        // view.$el.remove().empty();

        // view.remove();

        return Backbone.View.prototype.remove.call(view);

    },


    empty: function () {

        var attr = this.attr,
            key;

        for (key in attr) {
            attr[key] = null;
        }

        this.attr = {};

        return this;

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
            view._tween[id] = null;
		}

	},

	killAllTweens: function () {

		var view = this;

		_.each(view._tween, view.killTween);

	},

	reverseTween: function (tween) {
		return new Promise(function (resolve, reject) {
			tween.vars.onReverseComplete = resolve;
			tween.reverse();
		});
	},

	reverseAllTweens: function () {

		var view = this,
			promises = [];

		_.each(view._tween, function (tween) {
			promises.push(view.reverseTween(tween))
		});

		return Promise.all(promises);

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
