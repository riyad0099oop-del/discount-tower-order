import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import bankQr from "@/assets/bank-qr.jpg";
import { Layout, PageHeader } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/lib/store";
import { localize } from "@/lib/menu-data";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "إتمام الطلب | بيتزا برج التخفيضات" },
      { name: "description", content: "أكمل بياناتك وأرسل طلبك إلى برج التخفيضات عبر واتساب." },
      { property: "og:title", content: "إتمام الطلب | بيتزا برج التخفيضات" },
      { property: "og:description", content: "خطوات بسيطة لإرسال طلبك." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { cart, cartTotal, settings, clearCart } = useStore();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState<"delivery" | "pickup">("delivery");
  const [address, setAddress] = useState("");
  const [locationUrl, setLocationUrl] = useState("");
  const [locationNotes, setLocationNotes] = useState("");
  const [branch, setBranch] = useState(settings.branches[0] ?? "");
  const [orderNotes, setOrderNotes] = useState("");

  const submit = () => {
    if (!cart.length) return;
    if (!name.trim() || !phone.trim()) {
      toast.error("الرجاء إدخال الاسم ورقم الهاتف");
      return;
    }
    if (method === "delivery" && !address.trim()) {
      toast.error("الرجاء إدخال العنوان");
      return;
    }

    const lines: string[] = [
      "طلب جديد - بيتزا برج التخفيضات",
      "",
      `الاسم: ${name}`,
      `رقم الهاتف: ${phone}`,
      "",
      "الطلبات:",
    ];
    cart.forEach((i) => {
      lines.push(`${i.qty} × ${localize(i.name, lang)}`);
      if (i.sizeLabel) lines.push(`الحجم: ${localize(i.sizeLabel, lang)}`);
      if (i.notes) lines.push(`ملاحظة: ${i.notes}`);
      lines.push(`السعر: ${i.unitPrice * i.qty}`);
      lines.push("");
    });
    lines.push(`طريقة الاستلام: ${method === "delivery" ? "توصيل" : "استلام من الفرع"}`);
    if (method === "delivery") {
      lines.push(`العنوان: ${address}`);
      if (locationUrl) lines.push(`الموقع: ${locationUrl}`);
      if (locationNotes) lines.push(`ملاحظات الموقع: ${locationNotes}`);
    } else if (branch) {
      lines.push(`الفرع: ${branch}`);
    }
    if (orderNotes) lines.push(`الملاحظات: ${orderNotes}`);
    lines.push("", `الإجمالي: ${cartTotal}`);
    
    if (method === "delivery") {
      lines.push("", "ملاحظة: رسوم التوصيل محسوبة على العميل.");
    }

    const num = "966548392988";
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
    clearCart();
    toast.success("تم تجهيز رسالة الطلب على واتساب");
  };

  if (!cart.length) {
    return (
      <Layout>
        <PageHeader title="إتمام الطلب" />
        <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
          <p className="text-muted-foreground">{t('cart_empty')}</p>
          <Button asChild className="mt-6 rounded-full">
            <Link to="/menu">{t('explore_menu')}</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader title="إتمام الطلب" subtitle="أكمل بياناتك وسنجهز رسالة طلبك مباشرة." />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8 rounded-[2.5rem] bg-surface p-8 shadow-sm border border-border/50">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label
                htmlFor="name"
                className="font-bold text-muted-foreground uppercase tracking-widest text-xs mb-2 block"
              >
                الاسم
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-14 rounded-2xl bg-card border-border/50 focus-visible:ring-primary shadow-sm"
              />
            </div>
            <div>
              <Label
                htmlFor="phone"
                className="font-bold text-muted-foreground uppercase tracking-widest text-xs mb-2 block"
              >
                رقم الهاتف
              </Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                inputMode="tel"
                className="h-14 rounded-2xl bg-card border-border/50 focus-visible:ring-primary shadow-sm"
              />
            </div>
          </div>

          <div>
            <Label className="font-bold text-muted-foreground uppercase tracking-widest text-xs mb-3 block">
              طريقة الاستلام
            </Label>
            <div className="grid grid-cols-2 gap-4">
              {(
                [
                  ["delivery", "توصيل"],
                  ["pickup", "استلام من الفرع"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setMethod(key)}
                  className={`rounded-2xl border-2 p-5 text-center font-black transition-all duration-200 ${
                    method === key
                      ? "border-primary bg-primary/5 shadow-sm scale-[1.02] text-primary"
                      : "border-border/50 bg-card hover:border-primary/30 hover:bg-primary/5 text-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {method === "delivery" ? (
            <div className="space-y-5">
              <div>
                <Label
                  htmlFor="address"
                  className="font-bold text-muted-foreground uppercase tracking-widest text-xs mb-2 block"
                >
                  العنوان
                </Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="h-14 rounded-2xl bg-card border-border/50 focus-visible:ring-primary shadow-sm"
                />
              </div>
              <div>
                <Label
                  htmlFor="loc"
                  className="font-bold text-muted-foreground uppercase tracking-widest text-xs mb-2 block"
                >
                  رابط الموقع (اختياري)
                </Label>
                <Input
                  id="loc"
                  value={locationUrl}
                  onChange={(e) => setLocationUrl(e.target.value)}
                  placeholder="https://maps.app.goo.gl/..."
                  className="h-14 rounded-2xl bg-card border-border/50 focus-visible:ring-primary shadow-sm"
                />
              </div>
              <div>
                <Label
                  htmlFor="locnotes"
                  className="font-bold text-muted-foreground uppercase tracking-widest text-xs mb-2 block"
                >
                  ملاحظات الموقع (اختياري)
                </Label>
                <Textarea
                  id="locnotes"
                  value={locationNotes}
                  onChange={(e) => setLocationNotes(e.target.value)}
                  className="min-h-24 rounded-2xl bg-card border-border/50 focus-visible:ring-primary shadow-sm"
                />
              </div>
            </div>
          ) : (
            <div>
              <Label className="font-bold text-muted-foreground uppercase tracking-widest text-xs mb-3 block">
                اختر الفرع
              </Label>
              <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    onClick={() => setBranch("الفرع الأول والرئيسي")}
                    className={`rounded-2xl border-2 p-4 font-black transition-all duration-200 border-primary bg-primary/5 shadow-sm scale-[1.02] text-primary`}
                  >
                    الفرع الأول والرئيسي
                  </button>
              </div>
            </div>
          )}

          <div>
            <Label
              htmlFor="notes"
              className="font-bold text-muted-foreground uppercase tracking-widest text-xs mb-2 block"
            >
              ملاحظات الطلب (اختياري)
            </Label>
            <Textarea
              id="notes"
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              className="min-h-32 rounded-2xl bg-card border-border/50 focus-visible:ring-primary p-4 text-base shadow-sm"
            />
          </div>
        </div>

        <aside className="h-fit space-y-6 lg:sticky lg:top-28">
          <div className="space-y-6 rounded-[2.5rem] bg-cream p-8 shadow-sm border border-border/50">
            <h2 className="text-2xl font-black text-foreground">ملخص الطلب</h2>
            <ul className="space-y-4">
              {cart.map((i) => (
                <li key={i.key} className="flex justify-between gap-4 text-base">
                  <span className="min-w-0">
                    <span className="block font-bold">
                      {i.qty} × {localize(i.name, lang)}
                    </span>
                    {i.sizeLabel && (
                      <span className="text-sm text-muted-foreground font-medium mt-0.5 block">
                        الحجم: {localize(i.sizeLabel, lang)}
                      </span>
                    )}
                  </span>
                  <span className="font-black text-primary whitespace-nowrap">
                    {i.unitPrice * i.qty} <span className="text-xs text-muted-foreground">{t('sar')}</span>
                  </span>
                </li>
              ))}
            </ul>
            
            {method === "delivery" && (
              <div className="mt-4 rounded-xl bg-orange-50 p-4 border border-orange-100 text-orange-800 text-sm font-bold text-center">
                ملاحظة: رسوم التوصيل محسوبة على العميل وتُدفع للمندوب.
              </div>
            )}
            
            <div className="flex justify-between border-t-2 border-border/50 pt-5 text-xl font-black text-foreground">
              <span>{t('total')}</span>
              <span className="text-primary">
                {cartTotal} <span className="text-sm">{t('sar')}</span>
              </span>
            </div>
            
            <Button
              size="lg"
              className="h-16 w-full rounded-full bg-primary text-xl font-black text-primary-foreground hover:scale-[1.02] transition-transform shadow-xl shadow-primary/20 mt-4"
              onClick={submit}
            >
              تأكيد الطلب عبر الواتساب
            </Button>
          </div>

          {/* Bank Account Section */}
          <div className="space-y-4 rounded-[2.5rem] bg-surface p-6 shadow-sm border border-border/50 text-center">
            <h3 className="font-black text-lg">التحويل البنكي الدفع الالكتروني قريبا </h3>
            <img 
              src={bankQr} 
              alt="QR Code" 
              className="mx-auto w-48 h-48 object-contain rounded-xl border border-border/30 p-2 bg-white"
            />
            <div className="space-y-2 text-sm">
              <p><span className="text-muted-foreground">الاسم:</span> <strong className="block text-base">رياض عبدالله علي احمد الظاهري</strong></p>
              <p><span className="text-muted-foreground">رقم الحساب:</span> <strong className="block font-mono text-base">077040010006081097569</strong></p>
              <p><span className="text-muted-foreground">رقم الآيبان:</span> <strong className="block font-mono text-xs sm:text-sm">SA95 8000 0859 6080 1109 7569</strong></p>
            </div>
          </div>
        </aside>
      </div>
    </Layout>
  );
}
