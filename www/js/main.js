"use strict";

var $ = require('jquery');

import collector from 'services/collector';

import mediator from 'services/mediator';

// initialize i18n
import I18n from 'services/i18n/i18n';
collector.set('i18n', new I18n());


// initialize routing
import Router from 'core/router';
var Backbone = require('backbone');
new Router();


// save main node
collector.set('$wrapper', $('.js-wrapper'));


// initialize device
import Device from 'services/device';
new Device();


// start app
Backbone.history.start({pushState:true,  root: window.location.pathname});

