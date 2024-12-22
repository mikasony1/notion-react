import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../components/UserContextProvider";
import { createNote } from "../../utils/api";
import { v4 as uuidv4 } from "uuid";
import NoteForm from "../../components/NoteForm";

export default function NewNote() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  const onSubmit = async ({ title, body }) => {
    await createNote({
      id: uuidv4(),
      userId: userContext.user.id,
      title: title,
      body: body,
      createdAt: Date.now(),
    });
    navigate("/notes");
  };

  return (
    <NoteForm
      onSubmit={onSubmit}
      buttonText="Create"
      titleText="Create new note"
    />
  );
}
