'use strict';

console.log('hello');

// let attractions = [];
// let areas = [];
// let attractionTypes = [];
let attractionsList = [];

let app = Object.create(null);
let $ = require('jquery');
let data = require('./data-factory');
let getAttractionsList = require('./attractions-list-data-builder');
let templates = require('./templates');

getAttractionsList().then(function(dataFromGetAttractionsList){
	console.log(dataFromGetAttractionsList);
	attractionsList = dataFromGetAttractionsList;
	$('#attractionList').append(templates.testTemplate({list : attractionsList}));
});

app.listGetter = function(){
	return attractionsList;
};
let x = app.listGetter();
console.log("x",x);
// let list = ;
console.log(attractionsList);



window.app = app;