/**
* @jest-environment jsdom
*/

const fs = require('fs');
const Model = require('./notesModel');
const View = require('./view');

describe('views', () => {
  it('displays 2 notes', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');
    
    const model = new Model();
    const view = new View(model);
    model.addNote('This is my first note');
    model.addNote('This is my second note');
    view.displayNotes();
    expect(document.querySelectorAll('div.note').length).toBe(2)
  });
  it('let user to add notes', () => {
    document.body.innerHTML = fs.readFileSync('./index.html');

    const model = new Model();
    const view = new View(model);
    const inputEl = document.querySelector('#new-note');
    const addButtonEl = document.querySelector('#add-note');
    inputEl.value = 'My first note';
    addButtonEl.click()
    expect(document.querySelectorAll('.note').length).toBe(1)

  });
});