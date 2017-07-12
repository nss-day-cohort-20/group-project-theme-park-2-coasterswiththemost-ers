'use strict';

// let attractions = [];
let areas = [];
// let attractionTypes = [];
let attractionsList = [];
let parkInfo = [];

let app = Object.create(null);
let $ = require('jquery');
let data = require('./data-factory');
let getAttractionsList = require('./attractions-list-data-builder');
let getAreaList = require('./area-data-builder.js');
let getParkInfo = require('./park-info-builder.js');
let templates = require('./templates');

getAttractionsList().then(function(dataFromGetAttractionsList){
	attractionsList = dataFromGetAttractionsList;
	$('#attractionList').append(templates.testTemplate({list : attractionsList}));
});

getAreaList().then(function(dataFromGetAreaList) {
	areas = dataFromGetAreaList;
	$('#mapGrid').append( templates.gridTemplate({area: areas}) );
});

getParkInfo().then(function(dataFromGetParkInfo) {
	parkInfo = dataFromGetParkInfo;
	$('#footerDiv').prepend( templates.parkInfo(parkInfo[0]) );
});

app.listGetter = function(){
	return attractionsList;
};

window.app = app;