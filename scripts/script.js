//GLOBAL VARIABLES

const ghosts =  ["freddie", "marsha", "beth", "bjorn", "pat"];


function ghostFileName (ghostName,sign) { //For sign put in 1 or -1
  return (sign < 0) ? `assets/${ghostName}-negative.svg` : `assets/${ghostName}-positive.svg`;
}

function flaskFileName (number) { //takes positive or negative integers betweeen 0 and +-4
  if (number === 0) {return `assets/${number}-flasks`;}
  else {
    return (number > 0) ? `assets/${number}-flasks-pos.svg` : `assets/${number*-1}-flasks-neg.svg`;
   }
  }

function generateImgTag (identifier, sign) { //Identifier is name for ghosts OR number for flasks, sign is 1 or -1. Second argument is only necessary for ghosts

  if (typeof identifier === "number") {
    // const fileName = flaskFileName(identifier);
    return `<img src="${flaskFileName((identifier))} " alt="${identifier} Flasks ">`;
  } else if (typeof identifier === "string" ) {
    // const filename = ghostFileName(identifier, sign);
    return  `<img src="${ghostFileName(identifier,sign)} " alt="${identifier}">`;
  } else {
    return null;
  }
}

function whatType (identifier) {
  return (typeof identifier === "number") ? 'coefficient'  : 'variable';
}

//Makes the flask Data Object used for building flask components
function flaskDataObject (number, exponent) {
  let sign;
  if (number === 0) {
    sign = 0;
  }
  else if (number < 0) {
    sign = -1;
  } else {
    sign = 1;
  }

  return  {
    identifier: number,
    type: "coefficient",
    sign: sign,
    exponent: exponent
  }
}

//Makes the ghost data object used for building ghost components
function ghostDataObject (name, sign, exponent) {
 return  {
    identifier: name,
    type: "variable",
    sign: sign,
    exponent: exponent
  }
}

//Used for testing
const exampleData = [
  ghostDataObject('bjorn',-1,1),
  ghostDataObject('freddie',1,-1),
  flaskDataObject(2,1)
];



//Used to create list items used in algebra addition
//Deprocated
function generateSimpleTerm (identifier, sign) { //Second argument is only necessary for ghosts
  const imgTag = generateImgTag(identifier, sign);

  return `<li class="term">
      <ul class="components">
        <li class="component">
          ${imgTag}
        </li>
      </ul>
  </li>`;
}


//Used to create list items used in algebra multiplication
//DEPROCATED
function generateComponent (identifier, sign) { //Second argument is only necessary for ghosts
  const imgTag = generateImgTag(identifier, sign);
  return `<li class="component">
    ${imgTag}
  </li>`;
}

//Uses the component data object to build a jQuery element with with data embedded
function buildComponent (obj) {
  const imgTag = generateImgTag(obj.identifier, obj.sign);
  const htmlString = `<li class="component ${(obj.exponent === -1) ? "flipped" : ""}">
    ${imgTag}
  </li>`;

  return $(htmlString).data(obj);

}

function compareComponents (component1, component2) {
  const data1 = component1.data();
  const data2 = component2.data();

 return {
    //True if the identifiers match, does not take sign or exponent into account
    match: (data1.identifier === data2.identifier ) ? true : false ,

    //true if one sign is -1 and the other is 1
    oppositeSigns: (data1.sign * data2.sign === -1) ? true  : false ,

    //True if one has exponent 1 and the other -1, does not take sign into consideration.
    inverse:  (data1.exponent * data2.exponent === -1) ? true  : false,

    //true if one or both elements are zero
    zero: (data1.identifier === 0 || data2.identifier === 0) ? true : false
  }
}

//Returns a jQuery Collection based on a selector, datakey and dataValue
function selectByData (selector, dataKey, dataValue) {
  let $filteredElements = $();
  $(selector).each((i,el) => {
    if ($(el).data(dataKey) === dataValue) {
      $filteredElements =  $filteredElements.add(el);
    }
   });
   return $filteredElements;
}


