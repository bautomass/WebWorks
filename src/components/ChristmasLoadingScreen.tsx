"use client";
import React, { memo } from "react";
import { motion as m } from "framer-motion";

const ChristmasLoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#0F172A] to-[#1E293B] flex items-center justify-center z-50">
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative text-center px-4"
      >
        {/* Main loader ring */}
        <div className="relative inline-block">
          <m.div
            className="w-20 h-20 border-4 border-t-red-500 border-r-green-500 border-b-blue-500 border-l-yellow-500 rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Inner progress circle */}
          <m.div
            className="absolute inset-2 border-4 border-white/20 rounded-full"
            animate={{
              rotate: [-120, 120],
              borderColor: [
                "rgba(255,255,255,0.2)",
                "rgba(255,255,255,0.8)",
                "rgba(255,255,255,0.2)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Central icon */}
          <m.div
            className="absolute inset-0 flex items-center justify-center text-2xl"
            animate={{ scale: [0.8, 1, 0.8] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🎄
          </m.div>
        </div>

        {/* Progress steps */}
        <div className="mt-8 flex justify-center gap-4 mb-6">
          {["🎯", "✨", "🎁"].map((icon, i) => (
            <m.div
              key={i}
              className="relative"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            >
              <div className="text-xl">{icon}</div>
              <m.div
                className="absolute -inset-1 bg-white/10 rounded-full blur-md"
                animate={{
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            </m.div>
          ))}
        </div>

        {/* Loading text */}
        <div className="space-y-2 relative">
          <m.div
            className="text-white/90 font-medium"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="text-lg">Sagatavojam konkursa pieteikumu</div>
            <div className="text-sm text-white/60 mt-1">
              Lūdzu uzgaidiet brīdi...
            </div>
          </m.div>

          {/* Animated progress bar */}
          <div className="w-48 h-1 mx-auto bg-white/10 rounded-full overflow-hidden mt-4">
            <m.div
              className="h-full bg-gradient-to-r from-red-500 via-green-500 to-blue-500"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </m.div>
    </div>
  );
};

export default memo(ChristmasLoadingScreen);
