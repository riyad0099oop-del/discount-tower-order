import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Phone, Clock, Navigation, Pizza, Leaf, Circle, Sparkles } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/branches")({
  head: () => ({
    meta: [
      { title: "الفروع | بيتزا برج التخفيضات" },
      { name: "description", content: "مواقع فروع برج التخفيضات وساعات العمل." },
      { property: "og:title", content: "الفروع | بيتزا برج التخفيضات" },
      { property: "og:description", content: "تعرف على فروعنا وساعات العمل." },
    ],
  }),
  component: BranchesPage,
});

function BranchesPage() {
  const { settings } = useStore();
  return (
    <Layout>
      {/* Mini Hero */}
      <section className="relative overflow-hidden bg-surface py-12 sm:py-20">
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.05]">
          <Pizza className="absolute -left-12 -top-12 size-64 rotate-12 text-cocoa" strokeWidth={1} />
          <Leaf className="absolute bottom-10 left-1/4 size-20 -rotate-45 text-cocoa hidden sm:block" strokeWidth={1} />
          <Circle className="absolute right-1/4 top-10 size-16 text-cocoa hidden sm:block" strokeWidth={1.5} />
          <Sparkles className="absolute right-10 top-1/3 size-24 text-cocoa" strokeWidth={1} />
          <Circle className="absolute -bottom-8 -right-8 size-40 text-cocoa hidden sm:block" strokeWidth={1} />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">الفروع</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">اختر الفرع الأقرب لك عند الطلب</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16 sm:px-6">
        {settings.branches.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {settings.branches.map((b) => (
              <div key={b} className="group relative flex flex-col overflow-hidden rounded-[1.25rem] border border-border/30 bg-[#FFFDF8] p-6 shadow-[0_2px_8px_oklch(0.3_0.05_55/0.03)] transition-shadow hover:shadow-[0_8px_24px_oklch(0.3_0.05_55/0.06)]">
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface text-foreground">
                    <MapPin className="size-5" />
                  </div>
                </div>
                
                <h3 className="text-xl font-extrabold text-foreground">{b}</h3>
                
                <div className="mt-4 flex-1 space-y-3 text-sm text-muted-foreground">
                  {settings.hours && (
                    <div className="flex items-center gap-3">
                      <Clock className="size-4 shrink-0 text-olive" />
                      <span>{settings.hours}</span>
                    </div>
                  )}
                  {settings.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="size-4 shrink-0 text-olive" />
                      <span dir="ltr" className="text-right">{settings.phone}</span>
                    </div>
                  )}
                </div>
                
                <div className="mt-8 flex gap-3">
                  <button className="flex-1 inline-flex items-center justify-center rounded-xl border border-border/60 bg-transparent py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-surface">
                    <Navigation className="mr-2 size-4" />
                    الاتجاهات
                  </button>
                  <Link to="/" className="flex-1 inline-flex items-center justify-center rounded-xl bg-primary py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90">
                    الطلب من هنا
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mx-auto my-8 max-w-md rounded-3xl border border-border/50 bg-[#FFFDF8] p-10 text-center shadow-[0_2px_10px_oklch(0.3_0.05_55/0.02)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-surface text-olive">
              <MapPin className="size-8" />
            </div>
            <h2 className="mt-6 text-xl font-bold text-foreground">بيانات الفروع ستظهر هنا</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              يمكن إضافة الفروع وساعات العمل من صفحة الإعدادات في لوحة التحكم.
            </p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="relative mt-4 sm:mt-8 overflow-hidden bg-cocoa py-12 sm:py-16 text-cocoa-foreground">
        <div className="pointer-events-none absolute -right-32 top-1/2 -translate-y-1/2 opacity-10 hidden sm:block">
          <Pizza className="size-[28rem]" strokeWidth={0.5} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold text-[#FDFBF7]">جاهز تطلب؟</h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/" className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary px-8 font-bold text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto">
              استعرض المنيو
            </Link>
            <Link to="/contact" className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-cocoa-foreground/20 bg-transparent px-8 font-bold text-[#FDFBF7] transition-colors hover:bg-cocoa-foreground/10 sm:w-auto">
              تواصل معنا
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
