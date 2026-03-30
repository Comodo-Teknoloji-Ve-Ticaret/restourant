"use client";

import { ProductCard } from "./product-card";
import { getLocalizedText, type Locale, translations } from "@/lib/translations";
import { products } from "@/lib/products";
import type { CartItem } from "./product-card";

interface ProductGridProps {
  locale: Locale;
  cart: CartItem[];
  phoneNumber: string;
  onAdd: (productId: number) => void;
  onRemove: (productId: number) => void;
  searchQuery: string;
}

export function ProductGrid({
  locale,
  cart,
  phoneNumber,
  onAdd,
  onRemove,
  searchQuery,
}: ProductGridProps) {
  const t = translations[locale];

  const filtered = products.filter((p) =>
    getLocalizedText(p.name, locale).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-6">
      <div className="container mx-auto px-3 sm:px-4">
        <h2 className="font-sans text-2xl md:text-3xl font-extrabold tracking-tight text-foreground mb-6 text-center">
          {t.menu}
        </h2>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            {t.noResults}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {filtered.map((product, index) => {
              const cartItem = cart.find((c) => c.id === product.id);
              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  image={product.image}
                  locale={locale}
                  cartQuantity={cartItem?.quantity ?? 0}
                  phoneNumber={phoneNumber}
                  onAdd={() => onAdd(product.id)}
                  onRemove={() => onRemove(product.id)}
                  priority={index < 4}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
