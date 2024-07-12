import Image from "next/image";
import Right from "../Icons/Right";

export default function Hero() {
  return (
    <section className="hero mt-4">
      <div className="py-12">
        <h1 className="text-4xl font-semibold">
         <span className="text-primary">Sabor Intenso</span>
        </h1>
        <p className="my-6 text-gray-500 text-sm">
        Descubre una variedad de alimentos congelados de primera calidad que te harán la vida más fácil y deliciosa. Desde frutas y verduras frescas hasta comidas preparadas irresistibles, tenemos todo lo que necesitas para crear platos deliciosos en minutos. ¡Ordénalos ahora y disfruta de su sabor excepcional con total conveniencia!
        </p>
        <div className="flex gap-4 text-sm">
          <button className="justify-center bg-primary uppercase flex items-center gap-2 text-white px-4 py-2 rounded-full">
            Ordenar ahora
            <Right />
          </button>
          <button className="flex items-center gap-2 py-2 border-0 text-gray-600 font-semibold">
            Ver Mas
            <Right />
          </button>
        </div>
      </div>
      <div className="relative">
        <Image
          src={"/milanesa.png"}
          layout={"fill"}
          objectFit={"contain"}
          sizes="20"
          priority
          alt={"pizza"}
          className="rounded-full"
        />
      </div>
    </section>
  );
}
