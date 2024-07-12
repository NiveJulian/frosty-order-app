"use client";
import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);
  
  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      // Manejar el error, por ejemplo, mostrando un mensaje al usuario
    }
    setLoginInProgress(false);
  }
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Iniciar Sesion</h1>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          disabled={loginInProgress}
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          disabled={loginInProgress}
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button disabled={loginInProgress} type="submit">
          Ingresar
        </button>
        <div className="my-4 text-center text-gray-500">
          O ingresa con una cuenta de google
        </div>

        <button type="button" onClick={() => signIn('google')} className="flex gap-4 justify-center">
          <Image src={"/google.png"} width={24} height={24} alt={""} />
          Iniciar con google
        </button>
      </form>
    </section>
  );
}
