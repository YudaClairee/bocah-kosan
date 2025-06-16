"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState } from "react"
import { createTugas, deleteTugas, updateTugas } from "./action"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function Form() {
  const [state, action, pending] = useActionState(createTugas, null)

  return (
    <div className="w-full p-6 bg-white border rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Beri Tugas</h2>
        <p className="text-gray-600 mt-2">
          Jangan biarkan penghuni kosan nganggur ga beres-beres kosan nih.
        </p>
      </div>

      {/* Feedback Messages */}
      {state?.success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {state.message}
        </div>
      )}
      {state?.success === false && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {state.error}
        </div>
      )}

      <form action={action} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-3">
          <Label htmlFor="name-1">Nama</Label>
          <Input id="name-1" name="name" placeholder="Isi nama" required />
        </div>
        
        <div className="grid gap-3">
          <Label htmlFor="tugas-1">Tugas</Label>
          <Input id="tugas-1" name="tugas" placeholder="Isi tugas" required />
        </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-3">
          <Label htmlFor="status-1">Status</Label>
          <select id="status-1" name="status" className="border rounded px-3 py-2 w-full" required>
            <option value="">Pilih Status</option>
            <option value="Belum">Belum</option>
            <option value="Progress">Progress</option>
            <option value="Selesai">Selesai</option>
          </select>
        </div>
        
        <div className="grid gap-3">
          <Label htmlFor="priority-1">Urgensi</Label>
          <select id="priority-1" name="priority" className="border rounded px-3 py-2 w-full" required>
            <option value="">Pilih Urgensi</option>
            <option value="santuy">Santuy</option>
            <option value="buruan">Buruan</option>
          </select>
        </div>
        </div>
        

        {/* <div className="grid gap-3">
          <Label htmlFor="deadline-1">Deadline</Label>
          <Input id="deadline-1" name="deadline" type="date" placeholder="Pilih tanggal" required />
        </div> */}

        <div className="flex gap-3 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            className="flex-1"
            onClick={() => window.location.reload()}
          >
            Reset
          </Button>
          <Button 
            type="submit" 
            disabled={pending}
            className="flex-1 bg-[#d97706] hover:bg-[#b45309]"
          >
            {pending ? "Menambahkan..." : "Tambahkan"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export function DeleteButton({ id }) {
  const [deleteState, deleteAction, deletePending] = useActionState(deleteTugas, null)

  return (
    <div>
      {/* Show feedback if any */}
      {deleteState?.success && (
        <div className="text-green-600 text-sm mb-2">
          {deleteState.message}
        </div>
      )}
      {deleteState?.success === false && (
        <div className="text-red-600 text-sm mb-2">
          Error: {deleteState.error}
        </div>
      )}
      
      <form action={deleteAction}>
        <input type="hidden" name="id" value={id} />
        <button 
          type="submit"
          disabled={deletePending}
          className="text-xl bg-red-300 hover:bg-red-400 p-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          title="Hapus tugas"
        >
          {deletePending ? "⏳" : "❌"}
        </button>
      </form>
    </div>
  );
}

export function DialogEdit({ open, setOpen, penghuni }) {
  const [updateState, updateAction, updatePending] = useActionState(updateTugas, null)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Tugas</DialogTitle>
          <DialogDescription>
            Edit tugas lo yang salah biar ga terjadi debat ye!
          </DialogDescription>
        </DialogHeader>

        {/* Feedback Messages */}
        {updateState?.success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {updateState.message}
          </div>
        )}
        {updateState?.success === false && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error: {updateState.error}
          </div>
        )}

        <form action={updateAction} className="space-y-4">
          <input type="hidden" name="id" value={penghuni?._id} />
          
          <div className="grid gap-3">
            <Label htmlFor="edit-name">Nama</Label>
            <Input 
              id="edit-name" 
              name="name" 
              defaultValue={penghuni?.name} 
              required 
            />
          </div>
          
          <div className="grid gap-3">
            <Label htmlFor="edit-tugas">Tugas</Label>
            <Input 
              id="edit-tugas" 
              name="tugas" 
              defaultValue={penghuni?.tugas} 
              required 
            />
          </div>
          
          <div className="grid gap-3">
            <Label htmlFor="edit-status">Status</Label>
            <select 
              id="edit-status" 
              name="status" 
              className="border rounded px-3 py-2 w-full" 
              defaultValue={penghuni?.status}
              required
            >
              <option value="">Pilih Status</option>
              <option value="Belum">Belum</option>
              <option value="Progress">Progress</option>
              <option value="Selesai">Selesai</option>
            </select>
          </div>
          
          <div className="grid gap-3">
            <Label htmlFor="edit-priority">Urgensi</Label>
            <select 
              id="edit-priority" 
              name="priority" 
              className="border rounded px-3 py-2 w-full" 
              defaultValue={penghuni?.priority}
              required
            >
              <option value="">Pilih Urgensi</option>
              <option value="santuy">Santuy</option>
              <option value="buruan">Buruan</option>
            </select>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Batal</Button>
            </DialogClose>
            <Button 
              type="submit" 
              disabled={updatePending}
              className="bg-[#d97706] hover:bg-[#b45309]"
            >
              {updatePending ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

