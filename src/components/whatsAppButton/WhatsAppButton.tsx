import { products } from "@/data/menu";
import { OrderSummaryData } from "@/types";
import { Send } from "lucide-react"

interface WhatsAppButtonProps {
    order : OrderSummaryData;
}

export function WhatsAppButton ({ order }: WhatsAppButtonProps) {
    const handleSend = () => {
        const items = order.items
        .map(
          (item) =>
            `• ${item.product.name} (${item.quantity}x) - R$ ${(item.product.price * item.quantity).toFixed(2)}`
        )
        .join("\n");
      
        const message = `
        
            *NOVO PEDIDO*

            Pedido: ${order.orderNumber}
            Cliente: ${order.customer.name}

            Tipo: ${order.deliveryType}
            ${order.customer.address ? `Endereço: ${order.customer.address}\n` : ""}    
            
            --------------------

            *PRODUTOS*

                ${items}

            --------------------

            ${
            order.generalNotes
                ? `Observações:\n${order.generalNotes}\n\n--------------------\n\n`
                : ""
            }*RESUMO DO PEDIDO*

            Delivery: R$ ${order.deliveryFee.toFixed(2)}
            Subtotal: R$ ${order.subtotal.toFixed(2)}

            *TOTAL: R$ ${order.total.toFixed(2)}*`
      
        const phone = "5535997086432";
      
        window.open(
          `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
          "_blank"
        );
      };

    return (
        <button
        onClick={handleSend}
        className="flex gap-4 justify-center lock w-full text-center bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl transition-colors"
        >
            <Send />
            Envia Pedido no WhatsApp
        </button>
    )
}