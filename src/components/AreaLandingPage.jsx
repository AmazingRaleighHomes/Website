import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAreaSearchHref } from "@/lib/areaPages";

export default function AreaLandingPage({ page }) {
  const listingsHref = getAreaSearchHref(page.area);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: page.metaTitle,
    description: page.description,
    url: `https://www.amazingraleighdurhamhomes.com/${page.slug}`,
    about: {
      "@type": "Place",
      name: `${page.area}, North Carolina`,
    },
    publisher: {
      "@type": "RealEstateAgent",
      name: "Ulrich Realty",
      telephone: "(919) 802-7282",
      url: "https://www.amazingraleighdurhamhomes.com",
    },
  };

  return (
    <>
      <Navbar />

      <main className="bg-[#f6f1e8] pt-24 text-[#1f1c17] sm:pt-28">
        <section className="relative overflow-hidden bg-[#17130f] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,106,69,0.28),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.35)_18%,rgba(23,19,15,0.88)_100%)]" />
          <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8 lg:pb-24">
            <div className="max-w-4xl">
              <p className="inline-flex rounded-full border border-white/20 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#4f463f] backdrop-blur-sm">
                {page.heroEyebrow}
              </p>
              <h1 className="mt-6 text-5xl font-semibold leading-[0.95] tracking-[-0.03em] text-white sm:text-6xl">
                {page.heroTitle}
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-7 text-white/84 sm:text-lg">
                {page.heroDescription}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={listingsHref}
                  className="inline-flex items-center rounded-full bg-[#d86a45] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#bf5532]"
                >
                  See {page.shortName} Listings
                </Link>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center rounded-full border border-white/20 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#4f463f] transition hover:bg-[#f2e3da]"
                >
                  Talk With Ulrich Realty
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-18">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="rounded-[2rem] border border-[#e6ddd4] bg-[#fffaf5] p-8 shadow-[0_20px_60px_rgba(48,36,24,0.08)]">
                <p className="text-sm uppercase tracking-[0.28em] text-[#a15b41]">
                  Why Buyers Search Here
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
                  {page.title} with a clearer local story behind the search.
                </h2>
                <div className="mt-6 space-y-4 text-base leading-7 text-[#5f5750]">
                  {page.highlights.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                {page.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[1.6rem] border border-[#e6ddd4] bg-white p-6 shadow-[0_18px_45px_rgba(48,36,24,0.06)]"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a15b41]">
                      {stat.label}
                    </p>
                    <p className="mt-3 text-xl font-semibold text-[#1f1c17]">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="pb-18">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-[#ead8cd] bg-[#1f1b17] p-8 text-white shadow-[0_24px_70px_rgba(48,36,24,0.18)] sm:p-10">
              <p className="text-sm uppercase tracking-[0.28em] text-[#f1c4b0]">
                Explore Available Homes
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
                Explore current {page.shortName} homes for sale in one click.
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-white/76">
                Start with the market overview here, then move into current
                listings to compare price, property style, location, and what is
                available right now in {page.shortName}.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={listingsHref}
                  className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#4f463f] transition hover:bg-[#f2e3da]"
                >
                  Browse {page.shortName} Homes
                </Link>
                <Link
                  href="/our-agents"
                  className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:border-[#f1c4b0] hover:text-[#f1c4b0]"
                >
                  Meet Michael Ulrich
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] border border-[#e6ddd4] bg-[#fffaf5] p-8 shadow-[0_20px_60px_rgba(48,36,24,0.08)] sm:p-10">
              <p className="text-sm uppercase tracking-[0.28em] text-[#a15b41]">
                Frequently Asked
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-[#1f1c17] sm:text-4xl">
                {page.shortName} buyer questions we hear often.
              </h2>

              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                {page.faq.map((item) => (
                  <div
                    key={item.question}
                    className="rounded-[1.5rem] border border-[#e6ddd4] bg-white p-6"
                  >
                    <h3 className="text-lg font-semibold text-[#1f1c17]">
                      {item.question}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#5f5750]">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Footer />
    </>
  );
}
