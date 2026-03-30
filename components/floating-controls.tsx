"use client";

import { Phone, X, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { type Locale, translations, languages } from "@/lib/translations";

interface FloatingControlsProps {
  locale: Locale;
  phoneNumber: string;
  onLocaleChange: (locale: Locale) => void;
  cartCount: number;
  onCartOpen: () => void;
}

export function FloatingControls({
  locale,
  phoneNumber,
  onLocaleChange,
  cartCount,
  onCartOpen,
}: FloatingControlsProps) {
  const t = translations[locale];
  const [langOpen, setLangOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const currentLang = languages.find((l) => l.code === locale);

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  if (!mounted) return null;

  return (
    <>
      {/* Language picker — opens directly above the left floating button */}
      <div
        className={`fixed bottom-24 start-4 z-30 transition-all duration-300 ${
          langOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-1 bg-card border border-border rounded-2xl shadow-xl overflow-hidden p-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                onLocaleChange(lang.code);
                setLangOpen(false);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                locale === lang.code
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <span suppressHydrationWarning>{lang.flag}</span>
              <span suppressHydrationWarning>{lang.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom floating buttons row */}
      <div className="fixed bottom-6 inset-x-0 z-30 flex items-end justify-between px-4 pointer-events-none">
        {/* Language button — bottom START (left) */}
        <button
          onClick={() => {
            setLangOpen((v) => !v);
          }}
          className={`pointer-events-auto w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-200 active:scale-95 ${
            langOpen
              ? "bg-primary text-primary-foreground scale-95"
              : "bg-card border border-border text-foreground hover:bg-muted"
          }`}
          aria-label={t.selectLanguage}
        >
          {langOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <span className="text-2xl leading-none">{currentLang?.flag}</span>
          )}
        </button>

        {/* Cart button — bottom center (visible when cart has items) */}
        {cartCount > 0 && (
          <button
            onClick={() => {
              onCartOpen();
              setLangOpen(false);
            }}
            className="pointer-events-auto flex items-center gap-2 bg-accent text-accent-foreground px-5 py-3.5 rounded-2xl shadow-xl font-semibold text-sm transition-all duration-200 hover:bg-accent/90 active:scale-95"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>
              {cartCount} {t.pcs}
            </span>
          </button>
        )}

        {/* Call button — bottom END (right) */}
        <button
          onClick={() => {
            setLangOpen(false);
            handleCall();
          }}
          className="pointer-events-auto w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-200 active:scale-95 bg-card border border-border text-foreground hover:bg-muted"
          aria-label={t.callUs}
        >
          <Phone className="w-6 h-6" />
        </button>
      </div>
    </>
  );
}
