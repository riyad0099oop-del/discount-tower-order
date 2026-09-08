import { createFileRoute } from "@tanstack/react-router";
import { Clock, Instagram, MessageCircle, Phone, Pizza, Leaf, Circle, Sparkles, Send } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { useStore } from "@/lib/store";
import pizzaSpecial from "@/assets/pizza-special.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل معنا | بيتزا برج التخفيضات" },
      { name: "description", content: "طرق التواصل مع برج التخفيضات: الهاتف، واتساب، إنستقرام وساعات العمل." },
      { property: "og:title", content: "تواصل معنا | بيتزا برج التخفيضات" },
      { property: "og:description", content: "نسعد بخدمتك واستقبال طلبك." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { settings } = useStore();
  
  const hasAnyContactData = !!(settings.phone || settings.whatsapp || settings.instagram || settings.hours);

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
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">تواصل معنا</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">نسعد بخدمتك واستقبال ملاحظاتك.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:py-16 sm:px-6">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-2 lg:items-center">
          
          {/* Left Side: Image & Text */}
          <div className="relative">
            <div className="absolute -left-6 -top-6 h-48 w-48 rounded-full bg-olive/10 blur-3xl hidden sm:block"></div>
            <div className="absolute -bottom-6 -right-6 h-48 w-48 rounded-full bg-primary/10 blur-3xl hidden sm:block"></div>
            <div className="relative overflow-hidden rounded-[2rem] border border-border/40 shadow-lift">
              <img src={pizzaSpecial} alt="Pizza" className="aspect-[4/3] w-full object-cover sm:aspect-[3/2] lg:aspect-[4/5]" />
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa/80 via-cocoa/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                <h3 className="text-2xl font-bold">برج التخفيضات</h3>
                <p className="mt-2 text-white/80">أفضل طعم، وأقوى العروض.</p>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Panel */}
          <div className="rounded-[2rem] border border-border/30 bg-[#FFFDF8] p-6 sm:p-12 shadow-[0_8px_30px_oklch(0.3_0.05_55/0.04)]">
            {!hasAnyContactData ? (
              <div className="text-center py-10">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-surface text-olive">
                  <Send className="size-8" />
                </div>
                <h2 className="mt-6 text-xl font-bold text-foreground">بيانات التواصل ستظهر هنا</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  سيتم إضافة أرقام التواصل وحسابات السوشيال ميديا قريباً.
                </p>
              </div>
            ) : (
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h2 className="text-2xl font-extrabold text-foreground">كيف يمكننا مساعدتك؟</h2>
                  <p className="mt-2 text-muted-foreground">تواصل معنا عبر القنوات التالية وسنرد عليك في أقرب وقت.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {/* WhatsApp - Primary */}
                  {settings.whatsapp && (
                    <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noreferrer" className="group col-span-1 sm:col-span-2 flex items-center gap-4 rounded-2xl bg-[#25D366]/10 p-5 transition-colors hover:bg-[#25D366]/20">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white shadow-sm transition-transform group-hover:scale-105">
                        <MessageCircle className="size-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-[#1DA851]">واتساب</p>
                        <p className="truncate text-lg font-bold text-foreground" dir="ltr">{settings.whatsapp}</p>
                      </div>
                    </a>
                  )}

                  {/* Phone - Secondary */}
                  {settings.phone && (
                    <a href={`tel:${settings.phone}`} className="group flex items-center gap-4 rounded-2xl border border-border/50 bg-white p-4 transition-shadow hover:shadow-soft">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Phone className="size-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-muted-foreground">رقم التواصل</p>
                        <p className="truncate font-bold text-foreground" dir="ltr">{settings.phone}</p>
                      </div>
                    </a>
                  )}

                  {/* Instagram - Social */}
                  {settings.instagram && (
                    <a href={`https://instagram.com/${settings.instagram}`} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-2xl border border-border/50 bg-white p-4 transition-shadow hover:shadow-soft">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E1306C]/10 text-[#E1306C]">
                        <Instagram className="size-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-muted-foreground">إنستقرام</p>
                        <p className="truncate font-bold text-foreground" dir="ltr">@{settings.instagram}</p>
                      </div>
                    </a>
                  )}

                  {/* Hours - Info */}
                  {settings.hours && (
                    <div className="col-span-1 sm:col-span-2 flex items-center gap-4 rounded-2xl bg-surface/50 p-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-background text-olive">
                        <Clock className="size-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-muted-foreground">ساعات العمل</p>
                        <p className="font-bold text-foreground">{settings.hours}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
