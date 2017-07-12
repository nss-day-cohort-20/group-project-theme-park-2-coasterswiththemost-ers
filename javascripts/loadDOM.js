'use strict';

let $ = require('jquery');
let getArray = require('./arrayBuilder');
let userInteraction = require('./userInteractionDOM');
let templates = require('./templates');

let domLoader = {};

domLoader.attractionsList = function() {
getArray.attractionsList().then(function(dataFromGetAttractionsList){
    let attractionsList = dataFromGetAttractionsList;
    $('#attractionList').append(templates.testTemplate({list : attractionsList}));
		userInteraction.nameClick();
});
};

domLoader.areaList = function() {
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
};

domLoader.parkInfo = function() {
getArray.parkInfo().then(function(dataFromGetParkInfo) {
    $('#footerDiv').prepend( templates.parkInfo(dataFromGetParkInfo[0]) );
});
};

module.exports = domLoader;