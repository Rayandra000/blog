import { IAuthorLogin, IAuthorReg } from "@/type/author";
const base_url = process.env.BASE_URL_API || "http://localhost:8000/api";

export const regAuthor = async (data: IAuthorReg) => {
  const res = await fetch(`${base_url}/author`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await res.json();
  return { result, ok: res.ok };
};

export const loginAuthor = async (data: IAuthorLogin) => {
  const res = await fetch(`${base_url}/author/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await res.json();
  return { result, ok: res.ok };
};

export const verifyAuthor = async (token: string) => {
  const res = await fetch(`${base_url}/author/verify`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await res.json();
  return { result, ok: res.ok };
};
