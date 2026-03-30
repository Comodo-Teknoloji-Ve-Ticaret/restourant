"use client";

import { Phone, MessageCircle, MapPin, Navigation, Truck } from "lucide-react";
import { type Locale, translations } from "@/lib/translations";
import { GOOGLE_MAPS_DIRECTIONS_URL } from "@/lib/site-config";

interface FooterProps {
  locale: Locale;
  phoneNumber: string;
}

export function Footer({ locale, phoneNumber }: FooterProps) {
  const t = translations[locale];
  
  const handleCall = () => {
    window.location.href = `tel:+${phoneNumber}`;
  };
  
  const handleWhatsApp = () => {
    const message = encodeURIComponent(t.orderMessage);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const handleDirections = () => {
    window.open(GOOGLE_MAPS_DIRECTIONS_URL, "_blank");
  };

  return (
    <footer className="bg-card border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          {/* Restaurant Name */}
          <div className="text-center">
            <h2 className="font-sans text-2xl font-extrabold tracking-tight text-foreground">
              {t.title}
            </h2>
            <p className="text-muted-foreground mt-1 text-sm font-medium leading-relaxed">{t.subtitle}</p>
          </div>
          
          {/* Contact Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={handleCall}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-full font-medium hover:bg-primary/90 active:scale-95 transition-all shadow-lg text-sm"
            >
              <Phone className="w-4 h-4" />
              {t.callUs}
            </button>
            
            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-2 bg-accent text-accent-foreground px-5 py-3 rounded-full font-medium hover:bg-accent/90 active:scale-95 transition-all shadow-lg text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              {t.orderViaWhatsapp}
            </button>

            <button
              onClick={handleDirections}
              className="flex items-center gap-2 bg-secondary text-foreground px-5 py-3 rounded-full font-medium hover:bg-muted active:scale-95 transition-all shadow-lg text-sm border border-border"
            >
              <Navigation className="w-4 h-4" />
              {t.directions ?? "Yol Tarifi Al"}
            </button>
          </div>
          
          {/* Address */}
          <div className="flex flex-col items-center gap-2 text-center max-w-md">
            <div className="flex items-start gap-2 text-muted-foreground text-sm">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
              <span>{t.address}</span>
            </div>
            <div className="flex items-center gap-2 text-accent text-sm font-medium">
              <Truck className="w-4 h-4" />
              <span>{t.delivery}</span>
            </div>
            <p className="text-foreground font-semibold mt-1">
              +90 536 225 01 27
            </p>
          </div>
          
          {/* Copyright */}
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} {t.title}
          </p>
        </div>
      </div>
    </footer>
  );
}
