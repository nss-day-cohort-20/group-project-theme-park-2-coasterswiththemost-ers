'use strict';

let attractions = [];
let areas = [];
let attractionTypes = [];
let attractionsList = [];
let parkInfo = [];

let textInput = document.getElementById('text-input');
let searchForm = document.getElementById('search-form');

let app = Object.create(null);
let $ = require('jquery');
let data = require('./data-factory');
let getArray = require('./arrayBuilder');
let getAreaList = require('./arrayBuilder');
let getParkInfo = require('./arrayBuilder');
let templates = require('./templates');

getArray.attractionsList().then(function(dataFromGetAttractionsList){
	attractionsList = dataFromGetAttractionsList;
	$('#attractionList').append(templates.testTemplate({list : attractionsList}));
});

getArray.areas().then(function(dataFromGetAreaList) {
	// areas = dataFromGetAreaList;
	let blankGridSpace = {
		colorTheme: "",
		decription: "",
		id: "",
		name: ""
	};
	dataFromGetAreaList.splice(4, 0, blankGridSpace);
	$('#mapGrid').append( templates.gridTemplate({area: dataFromGetAreaList}) );
});

getArray.parkInfo().then(function(dataFromGetParkInfo) {
	parkInfo = dataFromGetParkInfo;
	$('#footerDiv').prepend( templates.parkInfo(parkInfo[0]) );
});

app.listGetter = function(){
	return attractionsList;
};

searchForm.addEventListener('submit', function() {
	getArray.attractionsList().then( function(attractionsArr) {
		getArray.areas().then( function(areasArr) {
		// console.log(attractionsList);
		let searchedAttractions = attractionsList.filter(function(attraction) {
			function stringContains() {
				// console.log(attraction);
				if (attraction.name.toLowerCase().search(textInput.value.toLowerCase()) === -1) {
					return false;
				} else {
						// console.log(areasArr);
						let currentArea = areasArr.filter(function(area) {
							// console.log('attraction.area', attraction.area);
							// console.log('area.name', area.name);
							return attraction.area === area.name;
						})[0];
						console.log("here");
						// console.log('currentArea', currentArea);
						let divIDselector = '#' + 'grid' + currentArea.id;
						$(divIDselector).addClass('highlightedArea');


						return true;
					});
					}
			}
			return stringContains();
		});
						console.log("searchedAttractions", searchedAttractions);
						// $('#attractionList').empty();
						$('#attractionList').append(templates.testTemplate({list : searchedAttractions}));
		//below empties sidebar and fills with only matching attractions with the matched name
		// $('#attractionList').empty();
		// // console.log("data for template", searchedAttractions);
		// $('#attractionList').append(templates.testTemplate({list : searchedAttractions}));
	});
});

window.app = app;