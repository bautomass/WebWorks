"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../utils/supabase";
import Header from "../components/Header";
import Footer from "../components/footer";
import Script from "next/script";
import {
  FiFileText,
  FiCalendar,
  FiPrinter,
  FiLoader,
  FiAlertTriangle,
  FiCheckCircle,
  FiExternalLink,
  FiMail,
} from "react-icons/fi";

type Saturs = {
  virsraksts: string;
  apaksvirsraksts: string;
  pedeja_atjaunosana: string;
  speka_stasanas_datums: string;
  ievada_teksts: string;
  kontakta_epasts: string;
};

type Sadala = {
  id: number;
  virsraksts: string;
  saturs: string;
  secibas_numurs: number;
  ir_svarigs: boolean;
  apakssadalas?: Apakssadala[];
};

type Apakssadala = {
  id: number;
  virsraksts: string;
  saturs: string;
  secibas_numurs: number;
};

// Ielādes indikators
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
    <p className="mt-4 text-gray-600">Ielādē saturu...</p>
  </div>
);

// Satura rādītājs
const SaturaRaditajs = ({
  sadalas,
  aktivaSadala,
}: {
  sadalas: Sadala[];
  aktivaSadala: string;
}) => (
  <nav className="hidden lg:block sticky top-8 bg-white rounded-xl shadow-lg p-6 h-fit">
    <h2 className="text-lg font-semibold mb-4 text-[#3D3B4A]">
      Satura rādītājs
    </h2>
    <ul className="space-y-2">
      {sadalas.map((sadala) => (
        <li key={sadala.id}>
          <a
            href={`#sadala-${sadala.id}`}
            className={`flex items-center gap-2 py-1.5 px-3 rounded-lg transition-colors ${
              aktivaSadala === `sadala-${sadala.id}`
                ? "bg-[#EEC71B]/10 text-[#3D3B4A]"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {sadala.ir_svarigs && (
              <FiAlertTriangle className="text-[#EEC71B] flex-shrink-0" />
            )}
            <span>{sadala.virsraksts}</span>
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

const LietosanasNoteikumi = () => {
  const [saturs, setSaturs] = useState<Saturs | null>(null);
  const [sadalas, setSadalas] = useState<Sadala[]>([]);
  const [ielade, setIelade] = useState(true);
  const [aktivaSadala, setAktivaSadala] = useState<string | null>(null);

  useEffect(() => {
    const ielādetSaturu = async () => {
      try {
        const { data: satursData, error: satursKluda } = await supabase
          .from("lietosanas_noteikumi_saturs")
          .select("*")
          .single();

        if (satursKluda) throw satursKluda;

        const { data: sadalasData, error: sadalasKluda } = await supabase
          .from("lietosanas_noteikumi_sadala")
          .select(
            `
            *,
            apakssadalas: lietosanas_noteikumi_apakssadala (*)
          `
          )
          .order("secibas_numurs");

        if (sadalasKluda) throw sadalasKluda;

        setSaturs(satursData);
        setSadalas(sadalasData || []);
      } catch (kluda) {
        console.error("Kļūda ielādējot saturu:", kluda);
      } finally {
        setIelade(false);
      }
    };

    ielādetSaturu();
  }, []);

  useEffect(() => {
    const noverotajs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAktivaSadala(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      noverotajs.observe(section);
    });

    return () => noverotajs.disconnect();
  }, [sadalas]);

  const drukat = () => {
    window.print();
  };

  if (ielade) return <IeladesIndikators />;
  if (!saturs) return null;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 pt-16 pb-24 print:bg-white print:pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Galvene */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#EEC71B]/10 rounded-full mb-6">
              <FiFileText className="text-[#EEC71B] text-3xl" />
            </div>
            <h1 className="text-4xl font-bold text-[#3D3B4A] mb-4">
              {saturs.virsraksts}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {saturs.apaksvirsraksts}
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <FiCalendar />
                Pēdējie grozījumi:{" "}
                {new Date(saturs.pedeja_atjaunosana).toLocaleDateString(
                  "lv-LV"
                )}
              </span>
              <button
                onClick={drukat}
                className="flex items-center gap-2 hover:text-[#3D3B4A] transition-colors print:hidden"
              >
                <FiPrinter />
                Drukāt dokumentu
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Satura rādītājs */}
            <SaturaRaditajs
              sadalas={sadalas}
              aktivaSadala={aktivaSadala || ""}
            />

            {/* Galvenais saturs */}
            <div className="lg:col-span-3">
              {/* Ievads */}
              <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                <p className="text-gray-600 leading-relaxed">
                  {saturs.ievada_teksts}
                </p>
              </div>

              {/* Noteikumu sadaļas */}
              <div className="space-y-8">
                {sadalas.map((sadala) => (
                  <motion.section
                    key={sadala.id}
                    id={`sadala-${sadala.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-xl shadow-lg p-8"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      {sadala.ir_svarigs && (
                        <FiAlertTriangle className="text-[#EEC71B] text-xl flex-shrink-0 mt-1" />
                      )}
                      <h2 className="text-2xl font-bold text-[#3D3B4A]">
                        {sadala.virsraksts}
                      </h2>
                    </div>

                    <div
                      className="prose prose-lg max-w-none text-gray-600"
                      dangerouslySetInnerHTML={{
                        __html: sadala.saturs.replace(/\n/g, "<br>"),
                      }}
                    />

                    {sadala.apakssadalas?.map((apakssadala) => (
                      <div
                        key={apakssadala.id}
                        className="mt-6 pt-6 border-t border-gray-100"
                      >
                        <h3 className="text-xl font-semibold text-[#3D3B4A] mb-3">
                          {apakssadala.virsraksts}
                        </h3>
                        <div
                          className="prose prose-lg max-w-none text-gray-600"
                          dangerouslySetInnerHTML={{
                            __html: apakssadala.saturs.replace(/\n/g, "<br>"),
                          }}
                        />
                      </div>
                    ))}
                  </motion.section>
                ))}
              </div>

              {/* Kontaktinformācija */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#3D3B4A] text-white rounded-xl shadow-lg p-8 mt-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <FiMail className="text-[#EEC71B] text-2xl" />
                  <h2 className="text-xl font-semibold">Kontaktinformācija</h2>
                </div>
                <p className="text-gray-300 mb-4">
                  Ja Jums ir jautājumi par šiem lietošanas noteikumiem vai
                  vēlaties iegūt papildu informāciju, lūdzu, sazinieties ar
                  mums:
                </p>
                <a
                  href={`mailto:${saturs.kontakta_epasts}`}
                  className="text-[#EEC71B] hover:underline"
                >
                  {saturs.kontakta_epasts}
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <Script
        id="schema-script"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: saturs.virsraksts,
            description: saturs.ievada_teksts,
            dateModified: saturs.pedeja_atjaunosana,
            publisher: {
              "@type": "Organization",
              name: "WebWorks",
              url: "https://www.webworks.lv",
            },
            mainEntity: {
              "@type": "WebPage",
              name: "Lietošanas Noteikumi",
              text: sadalas
                .map((s) => s.virsraksts + ": " + s.saturs)
                .join(" "),
              datePublished: saturs.speka_stasanas_datums,
              dateModified: saturs.pedeja_atjaunosana,
              author: {
                "@type": "Organization",
                name: "WebWorks",
                url: "https://www.webworks.lv",
              },
            },
            speakable: {
              "@type": "SpeakableSpecification",
              cssSelector: [".main-content", ".section-content"],
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Sākums",
                  item: "https://www.webworks.lv",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Lietošanas Noteikumi",
                  item: "https://www.webworks.lv/lietosanas-noteikumi",
                },
              ],
            },
          }),
        }}
      />

      {/* Drukas stili */}
      <style jsx global>{`
        @media print {
          .print\\:hidden {
            display: none !important;
          }

          body {
            font-size: 12pt;
            color: black;
          }

          h1 {
            font-size: 20pt;
            margin-bottom: 20pt;
          }

          h2 {
            font-size: 16pt;
            margin-top: 15pt;
            margin-bottom: 10pt;
          }

          h3 {
            font-size: 14pt;
            margin-top: 10pt;
            margin-bottom: 8pt;
          }

          p {
            margin-bottom: 8pt;
            orphans: 3;
            widows: 3;
          }

          section {
            page-break-inside: avoid;
          }

          a {
            text-decoration: none;
            color: black;
          }

          .prose {
            max-width: none;
          }

          .shadow-lg {
            box-shadow: none;
          }

          .rounded-xl {
            border-radius: 0;
          }

          .bg-gray-50,
          .bg-white {
            background: white;
          }

          .text-gray-600 {
            color: black;
          }
        }
      `}</style>
    </>
  );
};

