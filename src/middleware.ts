import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { routing } from "./lib/i18nNavigation";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Allow direct access to sitemap.xml and robots.txt without i18n middleware processing
  // This ensures these files are properly served for SEO purposes
  // Related to GitHub issue: https://github.com/ixartz/Next-js-Boilerplate/issues/356
  if (path === "/sitemap.xml" || path === "/robots.txt") {
    return NextResponse.next();
  }

  // Skip i18n middleware for API routes
  if (path.startsWith("/api/")) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|monitoring|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
