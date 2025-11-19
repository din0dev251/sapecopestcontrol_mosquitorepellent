"use client";
import { Link } from "@/lib/i18nNavigation";
import { useTranslations } from "next-intl";
import Logo from "../Logo";
import BaseUrl from "@/constants/urls";
import LanguageSwitcher from "./LanguageSwitcher";

export default function LandingNavbar() {
  const t = useTranslations("Landing.navbar");

  return (
    <nav className="fixed top-0 z-50 h-16 w-full bg-white/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={BaseUrl.Homepage} className="flex items-center">
          <Logo />
        </Link>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Link
            href={BaseUrl.SignIn}
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            {t("sign_in")}
          </Link>
          <Link
            href={BaseUrl.SignUp}
            className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            {t("get_started")}
          </Link>
        </div>
      </div>
    </nav>
  );
}

