"use client";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import Rigth from "@/components/Icons/Right";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function MenuItemPage() {
  const [menuItems, setMenuItems] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (loading) {
    return "Cargando menu...";
  }

  if (!data.admin) {
    return "No eres admin";
  }
  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link className="button flex text-center" href={"/menu-items/new"}>
          <span>Crear nuevo menu </span>
          <Rigth />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8">Editar tus Menu items</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
                href={"/menu-items/edit/" + item._id}
                key={item._id}
                className="bg-gray-300 rounded-lg p-4"
              >
                <div className="relative">
                  <Image
                    className="rounded-md"
                    src={item.image}
                    alt=""
                    width={100}
                    height={100}
                  />
                </div>
                <div className="text-center">{item.name}</div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
