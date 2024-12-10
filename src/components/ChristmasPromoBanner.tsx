"use client";
import React, { memo } from "react";
import Link from "next/link";
import { motion, LazyMotion, domAnimation, m } from "framer-motion";
import { FiGift } from "react-icons/fi";

const MotionGift = memo(() => (
  <m.div
    aria-hidden="true"
    animate={{
      rotate: [0, 10, -10, 10, 0],
      scale: [1, 1.1, 1, 1.1, 1],
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse",
      // Optimize animation performance
      type: "tween",
      ease: "easeInOut",
    }}
  >
    <FiGift className="text-xl" />
  </m.div>
));

MotionGift.displayName = "MotionGift";

const ChristmasPromoBanner = () => {
  // Preconnect hint for the contest page
  React.useEffect(() => {
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
        {/* Use CSS background instead of an image for better performance */}
        <div
          className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:24px_24px] opacity-10"
          aria-hidden="true"
        />

        <Link
          href="/ziemassvetku-konkurss"
          className="block py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D3B4A] focus-visible:ring-opacity-75"
          aria-label="Piedalīties Ziemassvētku konkursā un laimēt mājaslapu €199 vērtībā"
        >
          <m.div
            className="container mx-auto px-4 text-center relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              type: "tween",
              ease: "easeOut",
            }}
          >
            <div className="flex items-center justify-center space-x-2 text-[#3D3B4A]">
              <MotionGift />
              <span className="font-medium">
                <span className="sr-only">Piedalies</span>
                Ziemassvētku konkurss! Laimē mājaslapu
                <span className="hidden sm:inline"> (€199 vērtībā)</span>
              </span>
              <m.span
                className="hidden sm:inline-block font-bold underline decoration-2 underline-offset-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "tween", duration: 0.2 }}
              >
                Piedalīties
                <span aria-hidden="true"> →</span>
              </m.span>
            </div>
          </m.div>
        </Link>
      </div>
    </LazyMotion>
  );
};

// Prevent unnecessary re-renders
export default memo(ChristmasPromoBanner);
