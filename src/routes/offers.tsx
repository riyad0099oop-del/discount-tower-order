import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import promoSlice from "@/assets/promo-slice.jpg";
import { Layout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { ProductSheet } from "@/components/site/ProductSheet";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/menu-data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "العروض | بيتزا برج التخفيضات" },
      {
        name: "description",
        content: "عروض برج التخفيضات على البيتزا والمناقيش، تُحدّث باستمرار.",
      },
      { property: "og:title", content: "العروض | بيتزا برج التخفيضات" },
      { property: "og:description", content: "اكتشف عروض برج التخفيضات وخيارات تناسب كل طلب." },
    ],
  }),
  component: OffersPage,
});

function OffersPage() {
  const { products } = useStore();
  const [selected, setSelected] = useState<Product | null>(null);
  const offers = products.filter((p) => p.active && p.offer);

  return (
    <Layout>
      <section className="px-4 pt-8 sm:px-6">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-3xl bg-cocoa text-cocoa-foreground md:grid-cols-2">
          <div className="flex flex-col justify-center gap-4 p-8 sm:p-12">
            <h1 className="text-3xl font-extrabold sm:text-4xl">عروض تستاهل التجربة</h1>
            <p className="max-w-sm leading-8 opacity-85">
              اكتشف عروض برج التخفيضات وخيارات تناسب كل طلب.
            </p>
            <div>
              <Button
                asChild
                size="lg"
                className="mt-2 h-13 rounded-full bg-accent px-8 text-accent-foreground hover:bg-accent/90"
              >
                <Link to="/menu">تصفح المنيو</Link>
              </Button>
            </div>
          </div>
          <div className="min-h-56 md:min-h-72">
            <img
              src={promoSlice}
              alt="عرض بيتزا"
              loading="lazy"
              className="size-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        {offers.length ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {offers.map((p) => (
              <ProductCard key={p.id} product={p} onSelect={setSelected} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-border bg-surface p-12 text-center">
            <h2 className="text-xl font-bold">لا توجد عروض معلنة حاليًا</h2>
            <p className="mt-2 text-muted-foreground">
              تابعنا، سنعلن عن عروض برج التخفيضات قريبًا.
            </p>
          </div>
        )}
      </section>

      <ProductSheet product={selected} onOpenChange={(o) => !o && setSelected(null)} />
    </Layout>
  );
}
