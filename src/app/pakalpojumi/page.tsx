"use client";

import React from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiShoppingCart,
  FiSmartphone,
  FiCode,
  FiGlobe,
  FiArrowRight,
} from "react-icons/fi";
import Header from "@/components/Header";
import Footer from "@/components/footer";

interface Service {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  color: string;
  link: string;
}

const services: Service[] = [
  {
    id: "web-izstrade",
    name: "Web Izstrāde",
    description:
      "Profesionāla mājaslapu izstrāde ar modernām tehnoloģijām un SEO optimizāciju.",
    icon: <FiCode className="text-3xl" />,
    color: "#607D8B",
    link: "/pakalpojumi/web-izstrade",
  },
  {
    id: "digitalais-marketings",
    name: "Digitālais Mārketings",
    description:
      "Pilna servisa digitālā mārketinga pakalpojumi, ieskaitot SEO, sociālos medijus un Google Ads.",
    icon: <FiGlobe className="text-3xl" />,
    color: "#4CAF50",
    link: "/pakalpojumi/digitalais-marketings",
  },
  {
    id: "e-komercija",
    name: "E-komercija",
    description:
      "Moderna e-veikala izstrāde ar Shopify vai individuālu risinājumu.",
    icon: <FiShoppingCart className="text-3xl" />,
    color: "#2196F3",
    link: "/pakalpojumi/e-komercija",
  },
  {
    id: "mobilo-aplikaciju-izstrade",
    name: "Mobilās Aplikācijas",
    description: "iOS un Android aplikāciju izstrāde ar modernām tehnoloģijām.",
    icon: <FiSmartphone className="text-3xl" />,
    color: "#9C27B0",
    link: "/pakalpojumi/mobilo-aplikaciju-izstrade",
  },
  {
    id: "seo-optimizacija",
    name: "SEO Optimizācija",
    description: "Meklētājprogrammu optimizācija ar garantētiem rezultātiem.",
    icon: <FiSearch className="text-3xl" />,
    color: "#FF9800",
    link: "/pakalpojumi/seo-optimizacija",
  },
  {
    id: "web-aplikacijas",
    name: "Web Aplikācijas",
    description: "Modernas web aplikācijas un SAAS risinājumu izstrāde.",
    icon: <FiCode className="text-3xl" />,
    color: "#E91E63",
    link: "/pakalpojumi/web-aplikacijas",
  },
];

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
  <Link href={service.link}>
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden h-full transform transition-all duration-300 hover:shadow-2xl"
    >
      <div className="p-6 flex items-start space-x-4">
        <div
          className={`p-3 rounded-lg`}
          style={{ backgroundColor: `${service.color}20` }}
        >
          <div style={{ color: service.color }}>{service.icon}</div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center justify-between">
            {service.name}
            <FiArrowRight className="text-gray-400" />
          </h3>
          <p className="text-gray-600">{service.description}</p>
        </div>
      </div>
    </motion.div>
  </Link>
);

