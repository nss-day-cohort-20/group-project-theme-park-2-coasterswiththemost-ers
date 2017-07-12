'use strict';

let dataFactory = require('./data-Factory');
let areaList = [];

function buildAreaList() {
	return new Promise(function(resolve, reject){
		dataFactory.getAllAreas()
			.then(function(dataFromGetAllAreas){
				// dataFromGetAllAreas.splice(4, 0, blankGridSpace);
				// areaList = dataFromGetAllAreas;
				resolve(dataFromGetAllAreas);
			})
			.catch(function(err){
				console.log('error', err);
				reject(err);
		});
	});
}

module.exports = buildAreaList;

