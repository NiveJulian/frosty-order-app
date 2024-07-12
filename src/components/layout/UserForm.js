"use client";
import { useState } from "react";
import EditableImage from "@/components/layout/EditableImage";

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [image, setImage] = useState(user?.image || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [city, setCity] = useState(user?.city || '');
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
  const [postalCode, setPostalCode] = useState(user?.postalCode || '');
  const [country, setCountry] = useState(user?.country || '');
  return (
    <div className="flex gap-4">
      <div>
        <div className="p-2 rounded-lg relative max-w-[120px]">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>
      <form
        className="grow"
        onSubmit={(ev) =>
          onSave(ev, {
            name: userName,
            image,
            phone,
            city,
            streetAddress,
            postalCode,
            country,
          })
        }
      >
        <input
          type="text"
          placeholder="Escriba su nombre"
          value={userName}
          onChange={(ev) => setUserName(ev.target.value)}
        />
        <input
          type="email"
          placeholder="Escriba su email"
          value={email} // Utiliza el estado email en lugar de user.email
          disabled={true}
        />
        <input
          type="tel"
          placeholder="Escriba su numero de telefono"
          value={phone}
          onChange={(ev) => setPhone(ev.target.value)}
        />
        <input
          type="text"
          placeholder="Escriba su direccion"
          value={streetAddress}
          onChange={(ev) => setStreetAddress(ev.target.value)}
        />
        <div className="flex gap-4">
          <input
            style={{ margin: "0" }}
            type="text"
            placeholder="Escriba su ciudad"
            value={city}
            onChange={(ev) => setCity(ev.target.value)}
          />
          <input
            style={{ margin: "0" }}
            type="text"
            placeholder="Escriba su codigo postal"
            value={postalCode}
            onChange={(ev) => setPostalCode(ev.target.value)}
          />
        </div>
        <input
          type="text"
          placeholder="Escriba su provincia"
          value={country}
          onChange={(ev) => setCountry(ev.target.value)}
        />

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}
