import { useState } from "react";
import { Product } from "@/lib/products";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductGrid from "@/components/ProductGrid";
import ProductDetails from "@/components/ProductDetails";
import CartDrawer, { CartItem } from "@/components/CartDrawer";
import OrderForm from "@/components/OrderForm";
import Footer from "@/components/Footer";

export default function Index() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    // Default to Medium size and Black color for quick add
    const newItem: CartItem = {
      ...product,
      quantity,
      size: "M",
      color: "Black",
    };

    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === product.id && item.size === "M" && item.color === "Black",
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === "M" && item.color === "Black"
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...prev, newItem];
    });

    // Show toast-like feedback
    alert(`${product.name} added to cart!`);
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(productId);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity } : item,
        ),
      );
    }
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleShopNow = () => {
    const shopSection = document.getElementById("shop");
    shopSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handleProceedToOrder = () => {
    setIsCartOpen(false);
    setIsOrderFormOpen(true);
  };

  const totalAmount =
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) +
    Math.round(
      cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) *
        0.1,
    );

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar
        cartCount={cartItems.length}
        onCartClick={() => setIsCartOpen(!isCartOpen)}
      />

      {/* Hero Section */}
      <HeroSection onShopClick={handleShopNow} />

      {/* Product Grid */}
      <ProductGrid
        onProductClick={setSelectedProduct}
        onAddToCart={handleAddToCart}
      />

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(product, quantity) => {
            handleAddToCart(product, quantity);
            setSelectedProduct(null);
            setIsCartOpen(true);
          }}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        items={cartItems}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceed={handleProceedToOrder}
      />

      {/* Order Form */}
      <OrderForm
        items={cartItems}
        total={totalAmount}
        isOpen={isOrderFormOpen}
        onClose={() => setIsOrderFormOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
