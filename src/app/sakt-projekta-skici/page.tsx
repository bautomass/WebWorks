import React from "react";
import Head from "next/head";
import Header from "../../components/Header";
import SketchBuilder from "../../components/SketchBuilder";
import SEOMetadata from "../../components/SEOMetadata";

export default function SketchToolPage() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SEOMetadata
        title="Inovatīvs Mājaslapas Skices Veidotājs | Webworks"
        description="Radiet savu sapņu mājaslapu ar mūsu revolucionāro skices veidotāju. Vizualizējiet, pielāgojiet un dalieties ar savām idejām vieglāk nekā jebkad agrāk!"
        keywords="mājaslapu izstrāde, web dizains, interaktīvs skices rīks, vizuālais plānotājs, Latvija"
      />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-blue-600">
            Jūsu Sapņu Mājaslapas Skices Veidotājs
          </h1>
          <p className="text-xl text-center mb-12 text-gray-600 max-w-3xl mx-auto">
            Ienirstiet radošajā procesā un izveidojiet savu ideālo mājaslapu ar
            mūsu revolucionāro interaktīvo rīku!
          </p>
          <SketchBuilder />
        </main>
      </div>
    </>
  );
}
