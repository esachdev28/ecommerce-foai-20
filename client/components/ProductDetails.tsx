import { Product } from "@/lib/products";
import { X, Star, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { PRODUCTS } from "@/lib/products";

interface ProductDetailsProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const SIZES = ["S", "M", "L", "XL"];
const COLORS = ["Black", "White", "Navy", "Grey"];

export default function ProductDetails({
  product,
  onClose,
  onAddToCart,
}: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onClose();
  };

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
            {/* Close Button */}
            <div className="sticky top-0 bg-white border-b border-border p-4 flex justify-end">
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                {/* Image */}
                <div className="flex items-center justify-center bg-muted rounded-xl overflow-hidden h-80 sm:h-96">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col">
                  <span className="inline-block w-fit px-3 py-1 bg-accent/20 text-primary rounded-full text-xs font-semibold mb-3">
                    {product.category}
                  </span>

                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                    {product.name}
                  </h2>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? "fill-secondary text-secondary"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({product.rating})
                    </span>
                  </div>

                  <p className="text-3xl font-bold text-primary mb-4">
                    ₹{product.price}
                  </p>

                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Size Selector */}
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-foreground mb-3">
                      Size
                    </label>
                    <div className="flex gap-2">
                      {SIZES.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border-2 rounded-lg font-bold transition-all duration-300 ${
                            selectedSize === size
                              ? "border-primary bg-primary text-white"
                              : "border-border text-foreground hover:border-primary"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Selector */}
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-foreground mb-3">
                      Color
                    </label>
                    <div className="flex gap-3">
                      {COLORS.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-2 border-2 rounded-lg font-medium transition-all duration-300 ${
                            selectedColor === color
                              ? "border-primary bg-primary text-white"
                              : "border-border text-foreground hover:border-primary"
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="mb-8">
                    <label className="block text-sm font-bold text-foreground mb-3">
                      Quantity
                    </label>
                    <div className="flex items-center border border-border rounded-lg w-fit">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 hover:bg-muted transition-colors duration-300"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="px-6 font-bold text-lg">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 hover:bg-muted transition-colors duration-300"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg transition-all duration-300 mb-4 text-lg"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Related Products */}
              {relatedProducts.length > 0 && (
                <div className="mt-12 pt-8 border-t border-border">
                  <h3 className="text-2xl font-bold text-foreground mb-6">
                    Related Products
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {relatedProducts.map((relProduct) => (
                      <div
                        key={relProduct.id}
                        className="bg-muted rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300"
                        onClick={() => {
                          // This would ideally trigger a refresh of the modal with new product
                          window.scrollTo(0, 0);
                        }}
                      >
                        <div className="h-40 bg-white overflow-hidden">
                          <img
                            src={relProduct.image}
                            alt={relProduct.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-3">
                          <h4 className="font-bold text-sm text-foreground line-clamp-1">
                            {relProduct.name}
                          </h4>
                          <p className="text-primary font-bold text-sm mt-1">
                            ₹{relProduct.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
