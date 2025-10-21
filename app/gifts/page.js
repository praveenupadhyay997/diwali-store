import products from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default function GiftsPage() {
  // Filter products that are in the Gifts category
  const giftProducts = products.filter(product => product.category === 'Gifts');

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-yellow-500 to-amber-600">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Diwali Gift Collection</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">Thoughtful gifts to light up your Diwali celebrations</p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {giftProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {giftProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-slate-700 mb-4">No gift items found</h3>
              <p className="text-slate-500 mb-6">We're currently updating our gift collection. Please check back soon!</p>
              <Link 
                href="/" 
                className="inline-block px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-medium rounded-full transition-colors"
              >
                Back to Home
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
