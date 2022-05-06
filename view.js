 const notesModel = require('./notesmodel');
 const NotesApi = require('./notesApi');

 class View{
  constructor(model, api) {
    this.model = model;
    this.api = api;
    this.mainContainerEl = document.querySelector('#main-container');
    this.inputButtonEl = document.querySelector('#add-note');
    this.inputEl = document.querySelector('#new-note');
    this.inputButtonEl.addEventListener('click', () => {
      this.viewAddNotes(this.inputEl.value);  
      this.inputEl.value = '';
    });

  }

  viewAddNotes(note) {
    this.model.addNote(note);
    const newNote = {
      "content" : note
    }
    this.api.createNote(newNote);
    this.displayNotes();
  }

  displayNotes(){
    const old_notes = document.querySelectorAll('.note');
    
    old_notes.forEach( note => {
      note.remove();
    });

    const notes = this.model.getNotes();
    notes.forEach( note => {
      const noteEl = document.createElement('div');
      noteEl.innerText = note;
      noteEl.className = 'note';
      this.mainContainerEl.append(noteEl);
    });
    
  }

  displayNotesFromApi() {
    this.api.loadNotes((recievedData) => {
      // console.log('I am here:',recievedData);
      this.model.setNotes(recievedData);
      this.displayNotes();
    });
  }

 }

 module.exports = View;