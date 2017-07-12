'use strict';

let dataFactory = require('./data-Factory');
let areaList = [];

function buildAreaList() {
	return new Promise(function(resolve, reject){
		dataFactory.getAllAreas()
			.then(function(dataFromGetAllAreas){
				areaList = dataFromGetAllAreas;
				console.log('getAllareas areaList', areaList);
				resolve(dataFromGetAllAreas);
			})
			.catch(function(err){
				console.log('error', err);
				reject(err);
		});
	});
}

module.exports = buildAreaList;

