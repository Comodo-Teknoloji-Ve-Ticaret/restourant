"use client";

import Image from "next/image";
import { Plus, Minus, ShoppingCart, MessageCircle } from "lucide-react";
import { getLocalizedText, type LocalizedText, type Locale, translations } from "@/lib/translations";

export interface CartItem {
  id: number;
  name: LocalizedText;
  quantity: number;
}

interface ProductCardProps {
  id: number;
  name: LocalizedText;
  image: string;
  locale: Locale;
  cartQuantity: number;
  phoneNumber: string;
  onAdd: () => void;
  onRemove: () => void;
  priority?: boolean;
}

export function ProductCard({
  id,
  name,
  image,
  locale,
  cartQuantity,
  phoneNumber,
  onAdd,
  onRemove,
  priority = false,
}: ProductCardProps) {
  const t = translations[locale];
  const productName = getLocalizedText(name, locale);

  const handleSingleOrder = () => {
    const message = encodeURIComponent(`${t.orderMessage}• ${productName}\n`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border flex flex-col">
      {/* Product Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted shrink-0">
        <Image
          src={image}
          alt={productName}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading={priority ? "eager" : "lazy"}
          priority={priority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {cartQuantity > 0 && (
          <div className="absolute top-3 end-3 bg-accent text-accent-foreground w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
            {cartQuantity}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-3 sm:p-4 flex flex-col gap-3 flex-1">
        <h3 className="font-sans text-[0.95rem] sm:text-[1.05rem] font-extrabold text-card-foreground line-clamp-2 leading-tight tracking-tight min-h-[2.75rem] sm:min-h-[3rem]">
          {productName}
        </h3>

        {/* Cart controls */}
        {cartQuantity === 0 ? (
          <button
            onClick={onAdd}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 active:scale-95 text-primary-foreground py-2.5 px-3 rounded-xl font-semibold transition-all"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-xs sm:text-sm tracking-[0.01em]">{t.addToCart}</span>
          </button>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={onRemove}
              className="flex-1 flex items-center justify-center bg-secondary hover:bg-muted active:scale-95 text-foreground py-2.5 rounded-xl transition-all border border-border"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-bold text-foreground text-base sm:text-lg min-w-[2rem] text-center">
              {cartQuantity}
            </span>
            <button
              onClick={onAdd}
              className="flex-1 flex items-center justify-center bg-primary hover:bg-primary/90 active:scale-95 text-primary-foreground py-2.5 rounded-xl transition-all"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Single WhatsApp order */}
        <button
          onClick={handleSingleOrder}
          className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 active:scale-95 text-accent-foreground py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold tracking-[0.01em] transition-all"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{t.orderSingle}</span>
        </button>
      </div>
    </div>
  );
}
