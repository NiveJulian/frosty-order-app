"use client";
import { useSession } from "next-auth/react";
import UserTabs from "@/components/layout/UserTabs";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserForm from "../../components/layout/UserForm";

export default function ProfilePage() {
  const session = useSession();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setprofileFetched] = useState(false);
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setUser(data);
          setIsAdmin(data.admin);
          setprofileFetched(true);
        });
      });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Tyoe": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(savingPromise, {
      loading: "Guardando...",
      success: "Perfil Guardado!",
      error: "Error",
    });
  }

  if (status === "loading" && !profileFetched) {
    return "Cargando..";
  }
  if (status === "unauthenticated") {
    return redirect("/login");
  }
  return (
    <section className="mt-8">
      <UserTabs isAdmin={isAdmin}></UserTabs>
      <h1 className="text-center mt-8 text-primary text-4xl mb-4">Profile</h1>
      <div className="maw-w-2xl mx-auto mt-8">
        <UserForm user={user} onSave={handleProfileInfoUpdate} />
      </div>
    </section>
  );
}
