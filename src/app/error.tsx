"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiHome, FiRefreshCw, FiAlertTriangle } from "react-icons/fi";
import Header from "../components/Header";

const ErrorPage: React.FC = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-100 to-white">
      <Header />
      <main className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FiAlertTriangle className="text-6xl text-red-600 mx-auto mb-4" />
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Kaut kas nogāja greizi
          </h1>
          <h2 className="text-2xl font-bold text-gray-700 mb-8">
            Servera kļūda (500)
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <p className="text-xl text-gray-600 mb-4">
            Atvainojamies par sagādātajām neērtībām. Mūsu serveris saskārās ar
            neparedzētu problēmu.
          </p>
          <p className="text-lg text-gray-500">
            Mēs strādājam, lai to atrisinātu pēc iespējas ātrāk. Lūdzu, mēģiniet
            vēlreiz pēc brīža.
          </p>
        </motion.div>

        <div className="flex justify-center space-x-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <FiHome className="mr-2" />
              Uz sākumlapu
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button
              onClick={handleRefresh}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
            >
              <FiRefreshCw className="mr-2" />
              Mēģināt vēlreiz
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Kamēr gaidāt, varat:
          </h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="text-indigo-600 hover:underline">
                Uzzināt vairāk par mums
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-indigo-600 hover:underline">
                Apskatīt biežāk uzdotos jautājumus
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-indigo-600 hover:underline">
                Sazināties ar mūsu atbalsta komandu
              </Link>
            </li>
            <li>
              <Link href="/status" className="text-indigo-600 hover:underline">
                Pārbaudīt mūsu sistēmas statusu
              </Link>
            </li>
          </ul>
        </motion.div>
      </main>
    </div>
  );
};
