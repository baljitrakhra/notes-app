const notesModel = require('./notesModel')

describe('#notesModel', () => {
  describe('#getNotes', () => {
    it('starts with no notes', () => {
      const model = new notesModel();
      expect(model.getNotes()).toEqual([]);
    });
  });

  describe('#addNote', () => {
    it('can add note', () => {
      const model = new notesModel();
      model.addNote('Buy milk');
      expect(model.getNotes()).toEqual(['Buy milk']);
    });

    it('can add more than one note', () => {
      const model = new notesModel();
      model.addNote('Buy milk');
      model.addNote('Go to the gym')
      expect(model.getNotes()).toEqual(['Buy milk', 'Go to the gym']);
    });
  })

  describe('#reset', () =>{
    it('will reset the notes', () => {
      const model = new notesModel();
      model.addNote('Buy milk');
      model.reset();
      expect(model.getNotes()).toEqual([]);
    });
  });
})