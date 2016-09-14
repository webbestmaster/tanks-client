'use strict';
/*global window */

var Backbone = require('backbone');

import mediator from 'services/mediator';

import HomeView from 'view/home';
import CreateGameView from 'view/create-game';
import GameView from 'view/game';

export default Backbone.Router.extend({

	routes: {
		'': 'home',
		'create-game': 'createGame',
		'game': 'game',
	},

	home: function () {
		new HomeView();
	},

	createGame: function () {
		new CreateGameView();
	},

	game: function () {
		new GameView();
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

