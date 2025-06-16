"use client";
import { useState } from "react";
import { DialogEdit } from "./form";

export default function EditButtonWithDialog({ penghuni }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-xl bg-green-400 hover:bg-green-500 p-1 rounded transition-colors"
        title="Edit tugas"
      >
        🧑‍💻
      </button>
      <DialogEdit open={open} setOpen={setOpen} penghuni={penghuni} />
    </>
  );
} 