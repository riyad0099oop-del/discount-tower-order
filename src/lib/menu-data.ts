import pizzaRanch from "@/assets/pizza-ranch.jpg";
import pizzaBbq from "@/assets/pizza-bbq.jpg";
import pizzaCheese from "@/assets/pizza-cheese.jpg";
import pizzaPepperoni from "@/assets/pizza-pepperoni.jpg";
import pizzaMeat from "@/assets/pizza-meat.jpg";
import pizzaTuna from "@/assets/pizza-tuna.jpg";
import pizzaSausage from "@/assets/pizza-sausage.jpg";
import pizzaVeg from "@/assets/pizza-veg.jpg";
import pizzaMargherita from "@/assets/pizza-margherita.jpg";
import pizzaHoney from "@/assets/pizza-honey.jpg";
import pizzaSpecial from "@/assets/pizza-special.jpg";
import manCheese from "@/assets/man-cheese.jpg";
import manZaatar from "@/assets/man-zaatar.jpg";
import manLabneh from "@/assets/man-labneh.jpg";
import manMeat from "@/assets/man-meat.jpg";
import manChicken from "@/assets/man-chicken.jpg";
import manNutella from "@/assets/man-nutella.jpg";
import manSpinach from "@/assets/man-spinach.jpg";
import sandwich from "@/assets/sandwich.jpg";

export type SizeKey = "S" | "M" | "L";

export type LocalizedString = { ar: string; en: string };

export type ProductSize = {
  key: SizeKey;
  label: LocalizedString;
  price: number;
};

export type Product = {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  image: string;
  category: string;
  sizes?: ProductSize[];
  price?: number;
  active: boolean;
  featured: boolean;
  bestSeller: boolean;
  offer: boolean;
};

export type Category = {
  id: string;
  name: LocalizedString;
  image: string;
  active: boolean;
};

export const defaultCategories: Category[] = [
  { id: "pizza", name: { ar: "البيتزا", en: "Pizza" }, image: pizzaSpecial, active: true },
  { id: "manakish", name: { ar: "المناقيش", en: "Manakish" }, image: manZaatar, active: true },
  { id: "sandwiches", name: { ar: "السيندويتشات", en: "Sandwiches" }, image: sandwich, active: true },
];

const S = (s: number, m: number, l: number): ProductSize[] => [
  { key: "S", label: { ar: "صغير", en: "Small" }, price: s },
  { key: "M", label: { ar: "وسط", en: "Medium" }, price: m },
  { key: "L", label: { ar: "كبير", en: "Large" }, price: l },
];

