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

function typeClass (identifier) {
  return (typeof identifier === "number") ? 'coefficient'  : 'variable';
}

//Used to create list items used in algebra addition
function generateSimpleTerm (identifier, sign) { //Second argument is only necessary for ghosts
  const imgTag = generateImgTag(identifier, sign);

  return `<li class="term">
      <ul class="components">
        <li class="component ${typeClass(identifier)} ${(sign < 0) ? 'neg' : 'pos' }">
          ${imgTag}
        </li>
      </ul>
  </li>`;
}

//Used to create list items used in algebra multiplication
function generateComponent (identifier, sign) { //Second argument is only necessary for ghosts
  const imgTag = generateImgTag(identifier, sign);
  return `<li class="component ${typeClass(identifier)} ${(sign < 0) ? 'neg' : 'pos' }">
    ${imgTag}
  </li>`;
}

function ghostReserveRefresh (operation, sign) { //Operation argument is '+' or '*'
  $('.ghost-reserve').empty();
  ghosts.forEach(ghost => {
    let element;
    if (operation === "+") {
      element  = generateSimpleTerm(ghost, sign);
    }
    if (operation === "*") {
      element = generateComponent(ghost, sign);
    }
    //Add the term to the DOM at the end of the ghost reserve list
    $('.ghost-reserve').append(element);
  });
}

function flaskReserveRefresh (operation, sign) { //Operation argument is '+' or '*'
  //Removes all elements from flask reserve area
  $('.flask-reserve').empty();
  for (let i = 1; i <= 4; i++) {
    let element;
    if (operation === "+") {
      element  = generateSimpleTerm(i*sign, sign);
    }
    if (operation === "*") {
      element = generateComponent(i*sign, sign);
    }
    //Add the term to the DOM at the end of the ghost reserve list
    $('.flask-reserve').append(element);
  }
}

function playerActionsRefresh (operation, sign) {
  flaskReserveRefresh(operation, sign);
  ghostReserveRefresh(operation, sign);
  if (operation === "+") {
    $('.plus').addClass('active-button');
    $('.times-symbol').removeClass('active-button');
  }
  if (operation === "*") {
    $('.times-symbol').addClass('active-button');
    $('.plus').removeClass('active-button');
  }
}

function currentReserveSign () {
  let sign = 1;
    if ($('.flask-reserve .component').hasClass('neg')) {
      sign = -1;
    }
  return sign;
}

$(function() {
//Initialized the player action area
playerActionsRefresh('+',1);

//Jquery UI Sortable Settings
  $('.reserve').sortable({
    connectWith: '.equation__terms-list'
     });
  $('.equation__terms-list').sortable();





 // Player Action Button Events Handlers
  $('.plus').click(function () {
    playerActionsRefresh('+', currentReserveSign());
  });
  $('.positive-negative').click(function () {
    playerActionsRefresh('+',-1 * currentReserveSign());
  });
  $('.times-symbol').click(function () {
    playerActionsRefresh("*", currentReserveSign());
  });
  $('.flip').click(function () {

  });

});