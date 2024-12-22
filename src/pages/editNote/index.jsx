import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNoteById, updateNote } from "../../utils/api";
import NoteForm from "../../components/NoteForm";

export default function EditNote() {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
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

  const onEdit = async ({ title, body }) => {
    const updatedNote = { ...note, title, body: body };
    await updateNote(updatedNote);
    navigate(`/notes/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <NoteForm
      onSubmit={onEdit}
      initialTitle={note?.title}
      initialBody={note?.body}
      buttonText="Save"
      titleText="Edit note"
    />
  );
}
