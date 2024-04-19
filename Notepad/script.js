document.addEventListener('DOMContentLoaded', function() {
    const noteInput = document.getElementById('note-input');
    const addNoteBtn = document.getElementById('add-note');
    const editNoteBtn = document.getElementById('edit-note');
    const deleteNoteBtn = document.getElementById('delete-note');
    const notesList = document.getElementById('notes-list');
    const themeToggle = document.getElementById('theme-toggle');

    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    let selectedNote = null;

    function renderNotes() {
        notesList.innerHTML = '';
        notes.forEach((note, index) => {
            const noteDiv = document.createElement('div');
            noteDiv.classList.add('note');

            const noteContent = document.createElement('div');
            noteContent.classList.add('note-content');
            noteContent.innerHTML = marked(note.content);

            const noteDate = document.createElement('div');
            noteDate.classList.add('note-date');
            noteDate.textContent = `Created: ${new Date(note.date).toLocaleString()}`;

            const noteActions = document.createElement('div');
            noteActions.classList.add('note-actions');

            const editIcon = document.createElement('i');
            editIcon.classList.add('fas', 'fa-edit');
            editIcon.addEventListener('click', () => {
            selectNote(index);
            });
            const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fas', 'fa-trash');
        deleteIcon.addEventListener('click', () => {
            deleteNote(index);
        });

        noteActions.appendChild(editIcon);
        noteActions.appendChild(deleteIcon);

        noteDiv.appendChild(noteContent);
        noteDiv.appendChild(noteDate);
        noteDiv.appendChild(noteActions);

        notesList.appendChild(noteDiv);
    });
}

function selectNote(index) {
    selectedNote = notes[index];
    noteInput.value = selectedNote.content;
    addNoteBtn.disabled = true;
    editNoteBtn.disabled = false;
    deleteNoteBtn.disabled = false;
}

function addNote() {
    const noteContent = noteInput.value.trim();
    if (noteContent) {
        const newNote = {
            content: noteContent,
            date: new Date().getTime()
        };
        notes.push(newNote);
        saveNotes();
        noteInput.value = '';
        renderNotes();
        addNoteBtn.disabled = false;
        editNoteBtn.disabled = true;
        deleteNoteBtn.disabled = true;
    }
}

function editNote() {
    if (selectedNote) {
        selectedNote.content = noteInput.value.trim();
        saveNotes();
        renderNotes();
        addNoteBtn.disabled = false;
        editNoteBtn.disabled = true;
        deleteNoteBtn.disabled = true;
        selectedNote = null;
    }
}

function deleteNote(index) {
    notes.splice(index, 1);
    saveNotes();
    renderNotes();
    addNoteBtn.disabled = false;
    editNoteBtn.disabled = true;
    deleteNoteBtn.disabled = true;
    selectedNote = null;
}

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

addNoteBtn.addEventListener('click', addNote);
editNoteBtn.addEventListener('click', editNote);
deleteNoteBtn.addEventListener('click', () => {
    if (selectedNote) {
        deleteNote(notes.indexOf(selectedNote));
    }
});
themeToggle.addEventListener('change', toggleTheme);

renderNotes();
});