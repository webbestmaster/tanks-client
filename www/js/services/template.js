import collector from 'collector';

export default function (templateName, data) {

	var templateFn = require('templates/' + templateName);

	return templateFn.call({
		i18n: collector.get('i18n'),
	}, data);

}
