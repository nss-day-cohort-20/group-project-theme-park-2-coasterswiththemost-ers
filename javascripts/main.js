'use strict';

console.log('hello');

let app = Object.create(null);

let attractions = [];
let areas = [];
let attractionTypes = [];
let attractionsList = [];

let data = require('./data-factory');
let attractionsListBuilder = require('./attractions-list-data-builder');

attractionsListBuilder();

// data.getAllAttractions()
// 	.then(function(dataFromGetAllAttractions){
// 		// console.log('data from getAllAttractions', dataFromGetAllAttractions);
// 		attractions = dataFromGetAllAttractions;
// 	});

app.getAttractionsList = function(){
	return attractionsList;
};

window.app = app;
