import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="text-7xl mb-2">🍕</div>
      <h1 className="text-4xl font-black text-gray-900">404</h1>
      <p className="text-gray-600 font-medium">
        Essa página sumiu como um pedido sem entregador.
      </p>
      <p className="text-gray-400 text-sm">
        Mas calma — o cardápio ainda está aqui.
      </p>
      <Link
        href="/"
        className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-2xl transition-colors shadow-lg shadow-orange-200"
      >
        Voltar ao cardápio
      </Link>
    </div>
  );
}
