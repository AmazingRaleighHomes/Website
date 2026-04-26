import HomePageClient from "@/components/HomePageClient";

export const metadata = {
  title: "Raleigh-Durham Homes for Sale | Ulrich Realty",
  description:
    "Search Raleigh-Durham homes for sale, explore Cary, Apex, Durham, and Wake Forest neighborhoods, and connect with Ulrich Realty for local real estate guidance.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  const realtySchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Ulrich Realty",
    description:
      "Ulrich Realty helps buyers and sellers search Raleigh-Durham homes for sale, compare neighborhoods, and navigate the Triangle real estate market.",
    areaServed: [
      "Raleigh, NC",
      "Durham, NC",
      "Cary, NC",
      "Apex, NC",
      "Wake Forest, NC",
      "Chapel Hill, NC",
    ],
    telephone: "(919) 802-7282",
    image: "/images/Mike_Ulrich.jpeg",
    url: "/",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(realtySchema) }}
      />
      <HomePageClient />
    </>
  );
}
