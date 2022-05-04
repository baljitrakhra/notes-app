 const notesModel = require('./notesmodel')
 class View{
  constructor(model) {
    this.model = model;
    this.mainContainerEl = document.querySelector('#main-container');
    this.inputButtonEl = document.querySelector('#add-note');
    this.inputEl = document.querySelector('#new-note');
    this.inputButtonEl.addEventListener('click', () => {
      model.addNote(this.inputEl.value);  
      this.displayNotes();
      this.inputEl.value = '';
    });

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

 }

 module.exports = View;