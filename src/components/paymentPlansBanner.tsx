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
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left Section */}
          <div 
            className="flex items-center gap-3 min-w-fit px-5 py-2.5"
            aria-hidden="false"
          >
            <CreditCard 
              className="w-6 h-6 text-[#EEC71B]" 
              aria-hidden="true"
            />
            <h2 className="text-base md:text-lg font-medium text-white">
              Elastīgi maksājumu risinājumi
            </h2>
          </div>

          {/* Plans Section - Scrollable on mobile */}
          <div 
            className="relative"
            role="region"
            aria-label="Maksājumu plānu opcijas"
          >
            <div 
              className="flex items-stretch gap-2 md:gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide"
              role="list"
            >
              {plans.map((plan, i) => (
                <div
                  key={i}
                  role="listitem"
                  aria-label={plan.ariaLabel}
                  className={`
                    relative flex flex-col justify-center p-2.5 md:px-4 rounded-xl min-w-[130px] md:min-w-fit
                    transition-all duration-300 group
                    ${plan.highlight 
                      ? 'bg-[#EEC71B] text-[#3D3B4A]' 
                      : 'bg-white/5 text-white hover:bg-white/10'
                    }
                  `}
                  tabIndex={0}
                >
                  <div className="text-center">
                    <p 
                      className={`text-sm font-bold mb-0.5
                        ${plan.highlight ? 'text-[#3D3B4A]' : 'text-white'}
                      `}
                    >
                      {plan.title}
                    </p>
                    <p 
                      className={`text-xs
                        ${plan.highlight ? 'text-[#3D3B4A]/80' : 'text-white/80'}
                      `}
                      aria-label={`Maksa: ${plan.benefit}`}
                    >
                      {plan.benefit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Fade effect for mobile scroll */}
            <div 
              className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-[#3D3B4A] to-transparent md:hidden" 
              aria-hidden="true"
            />
          </div>

          {/* Right Section */}
          <Link
            href="/maksajumu-plani"
            className="group flex items-center justify-center gap-2 px-5 py-2.5
                     bg-[#EEC71B] text-[#3D3B4A] rounded-full 
                     hover:bg-white transition-all duration-300
                     text-sm font-bold min-w-fit whitespace-nowrap
                     shadow-lg shadow-[#EEC71B]/20 hover:shadow-white/20
                     focus:outline-none focus:ring-2 focus:ring-[#EEC71B] focus:ring-offset-2"
            aria-label="Uzzināt vairāk par maksājumu plāniem"
          >
            <span>Uzzināt vairāk</span>
            <ArrowRight 
              className="w-4 h-4 transition-transform duration-300 
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
