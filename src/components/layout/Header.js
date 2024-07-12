"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const session = useSession();
  const status = session.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }
  return (
    <header className="flex items-center justify-between">
      <nav className="flex items-center gap-3 text-gray-500 font-semibold">
        <Link
          className="text-primary text-center font-semibold text-2xl"
          href={"/"}
        >
          Ice Shop
        </Link>
        <Link href={"/"}>Inicio</Link>
        <Link href={""}>Menu</Link>
        <Link href={""}>Nosotros</Link>
        <Link href={""}>Contacto</Link>
      </nav>
      <nav className="flex items-center gap-2 text-gray-500 font-semibold">
        {status === "authenticated" && (
          <>
            <Link href={"/profile"} className="whitespace-nowrap">
              Hola, {userName}
            </Link>
            <button
              onClick={() => signOut()}
              className="bg-primary rounded-full text-white px-6 py-2"
            >
              Salir
            </button>
          </>
        )}
        {status === "unauthenticated" && (
          <>
            <Link href={"/login"}>Iniciar Sesion</Link>
            <Link
              href={"/register"}
              className="bg-primary rounded-full text-white px-6 py-2"
            >
              Registrarse
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
