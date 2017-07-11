'use strict';

let attractions = [];
let areas = [];
let attractionTypes = [];
let attractionsList = [];

let dataFactory = require('./data-Factory');

// let builder = Object.create(null);

function buildAttractionsList() {

	// console.log("logging from buildAttractionsList()", attractions, areas, attractionTypes);
	attractionsList = attractions.map(function(attraction){
		let areaItem = areas.filter(function(area){
			return area.id === attraction.area_id;
		})[0];

		let typeItem = attractionTypes.filter(function(attractionType){
			return attractionType.id === attraction.type_id;
		})[0];


		let attractionObj = {
			name: attraction.name,
			description: attraction.description,
			area: areaItem.name,
			type: typeItem.name,
			times: attraction.times
		};

		return attractionObj;
	});
	// console.log('attractionsList at end of build', attractionsList);
	return attractionsList;
}

function getAttractionsList() {
	return new Promise(function(resolve, reject){
		// console.log('should be an empty array', attractionsList);

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
				attractionTypes = dataFromGetAllAttractionTypes;
				resolve(buildAttractionsList());
			})
			.catch(function(err){
				console.log('error', err);
				reject(err);
			});
	});



		// console.log('after end of xhrs and buildAttractionsList()', attractionsList);
		// return attractionsList;
}


module.exports = getAttractionsList;