import { NewNoteData, Note } from "@/types/note";
import { nextServer } from "./api";
import { User } from "@/types/user";

export type FetchNotesResponse = {
  notes: Note[];
  totalPages: number;
};

export type CheckSessionResponse = {
  success: boolean;
};

export const fetchNotes = async (
  query: string,
  tag: string,
  page: number
): Promise<FetchNotesResponse> => {
  const params: {
    page: number;
    perPage: number;
    search?: string;
    tag?: string;
  } = { page, perPage: 12 };

  if (query.trim() !== "") {
    params.search = query;
  }

  if (tag) {
    params.tag = tag;
  }

  const res = await nextServer.get<FetchNotesResponse>(`/notes`, { params });
  return res.data;
};

export const createNote = async (newNoteData: NewNoteData) => {
  const res = await nextServer.post<Note>(`/notes`, newNoteData);
  return res.data;
};

export const deleteNote = async (noteId: string) => {
  const res = await nextServer.delete<Note>(`/notes/${noteId}`);
  return res.data;
};

export const getSingleNote = async (id: string) => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};

interface RegisterRequest {
  email: string;
  password: string;
}

export const register = async (signUpData: RegisterRequest) => {
  const { data } = await nextServer.post(`/auth/register`, signUpData);
  return data;
};

export const login = async (loginData: RegisterRequest) => {
  const { data } = await nextServer.post(`/auth/login`, loginData);
  return data;
};

export const logOut = async () => {
  const { data } = await nextServer.post(`/auth/logout`);
  return data;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>(`/users/me`);
  return data;
};

export interface EditedData {
  email: string;
  username: string;
  avatar: string;
}

export const editMe = async (editedData: EditedData) => {
  const { data } = await nextServer.patch<User>(`/users/me`, editedData);
  return data;
};

export const checkSession = async () => {
  const { data } = await nextServer.get<CheckSessionResponse>(`/auth/session`);
  return data.success;
};
