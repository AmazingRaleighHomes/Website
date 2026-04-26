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
  metadataBase: new URL("https://www.amazingraleighdurhamhomes.com"),
  title: "Ulrich Realty | Raleigh-Durham Real Estate",
  description:
    "Search Raleigh-Durham homes, explore neighborhoods, and connect with Ulrich Realty for local real estate guidance.",
  openGraph: {
    title: "Ulrich Realty | Raleigh-Durham Real Estate",
    description:
      "Search Raleigh-Durham homes, explore neighborhoods, and connect with Ulrich Realty for local real estate guidance.",
    url: "https://www.amazingraleighdurhamhomes.com",
    siteName: "Ulrich Realty",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ulrich Realty Raleigh-Durham Real Estate",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ulrich Realty | Raleigh-Durham Real Estate",
    description:
      "Search Raleigh-Durham homes, explore neighborhoods, and connect with Ulrich Realty for local real estate guidance.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
    shortcut: "/favicon/favicon.ico",
  },
  manifest: "/favicon/site.webmanifest",
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
