'use strict';

let textInput = document.getElementById('text-input');
let typeCheckbox = document.getElementById('typeSearchCheckbox');

let filterHandler = Object.create(null);

// filter an array of attractions based on search
filterHandler.search = function(attraction) {
  // console.log(attraction);
  function stringContains(){
        let textInputRegExp = new RegExp(`${textInput.value}`, 'i');
        // console.log(typeCheckbox.checked);
        // if (attraction.name.toLowerCase().search(textInput.value.toLowerCase()) === -1) {
        	console.log('attraction', attraction);
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
};

module.exports = filterHandler;