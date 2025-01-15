import React from "react";
import Link from "next/link";
import { CreditCard, ArrowRight } from "lucide-react";

const PaymentBanner = () => {
  const plans = [
    {
      title: "Pilns maksājums",
      benefit: "-5% atlaide",
      highlight: true,
      ariaLabel: "Pilns maksājums ar 5% atlaidi",
    },
    {
      title: "2 maksājumi",
      benefit: "+2% administrēšana",
      ariaLabel: "Divi maksājumi ar 2% administrēšanas maksu",
    },
    {
      title: "3 maksājumi",
      benefit: "+4% administrēšana",
      ariaLabel: "Trīs maksājumi ar 4% administrēšanas maksu",
    },
    {
      title: "4 maksājumi",
      benefit: "+6% administrēšana",
      ariaLabel: "Četri maksājumi ar 6% administrēšanas maksu",
    },
  ];

  return (
    <section
      aria-label="Maksājumu plānu opcijas"
      className="bg-gradient-to-r from-[#3D3B4A] via-[#3D3B4A] to-[#2A2833] border-y border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-3 py-4 md:px-4 md:py-3">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Title Section */}
          <div
            className="flex items-center justify-center md:justify-start gap-2 md:gap-3 w-full md:w-auto"
            aria-hidden="false"
          >
            <CreditCard className="w-6 h-6 text-[#EEC71B]" aria-hidden="true" />
            <h2 className="text-base md:text-lg font-medium text-white text-center md:text-left">
              Elastīgi maksājumu risinājumi
            </h2>
          </div>

          {/* Plans Section */}
          <div
            className="relative flex-grow"
            role="region"
            aria-label="Maksājumu plānu opcijas"
          >
            <div
              className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:flex md:items-stretch md:gap-4"
              role="list"
            >
              {plans.map((plan, i) => (
                <div
                  key={i}
                  role="listitem"
                  aria-label={plan.ariaLabel}
                  className={`
                    flex flex-col justify-center p-2 md:p-2.5 rounded-xl
                    transition-all duration-300 group
                    ${
                      plan.highlight
                        ? "bg-[#EEC71B] text-[#3D3B4A]"
                        : "bg-white/5 text-white hover:bg-white/10"
                    }
                  `}
                  tabIndex={0}
                >
                  <div className="text-center">
                    <p
                      className={`text-xs md:text-sm font-bold mb-0.5
                        ${plan.highlight ? "text-[#3D3B4A]" : "text-white"}
                      `}
                    >
                      {plan.title}
                    </p>
                    <p
                      className={`text-[11px] md:text-xs
                        ${
                          plan.highlight ? "text-[#3D3B4A]/80" : "text-white/80"
                        }
                      `}
                      aria-label={`Maksa: ${plan.benefit}`}
                    >
                      {plan.benefit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <Link
            href="/maksajumu-plani"
            className="group flex items-center justify-center gap-2 px-4 py-2 md:px-5 md:py-2.5
                     bg-[#EEC71B] text-[#3D3B4A] rounded-full
                     hover:bg-white transition-all duration-300
                     text-xs md:text-sm font-bold whitespace-nowrap
                     shadow-lg shadow-[#EEC71B]/20 hover:shadow-white/20
                     focus:outline-none focus:ring-2 focus:ring-[#EEC71B] focus:ring-offset-2"
            aria-label="Uzzināt vairāk par maksājumu plāniem"
          >
            <span>Uzzināt vairāk</span>
            <ArrowRight
              className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform duration-300
                       group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PaymentBanner;
