/**
* @jest-environment jsdom
*/

const fs = require('fs');
const Model = require('./notesModel');
const View = require('./view');
const NotesApi = require('./notesApi');

require('jest-fetch-mock').enableFetchMocks()
jest.mock("./notesApi");
jest.mock("./notesModel");

describe('view with Api data', () => {
  beforeEach(() => {
    NotesApi.mockClear();
    Model.mockClear();
  });
  it('displays the notes from data recieved from API', () =>{
    document.body.innerHTML = fs.readFileSync('./index.html');

    const mockModel = new Model();
    const mockNotesApi = new NotesApi();

    mockModel.getNotes.mockImplementation(() => [
      'this is a note'
    ]);
    mockModel.setNotes.mockImplementation(() => [
      'this is a note'
    ]);

    const view = new View(mockModel,mockNotesApi);
    
    mockNotesApi.loadNotes.mockImplementation((callback) => callback([
      'this is a note'
    ])); 
    view.displayNotesFromApi();
    expect(mockModel.setNotes).toHaveBeenCalledTimes(1);
    expect(document.querySelectorAll('.note').length).toBe(1);

  });
  it('let user to add notes', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    const mockModel = new Model();
    const mockNotesApi = new NotesApi();

    mockModel.getNotes.mockImplementation(() => [
      'this is a note'
    ]);
    mockModel.setNotes.mockImplementation(() => [
      'this is a note'
    ]);

    const view = new View(mockModel,mockNotesApi);
    mockNotesApi.createNote.mockImplementation((note,callback) => callback([
      'this is a note'
    ])); 
    mockNotesApi.loadNotes.mockImplementation((callback) => callback([
      'this is a note'
    ])); 

    const inputEl = document.querySelector('#new-note');
    const addButtonEl = document.querySelector('#add-note');
    inputEl.value = 'this is a note';
    addButtonEl.click()
    expect(document.querySelectorAll('div.note').length).toBe(1)

  });
});