export const defaultProducts: Product[] = [
  {
    id: "pizza-ranch",
    name: { ar: "بيتزا رانش", en: "Ranch Pizza" },
    description: { ar: "دجاج مشوي وصلصة رانش وجبن موزاريلا", en: "Grilled chicken, ranch sauce, and mozzarella cheese" },
    image: pizzaRanch,
    category: "pizza",
    sizes: S(13, 20, 28),
    active: true,
    featured: true,
    bestSeller: true,
    offer: false,
  },
  {
    id: "pizza-bbq",
    name: { ar: "بيتزا باربكيو", en: "BBQ Pizza" },
    description: { ar: "صلصة باربكيو مدخنة مع دجاج وجبن", en: "Smoked BBQ sauce with chicken and cheese" },
    image: pizzaBbq,
    category: "pizza",
    sizes: S(13, 20, 28),
    active: true,
    featured: true,
    bestSeller: false,
    offer: false,
  },
  {
    id: "pizza-cheese",
    name: { ar: "بيتزا أجبان", en: "Cheese Pizza" },
    description: { ar: "خلطة أجبان غنية وذائبة", en: "Rich and melted cheese mix" },
    image: pizzaCheese,
    category: "pizza",
    sizes: S(13, 20, 28),
    active: true,
    featured: true,
    bestSeller: false,
    offer: false,
  },
  {
    id: "pizza-pepperoni",
    name: { ar: "بيتزا ببروني", en: "Pepperoni Pizza" },
    description: { ar: "شرائح ببروني مع موزاريلا وصلصة الطماطم", en: "Pepperoni slices with mozzarella and tomato sauce" },
    image: pizzaPepperoni,
    category: "pizza",
    sizes: S(13, 20, 28),
    active: true,
    featured: true,
    bestSeller: true,
    offer: false,
  },
  {
    id: "pizza-chicken",
    name: { ar: "بيتزا دجاج", en: "Chicken Pizza" },
    description: { ar: "قطع دجاج متبلة مع جبن طازج", en: "Marinated chicken pieces with fresh cheese" },
    image: pizzaRanch,
    category: "pizza",
    sizes: S(13, 20, 28),
    active: true,
    featured: true,
    bestSeller: true,
    offer: false,
  },
  {
    id: "pizza-meat",
    name: { ar: "بيتزا لحم", en: "Meat Pizza" },
    description: { ar: "لحم بقري مع بصل وجبن", en: "Beef with onions and cheese" },
    image: pizzaMeat,
    category: "pizza",
    sizes: S(13, 19, 25),
    active: true,
    featured: true,
    bestSeller: false,
    offer: false,
  },
  {
    id: "pizza-tuna",
    name: { ar: "بيتزا تونة", en: "Tuna Pizza" },
    description: { ar: "تونة مع زيتون وبصل", en: "Tuna with olives and onions" },
    image: pizzaTuna,
    category: "pizza",
    sizes: S(13, 19, 25),
    active: true,
    featured: false,
    bestSeller: false,
    offer: false,
  },
  {
    id: "pizza-sausage",
    name: { ar: "بيتزا نقانق", en: "Sausage Pizza" },
    description: { ar: "شرائح نقانق مع جبن موزاريلا", en: "Sausage slices with mozzarella cheese" },
    image: pizzaSausage,
    category: "pizza",
    sizes: S(13, 19, 25),
    active: true,
    featured: false,
    bestSeller: false,
    offer: false,
  },
  {
    id: "pizza-veg",
    name: { ar: "بيتزا خضار", en: "Vegetable Pizza" },
    description: { ar: "فلفل وزيتون وفطر وطماطم", en: "Bell pepper, olives, mushrooms, and tomatoes" },
    image: pizzaVeg,
    category: "pizza",
    sizes: S(13, 19, 25),
    active: true,
    featured: false,
    bestSeller: false,
    offer: false,
  },
  {
    id: "pizza-margherita",
    name: { ar: "بيتزا مارغريتا", en: "Margherita Pizza" },
    description: { ar: "الكلاسيكية: طماطم وجبن وريحان", en: "Classic: Tomato, cheese, and basil" },
    image: pizzaMargherita,
    category: "pizza",
    sizes: S(13, 19, 25),
    active: true,
    featured: false,
    bestSeller: false,
    offer: false,
  },
  {
    id: "pizza-honey",
    name: { ar: "عش البلبل بالعسل", en: "Osh El Bulbul with Honey" },
    description: { ar: "أطراف محشوة بالجبن مع لمسة عسل", en: "Cheese-stuffed crust with a touch of honey" },
    image: pizzaHoney,
    category: "pizza",
    sizes: S(13, 19, 25),
    active: true,
    featured: false,
    bestSeller: false,
    offer: false,
  },
  {
    id: "pizza-special",
    name: { ar: "بيتزا سبيشل", en: "Special Pizza" },
    description: { ar: "خلطة برج التخفيضات الخاصة", en: "Discount Tower Special Mix" },
    image: pizzaSpecial,
    category: "pizza",
    sizes: [
      { key: "M", label: { ar: "وسط", en: "Medium" }, price: 23 },
      { key: "L", label: { ar: "كبير", en: "Large" }, price: 30 },
    ],
    active: true,
    featured: true,
    bestSeller: true,
    offer: false,
  },
];

type ManakishSeed = [LocalizedString, LocalizedString, number, string, boolean];

