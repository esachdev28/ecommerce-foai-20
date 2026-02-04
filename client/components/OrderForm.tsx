import { useState } from "react";
import { X, CheckCircle } from "lucide-react";
import { CartItem } from "./CartDrawer";

interface OrderFormProps {
  items: CartItem[];
  total: number;
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  collegeName: string;
  address: string;
}

export default function OrderForm({
  items,
  total,
  isOpen,
  onClose,
}: OrderFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    collegeName: "",
    address: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      resetForm();
      onClose();
    }, 2000);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      collegeName: "",
      address: "",
    });
    setSubmitted(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-end sm:items-center justify-center min-h-screen px-4 py-8">
          <div
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-border p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">
                Place Order
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {submitted ? (
                // Success Message
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Order Placed Successfully!
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Thank you for your order. We'll process it soon.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    A confirmation email has been sent to {formData.email}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Order Summary */}
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-4">
                      Order Summary
                    </h3>
                    <div className="space-y-3 bg-muted p-4 rounded-lg mb-6">
                      {items.map((item) => (
                        <div
                          key={`${item.id}-${item.size}-${item.color}`}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-foreground">
                            {item.name} x {item.quantity}
                          </span>
                          <span className="font-bold text-foreground">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-foreground">Subtotal</span>
                        <span className="font-bold">
                          ₹{Math.round(total * 0.909)}
                        </span>
                      </div>
                      <div className="flex justify-between mb-4">
                        <span className="text-foreground">Tax</span>
                        <span className="font-bold">
                          ₹{Math.round(total * 0.091)}
                        </span>
                      </div>
                      <div className="flex justify-between text-lg border-t border-border pt-4">
                        <span className="font-bold text-foreground">Total</span>
                        <span className="font-bold text-primary">₹{total}</span>
                      </div>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-foreground mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-foreground mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-foreground mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-foreground mb-2">
                        College Name
                      </label>
                      <input
                        type="text"
                        name="collegeName"
                        value={formData.collegeName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                        placeholder="XYZ College"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-foreground mb-2">
                        Address
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        rows={3}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                        placeholder="Enter your delivery address"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg transition-all duration-300 mt-6"
                    >
                      Place Order
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
