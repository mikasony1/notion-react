import { v4 as uuidv4 } from "uuid";

export const authorizeUser = async (email, password) => {
  const params = new URLSearchParams({ email: email, password: password });
  const url = `http://localhost:5000/users?${params}`;
  const users = await get(url);
  return users ? users[0] : null;
};

export const createUser = async (email, password) => {
  const url = "http://localhost:5000/users";
  const user = {
    id: uuidv4(),
    email: email,
    creationDate: Date.now(),
    password: password,
  };
  return await post(url, user);
};

export const getNotesByUser = async (userId) => {
  const params = new URLSearchParams({ userId: userId });
  const url = `http://localhost:5000/notes?${params}`;
  return await get(url);
};

export const getNoteById = async (noteId) => {
  const url = `http://localhost:5000/notes/${noteId}`;
  return await get(url);
};

export const createNote = async (note) => {
  const url = "http://localhost:5000/notes";
  return await post(url, note);
};

export const deleteNote = async (noteId) => {
  const url = `http://localhost:5000/notes/${noteId}`;
  const response = await fetch(url, {
    method: "DELETE",
  });
};

export const updateNote = async (note) => {
  const url = `http://localhost:5000/notes/${note.id}`;
  return await put(url, note);
};

const get = async (url) => {
  const response = await fetch(url);
  return response.ok ? response.json() : null;
};

const post = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.ok ? response.json() : null;
};

const put = async (url, data) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.ok ? response.json() : null;
};
