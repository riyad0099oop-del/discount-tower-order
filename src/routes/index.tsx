import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Plus } from "lucide-react";
import { useState } from "react";
import heroPizza from "@/assets/hero-pizza.jpg";
import promoSlice from "@/assets/promo-slice.jpg";
import {
  BasilDecor,
  FlourDecor,
  MushroomDecor,
  OliveDecor,
  PizzaSliceDecor,
  TomatoDecor,
} from "@/components/site/Decorations";
import { Layout } from "@/components/site/Layout";
import { ProductCard } from "@/components/site/ProductCard";
import { ProductSheet } from "@/components/site/ProductSheet";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/menu-data";
import { startingPrice } from "@/lib/menu-data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "بيتزا برج التخفيضات | الطعم الذي يستاهل ترجع له" },
      {
        name: "description",
        content: "بيتزا ومناقيش طازجة من برج التخفيضات. اختر طلبك المفضل واكتشف المذاق الأصيل.",
      },
      { property: "og:title", content: "بيتزا برج التخفيضات" },
      { property: "og:description", content: "بيتزا ومناقيش طازجة بمذاق يستاهل ترجع له." },
    ],
  }),
  component: Index,
});

function Index() {
  const { products, categories } = useStore();
  const [selected, setSelected] = useState<Product | null>(null);

  // Menu Preview State
  const activeCategories = categories.filter((c) => c.active);
  const [activeTab, setActiveTab] = useState(activeCategories[0]?.id || "pizza");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Filter Data
  const activeProducts = products.filter((p) => p.active);

  // Signature Picks
  const signatureIds = ["pizza-special", "pizza-ranch", "pizza-pepperoni"];
  const signatures = activeProducts.filter((p) => signatureIds.includes(p.id));
  const featuredSignature = signatures.find((p) => p.id === "pizza-special") || signatures[0];
  const otherSignatures = signatures.filter((p) => p.id !== featuredSignature?.id).slice(0, 2);

  // Menu Preview
  const previewProducts = activeProducts
    .filter((p) => p.category === activeTab && p.featured)
    .slice(0, 4);

  return (
    <Layout>
      {/* 1. Hero Cinematic */}
      <section className="relative flex flex-col justify-center overflow-hidden bg-background pt-10 pb-6 lg:py-0 lg:min-h-[82vh] xl:min-h-[750px]">
        {/* Subtle Background Grain/Texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] mix-blend-overlay pointer-events-none" />

        {/* Transparent Elements (Opacity 4-7%) - Reduced for mobile */}
        {/* Mobile + Desktop */}
        <TomatoDecor className="absolute bottom-[5%] end-[85%] lg:bottom-[15%] lg:start-[15%] size-20 lg:size-40 text-primary opacity-[0.06] -rotate-45 pointer-events-none animate-in fade-in duration-1000 delay-200" />
        <BasilDecor className="absolute top-[8%] start-[5%] size-16 lg:size-32 text-[#5c6e45] opacity-[0.05] rotate-12 pointer-events-none animate-in fade-in duration-1000 hidden sm:block" />

        {/* Desktop Only */}
        <PizzaSliceDecor className="absolute top-[20%] end-[45%] size-36 text-[#3c2f25] opacity-[0.04] rotate-6 pointer-events-none hidden lg:block animate-in fade-in duration-1000 delay-300" />
        <MushroomDecor className="absolute bottom-[25%] end-[40%] size-28 text-[#3c2f25] opacity-[0.04] -rotate-12 pointer-events-none hidden lg:block animate-in fade-in duration-1000 delay-500" />
        <FlourDecor className="absolute top-[10%] end-[5%] size-56 text-[#3c2f25] opacity-[0.03] pointer-events-none hidden lg:block animate-in fade-in duration-1000" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-6 lg:gap-10 px-4 sm:px-6 lg:grid-cols-2 w-full">
          {/* Text Content */}
          <div className="relative z-30 flex flex-col justify-center text-center lg:text-start order-2 lg:order-1 lg:pe-8 mt-2 lg:mt-0">
            <h1 className="text-4xl leading-[1.2] font-black sm:text-5xl lg:text-[4.2rem] lg:leading-[1.15] text-[#3c2f25] tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
              الطعم الذي <br className="hidden lg:block" />
              <span className="text-primary">يستاهل</span> ترجع له
            </h1>
            <p className="mt-3 lg:mt-5 text-[1.05rem] md:text-[1.2rem] leading-[1.6] text-[#7a6f65] max-w-[320px] lg:max-w-[360px] mx-auto lg:mx-0 font-medium animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150">
              بيتزا ومناقيش طازجة، نجهزها لك بالمذاق الذي تحبه وبكل اهتمام.
            </p>
            <div className="mt-8 lg:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 lg:gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              <Button
                asChild
                size="lg"
                className="h-[3.5rem] lg:h-[3.75rem] w-full sm:w-auto rounded-full bg-primary px-8 lg:px-10 text-[1.05rem] lg:text-[1.1rem] font-bold text-white transition-all hover:scale-[1.02] hover:bg-primary/95 shadow-lg shadow-primary/20 border-0"
              >
                <Link to="/menu">اطلب الآن</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-[3.5rem] lg:h-[3.75rem] w-full sm:w-auto rounded-full border-2 border-[#5c4f45]/20 bg-transparent px-8 lg:px-10 text-[1.05rem] lg:text-[1.1rem] font-bold text-[#3c2f25] transition-all hover:bg-[#3c2f25]/5 hover:border-[#3c2f25]/30"
              >
                <Link to="/menu">استعرض المنيو</Link>
              </Button>
            </div>
          </div>

          {/* Huge Cutout Pizza Scene */}
          <div className="relative z-20 w-full flex justify-center lg:justify-end items-center order-1 lg:order-2">
            {/* Base gradient to absorb the JPEG's edge color */}
            <div className="absolute size-[300px] sm:size-[550px] lg:size-[800px] rounded-full bg-[#f4e6ce]/60 lg:end-[-15%] blur-[40px] lg:blur-[60px] pointer-events-none" />

            {/* Outline Circle */}
            <div className="absolute size-[260px] sm:size-[500px] lg:size-[680px] rounded-full border-[1px] border-[#3c2f25]/10 lg:end-[0%] pointer-events-none" />

            {/* Fake Shadow Under Pizza */}
            <div className="absolute bottom-[-5%] lg:bottom-[4%] w-[80%] lg:w-[90%] lg:end-[-5%] h-[6%] lg:h-[8%] bg-[#3c2f25]/20 blur-[15px] lg:blur-[25px] rounded-[100%] pointer-events-none" />

            {/* The Pizza Image - Seamless Blending */}
            <img
              src={heroPizza}
              alt="بيتزا برج التخفيضات طازجة"
              fetchPriority="high"
              style={{
                WebkitMaskImage:
                  "radial-gradient(circle closest-side at 50% 50%, black 65%, transparent 95%)",
                maskImage:
                  "radial-gradient(circle closest-side at 50% 50%, black 65%, transparent 95%)",
              }}
              className="relative z-30 w-[140%] sm:w-[110%] lg:w-[145%] max-w-[500px] lg:max-w-none lg:translate-x-12 xl:translate-x-20 mix-blend-multiply brightness-[1.08] contrast-[1.08] object-contain transition-transform duration-[1.5s] ease-out hover:scale-[1.015] animate-in zoom-in-[0.97] fade-in duration-1000"
            />
          </div>
        </div>
      </section>

      {/* 2. Signature Picks */}
      {featuredSignature && (
        <section className="relative bg-surface py-12 lg:py-28 overflow-hidden">
          {/* Decorations */}
          <MushroomDecor className="absolute top-10 end-10 size-24 text-foreground opacity-20 rotate-45 pointer-events-none hidden lg:block" />
          <OliveDecor className="absolute bottom-10 start-10 size-20 text-olive opacity-25 -rotate-12 pointer-events-none hidden lg:block" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 z-10">
            <div className="mb-8 lg:mb-14 text-center lg:text-start">
              <h2 className="text-3xl lg:text-5xl font-black text-foreground tracking-tight">
                اختيارات البرج
              </h2>
            </div>
            <div className="grid lg:grid-cols-12 gap-5 lg:gap-8">
              {/* Featured Large Card */}
              <div
                onClick={() => setSelected(featuredSignature)}
                className="group cursor-pointer relative lg:col-span-7 flex flex-col overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] bg-card border border-border/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden bg-cream">
                  <img
                    src={featuredSignature.image}
                    alt={featuredSignature.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-cocoa/95 via-cocoa/40 to-transparent flex flex-col justify-end p-6 lg:p-10 text-cocoa-foreground">
                  <h3 className="text-2xl sm:text-4xl font-black">{featuredSignature.name}</h3>
                  <div className="mt-3 lg:mt-5 flex items-end justify-between">
                    <div>
                      <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-cocoa-foreground/80">
                        يبدأ من
                      </span>
                      <span className="block text-2xl sm:text-4xl font-black text-primary mt-1">
                        {startingPrice(featuredSignature)}
                      </span>
                    </div>
                    <Button
                      size="lg"
                      className="rounded-full bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform pointer-events-none"
                    >
                      اطلب الآن
                    </Button>
                  </div>
                </div>
              </div>

              {/* Smaller Cards - Horizontal Snap on Mobile */}
              <div className="lg:col-span-5 flex overflow-x-auto snap-x snap-mandatory gap-4 lg:flex-col lg:overflow-visible lg:snap-none lg:gap-8 pb-4 lg:pb-0 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                {otherSignatures.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelected(p)}
                    className="group cursor-pointer flex min-w-[280px] snap-center flex-col sm:flex-row lg:flex-col xl:flex-row h-full overflow-hidden rounded-[2rem] bg-card border border-border/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 shrink-0 lg:shrink"
                  >
                    <div className="relative w-full sm:w-2/5 lg:w-full xl:w-2/5 aspect-[4/3] sm:aspect-auto lg:aspect-[4/3] xl:aspect-auto overflow-hidden bg-cream">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-center p-5 lg:p-8">
                      <h3 className="text-xl lg:text-2xl font-black text-foreground">{p.name}</h3>
                      <div className="mt-3 lg:mt-4 flex items-end justify-between">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                            يبدأ من
                          </span>
                          <span className="block text-xl lg:text-2xl font-black text-primary mt-1">
                            {startingPrice(p)}
                          </span>
                        </div>
                        <span className="grid size-10 lg:size-12 place-items-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <Plus className="size-5 lg:size-6" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Explore Categories */}
      <section className="relative py-12 lg:py-28 bg-background overflow-hidden">
        <PizzaSliceDecor className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] text-foreground opacity-15 rotate-12 pointer-events-none hidden lg:block" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 z-10">
          {/* Section Title */}
          <div className="mb-6 lg:mb-10 text-center">
            <h2 className="text-2xl lg:text-4xl font-black text-foreground">اختر من</h2>
            <p className="mt-2 text-muted-foreground text-sm lg:text-base">اضغط للاستكشاف</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8">
            {activeCategories.map((c) => {
              const isActive = activeCategory === c.id;
              return (
                <Link
                  key={c.id}
                  to="/menu"
                  search={{ cat: c.id }}
                  onClick={(e) => {
                    // On mobile: first tap activates color, second tap navigates
                    if (window.innerWidth < 768 && !isActive) {
                      e.preventDefault();
                      setActiveCategory(c.id);
                    }
                  }}
                  className="group relative aspect-[3/2] md:aspect-[16/10] overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] bg-cocoa"
                >
                  <img
                    src={c.image}
                    alt={c.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                      isActive
                        ? "opacity-100 mix-blend-normal scale-[1.02]"
                        : "opacity-80 mix-blend-luminosity group-hover:opacity-100 group-hover:mix-blend-normal"
                    }`}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-500 ${
                      isActive
                        ? "from-cocoa/70 via-cocoa/10 to-transparent"
                        : "from-cocoa/90 via-cocoa/20 to-transparent opacity-90"
                    }`}
                  />

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute top-4 end-4 size-3 rounded-full bg-primary shadow-lg shadow-primary/50 animate-pulse" />
                  )}

                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white z-10">
                    <h3
                      className={`text-3xl sm:text-5xl font-black mb-4 lg:mb-6 drop-shadow-xl transition-transform duration-500 ${isActive ? "scale-110" : ""}`}
                    >
                      {c.name}
                    </h3>
                    <span
                      className={`flex items-center gap-2 rounded-full px-6 lg:px-8 py-3 lg:py-4 text-sm lg:text-base font-bold backdrop-blur-md transition-all duration-300 shadow-xl border ${
                        isActive
                          ? "bg-primary text-primary-foreground border-primary scale-105"
                          : "bg-white/10 border-white/20 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105 group-hover:border-primary"
                      }`}
                    >
                      {isActive ? "اضغط للدخول" : "استكشف"}{" "}
                      <ArrowLeft className="size-4 lg:size-5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Interactive Menu Preview */}
      <section className="relative bg-surface py-12 lg:py-28 border-y border-border/50 overflow-hidden">
        <BasilDecor className="absolute top-20 start-10 size-32 text-olive opacity-25 rotate-[120deg] pointer-events-none hidden lg:block" />
        <TomatoDecor className="absolute bottom-20 end-10 size-40 text-primary opacity-20 -rotate-[30deg] pointer-events-none hidden lg:block" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 z-10">
          <div className="mb-8 lg:mb-12 flex flex-col items-center text-center">
            <h2 className="text-3xl lg:text-5xl font-black text-foreground mb-6 lg:mb-8">
              من المنيو
            </h2>
            <div className="flex w-full sm:w-auto items-center gap-2 rounded-[2rem] bg-card p-2 border border-border/60 shadow-sm overflow-x-auto no-scrollbar">
              {activeCategories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveTab(c.id)}
                  className={`flex-1 sm:flex-none rounded-full px-6 py-3 text-sm lg:text-base font-bold transition-all whitespace-nowrap ${
                    activeTab === c.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:gap-6 lg:grid-cols-4">
            {previewProducts.map((p) => (
              <ProductCard key={p.id} product={p} onSelect={setSelected} />
            ))}
          </div>

          <div className="mt-10 lg:mt-14 text-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 lg:h-14 rounded-full border-foreground/20 px-8 lg:px-10 text-base lg:text-lg font-bold text-foreground hover:bg-foreground/5 hover:border-foreground/40 transition-colors"
            >
              <Link to="/menu" search={{ cat: activeTab }}>
                عرض المنيو كاملًا
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 5. Full-width Offer Banner */}
      <section className="bg-cocoa text-cocoa-foreground overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-0 relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-25 mix-blend-overlay pointer-events-none" />

          <BasilDecor className="absolute bottom-10 start-[45%] size-24 text-white opacity-15 -rotate-45 pointer-events-none hidden lg:block" />
          <FlourDecor className="absolute top-10 start-[10%] size-32 text-white opacity-20 pointer-events-none hidden lg:block" />

          <div className="grid items-center lg:grid-cols-2 gap-8 lg:gap-12 relative z-10">
            <div className="flex flex-col justify-center py-6 lg:py-28 text-center lg:text-start">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.1] text-white">
                عروض <span className="text-primary">تستاهل</span> التجربة
              </h2>
              <p className="mt-4 lg:mt-6 text-base lg:text-xl text-cocoa-foreground/80 max-w-md leading-relaxed mx-auto lg:mx-0">
                اكتشف عروض برج التخفيضات وخيارات تناسب كل طلب، لتستمتع بأفضل مذاق بأفضل قيمة.
              </p>
              <div className="mt-8 lg:mt-10">
                <Button
                  asChild
                  size="lg"
                  className="h-14 lg:h-16 rounded-full bg-primary px-10 lg:px-12 text-lg lg:text-xl font-bold text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-transform shadow-xl shadow-primary/20"
                >
                  <Link to="/offers">شاهد العروض</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-48 sm:h-96 lg:h-full w-full block">
              <img
                src={promoSlice}
                alt="شريحة بيتزا ساخنة"
                className="absolute inset-0 w-full h-full object-cover lg:object-contain object-center lg:object-right lg:scale-[1.3] lg:origin-right transition-transform duration-1000 hover:scale-[1.35]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa/60 via-transparent to-transparent lg:hidden" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Brand Story */}
      <section className="relative py-16 lg:py-28 bg-cream overflow-hidden">
        <MushroomDecor className="absolute top-[20%] end-[5%] size-24 text-foreground opacity-20 rotate-[60deg] pointer-events-none hidden lg:block" />
        <OliveDecor className="absolute bottom-[10%] start-[5%] size-16 text-olive opacity-25 rotate-12 pointer-events-none hidden lg:block" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 relative aspect-square max-w-[400px] lg:max-w-[500px] mx-auto w-full">
              <div className="absolute inset-0 bg-olive/15 rounded-[2rem] lg:rounded-[3rem] rotate-6 scale-95 transition-transform duration-700 hover:rotate-3" />
              <img
                src={heroPizza}
                alt="تحضير البيتزا"
                className="relative z-10 w-full h-full object-cover rounded-[2rem] lg:rounded-[3rem] -rotate-3 shadow-2xl transition-transform duration-700 hover:rotate-0"
              />
            </div>
            <div className="order-1 lg:order-2 flex flex-col justify-center text-center lg:text-start">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight">
                الفرق يبدأ من التفاصيل
              </h2>
              <div className="mt-8 lg:mt-12 space-y-6 lg:space-y-10 text-start">
                {[
                  {
                    title: "مكونات طازجة",
                    desc: "نختار الخضروات والأجبان يوميًا بأعلى معايير الجودة لنضمن لك طعماً أصيلاً.",
                  },
                  {
                    title: "تحضير يومي",
                    desc: "عجينتنا تُعجن وتُخبز يوميًا، لتصلك هشة، ساخنة ولذيذة في كل طلب.",
                  },
                  {
                    title: "خيارات تناسب الجميع",
                    desc: "من البيتزا الكلاسيكية إلى المناقيش المتنوعة، صممنا منيو يرضي كل الأذواق.",
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-row items-start gap-4 lg:gap-6 bg-surface/50 lg:bg-transparent p-4 rounded-2xl lg:p-0 lg:rounded-none border border-border/50 lg:border-none"
                  >
                    <span className="flex-shrink-0 size-12 lg:size-14 rounded-full bg-card shadow-sm border border-border/50 flex items-center justify-center text-primary mt-1 lg:mt-0">
                      <CheckCircle2 className="size-6 lg:size-7" />
                    </span>
                    <div className="mt-0">
                      <h3 className="text-xl lg:text-2xl font-bold text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-1 lg:mt-2 text-sm lg:text-lg text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Strong CTA */}
      <section className="relative py-16 lg:py-28 bg-surface overflow-hidden">
        <FlourDecor className="absolute top-0 end-0 size-64 text-foreground opacity-15 pointer-events-none hidden lg:block" />
        <TomatoDecor className="absolute bottom-10 start-10 size-32 text-primary opacity-20 -rotate-12 pointer-events-none hidden lg:block" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 text-center z-10">
          <div className="rounded-[2.5rem] lg:rounded-[3rem] bg-card border border-border/50 p-8 sm:p-24 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none hidden lg:block" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-olive/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none hidden lg:block" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-foreground">
                طلبك أقرب مما تتوقع
              </h2>
              <p className="mt-4 lg:mt-6 text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
                اختر طلبك المفضل، أضفه للسلة، وخلي الباقي علينا. تجربة سهلة وسريعة.
              </p>
              <Button
                asChild
                size="lg"
                className="mt-8 lg:mt-12 h-14 lg:h-16 rounded-full bg-primary px-12 lg:px-16 text-lg lg:text-xl font-bold text-primary-foreground hover:scale-105 transition-transform shadow-xl shadow-primary/25"
              >
                <Link to="/menu">اطلب الآن</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ProductSheet product={selected} onOpenChange={(o) => !o && setSelected(null)} />
    </Layout>
  );
}
