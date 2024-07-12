import EditableImage from "@/components/layout/EditableImage";
import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps";
import { useEffect, useState } from "react";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(menuItem?.category || "");
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(
    menuItem?.extraIngredientPrices || []
  );

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }, []);

  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, {
          image,
          name,
          description,
          basePrice,
          sizes,
          extraIngredientPrices,
          category,
        })
      }
      className="mt-8 max-w-2xl mx-auto"
    >
      <div
        className="grid items-start gap-2"
        style={{ gridTemplateColumns: ".3fr .7fr" }}
      >
        <div>
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className="grow">
          <label>Nombre del menu</label>
          <input
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            type="text"
          />
          <label>Descripcion</label>
          <input
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            type="text"
          />
          <label>Categoria</label>
          <select value={category} onChange={ev => setCategory(ev.target.value)}>
            {categories?.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>

          <label>Precio</label>
          <input
            value={basePrice}
            onChange={(ev) => setBasePrice(ev.target.value)}
            type="text"
          />

          <MenuItemPriceProps
            name={"Tamaños"}
            props={sizes}
            addLabel={"Agregar tamaño"}
            setProps={setSizes}
          />
          <MenuItemPriceProps
            name={"Ingredientes Extras"}
            props={extraIngredientPrices}
            addLabel={"Agregar Ingredientes"}
            setProps={setExtraIngredientPrices}
          />
          <button type="submit">Crear</button>
        </div>
      </div>
    </form>
  );
}
