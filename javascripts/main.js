'use strict';

let attractions = [];
let areas = [];
let attractionTypes = [];
let attractionsList = [];
let parkInfo = [];

let textInput = document.getElementById('text-input');
let searchForm = document.getElementById('search-form');

let app = Object.create(null);
let $ = require('jquery');
let data = require('./data-factory');
let userInteraction = require('./userInteractionDOM');
let getArray = require('./arrayBuilder');
let templates = require('./templates');

getArray.attractionsList().then(function(dataFromGetAttractionsList){
    attractionsList = dataFromGetAttractionsList;
    $('#attractionList').append(templates.testTemplate({list : attractionsList}));
		userInteraction.nameClick();
});

getArray.areas().then(function(dataFromGetAreaList) {
    // areas = dataFromGetAreaList;
    let blankGridSpace = {
        colorTheme: "",
        decription: "",
        id: "",
        name: ""
    };
    dataFromGetAreaList.splice(4, 0, blankGridSpace);
    $('#mapGrid').append( templates.gridTemplate({area: dataFromGetAreaList}) );
});

getArray.parkInfo().then(function(dataFromGetParkInfo) {
    parkInfo = dataFromGetParkInfo;
    $('#footerDiv').prepend( templates.parkInfo(parkInfo[0]) );
});


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

$('#mapGrid').on('click', '.mapGridBox', function(){
    $(this).siblings().removeClass('highlightedArea');
    $(this).addClass('highlightedArea');
    let spanContents = $(this).children('span').contents();
    // spanContents[0].data is the name of the area clicked
    getArray.attractionsList().then(function(dataFromGetAttractionsList){
        let areaAttractions = dataFromGetAttractionsList.filter(function(attraction){
            return attraction.area === spanContents[0].data;
        });
        $('#attractionList').empty();
        $('#attractionList').append(templates.testTemplate({list : areaAttractions}));
        userInteraction.nameClick();
    });
});

window.app = app;