'use strict';

let dataFactory = require('./data-Factory');

let attractions = [];
let areas = [];
let attractionTypes = [];
let attractionsList = [];

function buildAttractionsList() {
	// console.log("logging from buildAttractionsList()", attractions, areas, attractionTypes);
	attractionsList = attractions.map(function(attraction){
		let areaItem = areas.filter(function(area){
			return area.id === attraction.area_id;
		});

		let typeItem = attractionTypes.filter(function(attractionType){
			return attractionType.id === attraction.type_id;
		});

		let attractionObj = {
			name: attraction.name,
			description: attraction.description,
			area: areaItem[0],
			type: typeItem[0]
		};

		return attractionObj;
	});
	// console.log("looking for attractionsList", attractionsList);
}

dataFactory.getAllAttractions()
	.then(function(dataFromGetAllAttractions){
		// console.log('data from getAllAttractions', dataFromGetAllAttractions);
		attractions = dataFromGetAllAttractions;
		return dataFactory.getAllAreas();
	})
	.then(function(dataFromGetAllAreas){
		// console.log('data from getAllAreas', dataFromGetAllAreas);
		areas = dataFromGetAllAreas;
		return dataFactory.getAllAttractionTypes();
	})
	.then(function(dataFromGetAllAttractionTypes){
		// console.log('data from getAllAttractionTypes', dataFromGetAllAttractionTypes);
		buildAttractionsList();
	})
	.catch(function(err){
		console.log('error', err);
	});



module.exports = buildAttractionsList;