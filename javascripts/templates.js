'use strict';
let $ = require('jquery');
let handlebars = require('hbsfy/runtime');
let testTemplate = require('../templates/attraction-list-item.hbs');
$('#attractionList').append(testTemplate());