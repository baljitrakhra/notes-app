class NotesApi{
  getNotesInfo() {
    fetch('http://localhost:3000/notes')
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }
}

module.exports = NotesApi;