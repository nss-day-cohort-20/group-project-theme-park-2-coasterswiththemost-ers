'use strict';

let attractions = [];
let areas = [];
let attractionTypes = [];
let attractionsList = [];

let dataFactory = require('./data-Factory');

let getArray= {};



function buildAttractionsList () {
	// console.log("logging from buildAttractionsList()", attractions, areas, attractionTypes);
	attractionsList = attractions.map(function(attraction) {
		let areaItem = areas.filter(function(area) {
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
			times: attraction.times,
			positionX: attraction.positionX,
			positionY: attraction.positionY
		};
		return attractionObj;
	});
	// console.log('attractionsList at end of build', attractionsList);
	return attractionsList;
}

getArray.attractionsList = function() {
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
};

getArray.areas = function() {
	return new Promise(function(resolve, reject){
		dataFactory.getAllAreas()
			.then(function(dataFromGetAllAreas){
				resolve(dataFromGetAllAreas);
			})
			.catch(function(err){
				console.log('error', err);
				reject(err);
		});
	});
};

getArray.types = function() {
	return new Promise(function(resolve, reject){
		dataFactory.getAllAttractionTypes()
			.then(function(dataFromGetAllAttractionTypes){
				resolve(dataFromGetAllAttractionTypes);
			})
			.catch(function(err){
				console.log('error', err);
				reject(err);
		});
	});
};

getArray.parkInfo = function() {
	return new Promise(function(resolve, reject){
		dataFactory.getParkInfo()
			.then(function(dataFromGetParkInfo){
				resolve(dataFromGetParkInfo);
			})
			.catch(function(err){
				console.log('error', err);
				reject(err);
		});
	});
};


module.exports = getArray;