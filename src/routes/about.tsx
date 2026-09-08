import { createFileRoute, Link } from "@tanstack/react-router";
import { ChefHat, Clock, Leaf, Sparkles } from "lucide-react";
import heroPizza from "@/assets/hero-pizza.jpg";
import pizzaSpecial from "@/assets/pizza-special.jpg";
import { Layout } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { 
  BasilDecor, 
  TomatoDecor, 
  OliveDecor, 
  FlourDecor, 
  PizzaSliceDecor,
  DoughCurveDecor
} from "@/components/site/Decorations";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "من نحن | بيتزا برج التخفيضات" },
      { name: "description", content: "تعرف على برج التخفيضات: بيتزا ومناقيش طازجة بمكونات مختارة وتحضير سريع." },
      { property: "og:title", content: "من نحن | بيتزا برج التخفيضات" },
      { property: "og:description", content: "قصة برج التخفيضات وطريقتنا في التحضير." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Layout>
      {/* 1. MINI HERO */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden bg-background px-4 py-12 sm:py-28 text-center border-b border-border/30">
        {/* Subtle Textures & Decor */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
        <BasilDecor className="absolute top-[20%] start-[10%] size-16 lg:size-24 text-olive opacity-[0.05] rotate-12 pointer-events-none hidden sm:block" />
        <TomatoDecor className="absolute bottom-[20%] end-[15%] size-20 lg:size-28 text-primary opacity-[0.06] -rotate-12 pointer-events-none hidden sm:block" />
        <OliveDecor className="absolute top-[30%] end-[20%] size-12 lg:size-16 text-foreground opacity-[0.04] rotate-45 pointer-events-none hidden sm:block" />
        <FlourDecor className="absolute bottom-[10%] start-[25%] size-40 text-foreground opacity-[0.03] pointer-events-none hidden sm:block" />
        <DoughCurveDecor className="absolute top-[-20%] end-[-10%] size-80 text-foreground opacity-[0.02] pointer-events-none hidden sm:block" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4 sm:space-y-6 fade-up">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight">
            من نحن
          </h1>
          <p className="text-lg sm:text-xl text-foreground/70 leading-relaxed font-medium">
            مطعم بيتزا ومناقيش، نؤمن أن الطعم الجيد يبدأ من المكونات.
          </p>
        </div>
      </section>

      {/* 2. OUR STORY (EDITORIAL) */}
      <section className="relative overflow-hidden bg-background py-12 sm:py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-8 sm:gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
          
          {/* Mobile: Text Appears First */}
          <div className="order-1 lg:order-2 space-y-6 sm:space-y-8 fade-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-[1.2]">
              عجينة طازجة.. <br className="hidden sm:block" /> وخلطات متوازنة
            </h2>
            <div className="space-y-4 sm:space-y-6 text-lg sm:text-xl leading-[1.8] text-foreground/75 font-medium">
              <p>
                في برج التخفيضات نحضّر البيتزا والمناقيش يوميًا بعجينة طازجة وخلطات متوازنة، مع تركيز على الجودة والسعر المناسب.
              </p>
              <p>
                هدفنا بسيط: طلب سهل، تحضير سريع، وطعم يستاهل ترجع له في كل مرة.
              </p>
            </div>
          </div>

          {/* Image Side with Depth */}
          <div className="relative order-2 lg:order-1 fade-up pt-4 sm:pt-0">
            {/* Visual Depth Accents */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[110%] rounded-full border border-primary/10 pointer-events-none hidden sm:block" />
            <div className="absolute top-[-10%] start-[-10%] size-64 bg-primary/10 blur-[60px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-5%] end-[-5%] size-48 bg-olive/10 blur-[50px] rounded-full pointer-events-none" />

            {/* Organic Editorial Image */}
            <div className="relative aspect-[4/5] sm:aspect-square w-full max-w-md mx-auto lg:max-w-none overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[4rem] rounded-tl-[4rem] sm:rounded-tl-[8rem] lg:rounded-br-[8rem] border border-border/40 shadow-sm mix-blend-multiply bg-cream/50">
              <img 
                src={heroPizza} 
                alt="تحضير بيتزا برج التخفيضات" 
                loading="lazy" 
                className="w-full h-full object-cover brightness-[1.02] contrast-[1.05]"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 3. BRAND VALUES */}
      <section className="relative bg-cream py-12 sm:py-20 lg:py-28 border-y border-border/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-16 fade-up">
            <h2 className="text-3xl sm:text-4xl font-black text-foreground">نهتم بالتفاصيل</h2>
          </div>
          
          <div className="grid gap-10 sm:gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 fade-up">
            {[
              { icon: Sparkles, title: "طعم مميز", desc: "طعم يستاهل ترجع له في كل مرة." },
              { icon: Leaf, title: "مكونات طازجة", desc: "الطعم الجيد يبدأ من المكونات." },
              { icon: Clock, title: "تحضير سريع", desc: "طلب سهل، تحضير سريع ومريح." },
              { icon: ChefHat, title: "خيارات متنوعة", desc: "بيتزا ومناقيش لتناسب جميع الأذواق." },
            ].map((f, i) => (
              <div key={f.title} className="relative flex flex-col items-center text-center group">
                <span className="mb-4 sm:mb-5 grid size-12 place-items-center rounded-2xl bg-background border border-border/50 text-primary shadow-sm transition-transform duration-300 group-hover:scale-110">
                  <f.icon className="size-6" />
                </span>
                <h3 className="mb-2 sm:mb-3 text-xl font-bold text-foreground">{f.title}</h3>
                <p className="text-base text-foreground/60 leading-relaxed font-medium">
                  {f.desc}
                </p>
                {/* Desktop Divider */}
                {i !== 3 && (
                  <div className="hidden lg:block absolute top-1/2 -end-4 h-12 w-px bg-border/60 -translate-y-1/2" />
                )}
                {/* Mobile/Tablet Divider */}
                {i !== 3 && (
                  <div className="lg:hidden w-12 sm:w-16 h-px bg-border/60 mx-auto mt-10 sm:mt-12" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EXPERIENCE MOMENT */}
      <section className="relative bg-background py-12 sm:py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 fade-up">
          <div className="relative w-full aspect-[4/3] sm:aspect-[21/9] rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-sm border border-border/50">
            <img 
              src={pizzaSpecial} 
              alt="أجواء برج التخفيضات" 
              loading="lazy" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Soft Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-cocoa/80 via-cocoa/30 to-transparent" />
            
            <div className="absolute bottom-0 left-0 w-full p-6 sm:p-12 text-center sm:text-start">
              <p className="text-xl sm:text-2xl lg:text-3xl font-black text-white max-w-2xl leading-tight">
                "نحضّر البيتزا والمناقيش يوميًا بكل اهتمام.. لنضمن لك الجودة والطعم الأصيل."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DARK CTA */}
      <section className="relative overflow-hidden bg-cocoa py-16 sm:py-20 lg:py-24">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        
        {/* Large Decorative Pizza Slice */}
        <PizzaSliceDecor className="absolute top-[-10%] end-[-5%] size-64 lg:size-96 text-cream opacity-[0.05] rotate-12 pointer-events-none hidden sm:block" />
        <DoughCurveDecor className="absolute bottom-[-20%] start-[-5%] size-80 text-cream opacity-[0.03] -rotate-12 pointer-events-none hidden sm:block" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-cream mb-8 tracking-tight">
            جاهز تختار طلبك؟
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="h-14 w-full sm:w-auto rounded-full bg-primary px-10 text-lg font-bold text-white transition-all hover:scale-105 hover:bg-primary/90 shadow-lg shadow-primary/20 border-0">
              <Link to="/menu">اطلب الآن</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-14 w-full sm:w-auto rounded-full border border-cream/20 bg-transparent px-10 text-lg font-bold text-cream transition-all hover:bg-cream/10 hover:border-cream/40">
              <Link to="/menu">استعرض المنيو</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

