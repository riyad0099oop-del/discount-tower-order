import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Instagram, Facebook } from "lucide-react";
import logoFull from "@/assets/logo-full.png";
import { DoughCurveDecor, FlourDecor } from "@/components/site/Decorations";
import { useStore } from "@/lib/store";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-1.13 4.54-3.15 5.76-2.02 1.22-4.7 1.34-6.83.33-2.13-1.01-3.69-3.04-3.99-5.38-.3-2.34.42-4.8 2.08-6.42 1.66-1.61 4.13-2.32 6.4-1.95v4.06c-1.39-.23-2.92-.04-4.09.81-1.17.85-1.74 2.38-1.5 3.81.24 1.43 1.36 2.65 2.75 3.12 1.39.47 3.03.3 4.23-.55 1.2-.85 1.83-2.3 1.79-3.79-.06-3.82-.01-7.64-.01-11.46Z"/>
  </svg>
);

export function Footer() {
  const { settings } = useStore();
  const { t } = useTranslation();
  const ph = (v: string, fallback: string) => (v ? v : fallback);

  return (
    <footer className="relative mt-20 bg-cocoa text-cocoa-foreground overflow-hidden border-t-4 border-primary">
      <DoughCurveDecor className="absolute bottom-[-20%] end-[-10%] w-[80%] h-[120%] text-white opacity-15 pointer-events-none" />
      <FlourDecor className="absolute top-10 start-10 size-64 text-white opacity-20 pointer-events-none hidden sm:block" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="inline-flex rounded-xl bg-background p-3">
            <img
              src={logoFull}
              alt="برج التخفيضات"
              className="h-12 w-auto"
            />
          </div>
          <p className="mt-4 max-w-sm text-sm leading-7 opacity-80">
            بيتزا ومناقيش طازجة تُحضّر يوميًا بمكونات مختارة، بطعم يستاهل ترجع له.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a href="https://www.tiktok.com/@d.t.ksa1?_r=1&_t=ZS-98pOm8OfChr" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="grid size-10 place-items-center rounded-full bg-white/10 text-white hover:bg-primary hover:text-primary-foreground transition-all shadow-sm">
              <TikTokIcon className="size-5" />
            </a>
            <a href="https://www.instagram.com/d.t.ksa1?igsh=MTJvYWh5OGY4c2k5eg==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid size-10 place-items-center rounded-full bg-white/10 text-white hover:bg-primary hover:text-primary-foreground transition-all shadow-sm">
              <Instagram className="size-5" />
            </a>
            <a href="https://www.facebook.com/share/1DNqkQgg3T/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid size-10 place-items-center rounded-full bg-white/10 text-white hover:bg-primary hover:text-primary-foreground transition-all shadow-sm">
              <Facebook className="size-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-base font-bold">روابط</h3>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            <li>
              <Link to="/menu" className="hover:opacity-100">
                {t('menu')}
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:opacity-100">
                {t('about')}
              </Link>
            </li>
            <li>
              <Link to="/branches" className="hover:opacity-100">
                {t('branches')}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:opacity-100">
                {t('contact')}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-base font-bold">تواصل</h3>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            <li>رقم التواصل: 0548392988</li>
            <li>واتساب: 0548392988</li>
            <li>ساعات العمل: من 8 صباحاً إلى 2 بعد منتصف الليل</li>
            <li>
              الفروع: مكة المكرمة بمنطقة العزيزية الشمالية
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs opacity-70">
        © {new Date().getFullYear()} بيتزا برج التخفيضات — جميع الحقوق محفوظة
      </div>
    </footer>
  );
}
