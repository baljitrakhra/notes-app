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
        reset() {
          this.notes = [];
        }
      };
      module.exports = notesModel2;
    }
  });

  // view.js
  var require_view = __commonJS({
    "view.js"(exports, module) {
      var notesModel2 = require_notesModel();
      var View2 = class {
        constructor(model2) {
          this.model = model2;
          this.mainContainerEl = document.querySelector("#main-container");
          this.inputButtonEl = document.querySelector("#add-note");
          this.inputEl = document.querySelector("#new-note");
          this.inputButtonEl.addEventListener("click", () => {
            model2.addNote(this.inputEl.value);
            this.displayNotes();
            this.inputEl.value = "";
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
      };
      module.exports = View2;
    }
  });

  // index.js
  console.log("The notes app is running");
  var notesModel = require_notesModel();
  var View = require_view();
  var model = new notesModel();
  var view = new View(model);
  view.displayNotes();
  console.log(model.getNotes());
})();
