'use strict';

let $ = require('jquery');
let getArray = require('./arrayBuilder');
let userInteraction = require('./userInteractionDOM');
let templates = require('./templates');

let domLoader = {};

domLoader.attractionsList = function() {
    getArray.attractionsList().then(function(dataFromGetAttractionsList){
        $('#attractionList').append(templates.testTemplate({list : dataFromGetAttractionsList}));
    		userInteraction.nameClick();
    });
};

domLoader.areaList = function() {
    getArray.areas().then(function(dataFromGetAreaList) {
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
        var today = new Date();
        var year = today.getFullYear();
        dataFromGetParkInfo[0].year = year;
        $('#mainFooter').prepend( templates.parkInfo(dataFromGetParkInfo[0]) );
    });
};

module.exports = domLoader;