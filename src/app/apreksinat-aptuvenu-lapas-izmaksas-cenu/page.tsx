"use client";
import React, { useState } from "react";
import Header from "../../components/Header";
import Head from "next/head";

type WebsiteType = {
  value: string;
  label: string;
  baseCost: number;
};

type Feature = {
  value: string;
  label: string;
  cost: number;
};

type DesignComplexity = {
  value: string;
  label: string;
  multiplier: number;
};

type SeoPackage = {
  value: string;
  label: string;
  cost: number;
};

type MaintenancePackage = {
  value: string;
  label: string;
  monthlyCost: number;
};

type HostingPackage = {
  value: string;
  label: string;
  annualCost: number;
};

const WebsiteEstimator: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [businessName, setBusinessName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [websiteType, setWebsiteType] = useState<string>("");
  const [features, setFeatures] = useState<string[]>([]);
  const [designComplexity, setDesignComplexity] = useState<string>("");
  const [contentPages, setContentPages] = useState<number>(1);
  const [seoPackage, setSeoPackage] = useState<string>("");
  const [maintenancePackage, setMaintenancePackage] = useState<string>("");
  const [hostingPackage, setHostingPackage] = useState<string>("");
  const [responsiveDesign, setResponsiveDesign] = useState<boolean>(false);
  const [customFunctionality, setCustomFunctionality] =
    useState<boolean>(false);
  const [contentCreation, setContentCreation] = useState<boolean>(false);
  const [socialMediaIntegration, setSocialMediaIntegration] =
    useState<boolean>(false);
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);

  const websiteTypes: WebsiteType[] = [
    { value: "vizītkarte", label: "Vizītkartes mājaslapa", baseCost: 500 },
    { value: "uznemums", label: "Uzņēmuma mājaslapa", baseCost: 1000 },
    { value: "e-veikals", label: "E-veikals", baseCost: 2000 },
    { value: "portfolio", label: "Portfolio mājaslapa", baseCost: 800 },
    { value: "blogs", label: "Blogs", baseCost: 700 },
    { value: "forums", label: "Forums", baseCost: 1500 },
    { value: "izglītības", label: "Izglītības platforma", baseCost: 2500 },
    {
      value: "nekustamie",
      label: "Nekustamo īpašumu mājaslapa",
      baseCost: 1800,
    },
    { value: "rezervācijas", label: "Rezervācijas sistēma", baseCost: 2200 },
    { value: "sociālais", label: "Sociālais tīkls", baseCost: 3000 },
  ];

  const featuresList: Feature[] = [
    { value: "kontaktforma", label: "Kontaktforma", cost: 100 },
    { value: "galerija", label: "Fotogrāfiju galerija", cost: 200 },
    { value: "kalendars", label: "Notikumu kalendārs", cost: 300 },
    { value: "chats", label: "Tiešsaistes tērzēšana", cost: 400 },
    { value: "maksajumi", label: "Tiešsaistes maksājumi", cost: 500 },
    { value: "multivaloda", label: "Vairāku valodu atbalsts", cost: 300 },
    { value: "mapintegration", label: "Kartes integrācija", cost: 250 },
    { value: "newsletter", label: "Jaunumu vēstuļu sistēma", cost: 350 },
    { value: "userdashboard", label: "Lietotāja vadības panelis", cost: 600 },
    { value: "advancedsearch", label: "Paplašinātā meklēšana", cost: 400 },
    { value: "reviewsystem", label: "Atsauksmju sistēma", cost: 300 },
    { value: "membership", label: "Dalības/Abonēšanas sistēma", cost: 700 },
    { value: "analytics", label: "Paplašinātā analītika", cost: 450 },
    { value: "api", label: "API integrācija", cost: 800 },
    { value: "mobileapp", label: "Mobilā lietotne", cost: 2000 },
  ];

  const designComplexityOptions: DesignComplexity[] = [
    { value: "vienkāršs", label: "Vienkāršs", multiplier: 1 },
    { value: "vidējs", label: "Vidēji sarežģīts", multiplier: 1.5 },
    { value: "sarežģīts", label: "Sarežģīts", multiplier: 2 },
    { value: "ļotisarežģīts", label: "Ļoti sarežģīts", multiplier: 2.5 },
  ];

  const seoPackages: SeoPackage[] = [
    { value: "pamata", label: "Pamata SEO pakete", cost: 300 },
    { value: "videja", label: "Vidējā SEO pakete", cost: 600 },
    { value: "premium", label: "Premium SEO pakete", cost: 1000 },
    { value: "enterprise", label: "Uzņēmuma SEO pakete", cost: 1500 },
  ];

  const maintenancePackages: MaintenancePackage[] = [
    { value: "basic", label: "Pamata uzturēšana", monthlyCost: 50 },
    { value: "standard", label: "Standarta uzturēšana", monthlyCost: 100 },
    { value: "premium", label: "Premium uzturēšana", monthlyCost: 200 },
  ];

  const hostingPackages: HostingPackage[] = [
    { value: "shared", label: "Koplietošanas hostings", annualCost: 60 },
    { value: "vps", label: "VPS hostings", annualCost: 240 },
    { value: "dedicated", label: "Dedicated hostings", annualCost: 600 },
    { value: "cloud", label: "Mākoņa hostings", annualCost: 360 },
  ];

  const handleFeatureChange = (feature: string) => {
    if (features.includes(feature)) {
      setFeatures(features.filter((f) => f !== feature));
    } else {
      setFeatures([...features, feature]);
    }
  };

  const calculateEstimate = () => {
    const selectedWebsiteType = websiteTypes.find(
      (type) => type.value === websiteType
    );
    const selectedDesignComplexity = designComplexityOptions.find(
      (option) => option.value === designComplexity
    );
    const selectedSeoPackage = seoPackages.find(
      (pkg) => pkg.value === seoPackage
    );
    const selectedMaintenancePackage = maintenancePackages.find(
      (pkg) => pkg.value === maintenancePackage
    );
    const selectedHostingPackage = hostingPackages.find(
      (pkg) => pkg.value === hostingPackage
    );

    let total = selectedWebsiteType ? selectedWebsiteType.baseCost : 0;
    total += features.reduce(
      (sum, feature) =>
        sum + (featuresList.find((f) => f.value === feature)?.cost || 0),
      0
    );
    total += (contentPages - 1) * 100; // 100 EUR per additional page
    total *= selectedDesignComplexity ? selectedDesignComplexity.multiplier : 1;
    total += selectedSeoPackage ? selectedSeoPackage.cost : 0;

    if (responsiveDesign) total += 500;
    if (customFunctionality) total += 1000;
    if (contentCreation) total += contentPages * 200; // 200 EUR per page for content creation
    if (socialMediaIntegration) total += 300;

    const monthlyMaintenanceCost = selectedMaintenancePackage
      ? selectedMaintenancePackage.monthlyCost
      : 0;
    const annualHostingCost = selectedHostingPackage
      ? selectedHostingPackage.annualCost
      : 0;

    setEstimatedCost(total);
    return { total, monthlyMaintenanceCost, annualHostingCost };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { total, monthlyMaintenanceCost, annualHostingCost } =
      calculateEstimate();
    setEstimatedCost(total);
    // You can use the monthlyMaintenanceCost and annualHostingCost here if needed
  };

  return (
    <>
      <Head>
        <title>Aprēķināt aptuvenu mājaslapas izmaksu cenu | WebWorks</title>
        <meta
          name="description"
          content="Uzziniet aptuvenas izmaksas jūsu mājaslapas vai lietotnes izstrādei ar mūsu interaktīvo kalkulatoru."
        />
      </Head>
      <Header />
      <main className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold mb-6">
          Aprēķināt aptuvenu mājaslapas izmaksu cenu
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block mb-2">
                Jūsu vārds:
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="businessName" className="block mb-2">
                Uzņēmuma nosaukums:
              </label>
              <input
                type="text"
                id="businessName"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2">
                E-pasts:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block mb-2">
                Tālrunis:
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
          {/* Website Type */}
          <div>
            <label htmlFor="websiteType" className="block mb-2">
              Mājaslapas veids:
            </label>
            <select
              id="websiteType"
              value={websiteType}
              onChange={(e) => setWebsiteType(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Izvēlieties mājaslapas veidu</option>
              {websiteTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          {/* Features */}
          <div>
            <label className="block mb-2">Papildu funkcijas:</label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {featuresList.map((feature) => (
                <div key={feature.value} className="flex items-center">
                  <input
                    type="checkbox"
                    id={feature.value}
                    checked={features.includes(feature.value)}
                    onChange={() => handleFeatureChange(feature.value)}
                    className="mr-2"
                  />
                  <label htmlFor={feature.value}>{feature.label}</label>
                </div>
              ))}
            </div>
          </div>
          {/* Design Complexity */}
          <div>
            <label htmlFor="designComplexity" className="block mb-2">
              Dizaina sarežģītība:
            </label>
            <select
              id="designComplexity"
              value={designComplexity}
              onChange={(e) => setDesignComplexity(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Izvēlieties dizaina sarežģītību</option>
              {designComplexityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {/* Content Pages */}
          <div>
            <label htmlFor="contentPages" className="block mb-2">
              Satura lapu skaits:
            </label>
            <input
              type="number"
              id="contentPages"
              value={contentPages}
              onChange={(e) => setContentPages(parseInt(e.target.value))}
              min="1"
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {/* SEO Package */}
          <div>
            <label htmlFor="seoPackage" className="block mb-2">
              SEO pakete:
            </label>
            <select
              id="seoPackage"
              value={seoPackage}
              onChange={(e) => setSeoPackage(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Izvēlieties SEO paketi</option>
              {seoPackages.map((pkg) => (
                <option key={pkg.value} value={pkg.value}>
                  {pkg.label}
                </option>
              ))}
            </select>
          </div>
          {/* Maintenance Package */}
          <div>
            <label htmlFor="maintenancePackage" className="block mb-2">
              Uzturēšanas pakete:
            </label>
            <select
              id="maintenancePackage"
              value={maintenancePackage}
              onChange={(e) => setMaintenancePackage(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Izvēlieties uzturēšanas paketi</option>
              {maintenancePackages.map((pkg) => (
                <option key={pkg.value} value={pkg.value}>
                  {pkg.label}
                </option>
              ))}
            </select>
          </div>
          {/* Hosting Package */}
          <div>
            <label htmlFor="hostingPackage" className="block mb-2">
              Hostinga pakete:
            </label>
            <select
              id="hostingPackage"
              value={hostingPackage}
              onChange={(e) => setHostingPackage(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Izvēlieties hostinga paketi</option>
              {hostingPackages.map((pkg) => (
                <option key={pkg.value} value={pkg.value}>
                  {pkg.label}
                </option>
              ))}
            </select>
          </div>
          {/* Additional Options */}
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="responsiveDesign"
                checked={responsiveDesign}
                onChange={(e) => setResponsiveDesign(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="responsiveDesign">
                Responsīvs dizains (+500 EUR)
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="customFunctionality"
                checked={customFunctionality}
                onChange={(e) => setCustomFunctionality(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="customFunctionality">
                Pielāgota funkcionalitāte (+1000 EUR)
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="contentCreation"
                checked={contentCreation}
                onChange={(e) => setContentCreation(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="contentCreation">
                Satura izveide (+200 EUR par lapu)
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="socialMediaIntegration"
                checked={socialMediaIntegration}
                onChange={(e) => setSocialMediaIntegration(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="socialMediaIntegration">
                Sociālo mediju integrācija (+300 EUR)
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#8CB8B4] text-white px-6 py-2 rounded-full hover:bg-[#EEC71B] transition-colors duration-300"
          >
            Aprēķināt izmaksas
          </button>
        </form>

        {estimatedCost !== null && (
          <div className="mt-8 p-6 bg-gray-100 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Aptuvenas izmaksas</h2>
            <p className="mb-2">
              <strong>Klients:</strong> {name}
            </p>
            <p className="mb-2">
              <strong>Uzņēmums:</strong> {businessName}
            </p>
            <p className="mb-2">
              <strong>E-pasts:</strong> {email}
            </p>
            <p className="mb-2">
              <strong>Tālrunis:</strong> {phone}
            </p>
            <p className="mb-2">
              <strong>Aptuvenas izstrādes izmaksas:</strong>{" "}
              {estimatedCost.toFixed(2)} EUR
            </p>
            <p className="mb-2">
              <strong>Ikmēneša uzturēšanas izmaksas:</strong>{" "}
              {maintenancePackages
                .find((pkg) => pkg.value === maintenancePackage)
                ?.monthlyCost.toFixed(2) || 0}{" "}
              EUR
            </p>
            <p className="mb-2">
              <strong>Gada hostinga izmaksas:</strong>{" "}
              {hostingPackages
                .find((pkg) => pkg.value === hostingPackage)
                ?.annualCost.toFixed(2) || 0}{" "}
              EUR
            </p>
            <p className="text-sm text-gray-600 mt-4">
              Lūdzu ņemiet vērā, ka šīs ir tikai aptuvenas izmaksas. Precīzāku
              piedāvājumu varam sniegt pēc detalizētas projekta apspriešanas.
              Mūsu komanda ar Jums sazināsies tuvākajā laikā, lai pārrunātu Jūsu
              projekta detaļas.
            </p>
          </div>
        )}
      </main>
    </>
  );
};

export default WebsiteEstimator;
