"use client";
import React, { memo, useEffect, useState } from "react";
import Link from "next/link";
import { motion, LazyMotion, domAnimation, m } from "framer-motion";
import { FiGift } from "react-icons/fi";
import { useRouter } from "next/navigation";
import ChristmasLoadingScreen from "./ChristmasLoadingScreen"; // Make sure path is correct

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
    className="text-[#3D3B4A] relative flex-shrink-0"
  >
    <FiGift className="text-lg sm:text-xl" />
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
  return (
    <LazyMotion features={domAnimation}>
      <div
        className="bg-[#EEC71B] relative overflow-hidden"
        role="banner"
        aria-label="Christmas Contest Results"
      >
        <div
          className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:24px_24px] opacity-20"
          aria-hidden="true"
        >
          <Sparkles />
        </div>

        <Link
          href="/ziemassvetku-konkurss"
          className="block py-2.5 sm:py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D3B4A] focus-visible:ring-opacity-75 relative z-10"
          aria-label="Apskatīt Ziemassvētku konkursa rezultātus"
        >
          <m.div
            className="container mx-auto px-3 sm:px-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              type: "tween",
              ease: "easeOut",
            }}
          >
            <div className="flex items-center justify-center space-x-2 sm:space-x-3 text-[#3D3B4A]">
              <MotionGift />
              <span className="font-medium text-sm sm:text-base">
                <span className="sr-only">Apsveicam</span>
                Ziemassvētku konkurss noslēdzies!{" "}
                <span className="whitespace-nowrap">
                  Apsveicam uzvarētāju
                  <span className="hidden sm:inline"> Linda G.</span>
                </span>
              </span>
              <m.span
                className="hidden sm:inline-block font-bold underline decoration-2 underline-offset-2 hover:text-[#2D2B3A] transition-colors"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "tween", duration: 0.2 }}
              >
                Apskatīt rezultātus
                <span aria-hidden="true" className="ml-1">
                  →
                </span>
              </m.span>
              <m.span
                className="sm:hidden inline-block text-sm font-bold"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "tween", duration: 0.2 }}
              >
                →
              </m.span>
            </div>
          </m.div>
        </Link>
      </div>
    </LazyMotion>
  );
};

export default memo(ChristmasPromoBanner);
