function getKeySignature(notesRecorded, event) {
  // Generate list of possible key signatures
  /*  keySignatures = {
    keyOfC: {
      C: true,
      D: true,
      E: true,
      F: true,
      G: true,
      A: true,
      B: true,
    },
    keyOfF: {
      F: true,
      G: true,
      A: true,
      Bb: true,
      C: true,
      D: true,
      E: true,
    },
    keyOfBb: {
      Bb: true,
      C: true,
      D: true,
      Eb: true,
      F: true,
      G: true,
      A: true,
    },
    keyOfEb: {
      Eb: true,
      F: true,
      G: true,
      Ab: true,
      Bb: true,
      C: true,
      D: true,
    },
    keyOfAb: {
      Ab: true,
      Bb: true,
      C: true,
      Db: true,
      Eb: true,
      F: true,
      G: true,
    },
    keyOfDb: {
      Db: true,
      Eb: true,
      F: true,
      Gb: true,
      Ab: true,
      Bb: true,
      C: true,
    },
    keyOfGb: {
      Gb: true,
      Ab: true,
      Bb: true,
      Cb: true,
      Db: true,
      Eb: true,
      F: true,
    },
    keyOfCb: {
      Cb: true,
      Db: true,
      Eb: true,
      Fb: true,
      Gb: true,
      Ab: true,
      Bb: true,
    },
    keyOfG: {
      G: true,
      A: true,
      B: true,
      C: true,
      D: true,
      E: true,
      "F#": true,
    },
    keyOfD: {
      D: true,
      E: true,
      "F#": true,
      G: true,
      A: true,
      B: true,
      "C#": true,
    },
    keyOfA: {
      A: true,
      B: true,
      "C#": true,
      D: true,
      E: true,
      "F#": true,
      "G#": true,
    },
    keyOfE: {
      E: true,
      "F#": true,
      "G#": true,
      A: true,
      B: true,
      "C#": true,
      "D#": true,
    },
    keyOfB: {
      B: true,
      "C#": true,
      "D#": true,
      E: true,
      "F#": true,
      "G#": true,
      "A#": true,
    },
    "keyOfF#": {
      "F#": true,
      "G#": true,
      "A#": true,
      B: true,
      "C#": true,
      "D#": true,
      "E#": true,
    },
    "keyOfC#": {
      "C#": true,
      "D#": true,
      "E#": true,
      "F#": true,
      "G#": true,
      "A#": true,
      "B#": true,
    },
  };*/

  function generateKeyCards() {
    console.log("Generating stuff");
    var possibleKeys = filterKeys(keySignatures, notesRecorded);
    var keySigContainer = document.getElementById("keysignatures");
    for (musicKey of possibleKeys) {
      let keyCard = document.createElement("div");
      let listOfNotes = Object.keys(keySignatures[musicKey]);
      console.log("MusicKey: " + musicKey);
      console.log("listofnotes: " + listOfNotes);
      keyCard.innerText = musicKey + ": " + listOfNotes.join(", ");
      keyCard.style.backgroundColor = "white";
      keyCard.style.borderRadius = "5px";
      keyCard.style.padding = "5px";
      keyCard.style.margin = "5px";
      keyCard.style.width = "500px";
      keyCard.style.length = "50px";
      keyCard.addEventListener(event, function () {
        unhighlightAllKeys();
        highlightKeys(listOfNotes);
      });
      keySigContainer.appendChild(keyCard);
    }
  }
  /*
  function filterKeys(keySignatures, notesRecorded) {
    console.log("filterKeys() Called.");
    console.log("keySigs: " + keySignatures);

    var validKeySigs = Object.keys(keySignatures);
    for (note of notesRecorded) {
      validKeySigs = findValidSignatures(note, validKeySigs);
    }
    console.log("filtered array " + validKeySigs);
    return validKeySigs;
  }

  function findValidSignatures(note, keySigs) {
    return keySigs.filter((keyOfNote) => {
      if (note in keySignatures[keyOfNote]) {
        return true;
      } else {
        return false;
      }
    });
  }
  */

  function highlightKeys(listOfNotes) {
    console.log("Highlighting keys...");
    for (index in listOfNotes) {
      var note = listOfNotes[index];
      var pianoKeys = document.getElementsByClassName(note);
      for (element of pianoKeys) {
        if (index == 0) element.dataset.colorType = "tonic";
        else if (index == 4) element.dataset.colorType = "dominant";
        else element.dataset.colorType = "highlight";
        var bgColor = getColorType(element);
        element.style.backgroundColor = bgColor;
        console.log("bgColor: " + element.style.backgroundColor);
      }
      /*
      for (index = 0; index < pianoKeys.length; index++) {
        var element = pianoKeys[index];
        console.log("index? " + index);
        console.log("pianoKeys? " + pianoKeys[index]);
        if (index == 0) element.dataset.colorType = "tonic";
        if (index == 4) element.dataset.colorType = "dominant";
        else element.dataset.colorType = "highlight";
        var bgColor = getColorType(element);
        element.style.backgroundColor = bgColor;
      }*/
    }
  }

  function unhighlightAllKeys() {
    allNotes = [
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
      "G",
      "G#",
      "A",
      "A#",
      "B",
    ];
    for (note of allNotes) {
      var pianoKeys = document.getElementsByClassName(note);
      console.log("unhighlightKeys(), pianoKeys: " + pianoKeys);
      for (element of pianoKeys) {
        element.dataset.colorType = "default";
        let bgColor = getColorType(element);
        element.style.backgroundColor = bgColor;
      }
    }
  }

  console.log(notesRecorded);
  generateKeyCards();
}

