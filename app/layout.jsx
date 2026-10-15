import "./globals.css";
import { siteSettings } from "@/lib/data";
import PublicSiteWrapper from "@/components/layout/PublicSiteWrapper";

export const metadata = {
  title: {
    default: "Beauty in the Beast | Pet Salon, Day Care & Academy | Karvenagar Pune",
    template: "%s | Beauty in the Beast Pune",
  },
  description:
    "Professional, behavior-led dog grooming, small-capacity boutique daycare, and international grooming diploma academy in Karvenagar, Pune. Founded by Mihir Sahasrabuddhe.",
  keywords: [
    "dog grooming pune",
    "pet salon karvenagar",
    "dog spa kothrud",
    "dog daycare pune",
    "grooming academy india",
    "mihir sahasrabuddhe",
    "pet grooming course pune",
    "beauty in the beast dog",
  ],
  openGraph: {
    title: "Beauty in the Beast | Pet Salon, Day Care & Academy Pune",
    description: "Care for the whole animal, not just the way they look. Pune's premier dog grooming & academy in Karvenagar.",
    url: "https://www.beautyinthebeast.dog",
    siteName: "Beauty in the Beast",
    locale: "en_IN",
    type: "website",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "PetGroomingService",
  name: siteSettings.name,
  image: "https://www.beautyinthebeast.dog/images/brand/Blue/Beauty%20in%20the%20Beast%20Logos%20PNG-09.png",
  telephone: siteSettings.phone,
  email: siteSettings.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shop no. 3 & 4, KBC Towers, ground floor, Next to K-52",
    addressLocality: "Karvenagar",
    addressRegion: "Pune",
    postalCode: "411052",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "18.4908",
    longitude: "73.8166",
  },
  url: "https://www.beautyinthebeast.dog",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "19:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Sunday"],
      opens: "10:00",
      closes: "17:00",
    },
  ],
  priceRange: "₹₹",
  sameAs: [siteSettings.instagramUrl, siteSettings.mapUrl],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-[#14202E] font-['Manrope'] antialiased">
        <PublicSiteWrapper>{children}</PublicSiteWrapper>
      </body>
    </html>
  );
}
