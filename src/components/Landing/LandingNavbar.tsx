"use client";
import { Link } from "@/lib/i18nNavigation";
import Logo from "../Logo";
import BaseUrl from "@/constants/urls";
import LanguageSwitcher from "./LanguageSwitcher";
import { Button } from "../ui/button";
import CommonIcons from "../CommonIcons";

export default function LandingNavbar() {
  const phoneNumber = "0966888412";

  return (
    <nav className="fixed top-0 z-50 h-16 w-full bg-white/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={BaseUrl.Homepage} className="flex items-center">
          <Logo className="h-10" />
        </Link>
        <div className="flex items-center gap-4">
          <a href={`tel:${phoneNumber}`}>
            <Button
              variant="default"
              size="sm"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700"
            >
              <CommonIcons.Phone className="h-4 w-4" />
              <span className="hidden sm:inline">{phoneNumber}</span>
              <span className="sm:hidden">Call</span>
            </Button>
          </a>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}