// Papildu palīdzības komponenti
const PulkstenisIndikators = () => (
  <div className="flex items-center gap-2 text-sm text-gray-500">
    <FiCalendar className="text-[#EEC71B]" />
    <span>Lasīšanas laiks: ~10 min</span>
  </div>
);

const PantuSadalitajs = ({ text }: { text: string }) => (
  <div className="space-y-4">
    {text.split("\n\n").map((paragraph, index) => (
      <p key={index} className="text-gray-600 leading-relaxed">
        {paragraph}
      </p>
    ))}
  </div>
);

const SvarigsPazinojums = ({ text }: { text: string }) => (
  <div className="flex items-start gap-3 bg-[#EEC71B]/10 p-4 rounded-lg mb-4">
    <FiAlertTriangle className="text-[#EEC71B] text-xl flex-shrink-0 mt-1" />
    <div>
      <h4 className="font-semibold text-[#3D3B4A] mb-1">Svarīgs paziņojums</h4>
      <p className="text-gray-600">{text}</p>
    </div>
  </div>
);

const GrozijumuVersija = ({
  version,
  date,
}: {
  version: string;
  date: string;
}) => (
  <div className="inline-flex items-center gap-2 text-sm bg-gray-100 px-3 py-1 rounded-full">
    <span className="text-gray-600">Versija {version}</span>
    <span className="text-gray-400">|</span>
    <span className="text-gray-600">{date}</span>
  </div>
);

export default LietosanasNoteikumi;
