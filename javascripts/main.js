'use strict';


let textInput = document.getElementById('text-input');
let searchForm = document.getElementById('search-form');

let app = Object.create(null);
let $ = require('jquery');
let data = require('./data-factory');
let getArray = require('./arrayBuilder');
let getAreaList = require('./arrayBuilder');
let getParkInfo = require('./arrayBuilder');
let userInteraction = require('./userInteractionDOM');
let templates = require('./templates');
let domLoader = require('./loadDOM');

//this is needed for search function TODO - move it to appropriate module.
let attractionsList = [];
// domLoader.attractionsList();
getArray.attractionsList().then(function(dataFromGetAttractionsList){
    attractionsList = dataFromGetAttractionsList;
    $('#attractionList').append(templates.testTemplate({list : attractionsList}));
		userInteraction.nameClick();
});
domLoader.areaList();
domLoader.parkInfo();

app.listGetter = function(){
    return attractionsList;
};

searchForm.addEventListener('submit', function(){
    getArray.attractionsList().then( function(dataFromGetAttractionsList) {
        let attractionsList = dataFromGetAttractionsList;
        return getArray.areas();
    })
    .then(function(dataFromGetAreas){
        let areas = dataFromGetAreas;
        // console.log("attractionsList", attractionsList, "areas", areas);
        let searchedAttractions = attractionsList.filter(function(attraction){
	          // console.log(attraction);
	          function stringContains(){
	              if (attraction.name.toLowerCase().search(textInput.value.toLowerCase()) === -1) {
	                  return false;
	              } else {
	                  let currentArea = areas.filter(function(area){
	                      return attraction.area === area.name;
	                  })[0];
	                  let divIDselector = '#' + 'grid' + currentArea.id;
	                  $(divIDselector).addClass('highlightedArea');
	                  return true;
	              }
	          }
	          return stringContains();
	      });
		    // console.log('searchedAttractions', searchedAttractions);

		    //below empties sidebar and fills with only matching attractions with the matched name
		    $('#attractionList').empty();
		    $('#attractionList').append(templates.testTemplate({list : searchedAttractions}));
				userInteraction.nameClick();
  })
  .catch(function(err){
      console.log('Oops, there was an error', err.statusText);
  });
});



window.app = app;