const Pakalpojumi: React.FC = () => {
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>
          Digitālie Pakalpojumi Latvijā | WebWorks 🚀 Web Izstrāde, SEO, SAAS
        </title>
        <meta
          name="description"
          content="Pilns digitālo pakalpojumu klāsts no WebWorks. Web izstrāde no €199, e-komercija, SEO, aplikāciju izstrāde. 200+ veiksmīgi projekti, 98% klientu apmierinātība. Bezmaksas konsultācija + ROI garantija."
        />
        <meta
          name="keywords"
          content="web izstrāde, digitālais mārketings, seo optimizācija, e-komercija, web aplikācijas, mobilās aplikācijas, mājaslapu izstrāde, wordpress, react, latvija, rīga"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.webworks.lv/pakalpojumi" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="WebWorks" />
        <meta property="og:url" content="https://www.webworks.lv/pakalpojumi" />
        <meta
          property="og:title"
          content="Digitālie Pakalpojumi | WebWorks 🚀 Pilns Serviss"
        />
        <meta
          property="og:description"
          content="✓ Web Izstrāde ✓ Digitālais Mārketings ✓ SEO ✓ E-komercija ✓ Mobilās Aplikācijas. Izvēlieties labāko savam biznesam!"
        />
        <meta
          property="og:image"
          content="https://www.webworks.lv/images/services-og.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="lv_LV" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@webworks_lv" />
        <meta
          name="twitter:title"
          content="Digitālie Pakalpojumi | WebWorks 🚀 No €199"
        />
        <meta
          name="twitter:description"
          content="Pilns digitālo pakalpojumu klāsts jūsu biznesam. Web izstrāde, SEO, aplikācijas un vairāk!"
        />
        <meta
          name="twitter:image"
          content="https://www.webworks.lv/images/services-og.jpg"
        />

        {/* Additional SEO Meta Tags */}
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="author" content="WebWorks" />
        <meta name="geo.region" content="LV" />
        <meta name="geo.placename" content="Jelgava" />
        <meta name="format-detection" content="telephone=no" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-[#F3F5F4] to-white">
        <Header />

        <main className="container mx-auto px-4 py-16">
          <div className="max-w-7xl mx-auto">
            <section className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-[#3D3B4A] mb-8">
                Mūsu Digitālie Pakalpojumi
              </h1>
              <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
                Izmantojiet mūsu plašo pakalpojumu klāstu, lai attīstītu savu
                biznesu digitālajā vidē. No idejas līdz realizācijai - mēs
                palīdzēsim jums sasniegt jaunas virsotnes.
              </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </section>

            <section className="mt-16">
              <div className="bg-gradient-to-r from-[#3D3B4A] to-[#2D2B3A] p-12 rounded-xl text-center text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Nevar atrast vajadzīgo pakalpojumu?
                </h2>
                <p className="text-lg mb-8 opacity-90">
                  Sazinieties ar mums, un mēs izveidosim individuālu risinājumu
                  tieši jūsu vajadzībām.
                </p>
                <motion.a
                  href="/contact-us"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center px-8 py-3 bg-[#EEC71B] text-[#3D3B4A] rounded-lg font-bold hover:bg-[#ffd700] transition-colors duration-300"
                >
                  Sazināties ar mums
                  <FiArrowRight className="ml-2" />
                </motion.a>
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>

      <script
        id="schema-script"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://www.webworks.lv/pakalpojumi",
            },
            numberOfItems: services.length,
            itemListElement: services.map((service, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Service",
                name: service.name,
                description: service.description,
                url: `https://www.webworks.lv${service.link}`,
                provider: {
                  "@type": "Organization",
                  name: "WebWorks",
                  image: "https://www.webworks.lv/images/logo.png",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "Kungu iela 23/8",
                    addressLocality: "Jelgava",
                    postalCode: "LV-3001",
                    addressCountry: "LV",
                  },
                  contactPoint: {
                    "@type": "ContactPoint",
                    telephone: "+37126282630",
                    contactType: "sales",
                    areaServed: "LV",
                    availableLanguage: ["lv"],
                  },
                },
                areaServed: {
                  "@type": "Country",
                  name: "Latvia",
                },
              },
            })),
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "187",
              bestRating: "5",
              worstRating: "1",
            },
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "EUR",
              lowPrice: "199",
              highPrice: "4999",
              offerCount: services.length,
              priceValidUntil: "2024-12-31",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "WebWorks Pakalpojumi",
              itemListElement: services.map((service) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: service.name,
                  description: service.description,
                },
              })),
            },
            eventSchedule: {
              "@type": "Schedule",
              scheduleTimezone: "Europe/Riga",
              byDay: [
                "https://schema.org/Monday",
                "https://schema.org/Tuesday",
                "https://schema.org/Wednesday",
                "https://schema.org/Thursday",
                "https://schema.org/Friday",
              ],
              startTime: "09:00",
              endTime: "20:00",
            },
            sameAs: [
              "https://www.facebook.com/webworks.lv",
              "https://twitter.com/webworks_lv",
            ],
          }),
        }}
      />
    </>
  );
};

export default Pakalpojumi;
