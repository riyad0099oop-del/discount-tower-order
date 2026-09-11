import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  ar: {
    translation: {
      // General
      'home': 'الرئيسية',
      'menu': 'المنيو',
      'offers': 'العروض',
      'about': 'من نحن',
      'branches': 'الفروع',
      'contact': 'تواصل معنا',
      'order_now': 'اطلب الآن',
      
      // Cart
      'cart': 'السلة',
      'add_to_cart': 'إضافة للسلة',
      'cart_empty': 'سلتك فارغة',
      'total': 'الإجمالي',
      'currency': 'ر.س',
      'notes': 'ملاحظات (اختياري)',
      'quantity': 'الكمية',
      'choose_size': 'اختر الحجم',
      
      // Home specific
      'hero_title_1': 'الطعم الذي',
      'hero_title_highlight': 'يستاهل',
      'hero_title_2': 'ترجع له',
      'hero_desc': 'بيتزا ومناقيش طازجة، نجهزها لك بالمذاق الذي تحبه وبكل اهتمام.',
      'explore_menu': 'استعرض المنيو',
      
      'tower_picks': 'اختيارات البرج',
      'starts_from': 'يبدأ من',
      
      'choose_from': 'اختر من',
      'click_to_explore': 'اضغط للاستكشاف',
      'click_to_enter': 'اضغط للدخول',
      'explore': 'استكشف',
      
      'from_menu': 'من المنيو',
      'view_full_menu': 'عرض المنيو كاملًا',
      
      'offers_title': 'عروض تستاهل التجربة',
      'offers_desc': 'اكتشف عروض برج التخفيضات وخيارات تناسب كل طلب، لتستمتع بأفضل مذاق بأفضل قيمة.',
      'view_offers': 'شاهد العروض',
      
      'brand_story_title': 'الفرق يبدأ من التفاصيل',
      'fresh_ingredients': 'مكونات طازجة',
      'fresh_ingredients_desc': 'نختار الخضروات والأجبان يوميًا بأعلى معايير الجودة لنضمن لك طعماً أصيلاً.',
      'daily_prep': 'تحضير يومي',
      'daily_prep_desc': 'عجينتنا تُعجن وتُخبز يوميًا، لتصلك هشة، ساخنة ولذيذة في كل طلب.',
      'for_everyone': 'خيارات تناسب الجميع',
      'for_everyone_desc': 'من البيتزا الكلاسيكية إلى المناقيش المتنوعة، صممنا منيو يرضي كل الأذواق.',
      
      'cta_title': 'طلبك أقرب مما تتوقع',
      'cta_desc': 'اختر طلبك المفضل، أضفه للسلة، وخلي الباقي علينا. تجربة سهلة وسريعة.',

      // Menu specific
      'menu_title': 'المنيو',
      'menu_desc': 'اختر طلبك المفضل وخصصه بالطريقة التي تحبها.',
      'search_placeholder': 'ابحث عن منتج...',
      'no_results': 'لا توجد نتائج مطابقة للبحث.',

      // Settings/Misc
      'best_seller': 'الأكثر طلبًا',
      'sar': 'ر.س',
    }
  },
  en: {
    translation: {
      // General
      'home': 'Home',
      'menu': 'Menu',
      'offers': 'Offers',
      'about': 'About Us',
      'branches': 'Branches',
      'contact': 'Contact',
      'order_now': 'Order Now',
      
      // Cart
      'cart': 'Cart',
      'add_to_cart': 'Add to Cart',
      'cart_empty': 'Your cart is empty',
      'total': 'Total',
      'currency': 'SAR',
      'notes': 'Notes (Optional)',
      'quantity': 'Quantity',
      'choose_size': 'Choose Size',
      
      // Home specific
      'hero_title_1': 'The Taste',
      'hero_title_highlight': 'Worth',
      'hero_title_2': 'Coming Back For',
      'hero_desc': 'Fresh pizza and manakish, prepared just the way you love it, with care.',
      'explore_menu': 'Explore Menu',
      
      'tower_picks': 'Tower Picks',
      'starts_from': 'Starts from',
      
      'choose_from': 'Choose from',
      'click_to_explore': 'Tap to explore',
      'click_to_enter': 'Tap to enter',
      'explore': 'Explore',
      
      'from_menu': 'From the Menu',
      'view_full_menu': 'View Full Menu',
      
      'offers_title': 'Offers Worth Trying',
      'offers_desc': 'Discover Discount Tower offers and options that fit every order, so you can enjoy the best taste at the best value.',
      'view_offers': 'View Offers',
      
      'brand_story_title': 'The Difference is in the Details',
      'fresh_ingredients': 'Fresh Ingredients',
      'fresh_ingredients_desc': 'We select vegetables and cheeses daily with the highest quality standards to guarantee an authentic taste.',
      'daily_prep': 'Daily Preparation',
      'daily_prep_desc': 'Our dough is kneaded and baked daily, so it reaches you fluffy, hot, and delicious in every order.',
      'for_everyone': 'Options for Everyone',
      'for_everyone_desc': 'From classic pizzas to various manakish, we designed a menu to satisfy all tastes.',
      
      'cta_title': 'Your Order is Closer Than You Think',
      'cta_desc': 'Choose your favorite order, add it to the cart, and leave the rest to us. An easy and fast experience.',

      // Menu specific
      'menu_title': 'Menu',
      'menu_desc': 'Choose your favorite order and customize it the way you like.',
      'search_placeholder': 'Search for a product...',
      'no_results': 'No matching results found.',

      // Settings/Misc
      'best_seller': 'Best Seller',
      'sar': 'SAR',
    }
  }
};

const isBrowser = typeof window !== 'undefined';

if (isBrowser) {
  i18n.use(LanguageDetector);
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar',
    supportedLngs: ['ar', 'en'],
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: isBrowser ? {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    } : undefined
  });

export default i18n;
