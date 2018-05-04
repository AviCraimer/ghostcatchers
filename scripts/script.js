//GLOBAL VARIABLES

const ghosts =  ["freddie", "marsha", "beth", "bjorn", "pat"];


//Used for testing
const exampleData = [
  ghostDataObject('bjorn',-1,1),
  ghostDataObject('freddie',1,-1),
  flaskDataObject(2,1)
];



const currentLevel = 1;
const levels = Array(10);

levels[0]  = {
    name: "Level 1",
    introText:
    `<h2>Level 1 - Catch Freddie</h2>
<p>Your pet ghost has escaped again. To catch him you have to get him all by himself.</p>
<p>He is stuck between two Martha ghosts who are different colours?</p>
<p>Can you figure out how to get Freddie alone?</p>`,
    winText:
    `<h2>Level 1 - Win!!</h2>
<p>Great Job! </p>
<p>Remember two ghosts with  opposite colours will transform into an empty flask.</p>
<p>You can click an empty flask to make it disapper.</p>`,

    side1:
      [
        [ ghostDataObject('beth',-1,1) ],
        [ ghostDataObject('freddie',1,1) ],
        [ ghostDataObject('beth',1,1) ]
      ],
    side2: [ [flaskDataObject(3,1), ghostDataObject('bjorn',1,-1)] ]
  }

levels[1] = {
  name: "Level 1",
  introText: "Cancelling ones",
  side1:
    [
      [ ghostDataObject('marsha', 1, 1) ],
      [ ghostDataObject('freddie', 1, 1), flaskDataObject(1,1)],
      [ ghostDataObject('marsha', -1, 1), flaskDataObject(1,1)]
    ],
  side2: [ [ghostDataObject('pat',1,1)] ]
};


//Template
levels[9] = {
  name: "Level 1",
  introText: "Cancelling ones",
  side1:
    [
      [ ], //term1
      [ ], //term2
      [ ] //term3
    ],
  side2:
    [
      [], //term1
      [], //term2
      [] //term3
    ]
};



//FUNCTIONS

//ELEMENT BUILDING FUNCTIONS

function ghostFileName (ghostName,sign) { //For sign put in 1 or -1
  return (sign < 0) ? `assets/${ghostName}-negative.svg` : `assets/${ghostName}-positive.svg`;
}

function flaskFileName (number) { //takes positive or negative integers betweeen 0 and +-4
  if (number === 0) {return `assets/${number}-flasks.svg`;}
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
    // numericValue: number,
    type: "coefficient",
    sign: sign,
    exponent: exponent
  }
}

//Makes the ghost data object used for building ghost components
function ghostDataObject (name, sign, exponent) {
 return  {
    identifier: name,
    // numericValue: 1,
    type: "variable",
    sign: sign,
    exponent: exponent
  }
}

//Used to create list items used in algebra addition
//Deprocated
// function generateSimpleTerm (identifier, sign) { //Second argument is only necessary for ghosts
//   const imgTag = generateImgTag(identifier, sign);

//   return `<li class="term">
//       <ul class="components">
//         <li class="component">
//           ${imgTag}
//         </li>
//       </ul>
//   </li>`;
// }

//Used to create list items used in algebra multiplication
//DEPROCATED
// function generateComponent (identifier, sign) { //Second argument is only necessary for ghosts
//   const imgTag = generateImgTag(identifier, sign);
//   return `<li class="component">
//     ${imgTag}
//   </li>`;
// }

