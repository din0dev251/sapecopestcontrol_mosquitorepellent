"use client";
import Link from "next/link";
import CommonIcons from "@/components/CommonIcons";
import { AppConfig } from "@/utils/appConfig";

export default function NotFound() {
  // Redirect to default locale homepage
  const homeUrl = `/${AppConfig.defaultLocale}`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f6fbf4] px-4 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-4xl text-center">
        {/* Decorative background blur */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />
        </div>

        {/* Animated 404 */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-7xl font-semibold leading-tight text-emerald-600 drop-shadow-lg sm:text-8xl md:text-9xl lg:text-[12rem]">
            4
            <span className="inline-block animate-bounce">0</span>
            4
          </h1>
        </div>

        {/* Icon */}
        <div className="mb-6 flex justify-center sm:mb-8">
          <div className="rounded-full bg-white/80 p-4 shadow-lg shadow-emerald-100 backdrop-blur sm:p-6">
            <CommonIcons.AlertCircle className="h-12 w-12 text-emerald-600 sm:h-16 sm:w-16" />
          </div>
        </div>

        {/* Badge */}
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600 sm:text-sm">
          Error
        </p>

        {/* Title */}
        <h2 className="mb-4 text-2xl font-semibold leading-tight text-slate-900 sm:text-3xl md:text-4xl lg:text-5xl">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-slate-600 sm:mb-10 sm:text-lg md:text-xl">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Link href={homeUrl}>
            <button className="inline-flex w-full items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-700 active:scale-95 sm:w-auto sm:px-8 sm:py-3.5 sm:text-base">
              <CommonIcons.Home className="mr-2 h-5 w-5" />
              Go Home
            </button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex w-full items-center justify-center rounded-full border-2 border-emerald-600 bg-white/80 px-6 py-3 text-sm font-medium text-emerald-600 shadow-sm transition hover:bg-emerald-50 hover:shadow-md active:scale-95 sm:w-auto sm:px-8 sm:py-3.5 sm:text-base"
          >
            <CommonIcons.ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </button>
        </div>

        {/* Decorative elements */}
        <div className="mt-16 flex justify-center gap-3 opacity-30 sm:mt-20 sm:gap-4">
          <div className="rounded-full bg-emerald-100 p-2 sm:p-3">
            <CommonIcons.Bug className="h-6 w-6 text-emerald-600 sm:h-8 sm:w-8" />
          </div>
          <div className="rounded-full bg-emerald-100 p-2 sm:p-3">
            <CommonIcons.X className="h-6 w-6 text-emerald-600 sm:h-8 sm:w-8" />
          </div>
          <div className="rounded-full bg-emerald-100 p-2 sm:p-3">
            <CommonIcons.Bug className="h-6 w-6 text-emerald-600 sm:h-8 sm:w-8" />
          </div>
        </div>
      </div>
    </div>
  );
}

