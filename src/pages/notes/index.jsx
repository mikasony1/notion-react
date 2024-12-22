import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../components/UserContextProvider";
import { deleteNote, getNotesByUser } from "../../utils/api";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const userContext = useContext(UserContext);

  const loadNotes = async () => {
    setLoading(true);
    const userNotes = await getNotesByUser(userContext.user.id);
    setNotes(userNotes);
    setLoading(false);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleDelete = async (id) => {
    await deleteNote(id);
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-slate-300 w-full">
      <div className="w-5/6 flex flex-col items-center justify-center mx-auto">
        <h2 className="text-5xl mb-9 font-medium">Notes</h2>
        <button className="text-lg font-medium mb-6 py-3 px-14 bg-slate-400 ">
          <Link to="/notes/new">Add new notes</Link>
        </button>
        <ul className="w-3/4 max-h-80 overflow-y-scroll">
          {notes.map((note) => {
            return (
              <li
                key={note.id}
                className="flex justify-between mb-4 px-4 bg-slate-400"
              >
                <Link to={`/notes/${note.id}`}>
                  <div className="flex items-center gap-3 w-full">
                    <p className=" text-lg font-medium py-2">{note.title}</p>
                    <p className="text-sm">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
                <div className="flex items-center gap-3">
                  <Link to={`/notes/${note.id}/edit`}>✍</Link>
                  <button onClick={() => handleDelete(note.id)}>🚮</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
