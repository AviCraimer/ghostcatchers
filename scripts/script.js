//GLOBAL VARIABLES

// const ghosts =  ["freddie", "marsha", "beth", "bjorn", "pat"];
const ghosts =  ["freddie", "marsha", "beth", "bjorn"];


//Used for testing
const exampleData = [
  ghostDataObject('bjorn',-1,1),
  ghostDataObject('freddie',1,-1),
  flaskDataObject(2,1)
];



const currentLevel = 1;
const levels = Array(10);


const gameState = {
  currentLevelIndex: 0,
  unresolvedComponentDrop: false,
  unresolvedTermDrop: false
}





//LEVELS CONTENT

//Level 1
levels[0]  = {
    name: "Level 1",
    introText:
    `<h2>Level 1 - Catch Freddie</h2>
<p>Your pet ghost has escaped again. To catch him you have to get him all by himself. He's stuck between two Beth ghosts who are different colours.</p>
<p>Can you figure out how to get Freddie alone?</p>`,
    winText:
    `<h2>You Win!</h2>
<p>Click on any two similar ghosts with different colours to transform them into an empty flask.</p>
<p>You can click an empty flask to make it disapper.</p>`,

    side1:
      [
        [ ghostDataObject('beth',-1,1) ],
        [ ghostDataObject('freddie',1,1) ],
        [ ghostDataObject('beth',1,1) ]
      ],
    side2: [ [flaskDataObject(3,1), ghostDataObject('beth',1,-1)] ]
  }


// Level 2
// 	--More cancelling, including cancelling bigger terms
// 	--freddie on other side of the equation.
levels[1] = {
  name: "Level 2",
  introText: `<h2>Level 2 - Too Many Freddies</h2>
  <p>Freddie is on the loose again. This time he's split up into several copies, changed colours, and gotten glued to a pair of Bjorn ghosts. What a mess!</p>
  <p>Can you find a way to get just one Freddie?</p>`,
  winText: `<h2>You Win!</h2>
  <p>You can cancel out multiple ghosts at once if they have the same ghost types with opposite colors.</p>`,
  side1:
    [
      [ghostDataObject('marsha', 1,-1)  ], //term1
      [ghostDataObject('beth', 1,1)  ], //term1
      [  flaskDataObject(-1,1) ], //term2
      [ ghostDataObject('marsha',-1,-1) ] //term3
    ],
  side2:
    [
      [ghostDataObject('freddie', -1, 1), ghostDataObject('bjorn', 1,-1) ], //term1
      [ ghostDataObject('freddie', 1, 1)  ], //term2
      [ghostDataObject('freddie', 1, 1), ghostDataObject('bjorn', 1,-1) ] //term3
    ]
};


// Level 3
// 	--adding to both sides
levels[2] = {
  name: "Level 3",
  introText: `<h2>Level 3 - A Little Over Here, a Little Over There</h2>
  <p>This time Beth and Freddie went out just the two of them. Luckily, you can add an opposite coloured Beth to the game  board from your reserve area (the top row).</p>
  <p>Be warned! Every time you add something to one half of the board, you  have to add the same thing to the other half.</p>`,
  winText: `<h2>You Win!</h2>
  <p>Amazing!!! You are starting to become an expert ghost catcher. You can always add something the board, but be careful not to abuse your new power. Adding the wrong item to the board will make it harder to win.</p>`,
  side1:
    [
      [ ghostDataObject('freddie', 1, 1) ], //term1
      [ ghostDataObject('beth', -1, 1) ] //term2
    ],
  side2:
    [
      [flaskDataObject(3,1) ] //term1
    ]
};
// Level 4
// 	Bigger adding to both sides
levels[3] = {
  name: "Level 4",
  introText: `<h2>Level 4 - Day to Night</h2>
  <div class="imgWrap" title="Switch Colours"><img src="assets/negative.png" alt=""></div>
  <p>Woah, can you say colour clash!  Sometimes to get rid of a bright coloured ghost you need to add a dark ghost to the board.</p>
  <p>Click the switch colors button to change the colours of items in your reserve.</p>`,
  winText: `<h2>You Win!</h2>
  <p> Think carefully about the colour of the ghost before adding it to the board. Make sure it will help you get Freddie by himself.</p>`,
  side1:
    [
      [ghostDataObject('freddie', 1, 1) ], //term1
      [ghostDataObject('marsha', 1, 1)   ], //term2
      [ghostDataObject('beth', 1, 1 ) ], //term3
      [flaskDataObject(4,1) ] //term4
    ],
  side2:
    [
      [flaskDataObject(2,-1), ghostDataObject('bjorn', 1,1) ] //term1
    ]
};


