import { cookies } from "next/headers";
import { nextServer } from "./api";
import { EditedData, FetchNotesResponse } from "./clientApi";
import { Note } from "@/types/note";
import { User } from "@/types/user";

export const fetchNotes = async (
  query: string,
  tag: string,
  page: number
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();

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

  const res = await nextServer.get<FetchNotesResponse>(`/notes`, {
    params,
    headers: { Cookie: cookieStore.toString() },
  });
  return res.data;
};

export const checkServerSession = async () => {
  // Дістаємо поточні cookie
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });
  // Повертаємо повний респонс, щоб middleware мав доступ до нових cookie
  return res;
};

export const getServerSingleNote = async (id: string) => {
  const cookieStore = await cookies();
  const res = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      // передаємо кукі далі
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
};

export const getServerMe = async () => {
  const cookieStore = await cookies();
  const res = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const editServerMe = async (editedData: EditedData) => {
  const cookieStore = await cookies();
  const res = await nextServer.patch<User>("/users/me", editedData, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};
