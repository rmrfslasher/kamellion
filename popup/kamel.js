/* initialise variables */

var inputBody = document.querySelector('.new-note textarea');
var noteContainer = document.querySelector('.note-container');
var addBtn = document.querySelector('.add');
var clearBtn = document.querySelector('.clear');


/*  add event listeners to buttons */

addBtn.addEventListener('click', addNote);
clearBtn.addEventListener('click', clearAll);


/* generic error handler */

function onError(error) {
  console.log(error);
}


/* display previously-saved stored notes on startup */

initialize();

function initialize() {
  var gettingAllStorageItems = browser.storage.local.get(null);
  gettingAllStorageItems.then((results) => {
    var noteKeys = Object.keys(results);
    for (let noteKey of noteKeys) {
      var curValue = results[noteKey];
      displayNote(noteKey,curValue);
    }
  }, onError);
}


/* Add a note to the display, and storage */

function addNote() {
  //var changedText = inputTitle.value.replace(/blah/g,"zzzzzzz1");
  var originalText = inputBody.value;
  var changedText = inputBody.value.toLowerCase();
      // I could always try to iterate with the input below to check if upperCase
      //  and attempt to retain but this is fine for now 09/11/2021EURO
  var mapObj = {
      armor:"armour",
      color :"colour",
      accommodations:"accommodation",
      airplane:"aerofoil",
      aluminum:"aluminium",
      anise:"aniseed",
      counterclockwise:"anticlockwise",
      tractortrailer:"lorry",
      eggplant:"aubergine",
      beet:"beetroot",
      cracker:"biscuit",
      apartment:"flat",
      coveralls:"boiler suit",
      hood:"bonnet",
      trunk:"boot",
      suspenders:"braces",
      headcheese:"brawn",
      slingshot:"catapult",
      drugstore:"chemist",
      cornstarch:"cornflour",
      Romaine:"cos",
      crib:"cot",
      swab:"bud",
      zucchini:"courgette",
      guardrail:"crash barrier",
      defroster:"demister",
      rhinestone:"diamante",
      checkers:"draughts",
      thumbtack:"drawing pin",
      bathrobe:"dressing gown",
      pacifier:"dummy",
      realtor:"estate agent",
      unlisted:"ex-directory",
      washcloth:"flannel",
      flextime:"flexitime",
      switchblade:"flick knife",
      overpass:"flyover",
      soccer:"football",
      bangs:"fringe",
      period:"full stop",
      lawn:"garden",
      leverage:"gearing",
      gearshift:"gear lever",
      broiler:"grill",
      groundskeeper:"groundsman",
      barrette:"hairslide",
      hatrack:"hatstand",
      billboard:"hoarding",
      stovetop:"hob",
      carryall:"holdall",
      vacation:"holiday",
      vacationer:"holidaymaker",
      homey:"homely",
      hose:"hosepipe",
      sprinkles:"hundreds and thousands",
      Popsicle:"ice lolly",
      inseam:"inside leg",
      jellybeans:"jelly babies",
      sweater:"jumper",
      doghouse:"kennel",
      ladybug:"ladybird",
      elevator:"lift",
      lollipop:"lolly",
      slipcover:"loose cover",
      truck:"lorry",
      bullhorn:"loudhailer",
      flatbed:"low loader",
      corn:"maize",
      math:"maths",
      odometer:"milometer",
      monkeyshines:"monkey tricks",
      highway:"motorway",
      mom:"mum",
      mommy:"mummy",
      diaper:"nappy",
      pinwale:"needlecord",
      newscaster:"newsreader",
      acetaminophen:"paracetamol",
      solitaire:"patience",
      sidewalk:"pavement",
      crosswalk:"pedestrian crossingpipe",
      clothespin:"peg",
      valance:"pelmet",
      gasoline:"petrol",
      gas:"petrol",
      jumper:"pinafore dress",
      turtleneck:"polo neck",
      mailbox:"postbox",
      zipcode:"postcode",
      snap:"press stud",
      pushup:"press-up",
      GI:"private soldier",
      stroller:"pushchair",
      estimator:"quantity surveyor",
      line:"queue",
      railroad:"railway",
      retread:"remould",
      beltway:"ring road",
      carousel:"roundabout",
      rowboat:"rowing boat",
      sailboat:"sailing boat",
      sedan:"saloon",
      muffler:"silencer",
      sandbox:"sandpit",
      baseboard:"skirting board",
      sled:"sledge",
      slowpoke:"slowcoach",
      lawyer:"solicitor",
      soy:"soya",
      soybean:"soya bean",
      backsplash:"splashback",
      scallion:"spring onion",
      appetizer:"starter",
      supertitle:"surtitle",
      rutabaga:"swede",
      candy:"sweet",
      takeout:"takeaway",
      lumber:"timber",
      tidbit:"titbit",
      sneakers:"trainers",
      subway:"underground",
      undershirt:"vest",
      veterinarian:"veterinary surgeon",
      vest:"waistcoat",
      walker:"walking frame",
      closet:"wardrobe",
      clapboard:"weatherboard",
      windbreaker:"windcheater",
      windshield:"windscreen",
      fender:"wing",
      countertop:"worktop",
      crosswalk:"zebra crossing"
  };
  changedText = changedText.replace(/armor|color|accommodations|airplane|aluminum|anise|counterclockwise|tractortrailer|eggplant|beet|cracker|apartment|coveralls|hood|trunk|suspenders|headcheese|slingshot|drugstore|cornstarch|Romaine|crib|swab|zucchini|guardrail|defroster|rhinestone|checkers|thumbtack|bathrobe|pacifier|realtor|unlisted|washcloth|flextime|switchblade|overpass|soccer|bangs|period|lawn|leverage|gearshift|broiler|groundskeeper|barrette|hatrack|billboard|stovetop|carryall|vacation|vacationer|homey|hose|sprinkles|Popsicle|inseam|jellybeans|sweater|doghouse|ladybug|elevator|lollipop|slipcover|truck|bullhorn|flatbed|corn|math|odometer|monkeyshines|highway|mom|mommy|diaper|pinwale|newscaster|acetaminophen|solitaire|sidewalk|crosswalk|clothespin|valance|gasoline|gas|jumper|turtleneck|mailbox|zipcode|snap|pushup|GI|stroller|estimator|line|railroad|retread|beltway|carousel|rowboat|sailboat|sedan|muffler|sandbox|baseboard|sled|slowpoke|lawyer|soy|soybean|backsplash|scallion|appetizer|supertitle|rutabaga|candy|takeout|lumber|tidbit|sneakers|subway|undershirt|veterinarian|vest|walker|closet|clapboard|windbreaker|windshield|fender|countertop|crosswalk/gi, function(matched){
  return mapObj[matched];
  });

//var noteBody = inputBody.value.toLowerCase();
var gettingItem = browser.storage.local.get(changedText);
gettingItem.then((result) => {
  var objTest = Object.keys(result);
  if(objTest.length < 1 && changedText !== '' && originalText !== '') {
    //inputTitle.value = '';
    inputBody.value = '';
    storeNote(originalText, changedText);
  }
}, onError);
}


