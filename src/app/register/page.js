"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);
  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    try {
      await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      setCreatingUser(false);
      setUserCreated(true);
    } catch (e) {
      setError(true);
    }
  }
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Registrarte</h1>

      {userCreated && (
        <div className="my-4 text-center">
          Usario creado.
          <br />
          Ahora puedes ingresar en{" "}
          <Link className="underline" href={"/login"}>
            iniciar sesion &raquo;
          </Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center text-red-500">
          Se obtuvo un error.
          <br />
          Por favor intente nuevamente o mas tarde.
        </div>
      )}
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        {/* <input type="text" placeholder="Nombre y apellido" />
        <input type="text" placeholder="Telefono" /> */}
        <input
          type="email"
          placeholder="Email"
          disabled={creatingUser}
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          disabled={creatingUser}
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit" disabled={creatingUser}>
          Registrarte
        </button>
        <div className="my-4 text-center text-gray-500">
          O ingresa con una cuenta de google
        </div>
        <button
          type="button" 
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-4 justify-center"
        >
          <Image src={"/google.png"} width={24} height={24} alt={""} />
          Iniciar con google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-2">
          Tienes una cuenta existente?{" "}
          <Link className="underline" href={"/login"}>
            Inicia Sesion
          </Link>
        </div>
      </form>
    </section>
  );
}
