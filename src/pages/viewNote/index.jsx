import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getNoteById } from "../../utils/api";

export default function ViewNote() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadNote = async () => {
    setLoading(true);
    const data = await getNoteById(id);
    if (!data) {
      navigate("/error");
    }
    setNote(data);
    setLoading(false);
  };

  useEffect(() => {
    loadNote();
  }, [id]);

  if (loading) {
    return <div>Loding...</div>;
  }

  return (
    <div className="flex items-center w-full h-4/5 bg-slate-300">
      <div className="w-3/5 grid grid-cols-4 grid-rows-3 mx-auto justify-items-center">
        <button className="self-start text-base py-1 px-5 mt-4 bg-slate-400 font-medium">
          <Link to="/notes">Back</Link>
        </button>
        <h2 className="col-start-2 col-end-4 text-5xl mb-10">{note?.title}</h2>
        <div className="w-full col-start-1 col-end-5 row-start-2 row-end-4 px-5 py-2 text-lg bg-slate-400 note-body">
          {note?.body}
        </div>
      </div>
    </div>
  );
}
