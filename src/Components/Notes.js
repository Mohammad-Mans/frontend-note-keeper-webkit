import "./Notes.css";
import Note from "./Note";

function Notes({ notes, onDeleteNote, onUpdateNote }) {
  return (
    <section className="notes">
      {notes.map((note) => (
        <Note
          key={note._id}
          {...note}
          onDelete={() => onDeleteNote(note._id)}
          onUpdate={(updatedNote) => {
            onUpdateNote(note._id, updatedNote);
          }}
        />
      ))}
    </section>
  );
}

export default Notes;
