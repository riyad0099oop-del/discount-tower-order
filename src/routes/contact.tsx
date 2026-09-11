import { createFileRoute } from "@tanstack/react-router";
import {
  Clock,
  Instagram,
  MessageCircle,
  Phone,
  Pizza,
  Leaf,
  Circle,
  Sparkles,
  MapPin,
  Facebook,
} from "lucide-react";
import { Layout } from "@/components/site/Layout";
import pizzaSpecial from "@/assets/pizza-special.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل معنا | بيتزا برج التخفيضات" },
      {
        name: "description",
        content: "طرق التواصل مع برج التخفيضات: الهاتف، واتساب، إنستقرام وساعات العمل.",
      },
      { property: "og:title", content: "تواصل معنا | بيتزا برج التخفيضات" },
      { property: "og:description", content: "نسعد بخدمتك واستقبال طلبك." },
    ],
  }),
  component: ContactPage,
});

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-1.13 4.54-3.15 5.76-2.02 1.22-4.7 1.34-6.83.33-2.13-1.01-3.69-3.04-3.99-5.38-.3-2.34.42-4.8 2.08-6.42 1.66-1.61 4.13-2.32 6.4-1.95v4.06c-1.39-.23-2.92-.04-4.09.81-1.17.85-1.74 2.38-1.5 3.81.24 1.43 1.36 2.65 2.75 3.12 1.39.47 3.03.3 4.23-.55 1.2-.85 1.83-2.3 1.79-3.79-.06-3.82-.01-7.64-.01-11.46Z"/>
  </svg>
);

function ContactPage() {
  return (
    <Layout>
      {/* Mini Hero */}
      <section className="relative overflow-hidden bg-surface py-12 sm:py-20">
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.05]">
          <Pizza
            className="absolute -left-12 -top-12 size-64 rotate-12 text-cocoa"
            strokeWidth={1}
          />
          <Leaf
            className="absolute bottom-10 left-1/4 size-20 -rotate-45 text-cocoa hidden sm:block"
            strokeWidth={1}
          />
          <Circle
            className="absolute right-1/4 top-10 size-16 text-cocoa hidden sm:block"
            strokeWidth={1.5}
          />
          <Sparkles className="absolute right-10 top-1/3 size-24 text-cocoa" strokeWidth={1} />
          <Circle
            className="absolute -bottom-8 -right-8 size-40 text-cocoa hidden sm:block"
            strokeWidth={1}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            تواصل معنا
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            نسعد بخدمتك واستقبال ملاحظاتك.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16 sm:px-6">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:items-start">
          {/* Left Side: Image & Text */}
          <div className="relative">
            <div className="absolute -left-6 -top-6 h-48 w-48 rounded-full bg-olive/10 blur-3xl hidden sm:block"></div>
            <div className="absolute -bottom-6 -right-6 h-48 w-48 rounded-full bg-primary/10 blur-3xl hidden sm:block"></div>
            <div className="relative overflow-hidden rounded-[2rem] border border-border/40 shadow-lift">
              <img
                src={pizzaSpecial}
                alt="Pizza"
                className="aspect-[4/3] w-full object-cover sm:aspect-[3/2] lg:aspect-[4/5]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa/80 via-cocoa/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                <h3 className="text-2xl font-bold">برج التخفيضات</h3>
                <p className="mt-2 text-white/80">أفضل طعم، وأقوى العروض.</p>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Panel */}
          <div className="rounded-[2rem] border border-border/30 bg-[#FFFDF8] p-6 sm:p-12 shadow-[0_8px_30px_oklch(0.3_0.05_55/0.04)]">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-2xl font-extrabold text-foreground">كيف يمكننا مساعدتك؟</h2>
                <p className="mt-2 text-muted-foreground">
                  تواصل معنا عبر القنوات التالية وسنرد عليك في أقرب وقت.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* WhatsApp - Primary */}
                <a
                  href={`https://wa.me/966548392988`}
                  target="_blank"
                  rel="noreferrer"
                  className="group col-span-1 sm:col-span-2 flex items-center gap-4 rounded-2xl bg-[#25D366]/10 p-5 transition-colors hover:bg-[#25D366]/20"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white shadow-sm transition-transform group-hover:scale-105">
                    <MessageCircle className="size-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[#1DA851]">واتساب</p>
                    <p className="truncate text-lg font-bold text-foreground" dir="ltr">
                      054 839 2988
                    </p>
                  </div>
                </a>

                {/* Phone - Secondary */}
                <a
                  href={`tel:0548392988`}
                  className="group col-span-1 flex items-center gap-4 rounded-2xl border border-border/50 bg-white p-4 transition-shadow hover:shadow-soft"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Phone className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-muted-foreground">رقم التواصل</p>
                    <p className="truncate font-bold text-foreground" dir="ltr">
                      054 839 2988
                    </p>
                  </div>
                </a>

                {/* Branch Info */}
                <div className="group col-span-1 sm:col-span-2 flex items-center gap-4 rounded-2xl border border-border/50 bg-white p-4 transition-shadow hover:shadow-soft">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-olive/10 text-olive">
                    <MapPin className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-muted-foreground">الفرع الرئيسي</p>
                    <p className="text-sm font-bold text-foreground leading-relaxed">
                      مكة المكرمة بمنطقة العزيزية الشمالية، على الشارع العام (بجوار إشارة برج التخفيضات).
                    </p>
                  </div>
                </div>

                {/* Hours - Info */}
                <div className="col-span-1 sm:col-span-2 flex items-center gap-4 rounded-2xl bg-surface/50 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background text-olive">
                    <Clock className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-muted-foreground">ساعات العمل</p>
                    <p className="font-bold text-foreground">من 8 صباحاً إلى 2 بعد منتصف الليل</p>
                  </div>
                </div>
              </div>

              {/* Social Media Row */}
              <div className="pt-6 border-t border-border/50">
                <p className="text-sm font-medium text-center text-muted-foreground mb-4">تابعنا على منصات التواصل الاجتماعي</p>
                <div className="flex justify-center gap-4">
                  <a href="https://www.tiktok.com/@d.t.ksa1?_r=1&_t=ZS-98pOm8OfChr" target="_blank" rel="noopener noreferrer" className="grid size-12 place-items-center rounded-xl bg-black text-white hover:scale-110 transition-transform shadow-sm">
                    <TikTokIcon className="size-6" />
                  </a>
                  <a href="https://www.instagram.com/d.t.ksa1?igsh=MTJvYWh5OGY4c2k5eg==" target="_blank" rel="noopener noreferrer" className="grid size-12 place-items-center rounded-xl bg-gradient-to-tr from-[#fd5949] to-[#d6249f] text-white hover:scale-110 transition-transform shadow-sm">
                    <Instagram className="size-6" />
                  </a>
                  <a href="https://www.facebook.com/share/1DNqkQgg3T/" target="_blank" rel="noopener noreferrer" className="grid size-12 place-items-center rounded-xl bg-[#1877F2] text-white hover:scale-110 transition-transform shadow-sm">
                    <Facebook className="size-6" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
