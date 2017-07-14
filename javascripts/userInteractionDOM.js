'use strict';

let $ = require('jquery');
let getArray = require('./arrayBuilder');
let templates = require('./templates');
let draw = require('./draw');

let userInteraction = {};
// let attractionListData = require('./attractions-list-data-builder');
userInteraction.nameClick = function()
{
	$('#attractionList li').on('click', function()
	{
	let currentDiv = this.lastElementChild;
	if(currentDiv.classList.contains('isHidden') === false)
	{
		currentDiv.classList.add('isHidden');
	}
	else
	{
		$('#attractionList li div').each( function()
		{
			this.classList.add('isHidden');
		});
		// console.log('does not have isHidden');
		currentDiv.classList.remove('isHidden');
	}
	});
};

userInteraction.highlightGridBox = function() {
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
        draw(areaAttractions);
        userInteraction.nameClick();
    });
	});
};

module.exports = userInteraction;