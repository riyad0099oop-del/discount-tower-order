import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.jpeg.asset.json";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useStore } from "@/lib/store";

const links = [
  { to: "/", label: "الرئيسية" },
  { to: "/menu", label: "المنيو" },
  { to: "/offers", label: "العروض" },
  { to: "/about", label: "من نحن" },
  { to: "/branches", label: "الفروع" },
  { to: "/contact", label: "تواصل معنا" },
] as const;

export function Header() {
  const { cartCount, setCartOpen } = useStore();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#F4EBE1]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="shrink-0 lg:hidden text-foreground hover:bg-black/5" aria-label="القائمة">
              <Menu className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-[#F4EBE1] border-border/50">
            <SheetTitle className="px-4 pt-4 text-xl font-black">القائمة</SheetTitle>
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
          <img src={logo.url} alt="برج التخفيضات" className="h-12 w-auto sm:h-14 mix-blend-multiply" width={200} height={60} />
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
            onClick={() => setCartOpen(true)}
            aria-label="السلة"
            className="relative grid size-10 place-items-center rounded-full border border-black/10 bg-transparent transition-all hover:bg-black/5 text-foreground"
          >
            <ShoppingBag className="size-5" />
            {cartCount > 0 && (
              <span className="absolute -end-1 -top-1 grid min-w-4 place-items-center rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-black text-primary-foreground shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
          <Button asChild className="hidden rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-black px-6 sm:inline-flex shadow-sm">
            <Link to="/menu">اطلب الآن</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