// Level 5
//Practice switching back and forth

levels[4] = {
  name: "Level 5",
  introText: `<h2>Level 5 - Back and Forth</h2>
  <p>Being a ghost catcher keeps you busy from morning 'till night!  To win this level, switch back and forth from light to dark colours.</p>
  <p>Don't forget to watch for opposites already on the game board!</p>`,
  winText: `<h2>You Win!</h2>
  <p>You got this colour thing all wrapped up! </p>`,
  side1:
    [
      [ghostDataObject('marsha', 1, 1)] //term1
    ],
  side2:
    [
      [ghostDataObject( 'bjorn',-1,1) ], //term
      [ ghostDataObject( 'beth',1,1) ], //term
      [ flaskDataObject(-3,1) ,  ghostDataObject('bjorn', 1, 1 )  ], //term
      [ ghostDataObject('freddie',1,1 )  ], //term
      [flaskDataObject(-3,1),  ghostDataObject('bjorn', -1, 1 )  ] //term
    ]
};


// Level 6

// 	--Cancelling 1s


levels[5] = {
  name: "Level 6",
  introText: `<h2>Level 6 - A Little Treat for Your Ghosts Buddies</h2>
  <p>Ghosts love ectoplasm. They drink it in flasks like soda.</p>
  <p>If you see a single green flask glued to a ghost or a group you can click it to make it disapear. No such luck with flasks that come in twos or threes or fours. Even the thirstiest ghost can't drink more than one flask at a time.</p>`,
  winText: `<h2>You Win!</h2>
  <p>You made those thirsty ghosts very happy.</p>`,
  side1:
    [
      [ ghostDataObject('beth', 1, 1), flaskDataObject(1,1) ],
      [ ghostDataObject('freddie', 1, 1), flaskDataObject(1,1)],
      [ flaskDataObject(1,1), ghostDataObject('marsha', -1, 1) ]
    ],
  side2:
    [
      [  ghostDataObject('beth',1,1), flaskDataObject(-1,1) ]
    ]
};


// Level 7
//   --Cancelling flipped


levels[6] = {
  name: "Level 7",
  introText: `<h2>Level 7 - The Upside Down </h2>
  <p>You might have noticed that ghosts like to stick together, litterally! They also flip upside down dyfing gravity (yes, ghosts are weird).</p>

  <p>When two ghost of the same type are flipped in opposite directions, you can tap to transform them. What do they become?</p>`,
  winText: `<h2>You Win!</h2>
  <p>Wow, those topsey turvey ghosts become a single full flask. Who's drinking who now?  </p>`,
  side1:
    [
      [ ghostDataObject('freddie', 1, 1), ghostDataObject('marsha', 1, -1), flaskDataObject(1,1)  , ghostDataObject('marsha', 1, 1)   ], //term1
      [ghostDataObject('bjorn', 1, 1),ghostDataObject('freddie', 1, 1),  flaskDataObject(1,1) , ghostDataObject('freddie', 1, -1),  ghostDataObject('bjorn', 1, -1) ] //term2

    ],
  side2:
    [
      [flaskDataObject(2,1) ], //term1
    ]
};


// Level 8
// 	--Multiplying all terms

levels[7] = {
  name: "Level 8",
  introText: `<h2>Level 8 - Ghosts Everywhere!</h2>
  <div class="imgWrap" title="Multiply"><img src="assets/times.png" alt=""></div>
  <p>Click the dot botton to glue a ghost from your reserve into a group on the game board.</p>

  <p> When you glue a ghost into one group, you must put the same ghost into every other group.</p>
  `,
  winText: `<h2>You Win!</h2>
    <p>That's a lot of ghosts. Sometimes, you just gotta throw your ghost around. </p>
  `,
  side1:
    [
      [
        ghostDataObject('freddie', 1, 1),
        ghostDataObject('beth', 1, -1),
        ghostDataObject('bjorn', 1, -1),
        ghostDataObject('marsha', 1, -1)

      ] //term1

    ],
  side2:
    [
      [flaskDataObject(-3,1) ], //term1
      [flaskDataObject(1,1)], //term2
      [flaskDataObject(2,-1)] //term3
    ]
};

// Level 9
// 	--Flipping.

