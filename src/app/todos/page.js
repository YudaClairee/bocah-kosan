import { Card, CardContent } from "@/components/ui/card";
import { DeleteButton, Form } from "./form";
import { getUsername } from "@/utils/getUsername";
import EditButtonWithDialog from "./EditButtonWithDialog";
import Link from "next/link";
import { redirect } from "next/navigation";
import { API_BASE_URL } from "@/lib/constants";
import { logoutAction } from "./actions";

export default async function page() {
  // Check login status first before any try-catch
  let username;
  try {
    username = await getUsername();
  } catch (error) {
    // If not logged in, redirect immediately
    if (error.message.includes("login")) {
      redirect("/");
    }
    throw error; // Re-throw other errors
  }

  try {
    const res = await fetch(
      `${API_BASE_URL}/?filterKey=username&filterValue=${username}`,
      {
        cache: "no-store", // Prevent caching for real-time data
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch tasks: ${res.status}`);
    }

    const { data: task } = await res.json();

    return (
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h3 className="text-xl sm:text-2xl text-[#647A3F]">
              Haloo, paguyuban <span className="font-bold">{username}</span>
            </h3>
            <p className="mb-3 text-sm sm:text-base text-[#647A3F]">
              Lo bisa atur tugas penghuni kos lu dengan isi form di bawah!
            </p>
          </div>
          <div className="flex gap-2">
            <form action={logoutAction}>
              <button
                type="submit"
                className="bg-red-500 px-3 py-1 text-white font-semibold rounded hover:bg-red-600"
              >
                Logout
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <Form />
          <h3 className="text-lg sm:text-xl font-semibold">Semua Pekerjaan</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {task?.map((penghuni) => {
            return (
              <Card key={penghuni._id} className="w-full">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col md:flex-row md:gap-5 space-y-4 md:space-y-0">
                    <div className="flex-1 space-y-3 sm:space-y-4">
                      <div className="flex flex-col md:flex-row sm:items-center gap-2">
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-600">
                            Nama:
                          </h3>
                          <h2 className="text-[#647A3F] border border-amber-300 p-2 sm:p-3 rounded-md font-bold text-sm sm:text-base">
                            {penghuni.name}
                          </h2>
                        </div>
                      </div>

                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-600">
                          Tugas:
                        </h3>
                        <h2 className="text-[#647A3F] border border-amber-300 p-2 sm:p-3 rounded-md text-sm sm:text-base">
                          {penghuni.tugas}
                        </h2>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-600">
                            Urgensi:
                          </h3>
                          <h3 className="text-[#647A3F] border border-amber-300 p-2 sm:p-3 rounded-md text-sm sm:text-base">
                            {penghuni.priority}
                          </h3>
                        </div>

                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-600">
                            Status:
                          </h3>
                          {penghuni.status === "Belum" && (
                            <h3 className="bg-red-500 p-2 sm:p-3 rounded-md text-white font-semibold text-sm sm:text-base">
                              Belum
                            </h3>
                          )}
                          {penghuni.status === "Progress" && (
                            <h3 className="bg-orange-400 p-2 sm:p-3 rounded-md text-white font-semibold text-sm sm:text-base">
                              Progress
                            </h3>
                          )}
                          {penghuni.status === "Selesai" && (
                            <h3 className="bg-green-500 p-2 sm:p-3 rounded-md text-white font-semibold text-sm sm:text-base">
                              Selesai
                            </h3>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col justify-center items-center gap-3 sm:gap-2 pt-4 sm:pt-0">
                      <EditButtonWithDialog penghuni={penghuni} />
                      <DeleteButton id={penghuni._id} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading tasks:", error);

    // For API errors, show error page without redirect
    return (
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md text-center">
            <h2 className="font-bold text-lg mb-2">Oops! Ada yang error nih</h2>
            <p className="mb-4">
              Gagal memuat data tugas. Coba refresh halaman atau cek koneksi
              internet.
            </p>
            <div className="space-y-2">
              <Link
                href="/todos"
                className="block w-full bg-blue-500 px-4 py-2 text-white font-semibold rounded hover:bg-blue-600 text-center"
              >
                Coba Lagi
              </Link>
              <Link
                className="block w-full bg-[#647A3F] px-4 py-2 text-white font-semibold rounded hover:bg-[#4a5a2f]"
                href="/"
              >
                Kembali ke Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
