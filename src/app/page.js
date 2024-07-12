import Header from "../components/layout/Header";
import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeader from "../components/layout/SectionHeader";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16">
        <SectionHeader
          subHeader={"Nuestra historia"}
          mainHeader={"Sobre nosotros"}
        />
        <div className="max-w-2xl mx-auto mt-4 text-gray-500 flex flex-col gap-4">
          <p>
            Somos una tienda de alimentos congelados comprometida con ofrecerte
            productos de la más alta calidad y conveniencia. En nuestro negocio,
            nos esforzamos por simplificar tu vida diaria al proporcionarte una
            amplia gama de opciones saludables y deliciosas que se adaptan
            perfectamente a tu estilo de vida ocupado.
          </p>
          <p>
            Desde frutas y verduras frescas hasta platos preparados listos para
            calentar y servir.
          </p>
          <p>
            Estamos aquí para satisfacer tus necesidades culinarias con
            productos que mantienen su sabor y frescura. Nuestro objetivo es
            hacer que cocinar en casa sea más fácil y satisfactorio para ti y tu
            familia. ¡Descubre el placer de la comida congelada de calidad con
            nosotros!
          </p>
        </div>
      </section>
      <section className="text-center my-16">
        <SectionHeader 
          subHeader={"No lo dudes"}
          mainHeader={"Contactanos"} 
        />
        <div className="mt-8">
          <a
            className="text-4xl underline text-gray-500"
            href="tel:+543772430213"
          >
            +54 3772 430 213
          </a>
        </div>
      </section>
    </>
  );
}
