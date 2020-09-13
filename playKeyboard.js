function playKeyboard() {
  let pressColor = "#1BC0EA"; //color when key is pressed

  var isMobile = !!navigator.userAgent.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i
  );
  if (isMobile) {
    var evtListener = ["touchstart", "touchend"];
  } else {
    var evtListener = ["mousedown", "mouseup"];
  }

  var __audioSynth = new AudioSynth();
  __audioSynth.setVolume(0.5);
  var __octave = 4; //sets position of middle C, normally the 4th octave

  // Key bindings, notes to keyCodes.
  var keyboard = {
    /* = */
    187: "C,-1",

    /* Q */
    81: "C#,-1",

    /* W */
    87: "D,-1",

    /* E */
    69: "D#,-1",

    /* R */
    82: "E,-1",

    /* T */
    84: "F,-1",

    /* Y */
    89: "F#,-1",

    /* U */
    85: "G,-1",

    /* I */
    73: "G#,-1",

    /* O */
    79: "A,-1",

    /* P */
    80: "A#,-1",

    /* [ */
    219: "B,-1",

    /* ] */
    221: "C,0",

    /* A */
    65: "C#,0",

    /* S */
    83: "D,0",

    /* D */
    68: "D#,0",

    /* F */
    70: "E,0",

    /* G */
    71: "F,0",

    /* H */
    72: "F#,0",

    /* J */
    74: "G,0",

    /* K */
    75: "G#,0",

    /* L */
    76: "A,0",

    /* ; */
    186: "A#,0",

    /* " */
    222: "B,0",
  };

  var reverseLookupText = {};
  var reverseLookup = {};

  // Create a reverse lookup table.
  for (var i in keyboard) {
    var val;

    switch (
      i | 0 //some characters don't display like they are supposed to, so need correct values
    ) {
      case 187: //equal sign
        val = 61; //???
        break;

      case 219: //open bracket
        val = 91; //left window key
        break;

      case 221: //close bracket
        val = 93; //select key
        break;

      case 188: //comma
        val = 44; //print screen
        break;
      //the fraction 3/4 is displayed for some reason if 190 wasn't replaced by 46; it's still the period key either way
      case 190: //period
        val = 46; //delete
        break;

      default:
        val = i;
        break;
    }

    reverseLookupText[keyboard[i]] = val;
    reverseLookup[keyboard[i]] = i;
  }

  // Keys you have pressed down.
  var keysPressed = [];
  // Notes that are being recorded.
  var notesRecorded = [];
  var recordingMelody = false;

  // Generate keyboard
  let visualKeyboard = document.getElementById("keyboard");
  let selectSound = {
    value: "0", //piano
  };

  var iKeys = 0;
  var iWhite = 0;
  var notes = __audioSynth._notes; //C, C#, D....A#, B

  for (var i = -1; i <= 0; i++) {
    for (var n in notes) {
      if (n[2] != "b") {
        var thisKey = document.createElement("div");
        console.log(n);
        if (n.length > 1) {
          thisKey.className = "black key " + n; //2 classes
          thisKey.style.backgroundColor = "black";
          thisKey.dataset.defaultColor = "black";
          thisKey.dataset.highlightColor = "Khaki";
          thisKey.dataset.tonicColor = "#00916E";
          thisKey.dataset.dominantColor = "#FA003F";
          thisKey.dataset.colorType = "default";
          thisKey.style.position = "absolute";
          thisKey.style.color = "white";
          thisKey.style.borderStyle = "solid";
          thisKey.style.borderColor = "black";
          thisKey.style.zIndex = "1";
          thisKey.style.width = "30px";
          thisKey.style.height = "120px";
          thisKey.style.left = 40 * (iWhite - 1) + 25 + "px";
        } else {
          thisKey.className = "white key " + n;
          thisKey.style.borderStyle = "solid";
          thisKey.style.position = "absolute";
          thisKey.style.backgroundColor = "AntiqueWhite";
          thisKey.dataset.defaultColor = "AntiqueWhite";
          thisKey.dataset.highlightColor = "Khaki";
          thisKey.dataset.tonicColor = "#00916E";
          thisKey.dataset.dominantColor = "#FA003F";
          thisKey.dataset.colorType = "default";
          thisKey.style.width = "40px";
          thisKey.style.height = "200px";
          thisKey.style.left = 40 * iWhite + "px";
          iWhite++;
        }

        var label = document.createElement("div");
        label.className = "label";

        let s = getDispStr(n, i, reverseLookupText);

        label.innerHTML =
          '<b class="keyLabel">' +
          s +
          "</b>" +
          "<br /><br />" +
          n.substr(0, 1) +
          '<span name="OCTAVE_LABEL" value="' +
          i +
          '">' +
          (__octave + parseInt(i)) +
          "</span>" +
          (n.substr(1, 1) ? n.substr(1, 1) : "");
        thisKey.appendChild(label);
        thisKey.setAttribute("ID", "KEY_" + n + "," + i);
        thisKey.addEventListener(
          evtListener[0],
          (function (_temp) {
            return function () {
              fnPlayKeyboard({ keyCode: _temp });
            };
          })(reverseLookup[n + "," + i])
        );
        visualKeyboard[n + "," + i] = thisKey;
        visualKeyboard.appendChild(thisKey);

        iKeys++;
      }
    }
  }

  visualKeyboard.style.width = iWhite * 40 + "px";

  window.addEventListener(evtListener[1], function () {
    n = keysPressed.length;
    while (n--) {
      fnRemoveKeyBinding({ keyCode: keysPressed[n] });
    }
  });

  // Detect keypresses, play notes.

  var fnPlayKeyboard = function (e) {
    var i = keysPressed.length;
    while (i--) {
      if (keysPressed[i] == e.keyCode) {
        return false;
      }
    }
    keysPressed.push(e.keyCode);

    if (keyboard[e.keyCode]) {
      if (visualKeyboard[keyboard[e.keyCode]]) {
        visualKeyboard[keyboard[e.keyCode]].style.backgroundColor = pressColor;
        //visualKeyboard[keyboard[e.keyCode]].classList.add('playing'); //adding class only affects keypress and not mouse click
        visualKeyboard[keyboard[e.keyCode]].style.marginTop = "5px";
        visualKeyboard[keyboard[e.keyCode]].style.boxShadow = "none";
      }
      var arrPlayNote = keyboard[e.keyCode].split(",");
      var note = arrPlayNote[0];
      // Add notes to list of recorded notes
      if (recordingMelody) notesRecorded.push(note);
      var octaveModifier = arrPlayNote[1] | 0;
      fnPlayNote(note, __octave + octaveModifier);
    } else {
      return false;
    }
  };
  // Remove key bindings once note is done.
  var fnRemoveKeyBinding = function (e) {
    var i = keysPressed.length;
    while (i--) {
      if (keysPressed[i] == e.keyCode) {
        if (visualKeyboard[keyboard[e.keyCode]]) {
          //visualKeyboard[keyboard[e.keyCode]].classList.remove('playing');
          var pianoKeyElement = visualKeyboard[keyboard[e.keyCode]];
          // Get color type
          var bgColor = getColorType(pianoKeyElement);
          visualKeyboard[keyboard[e.keyCode]].style.backgroundColor = bgColor;
          visualKeyboard[keyboard[e.keyCode]].style.marginTop = "";
          visualKeyboard[keyboard[e.keyCode]].style.boxShadow = "";
        }
        keysPressed.splice(i, 1);
      }
    }
  };
  // Generates audio for pressed note and returns that to be played
  var fnPlayNote = function (note, octave) {
    src = __audioSynth.generate(selectSound.value, note, octave, 2);
    container = new Audio(src);
    container.addEventListener("ended", function () {
      container = null;
    });
    container.addEventListener("loadeddata", function (e) {
      e.target.play();
    });
    container.autoplay = false;
    container.setAttribute("type", "audio/wav");
    container.load();
    return container;
  };

  //returns correct string for display
  function getDispStr(n, i, lookup) {
    if (n == "C" && i == -2) {
      return "~";
    } else if (n == "B" && i == -2) {
      return "-";
    } else if (n == "A#" && i == 0) {
      return ";";
    } else if (n == "B" && i == 0) {
      return '"';
    } else if (n == "A" && i == 1) {
      return "/";
    } else if (n == "A#" && i == 1) {
      return "<-";
    } else if (n == "B" && i == 1) {
      return "->";
    } else {
      return String.fromCharCode(lookup[n + "," + i]);
    }
  }
  window.addEventListener("keydown", fnPlayKeyboard);
  window.addEventListener("keyup", fnRemoveKeyBinding);

  // Add record and stop button event handlers
  var recordButton = document.querySelector("button");
  recordButton.onclick = function () {
    if (!recordingMelody) {
      unhighlightAllKeys();
      resetKeyCards();
      recordingMelody = true;
      recordButton.innerText = "Stop";
      document.querySelector("svg").style.visibility = "visible";
      notesRecorded = [];
    } else {
      recordingMelody = false;
      recordButton.innerText = "Record";
      document.querySelector("svg").style.visibility = "hidden";
      getKeySignature(notesRecorded, evtListener[0]);
      notesRecorded = [];
    }
  };

  // Removes all generated key cards
  function resetKeyCards() {
    var keySigContainer = document.getElementById("keysignatures");
    while (keySigContainer.lastChild) {
      if (keySigContainer.lastChild.innerText == "Key Signatures:") break;
      keySigContainer.removeChild(keySigContainer.lastChild);
    }
  }
}

// Checks what the current value of the key on the keyboard is
function getColorType(element) {
  if (element.dataset.colorType == "default") {
    return element.dataset.defaultColor;
  } else if (element.dataset.colorType == "highlight") {
    return element.dataset.highlightColor;
  } else if (element.dataset.colorType == "tonic") {
    return element.dataset.tonicColor;
  } else if (element.dataset.colorType == "dominant") {
    return element.dataset.dominantColor;
  }
}
