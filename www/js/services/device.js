var $ = require('jquery');

export default class Device {

	constructor() {

		var device = this;

		device._attr = {};

		device.bindEventListeners();

		device.detectScreen();

	}

	get(key) {

		return this._attr[key];

	}

	set(key, value) {

		return this._attr[key] = value;

	}

	bindEventListeners() {

		var device = this,
			win = window,
			doc = win.document,
			onResize = () => device.onResize();

		device.set('win', win);
		device.set('doc', doc);

		device.set('onResize', onResize);

		$(win).on('resize', onResize);

	}

	unBindEventListeners() {

		var device = this,
			win = device.get('win'),
			onResize = device.get('onResize');

		$(win).off('resize', onResize);

	}

	onResize() {

		var device = this;

		device.detectScreen();

	}

	detectScreen() {

		var device = this,
			doc = device.get('doc'),
			win = device.get('win');

		device.set('isTouch', 'ontouchstart' in doc);

		device.set('width', doc.documentElement.clientWidth);
		device.set('height', doc.documentElement.clientHeight);

		device.set('DPR', win.devicePixelRatio || 1);

	}

	destroy() {

		var device = this;

		device.unBindEventListeners();

		device._attr = {};

	}

}