import { Star, ShoppingCart, Badge } from "lucide-react";
import { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({
  product,
  onProductClick,
  onAddToCart,
}: ProductCardProps) {
  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  return (
    <div
      onClick={() => onProductClick(product)}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group h-full flex flex-col"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-muted h-64 sm:h-72">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.isBestseller && (
          <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Badge className="w-4 h-4" />
            Best Seller
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        {/* Category Badge */}
        <div className="mb-2">
          <span className="inline-block px-3 py-1 bg-accent/20 text-primary rounded-full text-xs font-semibold">
            {product.category}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="font-bold text-foreground text-lg mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
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
          <span className="text-sm text-muted-foreground ml-1">
            {product.rating}
          </span>
        </div>

        {/* Price */}
        <p className="text-2xl font-bold text-primary mb-4">₹{product.price}</p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddClick}
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 mt-auto"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
