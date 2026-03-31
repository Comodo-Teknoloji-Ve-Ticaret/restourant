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

type ProductCategory = "sandwiches" | "portions" | "drinks";

function normalizeForSearch(value: string, locale: Locale) {
  return value
    .toLocaleLowerCase(locale)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function getProductCategory(imagePath: string): ProductCategory {
  if (imagePath.startsWith("icecekler/")) return "drinks";
  if (imagePath.startsWith("ekmekarasi/")) return "sandwiches";
  return "portions";
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
  const normalizedQuery = normalizeForSearch(searchQuery, locale);
  const sectionOrder: ProductCategory[] = ["sandwiches", "portions", "drinks"];

  const filtered = products.filter((p) =>
    normalizeForSearch(getLocalizedText(p.name, locale), locale).includes(normalizedQuery)
  );

  const grouped = sectionOrder.map((section) => ({
    section,
    items: filtered.filter(
      (p) => getProductCategory(p.image) === section
    ),
  }));

  const sectionTitles: Record<ProductCategory, string> = {
    sandwiches: t.sandwiches,
    portions: t.portions,
    drinks: t.drinks,
  };

  let globalIndex = 0;

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
          <div className="space-y-8">
            {grouped.map(({ section, items }) => {
              if (items.length === 0) return null;

              return (
                <div key={section} className="space-y-4">
                  <h3 className="text-center font-sans text-sm sm:text-base font-extrabold tracking-[0.18em] text-muted-foreground">
                    {`-----${sectionTitles[section]}-----`}
                  </h3>

                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                    {items.map((product) => {
                      const cartItem = cart.find((c) => c.id === product.id);
                      const priority = globalIndex < 4;
                      globalIndex += 1;

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
                          priority={priority}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
