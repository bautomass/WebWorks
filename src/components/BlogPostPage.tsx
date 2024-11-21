"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/utils/supabase";
import Header from "./Header";
import Footer from "./footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

// Types
interface BlogPost {
  id: number;
  virsraksts: string;
  ievads: string;
  saturs: string;
  publicets_datums: string;
  lasijuma_laiks: number;
  kategorija: {
    nosaukums: string;
    slug: string;
  };
  autors: {
    vards: string;
    uzvards: string;
    avatar_url?: string;
  };
  meta_title?: string;
  meta_description?: string;
}

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const MarkdownComponents = {
  h1: ({ children, ...props }: any) => {
    const id = children?.toString().toLowerCase().replace(/\s+/g, "-");
    return (
      <motion.h1
        id={id}
        className="scroll-m-20 text-3xl font-bold tracking-tight text-black mb-6" // Changed to text-black
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        {...props}
      >
        {children}
      </motion.h1>
    );
  },
  h2: ({ children, ...props }: any) => {
    const id = children?.toString().toLowerCase().replace(/\s+/g, "-");
    return (
      <motion.h2
        id={id}
        className="scroll-m-20 text-2xl font-semibold tracking-tight text-black mt-10 mb-4" // Changed to text-black
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        {...props}
      >
        {children}
      </motion.h2>
    );
  },
  h3: ({ children, ...props }: any) => {
    const id = children?.toString().toLowerCase().replace(/\s+/g, "-");
    return (
      <motion.h3
        id={id}
        className="scroll-m-20 text-xl font-semibold tracking-tight text-black mt-8 mb-4" // Changed to text-black
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        {...props}
      >
        {children}
      </motion.h3>
    );
  },
  p: ({ children }: any) => (
    <p className="leading-7 [&:not(:first-child)]:mt-6 text-gray-700">
      {children}
    </p>
  ),
  ul: ({ children }: any) => (
    <ul className="my-6 list-none space-y-2.5">{children}</ul>
  ),
  ol: ({ children }: any) => (
    <ol className="my-6 list-none space-y-2.5">{children}</ol>
  ),
  li: ({ children, ordered }: any) => (
    <li className="flex items-start space-x-3">
      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#EEC71B]" />
      <span>{children}</span>
    </li>
  ),
  img: ({ src, alt, ...props }: any) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="my-8 overflow-hidden rounded-xl shadow-lg"
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-cover transition-transform hover:scale-105 duration-700"
        loading="lazy"
        {...props}
      />
      {alt && (
        <p className="text-sm text-gray-600 text-center mt-2 italic px-4 py-2 bg-gray-50">
          {alt}
        </p>
      )}
    </motion.div>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="mt-6 border-l-4 border-[#EEC71B] pl-6 italic text-gray-700 [&>p]:mt-0">
      {children}
    </blockquote>
  ),
};

