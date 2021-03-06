(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // notesModel.js
  var require_notesModel = __commonJS({
    "notesModel.js"(exports, module) {
      var notesModel2 = class {
        constructor() {
          this.notes = [];
        }
        getNotes() {
          return this.notes;
        }
        addNote(note) {
          this.notes.push(note);
        }
        setNotes(notes) {
          console.log(notes);
          this.notes = notes;
        }
        reset() {
          this.notes = [];
        }
      };
      module.exports = notesModel2;
    }
  });

  // notesApi.js
  var require_notesApi = __commonJS({
    "notesApi.js"(exports, module) {
      var NotesApi2 = class {
        loadNotes(callback, errorCallBack) {
          fetch("http://localhost:3000/notes").then((response) => response.json()).then((data) => {
            callback(data);
          }).catch((error) => {
            console.log("Error:", error);
            errorCallBack();
          });
        }
        latestNote(notes) {
          return notes[notes.length - 1];
        }
        createNote(note, callback) {
          fetch("http://localhost:3000/notes", {
            method: "POST",
            headers: {
              "content-Type": "application/json"
            },
            body: JSON.stringify(note)
          }).then((response) => response.json()).then((data) => {
            console.log("success:", data);
            callback(data);
          }).catch((error) => {
            console.log("Error:", error);
            callback();
          });
        }
        reset(callback) {
          fetch("http://localhost:3000/notes", {
            method: "DELETE"
          }).then(callback);
        }
      };
      module.exports = NotesApi2;
    }
  });

  // view.js
  var require_view = __commonJS({
    "view.js"(exports, module) {
      var notesModel2 = require_notesModel();
      var NotesApi2 = require_notesApi();
      var View2 = class {
        constructor(model2, api2) {
          this.model = model2;
          this.api = api2;
          this.mainContainerEl = document.querySelector("#main-container");
          this.inputButtonEl = document.querySelector("#add-note");
          this.inputEl = document.querySelector("#new-note");
          this.inputButtonEl.addEventListener("click", () => {
            this.viewAddNotes(this.inputEl.value);
            this.inputEl.value = "";
          });
          this.resetButtonEl = document.querySelector("#reset");
          this.resetButtonEl.addEventListener("click", () => {
            this.api.reset(() => this.displayNotesFromApi());
          });
        }
        viewAddNotes(note) {
          const newNote = {
            "content": note
          };
          this.api.createNote(newNote, () => {
            this.displayNotesFromApi();
          });
        }
        displayNotes() {
          const old_notes = document.querySelectorAll(".note");
          old_notes.forEach((note) => {
            note.remove();
          });
          const notes = this.model.getNotes();
          notes.forEach((note) => {
            const noteEl = document.createElement("div");
            noteEl.innerText = note;
            noteEl.className = "note";
            this.mainContainerEl.append(noteEl);
          });
        }
        displayNotesFromApi() {
          this.model.reset();
          this.api.loadNotes((recievedData) => {
            this.model.setNotes(recievedData);
            this.displayNotes();
          }, () => {
            this.displayError();
          });
        }
        displayError() {
          const oldErrors = document.querySelectorAll("div.error");
          oldErrors.forEach((error) => {
            error.remove();
          });
          let errorEl = document.createElement("div");
          errorEl.innerText = "Oops, something went wrong";
          errorEl.className = "error";
          this.mainContainerEl.append(errorEl);
        }
      };
      module.exports = View2;
    }
  });

  // index.js
  console.log("The notes app is running");
  var notesModel = require_notesModel();
  var View = require_view();
  var NotesApi = require_notesApi();
  var model = new notesModel();
  var api = new NotesApi();
  var view = new View(model, api);
  api.loadNotes((note) => {
    model.setNotes(note);
    view.displayNotes();
  }, () => {
    view.displayError();
  });
})();
