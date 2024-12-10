"use client";
import React, { memo, useEffect } from "react";
import Link from "next/link";
import { motion, LazyMotion, domAnimation, m } from "framer-motion";
import { FiGift } from "react-icons/fi";

const MotionGift = memo(() => (
  <m.div
    aria-hidden="true"
    animate={{
      rotate: [0, 8, -8, 8, 0],
      scale: [1, 1.05, 1, 1.05, 1],
    }}
    transition={{
      duration: 2.5,
      repeat: Infinity,
      repeatType: "reverse",
      type: "tween",
      ease: "easeInOut",
    }}
    className="text-[#3D3B4A] relative"
  >
    <FiGift className="text-xl" />
    <m.div
      className="absolute -inset-1 bg-white/20 rounded-full blur-sm"
      animate={{
        opacity: [0, 0.5, 0],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        type: "tween",
      }}
    />
  </m.div>
));

MotionGift.displayName = "MotionGift";

const Sparkles = memo(() => (
  <div className="absolute inset-0" aria-hidden="true">
    {[...Array(3)].map((_, i) => (
      <m.div
        key={i}
        className="absolute w-1 h-1 bg-white/40 rounded-full"
        style={{
          left: `${15 + i * 35}%`,
          top: `${20 + i * 20}%`,
        }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          delay: i * 0.5,
          repeat: Infinity,
          type: "tween",
        }}
      />
    ))}
  </div>
));

Sparkles.displayName = "Sparkles";

const ChristmasPromoBanner = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = "/ziemassvetku-konkurss";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <div
        className="bg-[#EEC71B] relative overflow-hidden"
        role="banner"
        aria-label="Christmas Contest Promotion"
      >
        <div
          className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:24px_24px] opacity-20"
          aria-hidden="true"
        >
          <Sparkles />
        </div>

        <Link
          href="/ziemassvetku-konkurss"
          className="block py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D3B4A] focus-visible:ring-opacity-75 relative z-10"
          aria-label="Piedalīties Ziemassvētku konkursā un laimēt mājaslapu €199 vērtībā"
        >
          <m.div
            className="container mx-auto px-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              type: "tween",
              ease: "easeOut",
            }}
          >
            <div className="flex items-center justify-center space-x-3 text-[#3D3B4A]">
              <MotionGift />
              <span className="font-medium">
                <span className="sr-only">Piedalies</span>
                Ziemassvētku konkurss! Laimē mājaslapu
                <span className="hidden sm:inline"> (€199 vērtībā)</span>
              </span>
              <m.span
                className="hidden sm:inline-block font-bold underline decoration-2 underline-offset-2 hover:text-[#2D2B3A] transition-colors"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "tween", duration: 0.2 }}
              >
                Piedalīties
                <span aria-hidden="true" className="ml-1">
                  →
                </span>
              </m.span>
            </div>
          </m.div>
        </Link>
      </div>
    </LazyMotion>
  );
};

export default memo(ChristmasPromoBanner);
