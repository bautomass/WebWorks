import { Metadata } from "next";
import BlogPage from "@/components/BlogPage";

export const metadata: Metadata = {
  title: "WebWorks Blog | Web Izstrādes, Dizaina un Digitālā Mārketinga Raksti",
  description:
    "Izglītojošs blogs par web izstrādi, dizainu un digitālo mārketingu. Uzziniet par jaunākajām tendencēm, tehnoloģijām un labākajām praksēm no WebWorks ekspertiem.",
  keywords:
    "web izstrāde, web dizains, digitālais mārketings, SEO, web development, blog, latvija, riga",
  openGraph: {
    title: "WebWorks Blog | Digitālās Attīstības Resurss",
    description:
      "Profesionāli raksti un padomi par web izstrādi, dizainu un digitālo mārketingu no WebWorks ekspertiem.",
    siteName: "WebWorks",
    locale: "lv_LV",
    type: "website",
    images: [
      {
        url: "https://www.webworks.lv/images/blog-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WebWorks Blog",
      },
    ],
  },
  alternates: {
    canonical: "https://www.webworks.lv/blog",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "WebWorks Blog | Digitālās Attīstības Resurss",
    description:
      "Profesionāli raksti un padomi par web izstrādi, dizainu un digitālo mārketingu.",
    images: ["https://www.webworks.lv/images/blog-og-image.jpg"],
  },
};

export default function BlogLapa() {
  return <BlogPage />;
}
