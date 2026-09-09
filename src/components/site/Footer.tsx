import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.jpeg.asset.json";
import { DoughCurveDecor, FlourDecor } from "@/components/site/Decorations";
import { useStore } from "@/lib/store";

export function Footer() {
  const { settings } = useStore();
  const ph = (v: string, fallback: string) => (v ? v : fallback);

  return (
    <footer className="relative mt-20 bg-cocoa text-cocoa-foreground overflow-hidden border-t-4 border-primary">
      <DoughCurveDecor className="absolute bottom-[-20%] end-[-10%] w-[80%] h-[120%] text-white opacity-15 pointer-events-none" />
      <FlourDecor className="absolute top-10 start-10 size-64 text-white opacity-20 pointer-events-none hidden sm:block" />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="inline-flex rounded-xl bg-background p-3">
            <img
              src={logo.url}
              alt="برج التخفيضات"
              className="h-12 w-auto"
              width={220}
              height={66}
            />
          </div>
          <p className="mt-4 max-w-sm text-sm leading-7 opacity-80">
            بيتزا ومناقيش طازجة تُحضّر يوميًا بمكونات مختارة، بطعم يستاهل ترجع له.
          </p>
        </div>

        <div>
          <h3 className="text-base font-bold">روابط</h3>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            <li>
              <Link to="/menu" className="hover:opacity-100">
                المنيو
              </Link>
            </li>
            <li>
              <Link to="/offers" className="hover:opacity-100">
                العروض
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:opacity-100">
                من نحن
              </Link>
            </li>
            <li>
              <Link to="/branches" className="hover:opacity-100">
                الفروع
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:opacity-100">
                تواصل معنا
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-base font-bold">تواصل</h3>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            <li>رقم التواصل: {ph(settings.phone, "— يُضاف لاحقًا")}</li>
            <li>واتساب: {ph(settings.whatsapp, "— يُضاف لاحقًا")}</li>
            <li>إنستقرام: {ph(settings.instagram, "— يُضاف لاحقًا")}</li>
            <li>ساعات العمل: {ph(settings.hours, "— تُضاف لاحقًا")}</li>
            <li>
              الفروع: {settings.branches.length ? settings.branches.join("، ") : "— تُضاف لاحقًا"}
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
