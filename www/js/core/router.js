'use strict';
/*global window */

var Backbone = require('backbone');

import mediator from 'services/mediator';

/*
 import Backbone from './../../lib/backbone';
 import _ from './../../lib/lodash';
 import BaseView from './../view/core/base';
 import HomeView from './../view/home/home-view';
 import TangramView from './../view/tangram/tangram-view';
 import TangramConstructorView from './../view/tangram/tangram-constructor-view';
 import SectionsView from './../view/sections/sections-view';
 import SettingsView from './../view/settings/settings-view';
 */

import HomeView from 'view/home';
import PageView from 'view/page';

export default Backbone.Router.extend({

	routes: {
		'': 'home',
		'page': 'page'
	},

	home: function () {
		new HomeView();
	},

	page: function () {
		new PageView();
	},

	initialize: function () {

		var router = this;

		router.bindEventListeners();

	},

	routeTo: function (url, oprions) {

		switch (url) {

			case ':back':
				Backbone.history.history.back();
				break;

			default:
				this.navigate(url, oprions || { trigger: true });

		}

	},

	bindEventListeners: function () {

		var router = this;

		mediator.installTo(router);

		router.subscribe('route', router.routeTo);

	}

});

