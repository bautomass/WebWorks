import { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import type { BlogPost } from "@/types/blog";

const supabase = createClient(
  "https://naoqtpswnddzujxkusam.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hb3F0cHN3bmRkenVqeGt1c2FtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk3MDMyNjYsImV4cCI6MjA0NTI3OTI2Nn0.nU2VXN5zCld9Ng-zIWpzFtG5ICKdkHqH5d-wqqMJhn8"
);

async function getBlogPosts(): Promise<BlogPost[]> {
  const { data: posts, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("publicets", true)
    .order("publicets_datums", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }

  return posts || [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.webworks.lv";

  // Core pages with high priority
  const coreRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/consultation`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq-page`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  // Service pages with high priority
  const serviceRoutes = [
    "web-izstrade",
    "e-komercija",
    "mobilo-aplikaciju-izstrade",
    "seo-optimizacija",
    "digitalais-marketings",
    "web-aplikacijas",
  ].map((service) => ({
    url: `${baseUrl}/pakalpojumi/${service}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // Tool pages with medium priority
  const toolRoutes = [
    "meta-tag-creator-tool",
    "email-validator-tool",
    "local-business-schema-generator",
    "attelu-kompresija-nezaudejot-kvalitati",
    "typography-pairing-tool",
    "cookie-consent-generator",
    "generate-color-pallets-for-web-development",
    "flex-box-generator",
    "css-grid-layout-generator",
  ].map((tool) => ({
    url: `${baseUrl}/${tool}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Fetch and map blog posts
  const blogPosts = await getBlogPosts();
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at || post.created_at),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Combine all routes
  return [...coreRoutes, ...serviceRoutes, ...toolRoutes, ...blogRoutes].map(
    (route) => ({
      ...route,
      // Ensure lastModified is in ISO format
      lastModified: route.lastModified.toISOString(),
    })
  );
}
