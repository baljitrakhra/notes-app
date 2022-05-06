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
    this.resetButtonEl = document.querySelector('#reset');
    this.resetButtonEl.addEventListener('click', () => {
      this.api.reset(() =>
        this.displayNotesFromApi())
    });

  }

  viewAddNotes(note) {
    const newNote = {
      "content" : note
    }
    this.api.createNote(newNote, ()=> {
      this.displayNotesFromApi();
    })
    
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
    this.model.reset();
    this.api.loadNotes((recievedData) => {
      this.model.setNotes(recievedData);
      this.displayNotes();
    }, () => {
      this.displayError()
    })
  }
  displayError() {
    const oldErrors = document.querySelectorAll('div.error');
    oldErrors.forEach((error) => {
      error.remove();
    });
    let errorEl = document.createElement('div');
    errorEl.innerText = 'Oops, something went wrong';
    errorEl.className = 'error';
    
    this.mainContainerEl.append(errorEl);

  }

 }

 module.exports = View;