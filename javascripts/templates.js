'use strict';
let $ = require('jquery');
let handlebars = require('hbsfy/runtime');
let templates = {};
templates.testTemplate = require('../templates/attraction-list-item.hbs');
templates.gridTemplate = require('../templates/mapGridTemplate.hbs');

module.exports = templates;