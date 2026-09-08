import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import {
  FlourDecor,
  TomatoDecor,
  BasilDecor
} from "@/components/site/Decorations";
import { Layout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { ProductSheet } from "@/components/site/ProductSheet";
import { Input } from "@/components/ui/input";
import type { Product } from "@/lib/menu-data";
import { useStore } from "@/lib/store";

type MenuSearch = { cat?: string | undefined };

export const Route = createFileRoute("/menu")({
  validateSearch: (search: Record<string, unknown>): MenuSearch => ({
    cat: typeof search['cat'] === "string" ? (search['cat'] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "المنيو | بيتزا برج التخفيضات" },
      { name: "description", content: "تصفح منيو برج التخفيضات: بيتزا بأحجام مختلفة ومناقيش طازجة بأسعار واضحة." },
      { property: "og:title", content: "المنيو | بيتزا برج التخفيضات" },
      { property: "og:description", content: "اختر طلبك المفضل وخصصه بالطريقة التي تحبها." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const { cat } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { products, categories } = useStore();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);

  const activeCats = categories.filter((c) => c.active);
  const current = cat ?? activeCats[0]?.id ?? "pizza";

  const filtered = useMemo(
    () =>
      products.filter(
        (p) => p.active && (!query.trim() || p.name.includes(query.trim()) || p.description.includes(query.trim())),
      ),
    [products, query],
  );

  return (
    <Layout>
      {/* 1. Menu Header */}
      <section className="relative bg-cream pt-16 pb-12 overflow-hidden border-b border-border/50">
        <FlourDecor className="absolute top-4 start-10 size-48 text-foreground opacity-15 pointer-events-none hidden sm:block" />
        <BasilDecor className="absolute bottom-4 end-10 size-24 text-olive opacity-25 rotate-45 pointer-events-none hidden sm:block" />
        <TomatoDecor className="absolute top-1/2 end-[20%] size-32 text-primary opacity-15 -translate-y-1/2 -rotate-12 pointer-events-none hidden lg:block" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 z-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-foreground">المنيو</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">اختر طلبك المفضل وخصصه بالطريقة التي تحبها.</p>
          <div className="relative mt-8 max-w-lg mx-auto">
            <Search className="pointer-events-none absolute end-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن منتج..."
              className="h-14 rounded-full border-border/50 bg-card pe-12 text-lg shadow-sm focus-visible:ring-primary"
            />
          </div>
        </div>
      </section>

      {/* Sticky Category Bar */}
      <div className="sticky top-16 sm:top-20 z-30 border-b border-border/50 bg-background/95 backdrop-blur-xl shadow-sm">
        <div className="no-scrollbar mx-auto flex max-w-7xl gap-3 overflow-x-auto px-4 py-4 sm:px-6">
          {activeCats.map((c) => (
            <button
              key={c.id}
              onClick={() => navigate({ search: { cat: c.id } })}
              className={`shrink-0 rounded-full px-6 py-2.5 text-base font-bold transition-colors border ${
                current === c.id
                  ? "border-primary bg-primary text-primary-foreground shadow-md"
                  : "border-border/50 bg-card text-foreground hover:border-primary/50"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="mx-auto max-w-7xl space-y-12 px-3 py-10 sm:px-6">
        {activeCats.map((c) => {
          const items = filtered.filter((p) => p.category === c.id);
          if (!items.length) return null;
          return (
            <section key={c.id} id={c.id} className="scroll-mt-32">
              <h2 className="mb-6 text-2xl sm:text-3xl font-black text-foreground">{c.name}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
                {items.map((p, idx) => {
                  // On desktop, first item is featured (wide). On mobile keep 2-col uniform.
                  const isFeatured = idx === 0 && !query.trim() && (c.id === "pizza" || c.id === "manakish");
                  return (
                    <ProductCard key={p.id} product={p} onSelect={setSelected} featured={isFeatured} />
                  );
                })}
              </div>
            </section>
          );
        })}
        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-xl text-muted-foreground">لا توجد نتائج مطابقة للبحث.</p>
          </div>
        )}
      </div>

      <ProductSheet product={selected} onOpenChange={(o) => !o && setSelected(null)} />
    </Layout>
  );
}
