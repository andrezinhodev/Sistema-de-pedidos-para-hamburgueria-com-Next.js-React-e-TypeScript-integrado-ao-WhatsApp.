import { Clock, MapPin, Truck } from "lucide-react";

export function Hero() {
  return (
    //  Usando a mesma estrutura do MenuSection
<section className="max-w-6xl mx-auto px-4 sm:px-6">
  <div className="relative h-[500px] rounded-2xl mt-4 overflow-hidden flex items-end group">

    <img
      src="/images/comida_demonstrativa.jpg"
      alt="Imagem do restaurante"
      className="absolute inset-0 h-full w-full rounded-2xl object-cover blur-[3px] group-hover:blur-none transition-all duration-500"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-2xl" />

    <div className="relative z-10 w-full p-8">
      <div className="flex flex-wrap gap-3">
        <InfoPill icon={<Clock className="w-3.5 h-3.5" />}>
          Seg – Dom: 11h às 23h
        </InfoPill>
        <InfoPill icon={<Truck className="w-3.5 h-3.5" />}>
          Entrega a partir de R$&nbsp;6,99
        </InfoPill>
        <InfoPill icon={<MapPin className="w-3.5 h-3.5" />}>
          Até 10 km de distância
        </InfoPill>
      </div>
    </div>

  </div>
</section>
  );
}

function InfoPill({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full text-white text-xs font-medium">
      {icon}
      {children}
    </div>
  );
}