"use client";
import { Link } from "@/lib/i18nNavigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import LandingNavbar from "./LandingNavbar";
import ImageWithFallback from "./ImageWithFallback";
import PreOrderModal from "./PreOrderModal";

export default function LandingPage() {
  const [isPreOrderOpen, setIsPreOrderOpen] = useState(false);

  // Listen for openPreOrder event from Hero section
  if (typeof window !== "undefined") {
    window.addEventListener("openPreOrder", () => {
      setIsPreOrderOpen(true);
    });
  }

  return (
    <div className="bg-[#f6fbf4] text-slate-900">
      <LandingNavbar />
      <div className="pt-16">
        <Hero onOrderClick={() => setIsPreOrderOpen(true)} />
        <Craftsmanship />
        <Specs />
        <Lifestyle />
        <Highlights />
        <Comparison />
        <CTA onOrderClick={() => setIsPreOrderOpen(true)} />
      </div>
      <PreOrderModal isOpen={isPreOrderOpen} onClose={() => setIsPreOrderOpen(false)} />
    </div>
  );
}

function Hero({ onOrderClick }: { onOrderClick: () => void }) {
  const t = useTranslations("Landing.hero");

  const heroStats = [
    { value: "90 days", label: t("stats.continuous_protection") },
    { value: "17 g", label: t("stats.featherlight_design") },
    { value: "Memory metal", label: t("stats.adjusts_to_wrist") },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-100 via-lime-50 to-white">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:gap-8 sm:py-12 md:gap-10 md:py-16 lg:grid-cols-2 lg:items-center lg:py-20">
        <div className="order-2 lg:order-1">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 sm:mb-3 sm:text-sm sm:tracking-[0.3em]">
            {t("badge")}
          </p>
          <h1 className="text-2xl font-semibold leading-tight text-slate-900 sm:text-3xl md:text-4xl md:leading-snug lg:text-5xl lg:leading-tight xl:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:mt-5 sm:text-lg md:mt-6 md:text-xl">
            {t("description")}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <button
              onClick={onOrderClick}
              className="inline-flex w-full items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-700 active:scale-95 sm:w-auto sm:px-6 sm:py-3 sm:text-base"
            >
              {t("shop_button")}
            </button>
            <Link
              href="/sign-in"
              className="inline-flex w-full items-center justify-center rounded-full border-2 border-emerald-200 px-5 py-2.5 text-sm font-medium text-emerald-700 transition hover:border-emerald-400 hover:bg-emerald-50 active:scale-95 sm:w-auto sm:px-6 sm:py-3 sm:text-base"
            >
              {t("learn_button")}
            </Link>
          </div>
          <dl className="mt-8 grid w-full grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
            {heroStats.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white bg-white/70 p-3 text-center shadow-sm backdrop-blur transition hover:shadow-md sm:rounded-2xl sm:p-4"
              >
                <dt className="text-[10px] font-semibold uppercase leading-tight tracking-wide text-slate-500 sm:text-xs">
                  {item.label}
                </dt>
                <dd className="mt-1.5 text-lg font-semibold text-emerald-700 sm:mt-2 sm:text-xl">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative order-1 flex justify-center lg:order-2">
          <div className="absolute inset-0 translate-x-3 translate-y-4 rounded-full bg-emerald-200/40 blur-2xl sm:translate-x-5 sm:translate-y-8 sm:blur-3xl" />
          <div className="relative w-full max-w-[280px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-none">
            <ImageWithFallback
              priority
              src="/images/landing/wrist-stacked.jpg"
              alt="Qualitell bracelets hero shot"
              width={560}
              height={640}
              className="relative w-full rounded-2xl border border-emerald-50 shadow-xl sm:rounded-3xl sm:shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Craftsmanship() {
  const t = useTranslations("Landing.craftsmanship");

  const craftsmanship = [
    {
      title: t("features.plant_essence.title"),
      subtitle: t("features.plant_essence.subtitle"),
    },
    {
      title: t("features.anti_sting.title"),
      subtitle: t("features.anti_sting.subtitle"),
    },
    {
      title: t("features.90_day_repellent.title"),
      subtitle: t("features.90_day_repellent.subtitle"),
    },
    {
      title: t("features.memory_metal.title"),
      subtitle: t("features.memory_metal.subtitle"),
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">
        {t("badge")}
      </p>
      <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl lg:text-5xl">
        {t("title")}
      </h2>
      <p className="mt-3 max-w-3xl text-lg leading-relaxed text-slate-600 sm:text-xl">
        {t("description")}
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:gap-8">
        {craftsmanship.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-white bg-white/80 p-6 shadow-lg shadow-emerald-100 transition hover:shadow-xl sm:p-8"
          >
            <p className="text-lg font-semibold text-emerald-700 sm:text-xl">{item.title}</p>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">{item.subtitle}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <ImageWithFallback
          src="/images/landing/product-parameters.jpg"
          alt="Craftsmanship infographic"
          width={1200}
          height={600}
          className="w-full rounded-[32px] border border-slate-100 shadow-xl"
        />
      </div>
    </section>
  );
}

function Specs() {
  const t = useTranslations("Landing.specs");

  const productSpecs = [
    { label: t("labels.product_name"), value: t("values.product_name") },
    { label: t("labels.model"), value: t("values.model") },
    { label: t("labels.product_color"), value: t("values.product_color") },
    { label: t("labels.product_weight"), value: t("values.product_weight") },
    { label: t("labels.product_size"), value: t("values.product_size") },
    { label: t("labels.packaging_size"), value: t("values.packaging_size") },
    { label: t("labels.material"), value: t("values.material") },
    { label: t("labels.execution_standard"), value: t("values.execution_standard") },
  ];

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">
            {t("badge")}
          </p>
          <h3 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">{t("title")}</h3>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">{t("description")}</p>
          <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {productSpecs.map((spec) => (
              <div
                key={spec.label}
                className="rounded-2xl bg-slate-50/70 p-4 transition hover:bg-slate-100/70"
              >
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {spec.label}
                </dt>
                <dd className="mt-1 text-base font-medium text-slate-900">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="space-y-6">
          <ImageWithFallback
            src="/images/landing/product-parameters.jpg"
            alt="Product parameters layout"
            width={640}
            height={420}
            className="w-full rounded-[30px] border border-slate-100 shadow-xl"
          />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-[30px] border border-slate-100 shadow-lg">
              <ImageWithFallback
                src="/images/landing/packaging-green.jpg"
                alt="Green packaging"
                width={320}
                height={320}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-[30px] border border-slate-100 shadow-lg">
              <ImageWithFallback
                src="/images/landing/packaging-peach.jpg"
                alt="Peach packaging"
                width={320}
                height={320}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Lifestyle() {
  const t = useTranslations("Landing.lifestyle");

  const features = [t("features.one_size"), t("features.stackable"), t("features.colors")];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-[32px] border border-emerald-50 shadow-xl">
            <ImageWithFallback
              src="/images/landing/memory-metal.jpg"
              alt="Memory metal adjustment"
              width={560}
              height={520}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="relative overflow-hidden rounded-[32px] border border-emerald-50 shadow-xl">
            <ImageWithFallback
              src="/images/landing/wrist-stacked.jpg"
              alt="Bracelets stacked on wrist"
              width={560}
              height={520}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">
            {t("badge")}
          </p>
          <h3 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">{t("title")}</h3>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">{t("description")}</p>
          <ul className="mt-8 space-y-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  ✓
                </span>
                <span className="text-slate-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Highlights() {
  const t = useTranslations("Landing.highlights");

  const highlights = [
    {
      title: t("items.pure_plant.title"),
      description: t("items.pure_plant.description"),
      image: "/images/landing/pure-plant.jpg",
    },
    {
      title: t("items.360_repellent.title"),
      description: t("items.360_repellent.description"),
      image: "/images/landing/bubble-360.jpg",
    },
    {
      title: t("items.waterproof.title"),
      description: t("items.waterproof.description"),
      image: "/images/landing/waterproof-test.jpg",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-emerald-50 to-lime-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">
          {t("badge")}
        </p>
        <h3 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl lg:text-5xl">
          {t("title")}
        </h3>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="group overflow-hidden rounded-[32px] border border-white bg-white shadow-lg transition hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h4 className="text-xl font-semibold text-slate-900 sm:text-2xl">{item.title}</h4>
                <p className="mt-3 text-slate-600 sm:text-base">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Comparison() {
  const t = useTranslations("Landing.comparison");

  const comparison = [
    {
      label: t("items.repellent_stick.label"),
      ours: t("items.repellent_stick.ours"),
      others: t("items.repellent_stick.others"),
    },
    {
      label: t("items.repellent_patch.label"),
      ours: t("items.repellent_patch.ours"),
      others: t("items.repellent_patch.others"),
    },
    {
      label: t("items.cartoon_ring.label"),
      ours: t("items.cartoon_ring.ours"),
      others: t("items.cartoon_ring.others"),
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">
          {t("badge")}
        </p>
        <h3 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl lg:text-5xl">
          {t("title")}
        </h3>
        <p className="mt-3 text-lg leading-relaxed text-slate-600">{t("description")}</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-center">
          <div className="relative overflow-hidden rounded-[32px] border border-slate-100 bg-gradient-to-br from-emerald-50 to-lime-50 p-4 shadow-xl sm:p-8">
            <ImageWithFallback
              src="/images/landing/comparison-chart.jpg"
              alt="Efficacy comparison chart"
              width={640}
              height={480}
              className="w-full rounded-2xl"
            />
          </div>
          <div className="flex flex-col justify-center space-y-4">
            {comparison.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <p className="font-semibold text-slate-900 sm:text-lg">{item.label}</p>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  {item.ours !== "—" ? (
                    <span className="inline-flex w-fit rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-700">
                      {item.ours}
                    </span>
                  ) : (
                    <span className="text-sm text-slate-400">—</span>
                  )}
                  <span className="text-sm text-slate-600 sm:text-base">{item.others}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA({ onOrderClick }: { onOrderClick: () => void }) {
  const t = useTranslations("Landing.cta");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-lime-600 py-20 sm:py-24">
      <div className="absolute inset-0 bg-[url('/images/landing/repellent-cores.jpg')] bg-cover bg-center opacity-10" />
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <h3 className="text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">{t("title")}</h3>
        <p className="mt-4 text-lg leading-relaxed text-emerald-50 sm:text-xl">
          {t("description")}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button
            onClick={onOrderClick}
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 font-semibold text-emerald-700 shadow-xl transition hover:bg-emerald-50 active:scale-95"
          >
            {t("order_button")}
          </button>
          <Link
            href="/sign-in"
            className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-4 font-semibold text-white transition hover:bg-white/10 active:scale-95"
          >
            {t("learn_button")}
          </Link>
        </div>
      </div>
    </section>
  );
}