// Generate list of possible key signatures
var keySignatures = {
  "Key of C": {
    C: true,
    D: true,
    E: true,
    F: true,
    G: true,
    A: true,
    B: true,
  },
  "Key of F": {
    F: true,
    G: true,
    A: true,
    "A#": true,
    C: true,
    D: true,
    E: true,
  },
  "Key of Bb": {
    "A#": true,
    C: true,
    D: true,
    "D#": true,
    F: true,
    G: true,
    A: true,
  },
  "Key of Eb": {
    "D#": true,
    F: true,
    G: true,
    "G#": true,
    "A#": true,
    C: true,
    D: true,
  },
  "Key of Ab": {
    "G#": true,
    "A#": true,
    C: true,
    "C#": true,
    "D#": true,
    F: true,
    G: true,
  },
  "Key of Db": {
    "C#": true,
    "D#": true,
    F: true,
    "F#": true,
    "G#": true,
    "A#": true,
    C: true,
  },
  "Key of Gb": {
    "F#": true,
    "G#": true,
    "A#": true,
    B: true,
    "C#": true,
    "D#": true,
    F: true,
  },
  "Key of Cb": {
    B: true,
    "C#": true,
    "D#": true,
    E: true,
    "F#": true,
    "G#": true,
    "A#": true,
  },
  "Key of G": {
    G: true,
    A: true,
    B: true,
    C: true,
    D: true,
    E: true,
    "F#": true,
  },
  "Key of D": {
    D: true,
    E: true,
    "F#": true,
    G: true,
    A: true,
    B: true,
    "C#": true,
  },
  "Key of A": {
    A: true,
    B: true,
    "C#": true,
    D: true,
    E: true,
    "F#": true,
    "G#": true,
  },
  "Key of E": {
    E: true,
    "F#": true,
    "G#": true,
    A: true,
    B: true,
    "C#": true,
    "D#": true,
  },
  "Key Of B": {
    B: true,
    "C#": true,
    "D#": true,
    E: true,
    "F#": true,
    "G#": true,
    "A#": true,
  },
  "Key of F#": {
    "F#": true,
    "G#": true,
    "A#": true,
    B: true,
    "C#": true,
    "D#": true,
    F: true,
  },
  "Key of C#": {
    "C#": true,
    "D#": true,
    F: true,
    "F#": true,
    "G#": true,
    "A#": true,
    C: true,
  },
};

var testKey = ["A#", "B"];

function filterKeys(keySignatures, notesRecorded) {
  console.log("filterKeys() Called.");
  console.log("keySigs: " + keySignatures);

  var validSignatureTitles = Object.keys(keySignatures);
  for (note of notesRecorded) {
    validSignatureTitles = findValidSignatures(note, validSignatureTitles);
  }
  console.log("filtered array " + validSignatureTitles);
  return validSignatureTitles;
}

function findValidSignatures(note, sigNames) {
  return sigNames.filter((sigName) => {
    if (note in keySignatures[sigName]) {
      console.log("what is this note: " + note);
      return true;
    } else {
      console.log("what is this note: " + note);
      return false;
    }
  });
}