levels[8] = {
  name: "Level 9",
  introText: `<h2>Level 9 - Flipping Out</h2>
              <div class="imgWrap" title="Flip"><img src="assets/flip.png" alt=""></div>
              <p>Sometime the thing you need to add is just not the right way round. Click the flip button to switch the direction of your reserves.</p>
              <p>Don't forget to switch to dot mode to glue into groups.</p>`,
  winText: `<h2>You Win!</h2>
            <p>You're a ghost catching ninja, somersaulting your way to victory!</p>`,
  side1:
    [
      [flaskDataObject(-4,1) ], //term1
      [ ghostDataObject('marsha', 1, -1) ] //term2

    ],
  side2:
    [
      [
        ghostDataObject('freddie', 1, 1),
        ghostDataObject('beth', 1, 1),
        flaskDataObject(2,1),
        ghostDataObject('bjorn', 1, -1)
      ] //term
    ]
};


//Level 10
// 	--Addition and multiplication
levels[9] = {
  name: "Level 10",
  introText: `<h2>Level 10 - One Flask to Rule Them All</h2>
  <p>Now it time to prove your mastery of the ghost catching arts.</p>
  <p>Add, glue, colour switch, and flip. You'll need it all for this one! </p>`,
  winText: `<h2>You Win!</h2>
  <p>You are ready...for the secret bonus round!</p>`,
  side1:
    [
      [flaskDataObject(3,-1),  ghostDataObject('marsha', -1, 1) ], //term1
      [ ghostDataObject('freddie', 1, 1), ghostDataObject('marsha', -1, 1)  ], //term2
      [ghostDataObject('marsha', -1, 1), ghostDataObject('bjorn', -1, 1)   ] //term3
    ],
  side2:
    [
      [flaskDataObject(1,1) ], //term1
    ]
};

//Level 11
// bonus
levels[10] = {
  name: "Level 11",
  introText: `<h2>Secret Bonus Level - Freddie Learns to Teleport</h2>
             <p>Freddie went went and got himself stuck upside down. It's up to you to spin him right round. </p>`,
  winText: `<h2>You Have Beaten the Game!</h2>
            <p>Good for you, you are officially just as smart as a grade 8 algebra student.</p>`,
  side1:
    [

      [ghostDataObject('bjorn', -1, -1), flaskDataObject(4, 1,1)  ] //term2

    ],
  side2:
    [
      [ghostDataObject('freddie', 1, -1), flaskDataObject(2,-1,1) ] //term1
    ]
};


//Template
// levels[] = {
//   name: "Level 1",
//   introText: ``,
//   winText: ``,
//   side1:
//     [
//       [ ], //term1
//       [ ], //term2
//       [ ] //term3
//     ],
//   side2:
//     [
//       [], //term1
//       [], //term2
//       [] //term3
//     ]
// };



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

  const data2 = $(component2).data();


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

    const secondElement  = $siblings[i+1];


    const test = testFunction(firstElement, secondElement);

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

function detectWin() {
  //Ensures there cannot be a win in the middle of an unresolved drop.
  if (gameState.unresolvedComponentDrop ||  gameState.unresolvedTermDrop  ) {
    return false;
  }

  let $loneComponent = false;
  $('.equation img[alt="freddie"]').each((i,el) => {
    $component = $(el).parent();
    if ($component.data("sign") === 1 && $component.data("exponent") === 1) {
      const hasComponentSiblings =  $component.siblings().length > 0 ? true : false ;
      // const numberOfTermSiblings = $component.closest('.term').siblings().length;
      const $termSiblings = $component.closest('.term').siblings();

      let hasTermSiblings;
      if ($termSiblings.length > 0) {
        $termSiblings.each( (i,el) => {
            //If the length of the components inside the term is zero then hasTermSiblings is false
            //Note this is a work around because for some reason the zero flask term would not be removed from the dom completely.
            if ( $(el).find('.component').length > 0 ) {
              hasTermSiblings = true;
            }
        });
      } else {
        //If the term has more than 0 term siblings, it is false.
        hasTermSiblings = false;
      }


      if (!hasTermSiblings && !hasComponentSiblings) {
        $loneComponent = $component;
      }
    }
  });
  //Returns the lone componet if there is one, otherwise, returns false.
  return $loneComponent;
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
  $('.reserve').sortable({

  });
  $('.reserve .components').sortable({

  });

  $('.equation__terms-list').sortable({
    containment: "parent",
    distance: 5,
    update: function (event) {
      termUpdate(event),
      winUpdate();
    } ,
    receive: termDrop
  } );

  $('.equation .components').sortable({
      distance: 5,
      update: function (event) {
         termUpdate(event);
         componentUpdate(event);
         winUpdate();
        },
      receive: componentDrop

    });//end sortable method on equation components lists
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
function levelSelect(levelIndex) {
  const level =  levels[levelIndex];
  gameState.currentLevelIndex = levelIndex;

  $('header select').val(`Level ${levelIndex + 1}`);
  levelRefresh(level);
  displayLevelCard(level);
  playerActionsRefresh("+", 1, 1);
  gameState.unresolvedComponentDrop = false;
  gameState.unresolvedTermDrop = false;

}

//Used for the update even in  '.equation .terms'
//Also used in the click event for cancelling zeroed terms.
//And Used in the click event for cancelling one components
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


//Used for the update even in  '.equation .components'
//And Used in the click event for cancelling one components
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

//Cancels components where two inverse components are next to each other, replaces them with a one-flask component.
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
//Replaces tehm with a zero-flask term
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
    $termLi.removeClass('infinite pulse animated').addClass('zoomOut');


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
      //Check for inverse cancelation

      componentUpdate({target:  $sibling.parent() } );
    }, 500);
  }
}

