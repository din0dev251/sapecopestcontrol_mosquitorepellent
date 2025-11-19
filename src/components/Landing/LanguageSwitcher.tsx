"use client";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/lib/i18nNavigation";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const languages = [
  {
    code: "en",
    name: "English",
    flag: "/images/flags/united-kingdom.svg",
  },
  {
    code: "vi",
    name: "Tiếng Việt",
    flag: "/images/flags/vietnam.svg",
  },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 border-slate-200 bg-white/50 hover:bg-white"
        >
          <Image
            src={currentLanguage.flag}
            alt={currentLanguage.name}
            width={20}
            height={14}
            className="h-4 w-auto rounded-sm object-cover"
          />
          <span className="hidden sm:inline">{currentLanguage.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`flex cursor-pointer items-center gap-2 ${
              locale === lang.code ? "bg-emerald-50 text-emerald-700" : ""
            }`}
          >
            <Image
              src={lang.flag}
              alt={lang.name}
              width={20}
              height={14}
              className="h-4 w-auto rounded-sm object-cover"
            />
            <span>{lang.name}</span>
            {locale === lang.code && <span className="ml-auto text-emerald-600">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
