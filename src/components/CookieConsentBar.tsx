"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiShield,
  FiSettings,
  FiCheck,
  FiX,
  FiLock,
  FiGlobe,
} from "react-icons/fi";
import { BiCookie } from "react-icons/bi";

const CookieConsentBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: true,
    marketing: false,
    functional: true,
  });

  useEffect(() => {
    const consentStatus = localStorage.getItem("cookieConsent");
    const lastConsent = localStorage.getItem("cookieConsentTimestamp");
    const currentTime = new Date().getTime();

    if (
      !consentStatus ||
      !lastConsent ||
      currentTime - parseInt(lastConsent) > 86400000
    ) {
      setIsVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const timestamp = new Date().getTime();
    localStorage.setItem("cookieConsent", "accepted");
    localStorage.setItem("cookieConsentTimestamp", timestamp.toString());
    localStorage.setItem(
      "cookiePreferences",
      JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: true,
        functional: true,
      })
    );
    setIsVisible(false);
  };

  const handleDeclineAll = () => {
    const timestamp = new Date().getTime();
    localStorage.setItem("cookieConsent", "declined");
    localStorage.setItem("cookieConsentTimestamp", timestamp.toString());
    localStorage.setItem(
      "cookiePreferences",
      JSON.stringify({
        necessary: true,
        analytics: false,
        marketing: false,
        functional: false,
      })
    );
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    const timestamp = new Date().getTime();
    localStorage.setItem("cookieConsent", "customized");
    localStorage.setItem("cookieConsentTimestamp", timestamp.toString());
    localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
    setShowPreferences(false);
    setIsVisible(false);
  };

  const ButtonGradient = ({ children }: { children: React.ReactNode }) => (
    <div className="relative">
      <div className="absolute -inset-[0.5px] bg-gradient-to-r from-[#8CB8B4] to-[#EEC71B] rounded opacity-50 group-hover:opacity-75 transition duration-300" />
      <div className="relative bg-[#8CB8B4] hover:bg-[#EEC71B] transition-colors duration-300 rounded px-3 py-1.5 text-white">
        {children}
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#3D3B4A]/95 to-[#2C2A35]/95 backdrop-blur-sm" />

          <div className="relative container mx-auto max-w-7xl px-3 py-3">
            {!showPreferences ? (
              <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="flex flex-1 items-center gap-3 max-w-4xl lg:max-w-5xl">
                  <div className="relative flex-shrink-0">
                    <div className="relative bg-[#3D3B4A] p-1.5 rounded-full">
                      <BiCookie className="text-[#EEC71B] text-xl" />
                    </div>
                  </div>
                  <p className="text-gray-200 text-xs leading-relaxed md:text-sm text-center md:text-left whitespace-normal md:whitespace-nowrap">
                    Mēs izmantojam sīkdatnes, lai uzlabotu jūsu pārlūkošanas
                    pieredzi un nodrošinātu šīs mājaslapas optimālu darbību.
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 md:ml-8">
                  <button
                    onClick={handleDeclineAll}
                    className="group w-[88px] sm:w-[100px]"
                  >
                    <ButtonGradient>
                      <span className="flex items-center justify-center gap-1.5 text-xs font-medium">
                        <FiX className="text-sm" />
                        <span className="hidden sm:inline">Noraidīt</span>
                        <span className="sm:hidden">Nē</span>
                      </span>
                    </ButtonGradient>
                  </button>
                  <button
                    onClick={() => setShowPreferences(true)}
                    className="group w-[88px] sm:w-[100px]"
                  >
                    <ButtonGradient>
                      <span className="flex items-center justify-center gap-1.5 text-xs font-medium">
                        <FiSettings className="text-sm" />
                        <span className="hidden sm:inline">Iestatīt</span>
                        <span className="sm:hidden">Iestatīt</span>
                      </span>
                    </ButtonGradient>
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="group w-[88px] sm:w-[100px]"
                  >
                    <ButtonGradient>
                      <span className="flex items-center justify-center gap-1.5 text-xs font-medium">
                        <FiCheck className="text-sm" />
                        <span className="hidden sm:inline">Pieņemt</span>
                        <span className="sm:hidden">Jā</span>
                      </span>
                    </ButtonGradient>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-white flex items-center gap-2">
                    <FiShield className="text-[#EEC71B]" />
                    Sīkdatņu iestatījumi
                  </h3>
                  <button
                    onClick={() => setShowPreferences(false)}
                    className="text-gray-400 hover:text-[#CF4B43] transition-colors p-1"
                  >
                    <FiX className="text-lg" />
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    {
                      title: "Nepieciešamās",
                      description: "Būtiskas vietnes darbībai",
                      key: "necessary",
                      disabled: true,
                      icon: FiLock,
                    },
                    {
                      title: "Analītikas",
                      description: "Apmeklējumu analīzei un uzlabojumiem",
                      key: "analytics",
                      icon: BiCookie,
                    },
                    {
                      title: "Mārketinga",
                      description: "Personalizētai reklāmai",
                      key: "marketing",
                      icon: BiCookie,
                    },
                    {
                      title: "Funkcionālās",
                      description: "Papildu funkciju nodrošināšanai",
                      key: "functional",
                      icon: FiGlobe,
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between p-2 rounded bg-white/5 hover:bg-white/10 transition-colors duration-300"
                    >
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5">
                          <item.icon
                            className={`text-sm ${
                              item.disabled
                                ? "text-[#EEC71B]"
                                : "text-[#8CB8B4]"
                            }`}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-white text-xs">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-400">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <div className="relative ml-2">
                        <input
                          type="checkbox"
                          checked={
                            preferences[item.key as keyof typeof preferences]
                          }
                          disabled={item.disabled}
                          onChange={(e) =>
                            setPreferences({
                              ...preferences,
                              [item.key]: e.target.checked,
                            })
                          }
                          className="w-3.5 h-3.5 accent-[#EEC71B] cursor-pointer disabled:cursor-not-allowed"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end items-center gap-2 pt-2 border-t border-white/10">
                  <button
                    onClick={() => setShowPreferences(false)}
                    className="group w-[100px]"
                  >
                    <ButtonGradient>
                      <span className="flex items-center justify-center gap-1.5 text-xs font-medium">
                        <FiX className="text-sm" />
                        Atpakaļ
                      </span>
                    </ButtonGradient>
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    className="group w-[100px]"
                  >
                    <ButtonGradient>
                      <span className="flex items-center justify-center gap-1.5 text-xs font-medium">
                        <FiCheck className="text-sm" />
                        Saglabāt
                      </span>
                    </ButtonGradient>
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsentBar;
