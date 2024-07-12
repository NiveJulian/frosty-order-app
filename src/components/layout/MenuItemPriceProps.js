import Trash from "@/components/Icons/Trash";
import Plus from "@/components/Icons/Plus";
import ChevronDown from "@/components/Icons/ChevronDown";
import ChevronUp from "@/components/Icons/ChevronUp";
import { useState } from "react";

export default function MenuItemPriceProps({
  name,
  addLabel,
  props,
  setProps,
}) {
  const [isOpen, setIsOpen] = useState(false);
  function addProp() {
    setProps((oldProp) => {
      return [...oldProp, { name: "", price: 0 }];
    });
  }
  function editProp(ev, index, prop) {
    const newValue = ev.target.value;
    setProps((prevProps) => {
      const newSizes = [...prevProps];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }
  function removeProp(indexToRemove) {
    setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
  }
  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <button 
      onClick={() => setIsOpen(prev => !prev)}
      className="inline-flex p-1 border-0 justify-start" type="button">
        {isOpen && <ChevronUp />}
        {!isOpen && <ChevronDown />}
        <span>{name}</span>
        <span>({props?.length})</span>
      </button>
      <div className={isOpen ? 'block' : 'hidden'}>
        {props?.length > 0 &&
          props.map((size, index) => (
            <div className="flex items-end gap-2" key={size._id}>
              <div>
                <label>Nombre</label>
                <input
                  type="text"
                  value={size.name}
                  onChange={(ev) => editProp(ev, index, "name")}
                  placeholder="Escriba el tamaño o cantidad que busca"
                />
              </div>
              <div>
                <label>Precio extra</label>
                <input
                  type="text"
                  value={size.price}
                  onChange={(ev) => editProp(ev, index, "price")}
                  placeholder="Precio extra"
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => removeProp(index)}
                  className="bg-white mb-2 px-2 "
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))}
        <button
          type="button"
          onClick={addProp}
          className="bg-white items-center"
        >
          <Plus className="w-4 h-4" />
          <span>{addLabel}</span>
        </button>
      </div>
    </div>
  );
}
