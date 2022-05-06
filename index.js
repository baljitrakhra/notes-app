console.log('The notes app is running');

const notesModel = require('./notesModel');
const View = require('./view');
const NotesApi = require('./notesApi');

const model = new notesModel();
const api = new NotesApi();
const view = new View(model, api);
view.displayNotesFromApi();
// view.displayNotes();
