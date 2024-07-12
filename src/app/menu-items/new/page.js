"use client";
import Left from "@/components/Icons/Left";
import { useProfile } from "@/components/UseProfile";
import EditableImage from "@/components/layout/EditableImage";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import MenuItemForm from "../../../components/layout/MenuItemForm";

export default function NewMenuItemPage() {
  const { loading, data } = useProfile();
  const [redirectToItems, setRedirectToItems] = useState(false)


  async function handleFormSubmit(ev, data) {
    ev.preventDefault();;
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) resolve();
      else reject();
    });
    await toast.promise(savingPromise, {
      loading: "Guardando este sabroso artículo...",
      success: "Guardado",
      error: "Error",
    });

    setRedirectToItems(true)
  }
  if (redirectToItems) {
    return redirect("/menu-items");
  }

  if (loading) {
    return "Cargando menu...";
  }

  if (!data.admin) {
    return "No eres admin";
  }
  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={"/menu-items"} className="button">
          <span>Volver</span> <Left />
        </Link>
      </div>
      <MenuItemForm  menuItem={null} onSubmit={handleFormSubmit}/>
    </section>
  );
}