//Used to create direct child of equation list which are used in algebra addition
function buildTerm (dataObjects) { //takes an array of data objects
  //Create a jQuery element with basic structure
  const $htmlTerm =  $(
  `<li class="term">
    <ul class="components">
    </ul>
  </li>`);

  //For each data object, build a component, and append it to the term element.
  dataObjects.forEach((obj) =>{
    const $component = buildComponent(obj);
    $htmlTerm.children().append($component);
  })

  return $htmlTerm;
}


function ghostReserveRefresh (operation, sign, exponent) { //Operation argument is '+', '*'
  $('.ghost-reserve').empty();
  ghosts.forEach(ghost => {
    const ghostData = ghostDataObject(ghost, sign, exponent);
    let $element;
    if (operation === "+") {
      $element  = buildTerm([ghostData]);
    }
    if (operation === "*") {
      $element = buildComponent(ghostData);
    }
    //Add the term to the DOM at the end of the ghost reserve list
    $('.ghost-reserve').append($element);
  });
}

function flaskReserveRefresh (operation, sign, exponent) { //Operation argument is '+' or '*'
  //Removes all elements from flask reserve area
  $('.flask-reserve').empty();
  for (let i = 1; i <= 4; i++) {
    const flaskData = flaskDataObject(i*sign, exponent);
    let $element;
    if (operation === "+") {
      $element  = buildTerm([flaskData]);

    }
    if (operation === "*") {
      $element = buildComponent(flaskData);
    }
    //Add the term to the DOM at the end of the flask reserve list
    $('.flask-reserve').append($element);
  }
}


function playerActionsRefresh (operation, sign, exponent) {
  flaskReserveRefresh(operation, sign, exponent);
  ghostReserveRefresh(operation, sign, exponent);
  $('.equation__terms-list').sortable();
  $('.components').sortable();
  $('.reserve').sortable();
  //For addition, term level sorting
  if (operation === "+") {
    $('.plus').addClass('active-button');
    $('.times-symbol').removeClass('active-button');

    //Disable component level sorting
    $('.components').sortable('disable');

    //Enable term level sorting
    $('.equation__terms-list').sortable('enable');

    //connect reserves with term list in the equation area
    $('.reserve').sortable('option', 'connectWith', '.equation__terms-list' );
      }

  //For Multipliation, component level sorting
  if (operation === "*") {
    $('.times-symbol').addClass('active-button');
    $('.plus').removeClass('active-button');

    //Disable term level sorting in the equation
    $('.equation__terms-list').sortable('disable');

    //Enable compnent level sorting
    $('.components').sortable('enable');

    //Connect reserve list with components in the equation area.
    $('.reserve').sortable('option', 'connectWith', '.equation__terms-list .components' );
  }
}

function currentReserveSign () {
  return  $('.flask-reserve .component').data('sign');
}

function currentExponent () {
 return $('.flask-reserve .component').data('exponent');
}

function activeOperation () {
  if ($('.plus').hasClass('active-button')) {return "+"}
  else if ($('.times-symbol').hasClass('active-button')) {return "*"}
  else {return null;}
}

$(function() {


  //Preload negative images
  playerActionsRefresh('+',-1, 1);

  //Initialize the player action area
  playerActionsRefresh('+',1, 1);



 // Player Action Button Events Handlers
  $('.plus').click(function () {
    playerActionsRefresh('+', currentReserveSign(), currentExponent() );
  });
  $('.positive-negative').click(function () {
    playerActionsRefresh(activeOperation(), -1 * currentReserveSign(), currentExponent() );
  });
  $('.times-symbol').click(function () {
    playerActionsRefresh("*", currentReserveSign(), currentExponent());
  });
  $('.flip').click(function () {
    playerActionsRefresh(activeOperation(), currentReserveSign(), -1 * currentExponent());
  });


  //Equation Event Handlers

  // $( ".equation__terms-list" ).on( "sortreceive", function( event, ui ) {
  //   console.log(event, ui);
  // });
  $( ".equation__terms-list" ).on( "sortover", function( event, ui ) {
    console.log(event, ui);
  });

});