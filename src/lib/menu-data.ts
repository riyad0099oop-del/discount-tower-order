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

export type SizeKey = "S" | "M" | "L";

export type ProductSize = {
  key: SizeKey;
  label: string;
  price: number;
};

export type Product = {
  id: string;
  name: string;
  description: string;
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
  name: string;
  image: string;
  active: boolean;
};

export const defaultCategories: Category[] = [
  { id: "pizza", name: "البيتزا", image: pizzaSpecial, active: true },
  { id: "manakish", name: "المناقيش", image: manZaatar, active: true },
];

const S = (s: number, m: number, l: number): ProductSize[] => [
  { key: "S", label: "صغير", price: s },
  { key: "M", label: "وسط", price: m },
  { key: "L", label: "كبير", price: l },
];

export const defaultProducts: Product[] = [
  {
    id: "pizza-ranch",
    name: "بيتزا رانش",
    description: "دجاج مشوي وصلصة رانش وجبن موزاريلا",
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
    name: "بيتزا باربكيو",
    description: "صلصة باربكيو مدخنة مع دجاج وجبن",
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
    name: "بيتزا أجبان",
    description: "خلطة أجبان غنية وذائبة",
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
    name: "بيتزا ببروني",
    description: "شرائح ببروني مع موزاريلا وصلصة الطماطم",
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
    name: "بيتزا دجاج",
    description: "قطع دجاج متبلة مع جبن طازج",
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
    name: "بيتزا لحم",
    description: "لحم بقري مع بصل وجبن",
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
    name: "بيتزا تونة",
    description: "تونة مع زيتون وبصل",
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
    name: "بيتزا نقانق",
    description: "شرائح نقانق مع جبن موزاريلا",
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
    name: "بيتزا خضار",
    description: "فلفل وزيتون وفطر وطماطم",
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
    name: "بيتزا مارغريتا",
    description: "الكلاسيكية: طماطم وجبن وريحان",
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
    name: "عش البلبل بالعسل",
    description: "أطراف محشوة بالجبن مع لمسة عسل",
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
    name: "بيتزا سبيشل",
    description: "خلطة برج التخفيضات الخاصة",
    image: pizzaSpecial,
    category: "pizza",
    sizes: [
      { key: "M", label: "وسط", price: 23 },
      { key: "L", label: "كبير", price: 30 },
    ],
    active: true,
    featured: true,
    bestSeller: true,
    offer: false,
  },
];

type ManakishSeed = [string, string, number, string, boolean];

const manakishSeed: ManakishSeed[] = [
  ["جبنة سائلة مقفلة", "منقوشة مقفلة بجبنة سائلة", 10, manCheese, false],
  ["لبنة سادة", "لبنة طازجة مع زيت الزيتون", 10, manLabneh, false],
  ["لبنة جبن", "لبنة مع جبن موزاريلا", 13, manLabneh, false],
  ["لبنة زعتر أو زيتون", "لبنة مع زعتر أو زيتون", 13, manLabneh, false],
  ["مشكل أجبان", "خلطة أجبان مشكلة", 13, manCheese, true],
  ["جبنة شيدر", "جبنة شيدر ذائبة", 10, manCheese, false],
  ["جبنة موزاريلا", "موزاريلا طازجة", 10, manCheese, false],
  ["لبنة عسل", "لبنة مع عسل طبيعي", 13, manLabneh, false],
  ["جبنة زعتر أو زيتون", "جبن مع زعتر أو زيتون", 13, manZaatar, false],
  ["نوتيلا", "نوتيلا غنية على عجينة طازجة", 10, manNutella, false],
  ["زعتر سادة", "زعتر بلدي وزيت زيتون", 8, manZaatar, false],
  ["بيض بالجبن", "بيض طازج مع جبن", 13, manCheese, false],
  ["سبانخ", "سبانخ بالليمون والبصل", 10, manSpinach, false],
  ["سبانخ بالجبن", "سبانخ مع جبن ذائب", 13, manSpinach, false],
  ["لحم بالعجين", "لحم بالعجين على الطريقة البلدية", 10, manMeat, false],
  ["لحم بالجبن", "لحم مع جبن موزاريلا", 13, manMeat, false],
  ["دجاج سادة", "دجاج متبل طازج", 10, manChicken, false],
  ["دجاج بالجبن", "دجاج مع جبن ذائب", 13, manChicken, true],
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
  whatsapp: "",
  phone: "",
  instagram: "",
  hours: "",
  branches: [],
};
