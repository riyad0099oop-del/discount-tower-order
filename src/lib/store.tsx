import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  defaultCategories,
  defaultProducts,
  defaultSettings,
  type Category,
  type Product,
  type Settings,
} from "./menu-data";

export type CartItem = {
  key: string;
  productId: string;
  name: string;
  image: string;
  sizeKey?: string | undefined;
  sizeLabel?: string | undefined;
  unitPrice: number;
  qty: number;
  notes?: string | undefined;
};

type StoreValue = {
  products: Product[];
  categories: Category[];
  settings: Settings;
  setProducts: (p: Product[]) => void;
  setCategories: (c: Category[]) => void;
  setSettings: (s: Settings) => void;
  resetCatalog: () => void;
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "key">) => void;
  updateQty: (key: string, qty: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProducts(load("dt_products", defaultProducts));
    setCategories(load("dt_categories", defaultCategories));
    setSettings(load("dt_settings", defaultSettings));
    setCart(load<CartItem[]>("dt_cart", []));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem("dt_products", JSON.stringify(products));
  }, [products, ready]);
  useEffect(() => {
    if (ready) localStorage.setItem("dt_categories", JSON.stringify(categories));
  }, [categories, ready]);
  useEffect(() => {
    if (ready) localStorage.setItem("dt_settings", JSON.stringify(settings));
  }, [settings, ready]);
  useEffect(() => {
    if (ready) localStorage.setItem("dt_cart", JSON.stringify(cart));
  }, [cart, ready]);

  const value = useMemo<StoreValue>(() => {
    const cartCount = cart.reduce((n, i) => n + i.qty, 0);
    const cartTotal = cart.reduce((n, i) => n + i.qty * i.unitPrice, 0);
    return {
      products,
      categories,
      settings,
      setProducts,
      setCategories,
      setSettings,
      resetCatalog: () => {
        setProducts(defaultProducts);
        setCategories(defaultCategories);
      },
      cart,
      cartCount,
      cartTotal,
      cartOpen,
      setCartOpen,
      addToCart: (item) => {
        const key = `${item.productId}__${item.sizeKey ?? "one"}__${item.notes ?? ""}`;
        setCart((prev) => {
          const found = prev.find((i) => i.key === key);
          if (found) {
            return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + item.qty } : i));
          }
          return [...prev, { ...item, key }];
        });
      },
      updateQty: (key, qty) =>
        setCart((prev) =>
          qty <= 0
            ? prev.filter((i) => i.key !== key)
            : prev.map((i) => (i.key === key ? { ...i, qty } : i)),
        ),
      removeItem: (key) => setCart((prev) => prev.filter((i) => i.key !== key)),
      clearCart: () => setCart([]),
    };
  }, [products, categories, settings, cart, cartOpen]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
