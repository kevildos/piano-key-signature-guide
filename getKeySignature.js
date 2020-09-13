function getKeySignature(notesRecorded, event) {
  // Dictionary of all possible key signatures. Used when searching.
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

  // Main driver code that generates our cards of key signatures
  function generateKeyCards() {
    var allPossibleKeys = filterKeysByNotes(keySignatures, notesRecorded);
    var keySigContainer = document.getElementById("keysignatures");
    for (currentKey of allPossibleKeys) {
      let keyCard = document.createElement("div");
      let notesOfKey = Object.keys(keySignatures[currentKey]);
      keyCard.innerText = currentKey + ": " + notesOfKey.join(", ");
      keyCard.style.backgroundColor = "antiquewhite";
      keyCard.style.border = "solid black 1px";
      keyCard.style.borderRadius = "5px";
      keyCard.style.padding = "5px";
      keyCard.style.margin = "5px auto";
      keyCard.style.minWidth = "250px";
      keyCard.style.width = "50%";
      keyCard.style.length = "50px";
      keyCard.addEventListener(event, function () {
        unhighlightAllKeys();
        highlightKeys(notesOfKey);
      });
      keySigContainer.appendChild(keyCard);
    }
  }

  // Filters keysignatures that contains the notes recorded
  function filterKeysByNotes(keySignatures, notesRecorded) {
    var validSignatureTitles = Object.keys(keySignatures);
    for (note of notesRecorded) {
      validSignatureTitles = findValidSignatures(note, validSignatureTitles);
    }
    return validSignatureTitles;
  }

  // Takes a list of key signatures and returns the signatures that contains the note
  function findValidSignatures(note, sigNames) {
    return sigNames.filter((sigName) => {
      if (note in keySignatures[sigName]) {
        return true;
      } else {
        return false;
      }
    });
  }

  // Highlights the passed-in notes
  function highlightKeys(notes) {
    for (index in notes) {
      var noteName = notes[index];
      // Retrieve all DOM nodes with this note name.
      var allNoteNodes = document.getElementsByClassName(noteName);
      for (currentNode of allNoteNodes) {
        if (index == 0) currentNode.dataset.colorType = "tonic";
        else if (index == 4) currentNode.dataset.colorType = "dominant";
        else currentNode.dataset.colorType = "highlight";
        currentNode.style.backgroundColor = getColorType(currentNode);
      }
    }
  }

  generateKeyCards();
}

// Unhighlights keys. Globally scoped since it's needed within playKeyboard()
function unhighlightAllKeys() {
  allNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  for (noteName of allNotes) {
    var noteNodes = document.getElementsByClassName(noteName);
    for (currentNode of noteNodes) {
      currentNode.dataset.colorType = "default";
      currentNode.style.backgroundColor = getColorType(currentNode);
    }
  }
}
