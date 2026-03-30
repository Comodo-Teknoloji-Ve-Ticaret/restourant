"use client";

import { Search, Sun, Moon } from "lucide-react";
import { type Locale, translations } from "@/lib/translations";

interface HeaderProps {
  locale: Locale;
  isDark: boolean;
  onThemeToggle: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function Header({
  locale,
  isDark,
  onThemeToggle,
  searchQuery,
  onSearchChange,
}: HeaderProps) {
  const t = translations[locale];

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Logo / Title */}
          <div className="flex-1 min-w-0">
            <h1 className="font-sans text-xl sm:text-3xl font-extrabold text-foreground leading-tight tracking-tight text-balance">
              {t.title}
            </h1>
            <p className="text-sm text-muted-foreground hidden sm:block mt-1 font-medium leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <label className="hidden sm:flex items-center gap-2 w-52 md:w-64 rounded-xl border border-border bg-secondary px-3 py-2.5 text-sm font-medium text-foreground shadow-sm">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={t.search}
                className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
              />
            </label>

            {/* Theme Toggle */}
            <button
              onClick={onThemeToggle}
              aria-label={isDark ? t.lightMode : t.darkMode}
              className="w-10 h-10 flex items-center justify-center rounded-xl border border-border bg-secondary hover:bg-muted text-foreground transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => onSearchChange("")}
              className="sm:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-border bg-secondary hover:bg-muted text-foreground transition-colors"
              aria-label={t.search}
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        <label className="mt-3 flex sm:hidden items-center gap-2 rounded-xl border border-border bg-secondary px-3 py-2.5 text-sm font-medium text-foreground shadow-sm">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.search}
            className="w-full bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </label>
      </div>
    </header>
  );
}
