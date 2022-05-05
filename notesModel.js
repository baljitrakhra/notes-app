class notesModel {
  constructor() {
    this.notes = [];
  }

  getNotes() {
    return this.notes;
  }

  addNote(note) {
    this.notes.push(note)
  }

  setNotes(notes) {
    console.log(notes);
    this.notes = notes;
  }

  reset() {
    this.notes = [];
  }

}

module.exports = notesModel;