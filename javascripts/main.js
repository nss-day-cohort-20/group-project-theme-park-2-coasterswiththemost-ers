'use strict';

let $ = require('jquery');

let textInput = document.getElementById('text-input');
let typeCheckbox = document.getElementById('typeSearchCheckbox');
let searchForm = document.getElementById('search-form');
var Handlebars     = require('handlebars');
var HandlebarsIntl = require('handlebars-intl');
HandlebarsIntl.registerWith(Handlebars);

let app = Object.create(null);
let data = require('./data-factory');
let getArray = require('./arrayBuilder');
let getAreaList = require('./arrayBuilder');
let getParkInfo = require('./arrayBuilder');
let userInteraction = require('./userInteractionDOM');
let templates = require('./templates');
let domLoader = require('./loadDOM');
let moment = require('moment');
let draw = require('./draw');
let filterHandlers = require('./filterArray');

// puts initial full attraction list on page
domLoader.attractionsList();

// puts area grid on page
domLoader.areaList();

// puts park info footer on page
domLoader.parkInfo();

// app.listGetter = function(){
//     return attractionsList;
// };

searchForm.addEventListener('submit', function(){
    let attractionsList;
    let types;
    let areas;
    getArray.attractionsList().then( function(dataFromGetAttractionsList) {
        // console.log('dataFromGetAttractionsList', dataFromGetAttractionsList);
        attractionsList = dataFromGetAttractionsList;
        // console.log('attractionsList',attractionsList);
        return getArray.types();
    })
    .then(function(datafromGetTypes){
        // console.log('datafromGetTypes', datafromGetTypes);

        types = datafromGetTypes;
        return getArray.areas();
    })
    .then(function(dataFromGetAreas){
        areas = dataFromGetAreas;
        // console.log(types);
        function highlightMapGridBoxes(attraction) {
            let currentArea = areas.filter(function(area){
                return attraction.area === area.name;
            })[0];
            let divIDselector = '#' + 'grid' + currentArea.id;
            $(divIDselector).addClass('highlightedArea');
        }

        // console.log("attractionsList", attractionsList);
        let searchedAttractions = attractionsList.filter(function(attraction) {
            // console.log("attraction", attraction);
            return filterHandlers.search(attraction);
        });
            let userInputTime = document.getElementById('time').value;
            if(!userInputTime)
            {
                // console.log('empty');
                $('.mapGridBox').removeClass('highlightedArea');
                searchedAttractions.forEach(function(attraction){
                    highlightMapGridBoxes(attraction);
                });

                $('#attractionList').empty();
                $('#attractionList').append(templates.testTemplate({list : searchedAttractions}));
                draw(searchedAttractions);
                userInteraction.nameClick();
            }
            else
            {
                userInputTime = moment(userInputTime, ["h:mm"]).format("h:mmA");
                let userInputMoment = moment(userInputTime, ["h:mmA"]);
                // console.log('userInputMoment', userInputMoment);
                // console.log("userInputTime",userInputTime);
                // console.log('searchedAttractions', searchedAttractions);
                let timeFilteredAttractions = searchedAttractions.filter( function(attractionObj)
                {
                    if(attractionObj.times === undefined)
                    {
                        return false;
                    }
                    else
                    {
                        let booleanTimesArray = attractionObj.times.map(function(time){
                            let attractionTimeMoment = moment(time, ["h:mmA"]);
                            // console.log('attractionTimeMoment', attractionTimeMoment);
                            let timeDiff = attractionTimeMoment.diff(userInputMoment, 'minutes');
                            // console.log('timeDiff', timeDiff, typeof(timeDiff));
                            if (timeDiff >= 0 && timeDiff <= 60) {
                                return true;
                            } else {
                                return false;
                            }
                        });
                        // return attractionObj.times.includes(userInputTime);
                        // console.log('booleanTimesArray includes true', booleanTimesArray.includes(true));
                        return booleanTimesArray.includes(true);
                    }
                });
                $('.mapGridBox').removeClass('highlightedArea');
                timeFilteredAttractions.forEach(function(attraction){
                    highlightMapGridBoxes(attraction);
                });

                $('#attractionList').empty();
                $('#attractionList').append(templates.testTemplate({list : timeFilteredAttractions}));
                draw(timeFilteredAttractions);
                userInteraction.nameClick();

            }
  })
  .catch(function(err){
      console.log('Oops, there was an error', err);
  });
});

// jquery click handler highlight grid and upadate attraction list
userInteraction.highlightGridBox();


window.app = app;