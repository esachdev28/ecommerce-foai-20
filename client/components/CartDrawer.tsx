import { X, Minus, Plus, Trash2 } from "lucide-react";
import { Product } from "@/lib/products";

export interface CartItem extends Product {
  quantity: number;
  size: string;
  color: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onProceed: () => void;
}

export default function CartDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onProceed,
}: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.1); // 10% tax
  const total = subtotal + tax;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-screen w-full sm:w-96 bg-white shadow-2xl z-50 overflow-y-auto transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-border p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-foreground">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors duration-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">
                Your cart is empty
              </p>
              <button
                onClick={onClose}
                className="text-primary font-bold hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}-${item.color}`}
                    className="border border-border rounded-lg p-4 flex gap-4"
                  >
                    {/* Image */}
                    <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-grow">
                      <h3 className="font-bold text-foreground text-sm mb-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        Size: {item.size} | Color: {item.color}
                      </p>
                      <p className="text-primary font-bold text-sm">
                        ₹{item.price}
                      </p>
                    </div>

                    {/* Quantity and Remove */}
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 hover:bg-red-50 rounded transition-colors duration-300"
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                      <div className="flex items-center border border-border rounded bg-muted">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                          className="p-1 hover:bg-white transition-colors duration-300"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-2 text-sm font-bold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 hover:bg-white transition-colors duration-300"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing Summary */}
              <div className="border-t border-border pt-6 space-y-3 mb-6">
                <div className="flex justify-between text-foreground">
                  <span>Subtotal</span>
                  <span className="font-bold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Tax (10%)</span>
                  <span className="font-bold">₹{tax}</span>
                </div>
                <div className="flex justify-between text-lg border-t border-border pt-3">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="font-bold text-primary text-xl">₹{total}</span>
                </div>
              </div>

              {/* Proceed Button */}
              <button
                onClick={onProceed}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg transition-all duration-300"
              >
                Proceed to Order
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
