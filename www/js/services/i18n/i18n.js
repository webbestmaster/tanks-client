import languageContainer from 'language-container';

var defaults = {
	lang: 'en-us'
};

export default class I18n {

	constructor(localeName) {

		var i18n = this;

		i18n.lib = null;

		i18n.setLocale(localeName || defaults.lang);

	}

	setLocale(localeName) {

		var i18n = this;

		i18n.lib = languageContainer[localeName];

	}

	get(id) {
		return this.lib[id];
	}

	destroy() {

		this.lib = null;

	}

}
