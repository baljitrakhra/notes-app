const NotesApi = require('./notesApi');

require('jest-fetch-mock').enableFetchMocks();

describe('Notes class', () => {
  it('calls fetch and loads the data', ()=> {
    const api = new NotesApi;
    
    fetch.mockResponseOnce(
      JSON.stringify({
      note: ['This note is mock']
    }));
    
    api.loadNotes((repoInfo) => {
      expect(repoInfo.note).toStrictEqual(['This note is mock']);
    });

  });
});
