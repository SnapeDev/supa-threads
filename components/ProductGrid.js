import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  console.log("ProductGrid received products:", products); // Debugging

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-112">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => {
          if (!product._id) {
            console.error("Product missing ID:", product);
          }
          return <ProductCard key={product._id || index} product={product} />;
        })}
      </div>
    </div>
  );
}
