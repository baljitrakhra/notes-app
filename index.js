console.log('The notes app is running');

const notesModel = require('./notesModel');
const View = require('./view');

const model = new notesModel();

const view = new View(model);
view.displayNotes();
console.log(model.getNotes());
