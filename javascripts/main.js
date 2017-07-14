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
        return getArray.types();
    })
    .then(function(datafromGetTypes){
        // console.log('datafromGetTypes', datafromGetTypes);
        let types = datafromGetTypes;
        return getArray.areas();
    })
    .then(function(dataFromGetAreas){
        let areas = dataFromGetAreas;
        // console.log(attractionsList, types, areas);
        function highlightMapGridBoxes(attraction) {
            let currentArea = areas.filter(function(area){
                return attraction.area === area.name;
            })[0];
            let divIDselector = '#' + 'grid' + currentArea.id;
            $(divIDselector).addClass('highlightedArea');
        }

        // console.log("attractionsList", attractionsList, "areas", areas);
        let searchedAttractions = attractionsList.filter(function(attraction){
	          // console.log(attraction);
	          function stringContains(){
                  let textInputRegExp = new RegExp(`${textInput.value}`, 'i');
                  // console.log(typeCheckbox.checked);
                  // if (attraction.name.toLowerCase().search(textInput.value.toLowerCase()) === -1) {
	              if (typeCheckbox.checked === true) {
                      if (attraction.type.search(textInputRegExp) === -1) {
                          return false;
                      } else {
                          return true;
                      }
                  } else {
                      if (attraction.name.search(textInputRegExp) === -1) {
                          return false;
                      } else {
                          // highlightMapGridBoxes(attraction);
                          return true;
                      }
                  }
	          }
	          return stringContains();
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
                userInteraction.nameClick();

            }
  })
  .catch(function(err){
      console.log('Oops, there was an error', err);
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

function draw() {
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
  context.font = '48px, sans-serif';
  context.fillText('1', 10, 50, 10, 10);
}

draw();

//this should clear the canvas when needed:
//perhaps clear when user clicks the canvas - indicates they want to select area
//context.clearRect(0, 0, canvas.width, canvas.height);

window.app = app;