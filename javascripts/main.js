'use strict';

let textInput = document.getElementById('text-input');
let searchForm = document.getElementById('search-form');

let app = Object.create(null);
let $ = require('jquery');
let data = require('./data-factory');
let userInteraction = require('./userInteractionDOM');
let getArray = require('./arrayBuilder');
let templates = require('./templates');
let domLoader = require('./loadDOM');

domLoader.attractionsList();

domLoader.areaList();

domLoader.parkInfo();

//this needs to be declared for search!!!
let attractions = [];
searchForm.addEventListener('submit', function(){
    getArray.attractionsList().then( function(dataFromGetAttractionsList) {
        attractions = dataFromGetAttractionsList;
        return getArray.areas();
    })
    .then(function(dataFromGetAreas){
        let areas = dataFromGetAreas;
        // console.log("attractionsList", attractionsList, "areas", areas);
        let searchedAttractions = attractions.filter(function(attraction){
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