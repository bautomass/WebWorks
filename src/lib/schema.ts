// src/lib/schema.ts
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "WebWorks",
  alternateName: "WebWorks.lv",
  url: "https://www.webworks.lv",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.webworks.lv/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.webworks.lv/#organization",
  name: "WebWorks",
  url: "https://www.webworks.lv",
  logo: {
    "@type": "ImageObject",
    url: "https://www.webworks.lv/images/webworks.svg",
    width: 600,
    height: 600,
  },
  image: {
    "@type": "ImageObject",
    url: "https://www.webworks.lv/images/og-image.svg",
    width: 1200,
    height: 630,
  },
  description:
    "Moderna mājaslapu izstrāde ar WebWorks - no €199. Responsīvs dizains, ātra izstrāde, SEO optimizācija.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jelgava",
    addressCountry: "LV",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+37126282630",
    email: "info@webworks.lv",
    contactType: "customer service",
    areaServed: "LV",
    availableLanguage: ["lv", "en"],
  },
  priceRange: "€€",
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "WebDesign",
  "@id": "https://www.webworks.lv/#business",
  name: "WebWorks",
  image: "https://www.webworks.lv/images/og-image.svg",
  url: "https://www.webworks.lv",
  telephone: "+37126282630",
  email: "info@webworks.lv",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jelgava",
    addressCountry: "LV",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "20:00",
  },
  priceRange: "€€",
};
