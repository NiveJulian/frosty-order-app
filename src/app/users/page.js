"use client";
import { useProfile } from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/users").then((response) => {
      response.json().then((users) => {
        setUsers(users);
      });
    });
  }, []);

  if (loading) {
    return "Cargando informacion de usuario...";
  }

  if (!data.admin) {
    return "No eres admin";
  }

  return (
    <section className="max-w-2xl mx-auto mt-8">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        {users?.length > 0 &&
          users.map((user) => (
            <div
              key={user._id}
              className="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4"
            >
              <div className="grid grid-cols-2 gap-4 grow">
                <div className="text-gray-700">
                {!!user.name && (<span>{user.name}</span>)}
                {!user.name && (<span className="italic">No name</span>)}
                </div>
                <span className="text-gray-400">{user.email}</span>
              </div>
              <div>
                <Link className="button" href={'/users/'+user._id}>Editar</Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
