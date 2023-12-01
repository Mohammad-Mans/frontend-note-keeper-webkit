import "./Notes.css";
import Note from "./Note";

function Notes({ notes }) {
  return (
    <section className="notes">
      {notes.map((note) => (
        <Note key={note._id} note={note} />
      ))}
    </section>
  );
}

export default Notes;
