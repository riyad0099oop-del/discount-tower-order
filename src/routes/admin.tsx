import { createFileRoute } from "@tanstack/react-router";
import { Plus, RotateCcw, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Layout, PageHeader } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Product, SizeKey } from "@/lib/menu-data";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "لوحة التحكم | بيتزا برج التخفيضات" },
      { name: "description", content: "إدارة منتجات وأسعار وتصنيفات وإعدادات موقع برج التخفيضات." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "لوحة التحكم | بيتزا برج التخفيضات" },
      { property: "og:description", content: "إدارة المنيو والإعدادات." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { products, setProducts, categories, setCategories, settings, setSettings, resetCatalog } = useStore();
  const [newCat, setNewCat] = useState("");

  const update = (id: string, patch: Partial<Product>) =>
    setProducts(products.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  const updateSize = (id: string, key: SizeKey, price: number) =>
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, sizes: p.sizes?.map((s) => (s.key === key ? { ...s, price } : s)) } : p,
      ),
    );

  const addProduct = (category: string) => {
    const id = `custom-${Date.now()}`;
    setProducts([
      ...products,
      {
        id,
        name: "منتج جديد",
        description: "",
        image: products[0]?.image ?? "",
        category,
        ...(category === "pizza"
          ? {
              sizes: [
                { key: "S" as SizeKey, label: "صغير", price: 13 },
                { key: "M" as SizeKey, label: "وسط", price: 19 },
                { key: "L" as SizeKey, label: "كبير", price: 25 },
              ],
            }
          : { price: 10 }),
        active: true,
        featured: false,
        bestSeller: false,
        offer: false,
      },
    ]);
    toast.success("تمت إضافة منتج جديد");
  };

  return (
    <Layout>
      <PageHeader title="لوحة التحكم" subtitle="إدارة المنتجات والأسعار والتصنيفات وبيانات التواصل." />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <Tabs defaultValue="products">
          <TabsList>
            <TabsTrigger value="products">المنتجات</TabsTrigger>
            <TabsTrigger value="categories">التصنيفات</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-6 space-y-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <Button key={c.id} variant="outline" className="rounded-full" onClick={() => addProduct(c.id)}>
                  <Plus className="size-4" /> منتج في {c.name}
                </Button>
              ))}
              <Button variant="ghost" className="rounded-full" onClick={() => { resetCatalog(); toast.success("تمت الاستعادة"); }}>
                <RotateCcw className="size-4" /> استعادة المنيو الأصلي
              </Button>
            </div>

            <div className="space-y-3">
              {products.map((p) => (
                <div key={p.id} className="grid gap-4 rounded-2xl border border-border/70 bg-card p-4 shadow-soft lg:grid-cols-[96px_1fr]">
                  <img src={p.image} alt={p.name} className="size-24 rounded-xl object-cover" />
                  <div className="space-y-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <Label>الاسم</Label>
                        <Input className="mt-1" value={p.name} onChange={(e) => update(p.id, { name: e.target.value })} />
                      </div>
                      <div>
                        <Label>الوصف</Label>
                        <Input className="mt-1" value={p.description} onChange={(e) => update(p.id, { description: e.target.value })} />
                      </div>
                      <div className="sm:col-span-2">
                        <Label>رابط الصورة</Label>
                        <Input className="mt-1" value={p.image} onChange={(e) => update(p.id, { image: e.target.value })} />
                      </div>
                    </div>

                    {p.sizes?.length ? (
                      <div className="grid grid-cols-3 gap-3">
                        {p.sizes.map((s) => (
                          <div key={s.key}>
                            <Label>{s.label}</Label>
                            <Input
                              className="mt-1"
                              type="number"
                              value={s.price}
                              onChange={(e) => updateSize(p.id, s.key, Number(e.target.value))}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="max-w-40">
                        <Label>السعر</Label>
                        <Input
                          className="mt-1"
                          type="number"
                          value={p.price ?? 0}
                          onChange={(e) => update(p.id, { price: Number(e.target.value) })}
                        />
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-5">
                      {([
                        ["active", "ظاهر"],
                        ["featured", "مميز"],
                        ["bestSeller", "الأكثر طلبًا"],
                        ["offer", "عرض"],
                      ] as const).map(([key, label]) => (
                        <label key={key} className="flex items-center gap-2 text-sm font-medium">
                          <Switch checked={p[key]} onCheckedChange={(v) => update(p.id, { [key]: v })} />
                          {label}
                        </label>
                      ))}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ms-auto text-destructive"
                        onClick={() => setProducts(products.filter((x) => x.id !== p.id))}
                      >
                        <Trash2 className="size-4" /> حذف
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories" className="mt-6 space-y-4">
            <div className="flex max-w-md gap-2">
              <Input value={newCat} onChange={(e) => setNewCat(e.target.value)} placeholder="اسم تصنيف جديد" />
              <Button
                onClick={() => {
                  if (!newCat.trim()) return;
                  setCategories([
                    ...categories,
                    { id: `cat-${Date.now()}`, name: newCat.trim(), image: products[0]?.image ?? "", active: true },
                  ]);
                  setNewCat("");
                }}
              >
                إضافة
              </Button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {categories.map((c) => (
                <div key={c.id} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4">
                  <Input value={c.name} onChange={(e) => setCategories(categories.map((x) => (x.id === c.id ? { ...x, name: e.target.value } : x)))} />
                  <Switch checked={c.active} onCheckedChange={(v) => setCategories(categories.map((x) => (x.id === c.id ? { ...x, active: v } : x)))} />
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => setCategories(categories.filter((x) => x.id !== c.id))}>
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-6 max-w-xl space-y-4">
            <div>
              <Label>رقم واتساب الطلبات (بصيغة دولية بدون +)</Label>
              <Input className="mt-1" value={settings.whatsapp} onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })} placeholder="9665xxxxxxxx" />
            </div>
            <div>
              <Label>رقم التواصل</Label>
              <Input className="mt-1" value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} />
            </div>
            <div>
              <Label>إنستقرام</Label>
              <Input className="mt-1" value={settings.instagram} onChange={(e) => setSettings({ ...settings, instagram: e.target.value })} />
            </div>
            <div>
              <Label>ساعات العمل</Label>
              <Input className="mt-1" value={settings.hours} onChange={(e) => setSettings({ ...settings, hours: e.target.value })} />
            </div>
            <div>
              <Label>الفروع (افصل بينها بفاصلة)</Label>
              <Input
                className="mt-1"
                value={settings.branches.join("، ")}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    branches: e.target.value.split(/[،,]/).map((s) => s.trim()).filter(Boolean),
                  })
                }
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
