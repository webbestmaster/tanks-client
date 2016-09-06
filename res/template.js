var i18n = require('tools/i18n');
var config = require('config');
var user = require('core/user');

var templateEngine = {
	/**
	 * Return DoT template by template name or only template name
	 * @param {String} templateName
	 @param {} data
	 * @returns {String}
	 */
	tmpl: function (templateName, data) {
		var url = templateName;
		var templateFn = require('templates/' + url + '.dot');

		return templateFn.call({
			translate: i18n.translate,
			tmpl: this.tmpl,
			config: config,
			user: user
		}, data);

	},

	elem: function (templateName, data, withoutThemePath) {
		var div = document.createElement('div');
		var template = templateEngine.tmpl(templateName, data, withoutThemePath);

		div.innerHTML = template;

		var element = div.firstElementChild;
		div.removeChild(element);

		return element;
	}
};

module.exports = templateEngine;