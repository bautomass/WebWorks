// app/blog/[slug]/page.tsx
import { Metadata } from "next";
import BlogPostPage from "@/components/BlogPostPage";
import { supabase } from "@/utils/supabase";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: post } = await supabase
    .from("blog_posts")
    .select(
      `
      *,
      kategorija:kategorija_id(nosaukums, slug),
      autors:autors_id(vards, uzvards)
    `
    )
    .eq("slug", params.slug)
    .single();

  if (!post) {
    return {
      title: "Raksts nav atrasts | WebWorks Blog",
      description: "Diemžēl meklētais raksts nav atrasts.",
    };
  }

  return {
    title: post.meta_title || `${post.virsraksts} | WebWorks Blog`,
    description: post.meta_description || post.ievads,
    keywords: post.meta_keywords,
    openGraph: {
      title: post.meta_title || post.virsraksts,
      description: post.meta_description || post.ievads,
      type: "article",
      publishedTime: post.publicets_datums,
      authors: [`${post.autors.vards} ${post.autors.uzvards}`],
      tags: [post.kategorija.nosaukums],
    },
  };
}

export default function BlogPost({ params }: Props) {
  return <BlogPostPage slug={params.slug} />;
}
