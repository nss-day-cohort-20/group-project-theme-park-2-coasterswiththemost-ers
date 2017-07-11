'use strict';
let $ = require('jquery');
let handlebars = require('hbsfy/runtime');
let templates = {};
templates.testTemplate = require('../templates/attraction-list-item.hbs');
// let attList = app.listGetter();


module.exports = templates;