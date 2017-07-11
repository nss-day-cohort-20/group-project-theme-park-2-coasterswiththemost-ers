'use strict';

let $ = require('jquery');

const dataFactory = Object.create(null);

dataFactory.getAllAttractions = function() {
  return new Promise( function(resolve, reject){
    $.ajax({
      url: "https://themepark-a3934.firebaseio.com/attractions.json"
    })
    .done(function(data) {
    	// console.log('attractions', data);
      resolve(data);
    })
    .fail(reject);
  });
};

dataFactory.getAllAreas = function() {
	return new Promise( function(resolve, reject){
    $.ajax({
      url: "https://themepark-a3934.firebaseio.com/areas.json"
    })
    .done(function(data) {
    	// console.log('areas', data);
      resolve(data);
    })
    .fail(reject);
  });
};

dataFactory.getAllAttractionTypes = function() {
	return new Promise( function(resolve, reject){
    $.ajax({
      url: "https://themepark-a3934.firebaseio.com/attraction_types.json"
    })
    .done(function(data) {
    	// console.log('attraction types', data);
      resolve(data);
    })
    .fail(reject);
  });
};

module.exports = dataFactory;