class NotesApi{
  loadNotes(callback) {
    fetch('http://localhost:3000/notes')
      .then(response => response.json())
      .then(data => {
        callback(data);
      });
  }

  latestNote(notes) {
    return notes[notes.length - 1];
  }

  createNote(note, callback) {
    fetch('http://localhost:3000/notes',{
    method: 'POST',
    headers: {
      'content-Type' : 'application/json',
    },
    body: JSON.stringify(note),
    })
    .then(response => response.json())
    .then(data => {
      console.log('success:', callback(data));
    })
    .catch((error) => {
      console.log('Error:', error);
    }); 
  }
}

module.exports = NotesApi;