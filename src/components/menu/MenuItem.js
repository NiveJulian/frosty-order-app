export default function MenuItem() {
  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
      <div className="text-center">
        <img className="rounded-lg max-h-auto max-h-24 block mx-auto" src="portada-pizza.jpg" alt="pizza" />
      </div>
      <h4 className="font-semibold text-xl my-2">Pizza</h4>
      <p>Pizza Muzzarella congelada</p>
      <button className="mt-4 bg-primary text-white rounded-full px-4 py-2">
        Agregar al carrito
      </button>
    </div>
  );
}
