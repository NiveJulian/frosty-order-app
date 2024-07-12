"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeleteButton from "../../components/DeleteButton";

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);
  const { loading: profileLoading, data: profileData } = useProfile();

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  async function handleCategorySubmit(ev) {
    ev.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setCategoryName("");
      fetchCategories();
      setEditedCategory(null);

      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });
    toast.promise(creationPromise, {
      loading: editedCategory
        ? "Editando tu categoria..."
        : "Creando tu nueva categoria...",
      success: editedCategory ? "Categoria editada" : "Categoria creada",
      error: "Error, perdon..",
    });
  }

  async function handleDeleteClick(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories?_id=" + _id, {
        method: "DELETE",
      });
      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    toast.promise(promise, {
      loading: "Borrando...",
      success: "Borrado",
      error: "Error",
    });

    fetchCategories();
  }

  if (profileLoading) {
    return "Cargando informacion de usuario...";
  }

  if (!profileData.admin) {
    return "No eres admin";
  }
  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editedCategory ? "Editar categoria" : "Nueva categoria"}
              {editedCategory && (
                <>
                  : <b>{editedCategory.name}</b>
                </>
              )}
            </label>
            <input
              value={categoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
              type="text"
            />
          </div>
          <div className="pb-2 flex gap-2">
            <button className="border border-primary" type="submit">
              {editedCategory ? "Editar" : "Crear"}
            </button>
            <button onClick={() => {
               setEditedCategory(null)
               setCategoryName('')
            }} type="button">
              Cancel
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Categorias Existentes: </h2>
        {categories?.length > 0 &&
          categories.map((c) => (
            <div
              className="bg-gray-100 rounded-lg py-2 px-4 flex gap-1 mb-1 items-center"
              key={c._id}
            >
              <div className="grow">{c.name}</div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setEditedCategory(c);
                    setCategoryName(c.name);
                  }}
                >
                  Editar
                </button>
                <DeleteButton label="Eliminar" onDelete={() => handleDeleteClick(c._id)} />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
