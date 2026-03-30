"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { ProductGrid } from "@/components/product-grid";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";
import { FloatingControls } from "@/components/floating-controls";
import { type Locale } from "@/lib/translations";
import { products as allProducts } from "@/lib/products";
import type { CartItem } from "@/components/product-card";

// Telefon numarası (ülke koduyla, + veya boşluk olmadan)
const PHONE_NUMBER = "905362250127";

function resolveLocale(value?: string | null): Locale {
  const normalized = value?.toLowerCase() ?? "";

  if (normalized.startsWith("ru")) return "ru";
  if (normalized.startsWith("en")) return "en";
  if (normalized.startsWith("ar")) return "ar";
  return "tr";
}

export default function HomePage() {
  const [locale, setLocale] = useState<Locale>("tr");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDark, setIsDark] = useState(false);

  // Restore locale and theme from localStorage
  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") as Locale | null;
    const browserLocale = navigator.languages?.[0] ?? navigator.language;
    const initialLocale = resolveLocale(savedLocale ?? browserLocale);

    setLocale(initialLocale);
    document.documentElement.dir = initialLocale === "ar" ? "rtl" : "ltr";

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem("locale", newLocale);
    document.documentElement.dir = newLocale === "ar" ? "rtl" : "ltr";
  };

  const handleThemeToggle = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return next;
    });
  };

  const handleAdd = (productId: number) => {
    const product = allProducts.find((p) => p.id === productId);
    if (!product) return;

    setCart((prev) => {
      const existing = prev.find((c) => c.id === productId);
      if (existing) {
        return prev.map((c) =>
          c.id === productId ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [
        ...prev,
        { id: productId, name: product.name, quantity: 1 },
      ];
    });
  };

  const handleRemove = (productId: number) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === productId);
      if (!existing) return prev;
      if (existing.quantity === 1) return prev.filter((c) => c.id !== productId);
      return prev.map((c) =>
        c.id === productId ? { ...c, quantity: c.quantity - 1 } : c
      );
    });
  };

  const handleClearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-background pb-28">
      <Header
        locale={locale}
        isDark={isDark}
        onThemeToggle={handleThemeToggle}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="flex-1">
        <ProductGrid
          locale={locale}
          cart={cart}
          phoneNumber={PHONE_NUMBER}
          onAdd={handleAdd}
          onRemove={handleRemove}
          searchQuery={searchQuery}
        />
      </main>

      <Footer locale={locale} phoneNumber={PHONE_NUMBER} />

      {/* Floating search + language + cart buttons */}
      <FloatingControls
        locale={locale}
        phoneNumber={PHONE_NUMBER}
        onLocaleChange={handleLocaleChange}
        cartCount={totalItems}
        onCartOpen={() => setCartOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        locale={locale}
        phoneNumber={PHONE_NUMBER}
        onClear={handleClearCart}
        onAdd={handleAdd}
        onRemove={handleRemove}
      />
    </div>
  );
}