//Uses the component data object to build a jQuery element with with data embedded
function buildComponent (obj) {
  const imgTag = generateImgTag(obj.identifier, obj.sign);
  const htmlString = `<li class="component ${(obj.exponent === -1) ? "flipped" : ""}">
    ${imgTag}
  </li>`;

  return $(htmlString).data(obj);
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

function buildZeroFlask () {
  const zeroElement =  buildTerm( [flaskDataObject(0,1)]);
  $(zeroElement).addClass('animated jackInTheBox');
  return zeroElement;
}


//END OF ELEMENT BUILDING FUNCTIONS



// TESTING FUNCTIONS

function whatType (identifier) {
  return (typeof identifier === "number") ? 'coefficient'  : 'variable';
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

function compareComponents (component1, component2) { //Takes two html component elements
  const data1 = $(component1).data();
  console.log("data1",data1);
  const data2 = $(component2).data();
  console.log("data2",data2);

 return {
    //True if the identifiers match, it is not sensitive to differences in sign or exponent.
    match: (data1.identifier === data2.identifier ||  data1.identifier === data2.identifier*-1 ) ? true : false,

    //true if one sign is -1 and the other is 1
    oppositeSigns: (data1.sign * data2.sign === -1) ? true  : false ,

    //True if one has exponent 1 and the other -1, does not take sign into consideration.
    inverse:  (data1.exponent * data2.exponent === -1) ? true  : false,

    //true if one or both elements are zero
    zero: (data1.identifier === 0 || data2.identifier === 0) ? true : false
  }
}

//Note, this test is not sensitive to matching the sign.
function inverseTest (component1, component2 ) {
  const results =  compareComponents (component1, component2);
  return (results.inverse && results.match) ? true : false ;
}

function signMatchTest (component1, component2) {
  const results =  compareComponents (component1, component2);
  return (!results.oppositeSigns) ? true : false ;
}
function matchTest (component1, component2) { //Checks for matching values, not including sign or exponent
  const results =  compareComponents (component1, component2);
  return (results.match) ? true : false ;
}


function getComponentData ($components) {
  let data = [];
  $components.each((i,el) =>  {
   data.push( $(el).data() );
  });
  return data;
}


function termMatch (term1, term2) { //Takes two HTML .term elements returns whether they match componets wise, disregarding order

  //test to see if the terms have different numbers of components, if so then return false.
  if ($(term1).find('.component').length !== $(term2).find('.component').length ) {
    return false;
  }

  //Get data from term components
  const term1Data =  getComponentData( $(term1).find('.component') );
  const term2Data = getComponentData( $(term2).find('.component') );


  //function to getId using absolute value to avoid having the sign of the flasks impact the match
  function getId(x) {
    if (typeof x.identifier === "number") {
    return Math.abs(x.identifier);
  } else {
    return x.identifier;
  }
 }

 //Get array of just the identifiers and sort them.
  const ids1 = term1Data.map(getId).sort();
  const ids2 = term2Data.map(getId).sort();

  //Check each id to make sure it matches. If it doesn't return false.
    for (let i = 0; i < ids1.length; i++) {
        if (ids1[i] !== ids2[i] ) {
           return false;
        }
    }
  //If no mismatch has been found, return tru
  return true;
}


function termSign (term) { //Takes an HTML .term element
  const components = $(term).find('.component');
  let termSign = 1;
  components.each((i,el) => {
    termSign = termSign * $(el).data("sign");
  });
  return  termSign;
}


function additiveCancellationTest(term1, term2 ) {
  if ( termSign(term1) ===  termSign(term2) ) {
    return false;
  } else {
   return  ( termMatch(term1, term2) ) ? true  : false ;
  }
}


function compareAdjacentElements ($siblings, testFunction ) {
  // $siblings could be a jQuery collection, or a vanilla array of sibling dom elements.
  //test function takes two $elements and returns value of true or false
  //REMEMBER NOT TO CALL THE FUNCTION THAT YOU PASS AS AN ARGUMENT. NO BRACKETS!
  const results = [];
  for (let i = 0; i < $siblings.length - 1; i++) {
    const firstElement  = $siblings[i];
    // console.log("firstElement", firstElement);
    const secondElement  = $siblings[i+1];
    // console.log("secondElement", secondElement);

    const test = testFunction(firstElement, secondElement);
    console.log(test);
    const $pair = $(firstElement).add(secondElement);
    results.push(
      {test: test,
       $pair: $pair}
    );
  }
  return results;
  // return (results.length > 0) ? results : null ;
   //If there are any adjacent elements, it will return an array of results objects. Each object contains the test result and the jquery collection of the two adjacent elements being compared.
   //If there are just two siblings, it will still return the results as a sole object inside an array.
   //Don't forget to use [] notation to get at the actual results object, before trying to access its properties.
}



//Returns a jQuery Collection based on a selector, datakey and dataValue
function selectByData ($elements, dataKey, dataValue) {
  let $filteredElements = $();
  $elements.each((i,el) => {
    if ($(el).data(dataKey) === dataValue) {
      $filteredElements =  $filteredElements.add(el);
    }
   });
   return $filteredElements;
}

function dectectWin() {
  let noSiblings;
  $('.equation img[alt="freddie"]').each((i,el) => {
    const numberOfSiblings =  $(el).closest('.equation .term').siblings().length;
    if (numberOfSiblings === 0) {
      noSiblings = el;
    }
  });
  // console.log(noSiblings);
  return (noSiblings) ? noSiblings.closest('.terms') : false;
  //It returns the side of the equation that won.
}


//END OF TESTING FUNCTIONS


//PAGE UPDATING FUNCTIONS

//This function builds an equatioon side and adds it to the page, destroying whatever is currently in the equation side.
function equationSideRefresh (termArray, sideNumber) {
  //second argument is 1 or 2
  //First argument takes an array of arrays of component data objects, i.e, [ [{},{},{}], [{}],  [{}] ]
  const $side = $(`.equation__terms-list--side${sideNumber}`);
  $side.empty();

  termArray.forEach((objArray) => {
    const term = buildTerm(objArray);
    $side.append(term);
  });
}

//Ensures that any newley created elements are sortable
function sortableRefresh () {
  $('.reserve').sortable();
  $('.reserve .components').sortable();
  $('.equation__terms-list').sortable({
    containment: "parent",
    distance: 5,
    update: termUpdate
  } );
  $('.equation .components').sortable({
      distance: 5,
      update: function (event) {
         termUpdate(event);
         componentUpdate(event);
        }
    });
}

function levelRefresh (levelObj) {
//Level object has 3 properties:   {side1:, side1:. intro-text:  }

equationSideRefresh(levelObj.side1, 1);
equationSideRefresh(levelObj.side2, 2);
sortableRefresh()

//TO ADD: RUN INTRO TEXT
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
  sortableRefresh ()

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

function displayLevelCard(levelObj) {
 $('.level-content').html(levelObj.introText);
 $('.level-card').addClass('show');
}

function displayWin(levelObj) {
 $('.level-content').html(levelObj.winText);
 $('.level-card').addClass('show');
}

//EVENT HANDLING FUNCTIONS
function levelSelect(event) {
  let value;
  let levelNumber;
  let level;
  if (event.target) {
    value = event.target.value;
    levelNumber = Number(value.split(" ")[1]);
    level = levels[levelNumber-1];
  } else {
    level = event;
  }
  levelRefresh(level);
  displayLevelCard(level);
  flaskReserveRefresh("+", 1, 1);
  ghostReserveRefresh("+", 1, 1);
  sortableRefresh ()
}




function termUpdate(event) {

  const $termList = $(event.target).closest('.terms') ; //Selects the terms UL
  const testResults =  compareAdjacentElements($termList.children(), additiveCancellationTest);

  //Remove Bounce Class on All False Pairs
  testResults.forEach(result => {
    if (result.test === false) {
      result.$pair.removeClass('bounce');
    }
  });
  //Add bounce, animated, and infinite to all true pairs.
  testResults.forEach(result => {
    if (result.test === true) {
      result.$pair.addClass('animated bounce infinite');
    }
  });
}


function componentUpdate (event) {
  $componentsList = $(event.target);
  const testResults = compareAdjacentElements($componentsList.children(), inverseTest )

  //Remove Swing Class on All False Pairs
  testResults.forEach(result => {
    if (result.test === false) {
      result.$pair.removeClass('swing');
    }
  });

  //Add swing, animated, and infinite to all true pairs.
  testResults.forEach(result => {
    if (result.test === true) {
      result.$pair.addClass('animated swing infinite');
    }
  });
}

//Cancels components where 1-flask is being multiplied by other components
function componentCancel(event) {
  const $componentLi = $(event.currentTarget);
  let $remove = $componentLi;
  const prev = ($componentLi.prev().length > 0 ) ? $componentLi.prev() : null ;
  const next = ($componentLi.next().length > 0 ) ? $componentLi.next() : null ;

  if ( $componentLi.hasClass("swing") ) {
    if (prev) {
      if ($(prev).hasClass("swing") && $(prev).data("identifier") === $componentLi.data("identifier") ) {
        $remove = $remove.add( prev );
      }
    }
    if (next) {
      if ($(next).hasClass("swing") && $(next).data("identifier") === $componentLi.data("identifier") ) {
        $remove = $remove.add( next );
      }
    }
  }

  //Remove the swing class, even for 3 in a row,
  $remove.removeClass('swing');

  //If there are three in a row, only the first two cancel
  if ($remove.length > 2) {
    $remove = $remove.eq(0).add($remove.eq(1));
  }

  $remove.eq(0).removeClass('infinite').addClass('rollOut');
  $remove.eq(1).removeClass('infinite').addClass('rollOut');

  const oneFlask =  buildComponent(flaskDataObject(1,1));

  oneFlask.addClass('zoomIn animated no-after');

  setTimeout(() => {
    $remove.eq(0).after(oneFlask);
  }, 500);

  setTimeout(() => {
    $remove.remove();
    oneFlask.removeClass('zoomIn no-after');
  }, 1200);
}

//Cancels like terms that have opposite signs
function termCancel (event) {
  const $termLi = $(event.currentTarget);
  let $remove = $termLi;
  const prev = ($termLi.prev().length > 0 ) ? $termLi.prev() : null ;
  const next = ($termLi.next().length > 0 ) ? $termLi.next() : null ;

  if ( $termLi.hasClass("bounce") ) {
    if (prev) {
      if ($(prev).hasClass("bounce") && termMatch($termLi[0], prev )) {
        $remove = $remove.add( prev );
      }
    }
    if (next) {
      if ($(next).hasClass("bounce") && termMatch($termLi[0], next )) {
        $remove = $remove.add( next );
      }
    }
  }


  //Remove the bounce class, even for 3 in a row, all spot bouncing
  $remove.removeClass('bounce');

  //If there are three in a row, only the first two cancel
  if ($remove.length > 2) {
    $remove = $remove.eq(0).add($remove.eq(1));
  }

  $remove.eq(0).removeClass('infinite').addClass('bounceOutRight');
  $remove.eq(1).removeClass('infinite').addClass('bounceOutLeft');

  const zeroFlask = buildZeroFlask();

  $remove.eq(0).after(zeroFlask);

  setTimeout(() => {
    $remove.remove();
    zeroFlask.removeClass('jackInTheBox').addClass('pulse infinite');
  }, 500);
}


function zeroCancel (event) {
  const $termLi = $(event.currentTarget);
  const $components = $termLi.find('.component');

  //Select only the components that have 0 as an identifier
  const $zeros = selectByData($components, "identifier", 0);

  //If there are any zeros in the term, cancel the whole term.
  if ($zeros.length > 0) {
    $termLi.removeClass('infinite pulse').addClass('zoomOut');

    setTimeout(() => {
      $termLi.remove();
    }, 500);
  }
}


function oneCancel (event) {
  const $componentLi = $(event.currentTarget);

  //If there is a 1-flask component with at least 1 sibling remove it
  if ($componentLi.data("identifier") === 1 && $componentLi.siblings().length >  0) {
    $componentLi.addClass('infinite rollOut animated');

    //get a sibling to be target for term update
    const $sibling = $componentLi.siblings().eq(0);

    setTimeout(() => {
      $componentLi.remove();

      //Check if terms additively cancel without the one.
      termUpdate({target: $sibling});
    }, 500);
  }
}



//END OF PAGE UPDATING FUNCTIONS



//DOCUMENT READY FUNCTION
$(function() {
  //Load Level 1
  levelSelect(levels[0])

  //Preload negative images
  playerActionsRefresh('+',-1, 1);

  //Initialize the player action area
  playerActionsRefresh('+',1, 1);


  //Level Event Handlers
  $('header select').change(function (event) {
    levelSelect(event);
  } );

  $('.level-card').click(function () {
    $(this).removeClass('show');
  });

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
  $('.equation').on('click', '.term', function (event) {
    if ($(this).hasClass('bounce')) {
      termCancel(event);
    }
    zeroCancel(event);
  });

  $('.equation').on('click', '.component', function (event) {
    oneCancel(event);

    if ($(this).hasClass('swing') ) {
      componentCancel(event);
    }
  });

});//END OF DOCUMENT READY FUNCTION