'use strict';
let $ = require('jquery');
let handlebars = require('hbsfy/runtime');
let templates = {};
templates.testTemplate = require('../templates/attraction-list-item.hbs');
templates.gridTemplate = require('../templates/mapGridTemplate.hbs');
templates.parkInfo = require('../templates/aboutTemplate.hbs');
// templates.footer = require('../templates/footer.hbs');
module.exports = templates;