"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../utils/supabase";
import Header from "../components/Header";
import Footer from "../components/footer";
import Script from "next/script";
import {
  FiBookOpen,
  FiClock,
  FiTag,
  FiCalendar,
  FiUser,
  FiLoader,
  FiArrowRight,
} from "react-icons/fi";
import type { BlogPost, Category } from "../types/blog";

const IeladesIndikators = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <motion.div
      className="relative w-16 h-16"
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute inset-0 border-4 border-[#EEC71B]/20 rounded-full" />
      <div className="absolute inset-0 border-4 border-t-[#EEC71B] rounded-full" />
    </motion.div>
    <p className="mt-4 text-gray-600">Ielādē rakstus...</p>
  </div>
);

const DekorativaisFons = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-[#EEC71B]/10 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
    <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-[#3D3B4A]/5 to-transparent rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4" />
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <div className="h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
    </motion.div>
  </div>
);

const BlogKarte = ({ post }: { post: BlogPost }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
  >
    <div className="relative h-48 overflow-hidden">
      <img
        src={post.attels_url || "/placeholder-blog.jpg"}
        alt={post.virsraksts}
        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute top-4 left-4">
        <span className="bg-[#EEC71B] text-[#3D3B4A] px-3 py-1 rounded-full text-sm font-medium">
          {post.kategorija?.nosaukums}
        </span>
      </div>
    </div>

    <div className="p-6">
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <span className="flex items-center gap-2">
          <FiClock />
          {post.lasijuma_laiks} min
        </span>
        <span className="flex items-center gap-2">
          <FiCalendar />
          {new Date(post.publicets_datums).toLocaleDateString("lv-LV")}
        </span>
      </div>

      <h2 className="text-2xl font-bold text-[#3D3B4A] mb-3 hover:text-[#EEC71B] transition-colors">
        <a href={`/blog/${post.slug}`}>{post.virsraksts}</a>
      </h2>

      <p className="text-gray-600 mb-4 line-clamp-3">{post.ievads}</p>

      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-3">
          <img
            src={post.autors?.avatar_url || "/placeholder-avatar.jpg"}
            alt={`${post.autors?.vards} ${post.autors?.uzvards}`}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="text-sm font-medium text-[#3D3B4A]">
              {post.autors?.vards} {post.autors?.uzvards}
            </p>
          </div>
        </div>

        <a
          href={`/blog/${post.slug}`}
          className="flex items-center gap-2 text-[#EEC71B] hover:text-[#3D3B4A] transition-colors"
        >
          <span>Lasīt vairāk</span>
          <FiArrowRight />
        </a>
      </div>
    </div>
  </motion.article>
);

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [kategorijas, setKategorijas] = useState<Category[]>([]);
  const [aktivaKategorija, setAktivaKategorija] = useState<string>("all");
  const [ielade, setIelade] = useState(true);

  useEffect(() => {
    const ielādetSaturu = async () => {
      try {
        // Ielādē kategorijas
        const { data: katData } = await supabase
          .from("blog_categories")
          .select("*")
          .order("nosaukums");

        setKategorijas(katData || []);

        // Ielādē rakstus
        const { data: postsData } = await supabase
          .from("blog_posts")
          .select(
            `
            *,
            kategorija:kategorija_id(nosaukums, slug),
            autors:autors_id(vards, uzvards, avatar_url),
            tags:blog_posts_tags(tag:tag_id(nosaukums, slug))
          `
          )
          .eq("publicets", true)
          .order("publicets_datums", { ascending: false });

        setPosts(postsData || []);
      } catch (kluda) {
        console.error("Kļūda ielādējot saturu:", kluda);
      } finally {
        setIelade(false);
      }
    };

    ielādetSaturu();
  }, []);

  const filtretieRaksti =
    aktivaKategorija === "all"
      ? posts
      : posts.filter((post) => post.kategorija?.slug === aktivaKategorija);

  return (
    <>
      <Header />
      <DekorativaisFons />

      <main className="min-h-screen bg-gray-50 pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Galvene */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-[#EEC71B]/10 rounded-full mb-6"
            >
              <FiBookOpen className="text-[#EEC71B] text-3xl" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-[#3D3B4A] mb-6"
            >
              WebWorks Blogs
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Jaunākie raksti par web izstrādi, dizainu un digitālo mārketingu.
              Uzziniet par jaunākajām tendencēm un labākajām praksēm no mūsu
              ekspertiem.
            </motion.p>
          </div>

          {/* Kategoriju filtrs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-12"
          >
            <button
              onClick={() => setAktivaKategorija("all")}
              className={`px-4 py-2 rounded-full transition-colors ${
                aktivaKategorija === "all"
                  ? "bg-[#EEC71B] text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              Visi raksti
            </button>
            {kategorijas.map((kat) => (
              <button
                key={kat.id}
                onClick={() => setAktivaKategorija(kat.slug)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  aktivaKategorija === kat.slug
                    ? "bg-[#EEC71B] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                {kat.nosaukums}
              </button>
            ))}
          </motion.div>

          {/* Rakstu saraksts */}
          {ielade ? (
            <IeladesIndikators />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtretieRaksti.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <BlogKarte post={post} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      <Script
        id="schema-script"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "WebWorks Blogs",
            description:
              "Jaunākie raksti par web izstrādi, dizainu un digitālo mārketingu.",
            publisher: {
              "@type": "Organization",
              name: "WebWorks",
              url: "https://www.webworks.lv",
            },
            blogPost: posts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.virsraksts,
              description: post.ievads,
              datePublished: post.publicets_datums,
              image:
                post.attels_url ||
                "https://www.webworks.lv/images/default-blog-image.jpg",
              author: {
                "@type": "Person",
                name: `${post.autors?.vards} ${post.autors?.uzvards}`,
              },
              publisher: {
                "@type": "Organization",
                name: "WebWorks",
                url: "https://www.webworks.lv",
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://www.webworks.lv/blog/${post.slug}`,
              },
            })),
          }),
        }}
      />
    </>
  );
};

export default BlogPage;
