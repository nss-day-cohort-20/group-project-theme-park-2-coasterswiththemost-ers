'use strict';

// let attractions = [];
let areas = [];
// let attractionTypes = [];
let attractionsList = [];

let app = Object.create(null);
let $ = require('jquery');
let data = require('./data-factory');
let getAttractionsList = require('./attractions-list-data-builder');
let getAreaList = require('./area-data-builder.js');
let templates = require('./templates');

getAttractionsList().then(function(dataFromGetAttractionsList){
	attractionsList = dataFromGetAttractionsList;
	$('#attractionList').append(templates.testTemplate({list : attractionsList}));
});

getAreaList().then(function(dataFromGetAreaList) {
	areas = dataFromGetAreaList;
	$('#mapGrid').append( templates.gridTemplate({area: areas}) );
});

app.listGetter = function(){
	return attractionsList;
};

window.app = app;