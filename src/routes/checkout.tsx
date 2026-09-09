import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Layout, PageHeader } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/lib/store";

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
    if (!settings.whatsapp.trim()) {
      toast.error("رقم واتساب المطعم غير مُعد بعد. يمكن ضبطه من لوحة التحكم.");
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
      lines.push(`${i.qty} × ${i.name}`);
      if (i.sizeLabel) lines.push(`الحجم: ${i.sizeLabel}`);
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

    const num = settings.whatsapp.replace(/[^0-9]/g, "");
    window.open(`https://wa.me/${num}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank");
    clearCart();
    toast.success("تم تجهيز رسالة الطلب على واتساب");
  };

  if (!cart.length) {
    return (
      <Layout>
        <PageHeader title="إتمام الطلب" />
        <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
          <p className="text-muted-foreground">سلتك فارغة حاليًا.</p>
          <Button asChild className="mt-6 rounded-full">
            <Link to="/menu">تصفح المنيو</Link>
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
              {settings.branches.length ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {settings.branches.map((b) => (
                    <button
                      key={b}
                      onClick={() => setBranch(b)}
                      className={`rounded-2xl border-2 p-4 font-black transition-all duration-200 ${
                        branch === b
                          ? "border-primary bg-primary/5 shadow-sm scale-[1.02] text-primary"
                          : "border-border/50 bg-card hover:border-primary/30 hover:bg-primary/5"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">لم تُضف الفروع بعد.</p>
              )}
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

        <aside className="h-fit space-y-6 rounded-[2.5rem] bg-cream p-8 shadow-sm lg:sticky lg:top-28 border border-border/50">
          <h2 className="text-2xl font-black text-foreground">ملخص الطلب</h2>
          <ul className="space-y-4">
            {cart.map((i) => (
              <li key={i.key} className="flex justify-between gap-4 text-base">
                <span className="min-w-0">
                  <span className="block font-bold">
                    {i.qty} × {i.name}
                  </span>
                  {i.sizeLabel && (
                    <span className="text-sm text-muted-foreground font-medium mt-0.5 block">
                      الحجم: {i.sizeLabel}
                    </span>
                  )}
                </span>
                <span className="font-black text-primary whitespace-nowrap">
                  {i.unitPrice * i.qty} <span className="text-xs text-muted-foreground">ر.س</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between border-t-2 border-border/50 pt-5 text-xl font-black text-foreground">
            <span>الإجمالي</span>
            <span className="text-primary">
              {cartTotal} <span className="text-sm">ر.س</span>
            </span>
          </div>
          <Button
            size="lg"
            className="h-16 w-full rounded-full bg-primary text-xl font-black text-primary-foreground hover:scale-[1.02] transition-transform shadow-xl shadow-primary/20 mt-4"
            onClick={submit}
          >
            تأكيد الطلب
          </Button>
          {!settings.whatsapp && (
            <p className="text-center text-xs text-muted-foreground mt-4">
              أضف رقم واتساب المطعم من لوحة التحكم لتفعيل الإرسال.
            </p>
          )}
        </aside>
      </div>
    </Layout>
  );
}
