import "server-only";
import { cookies } from "next/headers";

export async function getUsername() {
  const cookieStore = await cookies();
  const usernameCookie = cookieStore.get("username");

  if (!usernameCookie || !usernameCookie.value) {
    throw new Error("User belum login atau session sudah expired");
  }

  return usernameCookie.value;
}
