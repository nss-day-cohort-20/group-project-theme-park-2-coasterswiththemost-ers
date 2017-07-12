'use strict';

console.log('hello');

// let attractions = [];
// let areas = [];
// let attractionTypes = [];
let attractionsList = [];

let textInput = document.getElementById('text-input');

let app = Object.create(null);
let $ = require('jquery');
let data = require('./data-factory');
let getAttractionsList = require('./attractions-list-data-builder');
let templates = require('./templates');

getAttractionsList().then(function(dataFromGetAttractionsList){
	// console.log(dataFromGetAttractionsList);
	attractionsList = dataFromGetAttractionsList;
	$('#attractionList').append(templates.testTemplate({list : attractionsList}));
});

app.listGetter = function(){
	return attractionsList;
};

textInput.addEventListener('keyup', function(){
	if (event.key === 'Enter') {
		let searchedAttractions = attractionsList.filter(function(attraction){
			// console.log(attraction);
			function stringContains(){
				if (attraction.name.toLowerCase().search(textInput.value.toLowerCase()) === -1) {
					return false;
				} else {
					return true;
				}
			}
			return stringContains();
		});
		// console.log('searchedAttractions', searchedAttractions);
		$('#attractionList').empty();
		$('#attractionList').append(templates.testTemplate({list : searchedAttractions}));
	}
});

window.app = app;