/* function to store a new note in storage */

function storeNote(title, body) {
  var storingNote = browser.storage.local.set({ [title] : body });
  storingNote.then(() => {
    displayNote(title,body);
  }, onError);
}


/* function to display a note in the note box */

function displayNote(title, body) {

  /* create note display box */
  var note = document.createElement('div');
  var noteDisplay = document.createElement('div');
  var noteH = document.createElement('p');
  var notePara = document.createElement('p');
  var deleteBtn = document.createElement('button');
  var clearFix = document.createElement('div');

  note.setAttribute('class','note');

  noteH.textContent = title;
  notePara.textContent = body;
  deleteBtn.setAttribute('class','delete');
  deleteBtn.textContent = 'Delete note';
  clearFix.setAttribute('class','clearfix');

  noteDisplay.appendChild(noteH);
  noteDisplay.appendChild(notePara);
  noteDisplay.appendChild(deleteBtn);
  noteDisplay.appendChild(clearFix);

  note.appendChild(noteDisplay);

  /* set up listener for the delete functionality */

  deleteBtn.addEventListener('click',(e) => {
    const evtTgt = e.target;
    evtTgt.parentNode.parentNode.parentNode.removeChild(evtTgt.parentNode.parentNode);
    browser.storage.local.remove(title);
  })


  /* create note edit box */
  var noteEdit = document.createElement('div');
  //var noteTitleEdit = document.createElement('input');
  var noteBodyTitle = document.createElement('textarea');
  var noteBodyEdit = document.createElement('textarea');
  var clearFix2 = document.createElement('div');

  var updateBtn = document.createElement('button');
  var cancelBtn = document.createElement('button');

  updateBtn.setAttribute('class','update');
  updateBtn.textContent = 'Update Text';
  cancelBtn.setAttribute('class','cancel');
  cancelBtn.textContent = 'Cancel';

  //noteEdit.appendChild(noteTitleEdit);
  //noteTitleEdit.value = title;
  noteEdit.appendChild(noteBodyTitle);
  noteBodyTitle.value = title;
  noteEdit.appendChild(noteBodyEdit);
  noteBodyEdit.textContent = body;
  noteEdit.appendChild(updateBtn);
  noteEdit.appendChild(cancelBtn);

  noteEdit.appendChild(clearFix2);
  clearFix2.setAttribute('class','clearfix');

  note.appendChild(noteEdit);

  noteContainer.appendChild(note);
  noteEdit.style.display = 'none';

  /* set up listeners for the update functionality */

  noteH.addEventListener('click',() => {
    noteDisplay.style.display = 'none';
    noteEdit.style.display = 'block';
  })

  notePara.addEventListener('click',() => {
    noteDisplay.style.display = 'none';
    noteEdit.style.display = 'block';
  }) 

  cancelBtn.addEventListener('click',() => {
    noteDisplay.style.display = 'block';
    noteEdit.style.display = 'none';
    noteBodyTitle.value = title;
    noteBodyEdit.value = body;
  })

  updateBtn.addEventListener('click',() => {
    if(noteBodyTitle.value !== title || noteBodyEdit.value !== body) {
      updateNote(title,noteBodyTitle.value,noteBodyEdit.value);
      note.parentNode.removeChild(note);
    } 
  });
}


/* function to update notes */

function updateNote(delNote,newTitle,newBody) {
  var storingNote = browser.storage.local.set({ [newTitle] : newBody });
  storingNote.then(() => {
    if(delNote !== newTitle) {
      var removingNote = browser.storage.local.remove(delNote);
      removingNote.then(() => {
        displayNote(newTitle, newBody);
      }, onError);
    } else {
      displayNote(newTitle, newBody);
    }
  }, onError);
}


/* Clear all notes from the display/storage */

function clearAll() {
  while (noteContainer.firstChild) {
      noteContainer.removeChild(noteContainer.firstChild);
  }
  browser.storage.local.clear();
}