//Used for the receive event in '.equation .terms' sortable.
//This event handles adding term to boths sides of an equation.
function termDrop(event) {
  //.terms list that the new term  was received by (side of the equation)
  const $dropList = $(event.target);
  const $otherSideList = $dropList.siblings();

  //The componet and term just added to the list
  //Note: event.originalEvent is the the img element
  const $addedComponent = $(event.originalEvent.target).parent();
  const $addedTerm =  $addedComponent.closest('.term');

  //The type of the component in the added term and the selector for its corresponding reserve
  const typeAdded = $addedComponent.data("type");
  const reserveSelector = (typeAdded === 'variable') ? '.ghost-reserve' : '.flask-reserve';

  //Using gameState property to decide what to do
  if ( gameState.unresolvedTermDrop === false ) {

    //Assign unresolved component drop to true.
    gameState.unresolvedTermDrop = true;

    //Disable sorting on the droplist
    $dropList.sortable( "option", "disabled", true );

      //Add shake animation to .term <li> elements in the other side of the equation
    $otherSideList.children().addClass('animated infinite shake');

    //Empty both reserves
    $('.reserve').each((i,el) => $(el).empty() );

    //Add a clone of dropped term to relevant reserve
    //The clone method is called with true argument in order to copy data and event handlers
    const $clone = $addedTerm.clone(true, true);
    ////Add cloned component to the appropriate reserve
    $(reserveSelector).append($clone);
  }//END of if for term drop
  else {
    //During an unresolved term drop

    //Remove animation and disable sorting
    $dropList.children().removeClass('shake');
    $dropList.sortable( "option", "disabled", true );


    //Refresh the reserves
    playerActionsRefresh('+',  $addedComponent.data('sign'), $addedComponent.data('exponent') );

    // Re-set game state
    gameState.unresolvedTermDrop = false;

    // Enable sorting on equation components lists.
    $('.equation .terms').sortable( "option", "disabled", false );
  }


}//End function

//Used for the receive event in '.equation .components' sortable.
//This event handles multiplying all terms in the equation by an added component.
function componentDrop  (event) {
  //components list that the componet was received by
  const $dropList = $(event.target);

  //The component just added to the list
  const $addedComponent = $(event.originalEvent.target).parent();

  //The type of the component added and the selector for its corresponding reserve
  const typeAdded = $addedComponent.data("type");
  const reserveSelector = (typeAdded === 'variable') ? '.ghost-reserve' : '.flask-reserve';

  //Using gameState property to decide what to do
  if ( gameState.unresolvedComponentDrop === false ) {

    //Assign unresolved component drop to true.
    gameState.unresolvedComponentDrop = true;



    //Get a jquery selection of all the other componets lists
    const $otherListsOnSide = $dropList.parent().siblings().find('.components');
    const $otherListsOnOtherSide = $dropList.closest('.terms').siblings().find('.components');
    const $listsToAddTo  = $otherListsOnSide.add( $otherListsOnOtherSide);

    //Add shake animation to these lists
    $listsToAddTo.addClass('animated infinite shake');

    //Empty both reserves
    $('.reserve').each((i,el) => $(el).empty() );

    //Number of copies of the component to add to resever
    const numberToAdd = $listsToAddTo.length;

    //Add a clone of dropped component to reserve for each other component in the equation
    for (let i = 0; i < $listsToAddTo.length; i++) {
      //The clone method is called with true argument in order to copy data and event handlers
      const $clone = $addedComponent.clone(true, true);
      ////Add cloned component to the appropriate reserve
      $(reserveSelector).append($clone);
    }//end of for loop
    //Refresh sorting for the new elements.
    sortableRefresh();
    //Disable sorting on the droplist
    $dropList.sortable( "option", "disabled", true );
}//END of if for component drop
  else {
  //During an unresolved component drop, with each successive drop

  //Remove animation and disable sorting
  $dropList.removeClass('shake');
  $dropList.sortable( "option", "disabled", true );

    //When there are no more componets left to drop in the reserve.
    if ($(reserveSelector).children().length === 0) {

      //Refresh the reserves
      playerActionsRefresh('*',  $addedComponent.data('sign'), $addedComponent.data('exponent') );

      // Re-set game state
      gameState.unresolvedComponentDrop = false;

      // Enable sorting on equation components lists.
      $('.equation .components').sortable( "option", "disabled", false );
    }
  }
}//end function


