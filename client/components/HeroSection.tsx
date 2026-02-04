interface HeroSectionProps {
  onShopClick: () => void;
}

export default function HeroSection({ onShopClick }: HeroSectionProps) {
  return (
    <div className="relative w-full h-[500px] sm:h-[600px] md:h-[700px] overflow-hidden bg-gradient-to-br from-primary via-purple-500 to-accent">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6">
            Wear Your
            <br className="hidden sm:inline" /> College Pride
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 font-medium">
            Hoodies • T-Shirts • Accessories
          </p>

          <p className="text-base sm:text-lg text-white/80 mb-10 max-w-lg mx-auto">
            Celebrate your college spirit with our exclusive collection of premium
            merchandise designed for students.
          </p>

          <button
            onClick={onShopClick}
            className="px-8 sm:px-12 py-3 sm:py-4 bg-secondary hover:bg-secondary/90 text-foreground font-bold rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}
