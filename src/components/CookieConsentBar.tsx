"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiShield, FiSettings, FiCheck, FiX, FiLock } from "react-icons/fi";
import { BiCookie } from "react-icons/bi";

const CookieConsentBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: true,
    marketing: false,
    preferences: true,
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
        preferences: true,
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
        preferences: false,
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

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          {/* Backdrop blur and gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#3D3B4A]/95 to-[#2C2A35]/95 backdrop-blur-sm" />

          {/* Main content */}
          <div className="relative container mx-auto max-w-7xl px-4 py-6">
            {!showPreferences ? (
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#8CB8B4] to-[#EEC71B] rounded-full blur opacity-40" />
                    <div className="relative bg-[#3D3B4A] p-2 rounded-full">
                      <BiCookie className="text-[#EEC71B] text-3xl" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">
                      Sīkdatņu iestatījumi
                    </h3>
                    <p className="text-gray-200 text-sm leading-relaxed max-w-2xl">
                      Mēs izmantojam sīkdatnes, lai uzlabotu jūsu pārlūkošanas
                      pieredzi un nodrošinātu mūsu vietnes optimālu darbību. Jūs
                      varat pielāgot savas preferences vai pieņemt visas
                      sīkdatnes.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <button
                    onClick={handleDeclineAll}
                    className="px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-[#CF4B43]/20 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <FiX className="text-lg" />
                    Noraidīt visas
                  </button>
                  <button
                    onClick={() => setShowPreferences(true)}
                    className="px-4 py-2.5 text-sm font-medium bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <FiSettings className="text-[#EEC71B]" />
                    Preferences
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8CB8B4] to-[#EEC71B] rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300" />
                    <div className="relative bg-[#8CB8B4] hover:bg-[#EEC71B] transition-colors duration-300 w-full h-full rounded-lg px-4 py-2.5 flex items-center justify-center text-white">
                      <FiCheck className="text-lg" />
                      Pieņemt visas
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-[#2C2A35] rounded-lg p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-white flex items-center gap-3">
                    <FiShield className="text-[#EEC71B]" />
                    Sīkdatņu preferences
                  </h3>
                  <button
                    onClick={() => setShowPreferences(false)}
                    className="text-gray-400 hover:text-[#CF4B43] transition-colors"
                  >
                    <FiX className="text-2xl" />
                  </button>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      title: "Nepieciešamās sīkdatnes",
                      description: "Šīs sīkdatnes ir būtiskas vietnes darbībai",
                      key: "necessary",
                      disabled: true,
                    },
                    {
                      title: "Analītikas sīkdatnes",
                      description: "Palīdz mums uzlabot vietnes darbību",
                      key: "analytics",
                    },
                    {
                      title: "Mārketinga sīkdatnes",
                      description: "Tiek izmantotas mērķētai reklāmai",
                      key: "marketing",
                    },
                    {
                      title: "Preferenču sīkdatnes",
                      description:
                        "Saglabā jūsu vietnes lietošanas preferences",
                      key: "preferences",
                    },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {item.disabled ? (
                            <FiLock className="text-[#EEC71B]" />
                          ) : (
                            <BiCookie className="text-[#8CB8B4]" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-white">{item.title}</p>
                          <p className="text-sm text-gray-400">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <div className="relative">
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
                          className="w-4 h-4 accent-[#EEC71B] cursor-pointer disabled:cursor-not-allowed"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => setShowPreferences(false)}
                    className="px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    Atpakaļ
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    className="px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 relative group"
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8CB8B4] to-[#EEC71B] rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-300" />
                    <div className="relative bg-[#8CB8B4] hover:bg-[#EEC71B] transition-colors duration-300 w-full h-full rounded-lg px-4 py-2.5 flex items-center justify-center text-white">
                      <FiCheck className="text-lg" />
                      Saglabāt preferences
                    </div>
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