function winUpdate () {
  //Waits a before checking for win. To allow animations to resolve.
  setTimeout(() => {
      const win = detectWin();

    //Checks if win came back truthy
    if (win) {
      const $winComponent = win;
      $winComponent.addClass('tada animated infinite');

      //Display winText
      const winText =  levels[gameState.currentLevelIndex].winText;
      $('.level-card').addClass('show win').children().html(winText);
    }



  }, 700);


}


//END OF EVENT HANDLING FUNCTIONS



//DOCUMENT READY FUNCTION
$(function() {
  //Load Level 1
  levelSelect(0);

  //Preload negative images
  playerActionsRefresh('+',-1, 1);

  //Initialize the player action area
  playerActionsRefresh('+',1, 1);


  //Level Event Handlers
  $('header select').change(function (event) {
    value = event.target.value;
    //Get the level number from the select value string
    levelNumber = Number(value.split(" ")[1]);
    //Subtract 1 from level number to get level index
    levelSelect(levelNumber - 1);
  } );

  $('.level-card').click(function () {
    $(this).removeClass('show');
    if ( $(this).hasClass('win') ) {
      $(this).removeClass('win');

      //Checks if you are on the last level, if so, returns you to the first level. Eventually I can have something special happen when you win the last level.
      const nextLevelIndex = (gameState.currentLevelIndex + 1 === levels.length) ? 0  : gameState.currentLevelIndex + 1 ;

      levelSelect( nextLevelIndex );


    }
  });

 // Player Action Button Events Handlers
  $('.plus').click(function () {
    if (!gameState.unresolvedComponentDrop && !gameState.unresolvedTermDrop) {
      playerActionsRefresh('+', currentReserveSign(), currentExponent() );
    }
  });
  $('.positive-negative').click(function () {
    if (!gameState.unresolvedComponentDrop && !gameState.unresolvedTermDrop) {
      playerActionsRefresh(activeOperation(), -1 * currentReserveSign(), currentExponent() );
    }
  });
  $('.times-symbol').click(function () {
    if (!gameState.unresolvedComponentDrop && !gameState.unresolvedTermDrop) {
      playerActionsRefresh("*", currentReserveSign(), currentExponent());
    }
  });
  $('.flip').click(function () {
    if (!gameState.unresolvedComponentDrop && !gameState.unresolvedTermDrop) {
      playerActionsRefresh(activeOperation(), currentReserveSign(), -1 * currentExponent());
    }
  });

  //Equation Event Handlers
  // $('.equation').on('click', '.term', function (event) {
  //   if ($(this).hasClass('bounce')) {
  //     termCancel(event);
  //   }
  //   zeroCancel(event);
  //   winUpdate();
  // });

  // $('.equation').on('click', '.component', function (event) {
  //   oneCancel(event);
  //   winUpdate();
  //   if ($(this).hasClass('swing') ) {
  //     componentCancel(event);
  //   }
  // });



  $('.equation').on('click', 'img', function (event) {

    const $this =  $(this);

    //Term Functions
    const $term = $this.closest('.term');
    const termEvent = {
      currentTarget: $term
    }
    if ($term.hasClass('bounce')) {
      termCancel(termEvent);
    }
    zeroCancel(termEvent);

    //Componet functions
    oneCancel({currentTarget: $this.parent()  } );
    if ($this.parent().hasClass('swing') ) {
      componentCancel({currentTarget: $this.parent()  });
    }
    //Check for win
    winUpdate();
  });

});//END OF DOCUMENT READY FUNCTION