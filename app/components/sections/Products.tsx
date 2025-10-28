import { Container } from "@/app/components/ui";
import { ProductCard } from "@/app/components/cards";
import type { Product } from "@/types";

interface ProductsProps {
  products: Product[];
}

export function Products({ products }: ProductsProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="mb-12 text-center">
          <p className="section-label">
            Our Products
          </p>
          <h2 className="section-heading">
            Check Our Best Products
          </h2>
          <p className="section-description">
         There are many variations of passages of Lorem Ipsum available
          but the majority have suffered alteration in some form.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.urlMap || product.title}
              product={product}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
