"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Outfit } from "next/font/google";
import { loginAction } from "../action";
import { useActionState } from "react";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  const [state, action, pending] = useActionState(loginAction, null);

  return (
    <div className="max-w-3xl m-auto">
      <main className=" space-y-4 mb-10">
        <h1 className={`${outfit.className} font-bold text-[#D97706] text-4xl`}>
          Bagi-bagi tugas kosan gausah ribet lagi!
        </h1>
        <p className={`text-[#647A3F] text-xl text-justify`}>
          Web app untuk manajemen tugas rumah tangga di antara teman serumah
          atau sekosan. Tujuannya biar semua orang tau giliran siapa dan
          tugasnya udah dikerjain apa belum. Cocok buat 2-5 orang serumah.
        </p>
      </main>

      <section className="space-y-3 flex flex-col justify-center items-center">
        <h2 className="font-semibold text-[#D97706]">
          Mau nyoba? Login dulu gak sih!
        </h2>
        <Card className="w-[350px]">
          <CardContent>
            {/* Error message */}
            {state?.success === false && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {state.error}
              </div>
            )}

            <form className="space-y-3" action={action}>
              <Input
                name="username"
                placeholder="Masukin nama kosan lu"
                required
              />
              <Button
                disabled={pending}
                type="submit"
                className="w-full bg-[#d97706] hover:opacity-40 hover:bg-[#d97706] disabled:opacity-50"
              >
                {pending ? "Login..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