// Enhanced Loading Component
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <motion.div
      className="relative w-20 h-20"
      animate={{
        rotate: 360,
        scale: [1, 1.1, 1],
      }}
      transition={{
        rotate: {
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        },
        scale: {
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <div className="absolute inset-0 border-4 border-[#EEC71B]/20 rounded-full" />
      <div className="absolute inset-0 border-4 border-t-[#EEC71B] rounded-full" />
    </motion.div>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="mt-4 text-gray-700 font-medium"
    >
      Ielādējam rakstu...
    </motion.p>
  </div>
);

// Enhanced Share Buttons with X (formerly Twitter) and Copy Link
const ShareButtons = ({ title, url }: { title: string; url: string }) => {
  const [copied, setCopied] = useState(false);

  const shareButtons = [
    {
      name: "LinkedIn",
      color: "#0077b5",
      hoverBg: "hover:bg-[#0077b5]/10",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    },
    {
      name: "X",
      color: "#000000",
      hoverBg: "hover:bg-gray-100",
      url: `https://x.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${url}`,
    },
    {
      name: "Facebook",
      color: "#4267B2",
      hoverBg: "hover:bg-[#4267B2]/10",
      url: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <TooltipProvider>
      <motion.div
        className="flex items-center gap-3"
        variants={staggerChildren}
        initial="initial"
        animate="animate"
      >
        {shareButtons.map((button) => (
          <Tooltip key={button.name}>
            <TooltipTrigger asChild>
              <motion.button
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(button.url, "_blank")}
                className={cn(
                  "relative px-4 py-2 rounded-lg transition-all duration-300",
                  button.hoverBg
                )}
                aria-label={`Share on ${button.name}`}
              >
                <span
                  className="block text-sm font-medium transition-colors"
                  style={{ color: button.color }}
                >
                  {button.name}
                  <span
                    className="absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    style={{ backgroundColor: button.color }}
                  />
                </span>
              </motion.button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">Dalīties {button.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}

        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyToClipboard}
              className="relative px-4 py-2 rounded-lg transition-all duration-300 hover:bg-gray-100"
              aria-label="Copy link"
            >
              <span className="block text-sm font-medium text-gray-600">
                {copied ? "Kopēts!" : "Kopēt saiti"}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </span>
            </motion.button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">
              {copied ? "Saite nokopēta!" : "Kopēt saiti"}
            </p>
          </TooltipContent>
        </Tooltip>
      </motion.div>
    </TooltipProvider>
  );
};

// Improved Table of Contents with better visibility
const TableOfContents = ({ content }: { content: string }) => {
  const headers = content.match(/^#{2,3} .+$/gm) || [];
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px", threshold: 0.5 }
    );

    document
      .querySelectorAll("h2, h3")
      .forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, []);

  if (headers.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl p-6 mb-8 sticky top-4 hidden lg:block border border-gray-200 shadow-sm"
    >
      <h2 className="text-lg font-semibold mb-4 text-[#3D3B4A] pb-2 border-b border-gray-100">
        Satura rādītājs
      </h2>
      <nav className="space-y-1">
        {headers.map((header, index) => {
          const level = header.match(/^#{2,3}/)?.[0].length || 2;
          const title = header.replace(/^#{2,3} /, "");
          const id = title.toLowerCase().replace(/\s+/g, "-");

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <a
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(id)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className={cn(
                  "block py-2 px-3 rounded-lg transition-all duration-300",
                  level === 3 ? "ml-4 text-sm" : "font-medium",
                  activeId === id
                    ? "text-[#EEC71B] bg-[#EEC71B]/10"
                    : "text-gray-700 hover:text-[#EEC71B] hover:bg-gray-50"
                )}
              >
                <div className="flex items-center gap-2">
                  {activeId === id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="w-1.5 h-1.5 bg-[#EEC71B] rounded-full"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  <span>{title}</span>
                </div>
              </a>
            </motion.div>
          );
        })}
      </nav>
    </motion.div>
  );
};

// Updated styles for better list spacing and heading visibility
const blogStyles = `
    .blog-content {
      color: #374151;
      font-size: 1.125rem;
      line-height: 1.75;
      max-width: 100%;
    }
  
    .blog-content h1,
    .blog-content h2,
    .blog-content h3,
    .blog-content h4 {
      color: #000000;
      font-weight: 700;
      line-height: 1.3;
      scroll-margin-top: 100px;
    }
  
    .blog-content h1 {
      font-size: 2.5rem;
      margin: 2rem 0 1.5rem;
      color: #000000; 
    }
  
    .blog-content h2 {
      font-size: 2rem;
      margin: 2.5rem 0 1.25rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #eec71b;
      color: #000000; 
    }
  
    .blog-content h3 {
      font-size: 1.5rem;
      margin: 2rem 0 1rem;
      color: #000000; 
    }
  
    .blog-content p {
      margin: 1rem 0;
      line-height: 1.8;
      color: #374151;
    }
  
    .blog-content ul,
    .blog-content ol {
      margin: 1rem 0;
      padding-left: 1rem;
    }
  
    .blog-content li {
      margin-bottom: 0.5rem;
      line-height: 1.6;
      color: #374151;
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
    }
  
    .blog-content li::before {
      content: "";
      width: 6px;
      height: 6px;
      background-color: #eec71b;
      border-radius: 50%;
      margin-top: 0.7rem;
      flex-shrink: 0;
    }
  
    .blog-content img {
      max-width: 100%;
      height: auto;
      border-radius: 0.75rem;
      margin: 2rem auto;
      display: block;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
  
    .blog-content blockquote {
      margin: 2rem 0;
      padding: 1.5rem 2rem;
      background: linear-gradient(to right, #eec71b0f, transparent);
      border-left: 4px solid #eec71b;
      border-radius: 0 0.75rem 0.75rem 0;
    }
  
    .blog-content blockquote p {
      margin: 0;
      font-style: italic;
      color: #4b5563;
    }
  
    @media (max-width: 768px) {
      .blog-content {
        font-size: 1rem;
      }
  
      .blog-content h1 { font-size: 2rem; }
      .blog-content h2 { font-size: 1.75rem; }
      .blog-content h3 { font-size: 1.5rem; }
    }
  `;

// Progress Bar Component with improved visibility
const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const windowHeight = scrollHeight - clientHeight;
      const currentProgress = (scrollTop / windowHeight) * 100;
      setProgress(currentProgress);
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-1.5 bg-[#EEC71B]/10 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div
        className="h-full bg-[#EEC71B]"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </motion.div>
  );
};

// Main BlogPostPage Component
const BlogPostPage = ({ slug }: { slug: string }) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchPost = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select(
          `
            *,
            kategorija:kategorija_id(nosaukums, slug),
            autors:autors_id(vards, uzvards, avatar_url)
          `
        )
        .eq("slug", slug)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error("Error fetching post:", error);
      router.push("/404");
    } finally {
      setLoading(false);
    }
  }, [slug, router]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  useEffect(() => {
    // Scroll to hash if present
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [post]);

  if (loading) return <LoadingSpinner />;
  if (!post) return null;

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <>
      <ReadingProgress />
      <Header />

      <main className="min-h-screen bg-gray-50 pt-8 lg:pt-16 pb-12 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Sidebar */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-8 space-y-6">
                <Link
                  href="/blog"
                  className="group inline-flex items-center text-base font-medium text-gray-700 hover:text-[#EEC71B] transition-colors"
                >
                  <motion.span
                    initial={{ x: 0 }}
                    animate={{ x: [0, -4, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                    className="mr-2"
                  >
                    ←
                  </motion.span>
                  <span className="group-hover:underline">
                    Atpakaļ uz rakstiem
                  </span>
                </Link>

                <TableOfContents content={post.saturs} />
              </div>
            </div>

            {/* Main content */}
            <article className="lg:col-span-9">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 lg:p-8">
                  {/* Meta information */}
                  <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                    <time className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                      {new Date(post.publicets_datums).toLocaleDateString(
                        "lv-LV",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </time>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                      {post.lasijuma_laiks} min lasīšanas
                    </span>
                    <Link
                      href={`/blog?category=${post.kategorija.slug}`}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-[#EEC71B]/10 text-[#3D3B4A] hover:bg-[#EEC71B]/20 transition-colors"
                    >
                      {post.kategorija.nosaukums}
                    </Link>
                  </div>

                  {/* Title and intro */}
                  <div className="mb-12">
                    <h1 className="text-3xl lg:text-4xl font-bold text-black mb-6 leading-tight">
                      {" "}
                      {post.virsraksts}
                    </h1>
                    <p className="text-xl text-gray-700 leading-relaxed">
                      {post.ievads}
                    </p>
                  </div>

                  {/* Main content */}
                  <div className="blog-content prose prose-lg max-w-none">
                    <ReactMarkdown components={MarkdownComponents}>
                      {post.saturs}
                    </ReactMarkdown>
                  </div>

                  {/* Author and share section */}
                  <div className="mt-12 pt-8 border-t border-gray-100">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#EEC71B]/10 flex items-center justify-center overflow-hidden">
                          <motion.img
                            src="/images/authors/webworks-avatar.jpg"
                            alt="WebWorks"
                            className="w-8 h-8"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-[#3D3B4A]">
                            {post.autors.vards}
                          </p>
                          <p className="text-sm text-gray-600">Raksta autors</p>
                        </div>
                      </div>

                      <ShareButtons title={post.virsraksts} url={currentUrl} />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx global>
        {`
          ${blogStyles}

          /* Additional styles for better readability */
            .blog-content {
            font-feature-settings: "kern", "liga", "clig", "calt";
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          /* Better link styles */
          .blog-content a {
            color: #eec71b;
            text-decoration: none;
            font-weight: 500;
            padding-bottom: 1px;
            border-bottom: 1px solid transparent;
            transition: border-color 0.2s ease;
          }

          .blog-content a:hover {
            border-color: #eec71b;
          }

          /* Improved code blocks */
          .blog-content pre {
            background-color: #1a1a1a;
            color: #e0e0e0;
            padding: 1.5rem;
            border-radius: 0.75rem;
            overflow-x: auto;
            margin: 2rem 0;
          }

          .blog-content pre code {
            background: none;
            color: inherit;
            font-size: 0.9em;
            padding: 0;
          }

          /* Print optimizations */
          @media print {
            .blog-content {
              font-size: 12pt;
            }

            .blog-content pre,
            .blog-content code {
              white-space: pre-wrap;
              word-break: break-all;
            }

            .blog-content a {
              text-decoration: underline;
              color: #000;
            }

            .blog-content img {
              max-height: 4in;
            }
          }

          /* Dark mode improvements */
          @media (prefers-color-scheme: dark) {
            .blog-content {
              color: #e5e7eb;
            }

            .blog-content h1,
            .blog-content h2,
            .blog-content h3,
            .blog-content h4 {
              color: #000000;
            }

            .blog-content a {
              color: #eec71b;
            }

            .blog-content blockquote {
              background: linear-gradient(
                to right,
                rgba(238, 199, 27, 0.1),
                transparent
              );
            }
          }
        `}
      </style>
    </>
  );
};

export default BlogPostPage;