const manakishSeed: ManakishSeed[] = [
  [{ ar: "جبنة سائلة مقفلة", en: "Closed Liquid Cheese" }, { ar: "منقوشة مقفلة بجبنة سائلة", en: "Closed manousheh with liquid cheese" }, 10, manCheese, false],
  [{ ar: "لبنة سادة", en: "Plain Labneh" }, { ar: "لبنة طازجة مع زيت الزيتون", en: "Fresh labneh with olive oil" }, 10, manLabneh, false],
  [{ ar: "لبنة جبن", en: "Labneh & Cheese" }, { ar: "لبنة مع جبن موزاريلا", en: "Labneh with mozzarella cheese" }, 13, manLabneh, false],
  [{ ar: "لبنة زعتر أو زيتون", en: "Labneh with Thyme or Olives" }, { ar: "لبنة مع زعتر أو زيتون", en: "Labneh with thyme or olives" }, 13, manLabneh, false],
  [{ ar: "مشكل أجبان", en: "Mixed Cheese" }, { ar: "خلطة أجبان مشكلة", en: "Mixed cheese blend" }, 13, manCheese, true],
  [{ ar: "جبنة شيدر", en: "Cheddar Cheese" }, { ar: "جبنة شيدر ذائبة", en: "Melted cheddar cheese" }, 10, manCheese, false],
  [{ ar: "جبنة موزاريلا", en: "Mozzarella Cheese" }, { ar: "موزاريلا طازجة", en: "Fresh mozzarella" }, 10, manCheese, false],
  [{ ar: "لبنة عسل", en: "Labneh & Honey" }, { ar: "لبنة مع عسل طبيعي", en: "Labneh with natural honey" }, 13, manLabneh, false],
  [{ ar: "جبنة زعتر أو زيتون", en: "Cheese with Thyme or Olives" }, { ar: "جبن مع زعتر أو زيتون", en: "Cheese with thyme or olives" }, 13, manZaatar, false],
  [{ ar: "نوتيلا", en: "Nutella" }, { ar: "نوتيلا غنية على عجينة طازجة", en: "Rich Nutella on fresh dough" }, 10, manNutella, false],
  [{ ar: "زعتر سادة", en: "Plain Thyme" }, { ar: "زعتر بلدي وزيت زيتون", en: "Local thyme and olive oil" }, 8, manZaatar, false],
  [{ ar: "بيض بالجبن", en: "Eggs with Cheese" }, { ar: "بيض طازج مع جبن", en: "Fresh eggs with cheese" }, 13, manCheese, false],
  [{ ar: "سبانخ", en: "Spinach" }, { ar: "سبانخ بالليمون والبصل", en: "Spinach with lemon and onions" }, 10, manSpinach, false],
  [{ ar: "سبانخ بالجبن", en: "Spinach with Cheese" }, { ar: "سبانخ مع جبن ذائب", en: "Spinach with melted cheese" }, 13, manSpinach, false],
  [{ ar: "لحم بالعجين", en: "Meat on Dough (Sfiha)" }, { ar: "لحم بالعجين على الطريقة البلدية", en: "Traditional local meat on dough" }, 10, manMeat, false],
  [{ ar: "لحم بالجبن", en: "Meat with Cheese" }, { ar: "لحم مع جبن موزاريلا", en: "Meat with mozzarella cheese" }, 13, manMeat, false],
  [{ ar: "دجاج سادة", en: "Plain Chicken" }, { ar: "دجاج متبل طازج", en: "Fresh marinated chicken" }, 10, manChicken, false],
  [{ ar: "دجاج بالجبن", en: "Chicken with Cheese" }, { ar: "دجاج مع جبن ذائب", en: "Chicken with melted cheese" }, 13, manChicken, true],
];

manakishSeed.forEach(([name, description, price, image, bestSeller], i) => {
  defaultProducts.push({
    id: `manakish-${i + 1}`,
    name,
    description,
    image,
    category: "manakish",
    price,
    active: true,
    featured: i < 6,
    bestSeller,
    offer: false,
  });
});

type SandwichSeed = [LocalizedString, LocalizedString, number, string, boolean];

const sandwichesSeed: SandwichSeed[] = [
  [{ ar: "جبن شيدر", en: "Cheddar Cheese" }, { ar: "ساندويتش جبن شيدر", en: "Cheddar cheese sandwich" }, 0, sandwich, false],
  [{ ar: "جبن ابيض", en: "White Cheese" }, { ar: "ساندويتش جبن ابيض طازج", en: "Fresh white cheese sandwich" }, 0, sandwich, false],
  [{ ar: "جبن موزريلا", en: "Mozzarella Cheese" }, { ar: "ساندويتش جبن موزريلا", en: "Mozzarella cheese sandwich" }, 0, sandwich, false],
  [{ ar: "جبن سائل", en: "Liquid Cheese" }, { ar: "ساندويتش جبن سائل", en: "Liquid cheese sandwich" }, 0, sandwich, false],
  [{ ar: "لبنه", en: "Labneh" }, { ar: "ساندويتش لبنه", en: "Labneh sandwich" }, 0, sandwich, false],
  [{ ar: "دجاج", en: "Chicken" }, { ar: "ساندويتش دجاج متبل", en: "Marinated chicken sandwich" }, 0, sandwich, true],
  [{ ar: "تونة", en: "Tuna" }, { ar: "ساندويتش تونة", en: "Tuna sandwich" }, 0, sandwich, false],
  [{ ar: "لحم", en: "Meat" }, { ar: "ساندويتش لحم طازج", en: "Fresh meat sandwich" }, 0, sandwich, true],
];

sandwichesSeed.forEach(([name, description, price, image, bestSeller], i) => {
  defaultProducts.push({
    id: `sandwich-${i + 1}`,
    name,
    description,
    image,
    category: "sandwiches",
    price,
    active: true,
    featured: i < 3,
    bestSeller,
    offer: false,
  });
});

export function startingPrice(p: Product): number {
  if (p.price != null) return p.price;
  if (p.sizes?.length) return Math.min(...p.sizes.map((s) => s.price));
  return 0;
}

export type Settings = {
  whatsapp: string;
  phone: string;
  instagram: string;
  hours: string;
  branches: string[];
};

export const defaultSettings: Settings = {
  whatsapp: "966545015408",
  phone: "0545015408",
  instagram: "",
  hours: "",
  branches: [],
};

export function localize(obj: { ar: string; en: string } | string | undefined, lang: string): string {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return lang === "ar" ? obj.ar : obj.en;
}
