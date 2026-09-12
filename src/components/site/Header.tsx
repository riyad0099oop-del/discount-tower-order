import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, Globe } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import logoFull from "@/assets/logo-full.png";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useStore } from "@/lib/store";

export function Header() {
  const { cartCount, setCartOpen } = useStore();
  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
  };

  const links = [
    { to: "/", label: t('home') },
    { to: "/menu", label: t('menu') },
    { to: "/about", label: t('about') },
    { to: "/branches", label: t('branches') },
    { to: "/contact", label: t('contact') },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#F4EBE1]/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 sm:h-24 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="shrink-0 lg:hidden text-foreground hover:bg-black/5"
              aria-label="القائمة"
            >
              <Menu className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side={i18n.language === 'ar' ? "right" : "left"} className="w-72 bg-[#F4EBE1] border-border/50">
            <SheetTitle className="px-4 pt-4 text-xl font-black">{t('menu')}</SheetTitle>
            <nav className="mt-6 flex flex-col px-2 gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-lg font-bold text-foreground/80 transition-colors hover:bg-black/5"
                  activeProps={{ className: "text-primary bg-primary/5" }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <Link to="/" className="flex min-w-0 shrink-0 items-center">
          <img
            src={logoFull}
            alt="برج التخفيضات"
            className="h-16 w-auto sm:h-20 lg:h-24 mix-blend-multiply"
          />
        </Link>

        <nav className="mx-auto hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-full px-4 py-2 text-sm font-bold text-foreground/70 transition-all hover:text-primary relative group"
              activeProps={{ className: "text-primary" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ms-auto flex shrink-0 items-center gap-3 lg:ms-0">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-bold text-foreground/80 hover:bg-black/5 transition-colors"
          >
            <Globe className="size-4" />
            <span className="mt-0.5">{i18n.language === "ar" ? "EN" : "عربي"}</span>
          </button>
          
          <button
            onClick={() => setCartOpen(true)}
            aria-label={t('cart')}
            className="relative grid size-10 place-items-center rounded-full border border-black/10 bg-transparent transition-all hover:bg-black/5 text-foreground"
          >
            <ShoppingBag className="size-5" />
            {cartCount > 0 && (
              <span className="absolute -end-1 -top-1 grid min-w-4 place-items-center rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-black text-primary-foreground shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
          <Button
            asChild
            className="hidden rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-black px-6 sm:inline-flex shadow-sm"
          >
            <Link to="/menu">{t('order_now')}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
