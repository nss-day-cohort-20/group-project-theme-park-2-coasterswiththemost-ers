'use strict';

// let attractions = [];
let areas = [];
// let attractionTypes = [];
let attractionsList = [];
let parkInfo = [];

let textInput = document.getElementById('text-input');
let searchForm = document.getElementById('search-form');

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

searchForm.addEventListener('submit', function(){
		let searchedAttractions = attractionsList.filter(function(attraction){
			// console.log(attraction);
			function stringContains(){
				if (attraction.name.toLowerCase().search(textInput.value.toLowerCase()) === -1) {
					return false;
				} else {
					let currentArea = areas.filter(function(area){
						return attraction.area === area.name;
					})[0];
					console.log(currentArea);
					let divIDselector = '#' + 'grid' + currentArea.id;
					$(divIDselector).addClass('highlightedArea');
					return true;
				}
			}
			return stringContains();
		});
		// console.log('searchedAttractions', searchedAttractions);

		//below empties sidebar and fills with only matching attractions with the matched name
		$('#attractionList').empty();
		$('#attractionList').append(templates.testTemplate({list : searchedAttractions}));
});

window.app = app;