import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useStore } from "@/lib/store";
import { localize } from "@/lib/menu-data";

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQty, removeItem, cartTotal } = useStore();
  const isMobile = useIsMobile();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const cartContent =
    cart.length === 0 ? (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center min-h-[40vh]">
        <ShoppingBag className="size-16 text-muted-foreground opacity-50" />
        <p className="text-lg font-bold text-muted-foreground mt-4">{t('cart_empty')}</p>
        <Button
          asChild
          onClick={() => setCartOpen(false)}
          className="rounded-full mt-2 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground font-bold shadow-none"
        >
          <Link to="/menu">{t('explore_menu')}</Link>
        </Button>
      </div>
    ) : (
      <>
        <div className="flex-1 space-y-3 overflow-y-auto p-4 sm:p-6 no-scrollbar">
          {cart.map((item) => (
            <div
              key={item.key}
              className="flex gap-4 rounded-2xl border border-border/50 bg-card p-3 shadow-sm relative group overflow-hidden"
            >
              <div className="relative size-20 sm:size-24 shrink-0 rounded-[1rem] bg-cream overflow-hidden">
                <img
                  src={item.image}
                  alt={localize(item.name, lang)}
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1 flex flex-col justify-between py-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="truncate font-black text-base sm:text-lg text-foreground">
                      {localize(item.name, lang)}
                    </h4>
                    {item.sizeLabel && (
                      <p className="text-xs font-bold text-muted-foreground mt-0.5">
                        {localize(item.sizeLabel, lang)}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => removeItem(item.key)}
                    className="text-muted-foreground hover:text-destructive transition-colors bg-surface p-2 rounded-full border border-transparent hover:border-destructive/20 hover:bg-destructive/10"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>

                {item.notes && (
                  <p className="truncate text-xs text-muted-foreground">{item.notes}</p>
                )}

                <div className="mt-3 flex items-center justify-between">
                  <span className="font-black text-lg text-primary">
                    {item.unitPrice * item.qty} <span className="text-xs">{t('sar')}</span>
                  </span>

                  <div className="flex items-center gap-1 rounded-full border border-border/50 bg-surface shadow-sm">
                    <button
                      className="grid size-8 place-items-center hover:text-primary transition-colors"
                      onClick={() => updateQty(item.key, item.qty - 1)}
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="w-6 text-center text-sm font-black">{item.qty}</span>
                    <button
                      className="grid size-8 place-items-center hover:text-primary transition-colors"
                      onClick={() => updateQty(item.key, item.qty + 1)}
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4 border-t border-border/50 bg-surface p-6 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-end text-lg font-black">
            <span className="text-muted-foreground">{t('total')}:</span>
            <span className="text-2xl text-primary">
              {cartTotal} <span className="text-sm text-foreground">{t('sar')}</span>
            </span>
          </div>
          <Button
            asChild
            size="lg"
            className="h-16 w-full rounded-full text-xl font-bold bg-primary text-primary-foreground shadow-xl shadow-primary/25 hover:scale-[1.02] transition-transform"
            onClick={() => setCartOpen(false)}
          >
            <Link to="/checkout">{t('order_now')}</Link>
          </Button>
        </div>
      </>
    );

  if (isMobile) {
    return (
      <Drawer open={cartOpen} onOpenChange={setCartOpen}>
        <DrawerContent className="max-h-[90vh] flex flex-col p-0">
          <DrawerTitle className="border-b border-border/50 px-6 py-5 text-xl font-black text-center">
            {t('cart')}
          </DrawerTitle>
          {cartContent}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side={lang === 'ar' ? 'left' : 'right'} className="flex w-full flex-col p-0 sm:max-w-[450px]">
        <SheetTitle className="border-b border-border/50 px-6 py-6 text-2xl font-black">
          {t('cart')}
        </SheetTitle>
        {cartContent}
      </SheetContent>
    </Sheet>
  );
}

export function MobileCartBar() {
  const { cartCount, cartTotal, setCartOpen } = useStore();
  const { t } = useTranslation();
  if (cartCount === 0) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 p-4 lg:hidden">
      <button
        onClick={() => setCartOpen(true)}
        className="flex w-full items-center justify-between rounded-[2rem] bg-primary px-6 py-5 text-primary-foreground shadow-2xl shadow-primary/30 transition-transform active:scale-95"
      >
        <div className="flex items-center gap-3">
          <div className="relative grid place-items-center bg-white/20 rounded-full size-12">
            <ShoppingBag className="size-6" />
            <span className="absolute -top-1 -end-1 flex size-5 items-center justify-center rounded-full bg-white text-xs font-black text-primary shadow-sm">
              {cartCount}
            </span>
          </div>
        </div>
        <span className="text-lg font-black">{cartTotal} {t('sar')}</span>
        <span className="font-bold bg-white/20 px-4 py-2 rounded-full text-sm">{t('cart')}</span>
      </button>
    </div>
  );
}
