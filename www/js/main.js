"use strict";

import collector from 'services/collector';


// initialize i18n
import I18n from 'services/i18n/i18n';
collector.set('i18n', new I18n());


// initialize routing
import Router from 'core/router';
var Backbone = require('backbone');
new Router();


// start app
Backbone.history.start();
