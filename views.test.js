/**
* @jest-environment jsdom
*/

const fs = require('fs');
const Model = require('./notesModel');
const View = require('./view');
const NotesApi = require('./notesApi');

require('jest-fetch-mock').enableFetchMocks()
jest.mock("./notesApi");


describe('views', () => {

  beforeEach(() => {
    NotesApi.mockClear();
  });
  it('displays 2 notes', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    
    const model = new Model();
    const view = new View(model);
    model.addNote('This is my first note');
    model.addNote('This is my second note');
    view.displayNotes();
    expect(document.querySelectorAll('div.note').length).toBe(2)
  });
  // it('refreshes the page to show onl yone copy of each note', () => {
  //   document.body.innerHTML = fs.readFileSync('./index.html');

  //   const model = new Model();
  //   const api = new NotesApi();
  //   const view = new View(model,api);
  //   const inputEl = document.querySelector('#new-note');
  //   const addButtonEl = document.querySelector('#add-note');
  //   inputEl.value = 'My first note';
  //   addButtonEl.click()
  //   inputEl.value = 'My second name';
  //   addButtonEl.click();
  //   expect(document.querySelectorAll('div.note').length).toBe(2)

  // });

  describe('error', () => {
    it('shows an error on the page if htere is one',() => {
      const model = new Model();
      const mockNotesApi = new NotesApi();
      const view = new View(model, mockNotesApi);
      view.displayError();
      expect(document.querySelector('div.error').innerText).toEqual('Oops, something went wrong');
    });
  });
});