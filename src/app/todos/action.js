"use server";

import { getUsername } from "@/utils/getUsername";
import { revalidatePath } from "next/cache";

export async function createTugas(_, formData) {
  try {
    const name = formData.get("name");
    const tugas = formData.get("tugas");
    const status = formData.get("status");
    const priority = formData.get("priority");
    const username = await getUsername();

    // Validasi basic
    if (!name || !tugas || !status || !priority) {
      throw new Error("Semua field harus diisi");
    }

    const response = await fetch(
      "https://v1.appbackend.io/v1/rows/O3KZ05PfZVtI",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify([{ name, tugas, status, priority, username }]),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Response dari API:", result);

    revalidatePath("/todos");

    return { success: true, message: "Tugas berhasil ditambahkan!" };
  } catch (error) {
    console.error("Error creating task:", error);
    return { success: false, error: error.message };
  }
}

export async function updateTugas(_, formData) {
  try {
    const id = formData.get("id");
    const name = formData.get("name");
    const tugas = formData.get("tugas");
    const status = formData.get("status");
    const priority = formData.get("priority");
    const username = await getUsername();

    console.log("Data yang akan diupdate:", {
      id,
      name,
      tugas,
      status,
      priority,
      username,
    });

    // Validasi basic
    if (!id || !name || !tugas || !status || !priority) {
      throw new Error("Semua field harus diisi");
    }

    const response = await fetch(
      `https://v1.appbackend.io/v1/rows/O3KZ05PfZVtI`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          name,
          tugas,
          status,
          priority,
          username,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Response update dari API:", result);

    revalidatePath("/todos");

    return { success: true, message: "Tugas berhasil diupdate!" };
  } catch (error) {
    console.error("Error updating task:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteTugas(_, formData) {
  try {
    const id = formData.get("id");

    if (!id) {
      throw new Error("ID tugas tidak ditemukan");
    }

    const response = await fetch(
      `https://v1.appbackend.io/v1/rows/O3KZ05PfZVtI`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([id]),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    revalidatePath("/todos");

    return { success: true, message: "Tugas berhasil dihapus!" };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
