"use client";

import { X, Trash2, MessageCircle, ShoppingCart } from "lucide-react";
import { getLocalizedText, type Locale, translations } from "@/lib/translations";
import type { CartItem } from "./product-card";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  cart: CartItem[];
  locale: Locale;
  phoneNumber: string;
  onClear: () => void;
  onAdd: (productId: number) => void;
  onRemove: (productId: number) => void;
}

export function CartDrawer({
  open,
  onClose,
  cart,
  locale,
  phoneNumber,
  onClear,
  onAdd,
  onRemove,
}: CartDrawerProps) {
  const t = translations[locale];
  const isRtl = locale === "ar";

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSendOrder = () => {
    let message = t.orderMessage;
    cart.forEach((item) => {
      message += `• ${getLocalizedText(item.name, locale)} x${item.quantity}\n`;
    });
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, "_blank");
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        dir={isRtl ? "rtl" : "ltr"}
        className={`fixed top-0 bottom-0 end-0 z-50 w-full max-w-sm bg-card shadow-2xl flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : (isRtl ? "-translate-x-full" : "translate-x-full")
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            <h2 className="font-serif text-lg font-bold text-foreground">{t.cart}</h2>
            {totalItems > 0 && (
              <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-muted-foreground">
              <ShoppingCart className="w-12 h-12 opacity-30" />
              <p>{t.cartEmpty}</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-3 bg-secondary rounded-xl px-4 py-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm truncate">
                      {getLocalizedText(item.name, locale)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.quantity} {t.pcs}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onRemove(item.id)}
                      className="w-7 h-7 flex items-center justify-center rounded-full bg-muted hover:bg-border transition-colors text-foreground text-lg font-bold leading-none"
                    >
                      −
                    </button>
                    <span className="w-5 text-center font-bold text-sm text-foreground">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onAdd(item.id)}
                      className="w-7 h-7 flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 transition-colors text-primary-foreground text-lg font-bold leading-none"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-5 py-5 border-t border-border flex flex-col gap-3">
            <button
              onClick={handleSendOrder}
              className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground py-3.5 rounded-xl font-semibold text-sm transition-colors shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              {t.sendOrder}
            </button>

            <button
              onClick={onClear}
              className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-muted text-muted-foreground py-2.5 rounded-xl text-sm transition-colors border border-border"
            >
              <Trash2 className="w-4 h-4" />
              {t.clearCart}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
