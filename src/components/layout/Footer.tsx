import { Phone } from "lucide-react";

// lucide-react@0.383.0 doesn't export Instagram; use a simple inline SVG
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-10 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div>
              <p className="font-bold text-white">Black Bun Delivery</p>
              <p className="text-xs text-gray-500">
                Comida boa, entrega rápida.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-5 text-sm">
            <a
              href="tel:35997086433"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              (35) 3294-1065 
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <InstagramIcon className="w-4 h-4" />
              @blackbundelivery
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800 text-xs text-center text-gray-600">
          © {new Date().getFullYear()} Black Bun Delivery. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
