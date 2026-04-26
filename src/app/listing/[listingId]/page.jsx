import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPropertyByListingId, getPrimaryImageUrl } from "@/lib/listings";

function formatPrice(value) {
  return value ? `$${Number(value).toLocaleString()}` : "Price on request";
}

export async function generateMetadata({ params }) {
  const { listingId } = await params;
  const property = await getPropertyByListingId(listingId);

  if (!property) {
    return {
      title: "Listing Not Found | Ulrich Realty",
      description: "This listing could not be found.",
    };
  }

  const title =
    property.ListingName ||
    property.address ||
    `Raleigh-Durham Listing ${listingId}`;
  const description =
    property.description ||
    property.PublicRemarks ||
    `View photos, pricing, and property details for ${property.address || "this Raleigh-Durham listing"} with Ulrich Realty.`;
  const canonicalUrl = `https://www.amazingraleighdurhamhomes.com/listing/${listingId}`;
  const proxiedImageUrl = `https://www.amazingraleighdurhamhomes.com/api/listing-image/${listingId}`;
  const fallbackImageUrl = "https://www.amazingraleighdurhamhomes.com/og-image.jpg";
  const image = getPrimaryImageUrl(property) ? proxiedImageUrl : fallbackImageUrl;

  return {
    title: `${title} | Ulrich Realty`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | Ulrich Realty`,
      description,
      url: canonicalUrl,
      siteName: "Ulrich Realty",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Ulrich Realty`,
      description,
      images: [image],
    },
  };
}

export default async function ListingSharePage({ params }) {
  const { listingId } = await params;
  const property = await getPropertyByListingId(listingId);

  if (!property) {
    notFound();
  }

  const title =
    property.ListingName ||
    property.address ||
    `Listing ${listingId}`;
  const image = getPrimaryImageUrl(property) || "/og-image.jpg";
  const detailUrl = `/?listing=${listingId}`;

  return (
    <main className="bg-[#f6f1e8]">
      <Navbar />

      <section className="px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-[#e6ddd4] bg-[#fffaf5] shadow-[0_25px_70px_rgba(48,36,24,0.08)]">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[320px] bg-[#e9dfd5]">
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-8 sm:p-10">
              <p className="text-sm uppercase tracking-[0.28em] text-[#a15b41]">
                Ulrich Realty Listing
              </p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-[#1f1c17]">
                {title}
              </h1>
              {property.address && (
                <p className="mt-3 text-base text-[#6f675f]">
                  {property.address}
                </p>
              )}

              <p className="mt-5 text-3xl font-semibold text-[#d86a45]">
                {formatPrice(property.price)}
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-[#5f5750]">
                {property.beds ? (
                  <span className="rounded-full bg-[#f3e2d8] px-4 py-2">
                    {property.beds} beds
                  </span>
                ) : null}
                {property.baths ? (
                  <span className="rounded-full bg-[#f3e2d8] px-4 py-2">
                    {property.baths} baths
                  </span>
                ) : null}
                {property.sqft ? (
                  <span className="rounded-full bg-[#f3e2d8] px-4 py-2">
                    {Number(property.sqft).toLocaleString()} sqft
                  </span>
                ) : null}
              </div>

              {(property.description || property.PublicRemarks) && (
                <p className="mt-6 text-sm leading-7 text-[#5f5750]">
                  {(property.description || property.PublicRemarks).slice(0, 280)}
                  {(property.description || property.PublicRemarks).length > 280
                    ? "..."
                    : ""}
                </p>
              )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={detailUrl}
                  className="inline-flex items-center justify-center rounded-full bg-[#d86a45] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#bf5532]"
                >
                  Open Full Listing
                </Link>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center rounded-full border border-[#d8cec4] bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#1f1c17] transition hover:border-[#d86a45] hover:text-[#d86a45]"
                >
                  Request A Tour
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
