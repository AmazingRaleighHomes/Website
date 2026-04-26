import { getAllListingIds } from "@/lib/listings";
import { areaPages } from "@/lib/areaPages";

const BASE_URL = "https://www.amazingraleighdurhamhomes.com";

export default async function sitemap() {
  const staticPages = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/contact-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/our-agents`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog/2026-home-buying-guide-raleigh-durham`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...areaPages.map((page) => ({
      url: `${BASE_URL}/${page.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    })),
  ];

  try {
    const listingIds = await getAllListingIds();

    const listingPages = listingIds.map((listingId) => ({
      url: `${BASE_URL}/listing/${listingId}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.6,
    }));

    return [...staticPages, ...listingPages];
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return staticPages;
  }
}
