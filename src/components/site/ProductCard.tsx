import { Plus } from "lucide-react";
import { startingPrice, localize, type Product } from "@/lib/menu-data";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export function ProductCard({
  product,
  onSelect,
  featured = false,
}: {
  product: Product;
  onSelect: (p: Product) => void;
  featured?: boolean;
}) {
  const { t, i18n } = useTranslation();
  const hasSizes = !!product.sizes?.length;
  const name = localize(product.name, i18n.language);
  
  return (
    <article
      onClick={() => onSelect(product)}
      className={`group flex cursor-pointer overflow-hidden rounded-2xl bg-card border border-border/40 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        featured ? "flex-col sm:flex-row sm:col-span-2 lg:col-span-2" : "flex-col"
      }`}
    >
      <div
        className={`relative overflow-hidden bg-cream ${featured ? "w-full sm:w-1/2 aspect-[4/3] sm:aspect-auto" : "w-full aspect-[4/3]"}`}
      >
        <img
          src={product.image}
          alt={name}
          loading="lazy"
          className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.bestSeller && (
          <span className="absolute end-2 top-2 rounded-full bg-primary/90 px-2 py-0.5 text-[10px] sm:text-xs font-bold text-primary-foreground backdrop-blur-sm shadow-sm">
            {t('best_seller')}
          </span>
        )}
      </div>

      <div
        className={`flex flex-col justify-between gap-2 p-3 sm:p-5 ${featured ? "w-full sm:w-1/2 justify-center" : "flex-1"}`}
      >
        <div>
          <h3
            className={`font-black text-foreground leading-tight ${featured ? "text-xl sm:text-2xl lg:text-3xl" : "text-sm sm:text-lg"}`}
          >
            {name}
          </h3>
        </div>

        <div className="mt-1 sm:mt-2 flex items-end justify-between gap-1">
          {startingPrice(product) > 0 ? (
            <div className="flex flex-col">
              {hasSizes && (
                <span className="text-[9px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest mb-0.5">
                  {t('starts_from')}
                </span>
              )}
              <span
                className={`font-black text-primary ${featured ? "text-xl sm:text-2xl" : "text-base sm:text-xl"}`}
              >
                {startingPrice(product)}
              </span>
            </div>
          ) : (
            <div />
          )}
          <Button
            size="icon"
            className="size-7 sm:size-10 shrink-0 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
          >
            <Plus className="size-3.5 sm:size-5" />
          </Button>
        </div>
      </div>
    </article>
  );
}
