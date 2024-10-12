"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiHome, FiSearch } from "react-icons/fi";
import Header from "../components/Header";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <Header />
      <main className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl font-extrabold text-indigo-700 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Lapa nav atrasta
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <p className="text-xl text-gray-600 mb-4">
            Atvainojamies, bet meklētā lapa neeksistē vai ir pārvietota.
          </p>
          <p className="text-lg text-gray-500">
            Pārbaudiet URL adresi vai izmantojiet zemāk esošās pogas, lai
            atrastu meklēto.
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
            <Link
              href="/search"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
            >
              <FiSearch className="mr-2" />
              Meklēt
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Varbūt jūs meklējat:
          </h3>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="text-indigo-600 hover:underline">
                Par mums
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="text-indigo-600 hover:underline"
              >
                Mūsu pakalpojumi
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-indigo-600 hover:underline">
                Kontakti
              </Link>
            </li>
            <li>
              <Link
                href="/cookie-consent-generator"
                className="text-indigo-600 hover:underline"
              >
                Sīkdatņu piekrišanas ģenerators
              </Link>
            </li>
          </ul>
        </motion.div>
      </main>
    </div>
  );
};

export default NotFound;
