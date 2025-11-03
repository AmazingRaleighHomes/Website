import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Amazing Raleigh Durham Homes | Real Estate Listings & Sales",
  description:
    "Find your dream home in Raleigh and Durham with Amazing Raleigh Durham Homes. Browse top residential listings and connect with expert local real estate agents.",
  keywords: [
    "Raleigh homes for sale",
    "Durham homes for sale",
    "Raleigh real estate",
    "Durham real estate",
    "North Carolina houses",
    "residential listings Raleigh",
    "residential listings Durham",
    "real estate agents Raleigh Durham",
    "Amazing Raleigh Durham Homes",
  ],
  authors: [{ name: "Amazing Raleigh Durham Homes", url: "https://www.amazingraleighdurhamhomes.com" }],
  openGraph: {
    title: "Amazing Raleigh Durham Homes | Residential Listings & Sales",
    description:
      "Browse the best homes for sale in Raleigh and Durham. Connect with trusted local real estate agents to find your perfect North Carolina property.",
    url: "https://www.amazingraleighdurhamhomes.com",
    siteName: "Amazing Raleigh Durham Homes",
    images: [
      {
        url: "https://www.amazingraleighdurhamhomes.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Amazing Raleigh Durham Homes",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amazing Raleigh Durham Homes | Real Estate Listings & Sales",
    description:
      "Browse top homes for sale in Raleigh and Durham and connect with trusted local agents.",
    site: "@AmazingRaleighHomes",
    creator: "@AmazingRaleighHomes",
    images: ["https://www.amazingraleighdurhamhomes.com/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
