import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Product } from "@/lib/menu-data";
import { localize } from "@/lib/menu-data";
import { useStore } from "@/lib/store";

export function ProductSheet({
  product,
  onOpenChange,
}: {
  product: Product | null;
  onOpenChange: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();
  const { addToCart } = useStore();
  const [sizeKey, setSizeKey] = useState<string | undefined>();
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState("");
  
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    if (product) {
      setSizeKey(product.sizes?.[0]?.key);
      setQty(1);
      setNotes("");
    }
  }, [product]);

  if (!product) return null;

  const size = product.sizes?.find((s) => s.key === sizeKey);
  const unitPrice = size?.price ?? product.price ?? 0;
  const total = unitPrice * qty;
  const name = localize(product.name, lang);
  const desc = localize(product.description, lang);

  const submit = () => {
    addToCart({
      productId: product.id,
      name: product.name, // Will be localized when rendered in CartDrawer
      image: product.image,
      sizeKey: size?.key,
      sizeLabel: size?.label,
      unitPrice,
      qty,
      notes: notes.trim() || undefined,
    });
    toast.success(`تمت إضافة ${name} إلى السلة`);
    onOpenChange(false);
  };

  const bodyContent = (
    <div className="flex flex-col h-full bg-surface min-h-0">
      <div className="flex-1 overflow-y-auto min-h-0 no-scrollbar pb-8 relative">
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-cream sm:aspect-[16/9]">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-surface via-transparent to-transparent" />
          <img src={product.image} alt={name} className="size-full object-cover" />
        </div>
        <div className="relative z-20 -mt-6 sm:-mt-10 space-y-6 lg:space-y-8 rounded-t-[2rem] bg-surface px-5 sm:px-8 pt-6 pb-2">
          <div>
            <h2 className="text-3xl font-black text-foreground">{name}</h2>
            {desc && (
              <p className="mt-2 text-muted-foreground">{desc}</p>
            )}
          </div>

          {product.sizes?.length ? (
            <div className="pt-2">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-muted-foreground">
                {t('choose_size')}
              </p>
              <div className="grid grid-cols-3 gap-3">
                {product.sizes.map((s) => {
                  const selected = s.key === sizeKey;
                  return (
                    <button
                      key={s.key}
                      onClick={() => setSizeKey(s.key)}
                      className={`flex flex-col items-center justify-center rounded-2xl border-2 p-3 sm:p-4 text-center transition-all duration-200 ${
                        selected
                          ? "border-primary bg-primary/5 shadow-sm scale-[1.02]"
                          : "border-border/50 bg-card hover:border-primary/30 hover:bg-primary/5"
                      }`}
                    >
                      <span
                        className={`text-xl font-black mb-1 ${selected ? "text-primary" : "text-foreground"}`}
                      >
                        {s.key}
                      </span>
                      <span className="block text-xs sm:text-sm font-bold text-muted-foreground mb-1">
                        {localize(s.label, lang)}
                      </span>
                      <span
                        className={`block text-base sm:text-lg font-black ${selected ? "text-primary" : "text-foreground"}`}
                      >
                        {s.price} {t('sar')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          <div className="pt-2">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-muted-foreground">
              {t('notes')}
            </p>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px] resize-none rounded-2xl border-border/50 bg-card p-4 text-base focus-visible:ring-primary shadow-sm"
            />
          </div>

          {/* Quantity controller */}
          <div className="pt-2">
            <div className="flex flex-col items-center justify-center rounded-3xl bg-card py-6 border border-border/50 shadow-sm">
              <p className="mb-4 text-sm font-bold text-muted-foreground uppercase tracking-widest">
                {t('quantity')}
              </p>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-12 rounded-full border-border/50 hover:bg-primary/10 hover:text-primary hover:border-primary/30 bg-surface shadow-sm"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  <Minus className="size-5" />
                </Button>
                <span className="w-12 text-center text-3xl font-black text-foreground">{qty}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-12 rounded-full border-border/50 hover:bg-primary/10 hover:text-primary hover:border-primary/30 bg-surface shadow-sm"
                  onClick={() => setQty((q) => q + 1)}
                >
                  <Plus className="size-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="border-t border-border/50 bg-surface p-4 sm:p-6 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] shrink-0 z-50">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col min-w-[80px]">
            {total > 0 && (
              <>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  {t('total')}
                </span>
                <span className="text-2xl font-black text-primary">
                  {total} <span className="text-sm">{t('sar')}</span>
                </span>
              </>
            )}
          </div>
          <Button
            size="lg"
            className="h-14 sm:h-16 flex-1 rounded-full bg-primary text-lg sm:text-xl font-bold text-primary-foreground shadow-xl shadow-primary/25 hover:scale-[1.02] hover:bg-primary/90 transition-all"
            onClick={submit}
          >
            {t('add_to_cart')}
          </Button>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={!!product} onOpenChange={onOpenChange}>
        <DrawerContent className="p-0 h-[92vh] max-h-[92vh] flex flex-col overflow-hidden bg-surface">
          <DrawerTitle className="sr-only">{name}</DrawerTitle>
          {bodyContent}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={!!product} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg overflow-hidden p-0 max-h-[90vh] flex flex-col bg-surface">
        <DialogTitle className="sr-only">{name}</DialogTitle>
        {bodyContent}
      </DialogContent>
    </Dialog>
  );
}
