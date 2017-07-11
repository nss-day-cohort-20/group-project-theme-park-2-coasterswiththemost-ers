'use strict';

console.log('hello');

// let attractions = [];
// let areas = [];
// let attractionTypes = [];
let attractionsList = [];

let app = Object.create(null);

let data = require('./data-factory');
let getAttractionsList = require('./attractions-list-data-builder');

getAttractionsList().then(function(dataFromGetAttractionsList){
	// console.log(dataFromGetAttractionsList);
	attractionsList = dataFromGetAttractionsList;
});

app.listGetter = function(){
	return attractionsList;
};





window.app = app;

