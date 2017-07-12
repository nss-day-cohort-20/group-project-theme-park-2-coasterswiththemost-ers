'use strict';

let dataFactory = require('./data-Factory');
let parkInfo =[];

function buildParkInfo() {
	return new Promise(function(resolve, reject){
		dataFactory.getParkInfo()
			.then(function(dataFromGetParkInfo){
				parkInfo = dataFromGetParkInfo;
				resolve(dataFromGetParkInfo);
			})
			.catch(function(err){
				console.log('error', err);
				reject(err);
		});
	});
}

module.exports = buildParkInfo;