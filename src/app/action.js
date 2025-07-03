"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(_, formData) {
  const cookieStore = await cookies();
  const username = formData.get("username");

  // Validasi input
  if (!username || username.trim() === "") {
    return { success: false, error: "Nama kosan tidak boleh kosong!" };
  }

  if (username.trim().length < 3) {
    return { success: false, error: "Nama kosan minimal 3 karakter!" };
  }

  try {
    console.log("Login attempt:", username);
    cookieStore.set("username", username.trim());
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "Gagal menyimpan session. Coba lagi!" };
  }

  // Redirect di luar try-catch
  redirect("/todos");
}
