import { notFound } from "next/navigation";
import AreaLandingPage from "@/components/AreaLandingPage";
import { areaPages, getAreaPage } from "@/lib/areaPages";

export function generateStaticParams() {
  return areaPages.map((page) => ({ areaSlug: page.slug }));
}

export function generateMetadata({ params }) {
  const page = getAreaPage(params.areaSlug);

  if (!page) {
    return {};
  }

  return {
    title: page.metaTitle,
    description: page.description,
    alternates: {
      canonical: `/${page.slug}`,
    },
    openGraph: {
      title: page.metaTitle,
      description: page.description,
      url: `https://www.amazingraleighdurhamhomes.com/${page.slug}`,
      siteName: "Ulrich Realty",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${page.shortName} homes for sale`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.description,
      images: ["/og-image.jpg"],
    },
  };
}

export default function AreaPage({ params }) {
  const page = getAreaPage(params.areaSlug);

  if (!page) {
    notFound();
  }

  return <AreaLandingPage page={page} />;
}
