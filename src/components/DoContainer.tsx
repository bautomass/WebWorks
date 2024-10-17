"use client";
import React, { useEffect, useRef } from "react";

const DoContainer = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const steps = container.querySelectorAll(".step");
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute(
        "class",
        "absolute top-0 left-0 w-full h-full pointer-events-none -z-10"
      );
      container.appendChild(svg);

      const sequence = [0, 1, 3, 2, 0]; // Logical sequence of steps, closing the loop
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      let d = "";

      sequence.forEach((currentIndex, index) => {
        const start = steps[currentIndex].getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const x = start.left + start.width / 2 - containerRect.left;
        const y = start.top + start.height / 2 - containerRect.top;

        if (index === 0) {
          d += `M${x},${y}`;
        } else {
          d += ` L${x},${y}`;
        }
      });

      path.setAttribute("d", d);
      path.setAttribute(
        "class",
        "fill-none stroke-[#20b2aa] stroke-2 opacity-50"
      );
      path.style.strokeDasharray = "10 5";
      path.style.animation = "flowAnimation 10s linear infinite";
      svg.appendChild(path);

      const redrawPath = () => {
        let newD = "";
        sequence.forEach((currentIndex, index) => {
          const start = steps[currentIndex].getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();

          const x = start.left + start.width / 2 - containerRect.left;
          const y = start.top + start.height / 2 - containerRect.top;

          if (index === 0) {
            newD += `M${x},${y}`;
          } else {
            newD += ` L${x},${y}`;
          }
        });
        path.setAttribute("d", newD);
      };

      window.addEventListener("resize", redrawPath);

      // Add intersection observer for animation
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              steps.forEach((step, index) => {
                step.style.animation = `slideIn 0.5s ease-out ${
                  index * 0.2
                }s forwards`;
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(container);

      // Cleanup
      return () => {
        window.removeEventListener("resize", redrawPath);
      };
    }
  }, []);

  return (
    <div className="text-center p-5">
      <h2 className="text-3xl mb-10 relative inline-block px-5 py-2.5 font-bold text-gray-800 uppercase tracking-wider before:content-[''] before:absolute before:w-[70px] before:h-1 before:bg-[#20b2aa] before:top-1/2 before:left-[-80px] before:transform before:-translate-y-1/2 after:content-[''] after:absolute after:w-[70px] after:h-1 after:bg-[#20b2aa] after:top-1/2 after:right-[-80px] after:transform after:-translate-y-1/2 sm:before:hidden sm:after:hidden">
        Mājaslapas Izstrādes Process: Kā Mēs To Darām
      </h2>
      <div
        ref={containerRef}
        className="min-w-[calc(100%-2rem)] grid grid-cols-1 gap-4 max-w-[1000px] mx-auto p-5 relative sm:grid-cols-2 sm:grid-rows-2"
      >
        <div className="step max-h-[250px] relative p-7 flex flex-col justify-center transition-all duration-300 ease-in-out rounded-2xl shadow-lg z-10 bg-[#20b2aa] bg-opacity-90 text-white opacity-0 -translate-x-[50px] hover:-translate-y-1 hover:shadow-xl sm:col-start-1 sm:col-end-2 sm:row-start-1 sm:row-end-2">
          <div className="max-w-[90%] mx-auto">
            <h3 className="text-[22px] font-extrabold mb-4 relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-1 after:bg-gradient-to-r after:from-[#20b2aa] after:via-white after:to-[#20b2aa] after:bg-[length:20px_4px]">
              1. Posms: Klienta vajadzību apspriešana
            </h3>
            <p className="text-base leading-relaxed">
              Mēs sākam ar detalizētu sarunu, lai izprastu jūsu vajadzības un
              mērķus. Šajā posmā mēs noskaidrojam, ko jūs vēlaties sasniegt ar
              savu mājaslapu un kādi ir jūsu galvenie mērķi.
            </p>
          </div>
          <div className="absolute top-1/2 right-[-13px] transform -translate-y-1/2 border-t-8 border-b-8 border-l-[13px] border-transparent border-l-[#20b2aae6] sm:block hidden"></div>
        </div>
        <div className="step max-h-[250px] relative p-7 flex flex-col justify-center transition-all duration-300 ease-in-out rounded-2xl shadow-lg z-10 bg-white bg-opacity-90 text-gray-800 opacity-0 -translate-y-[50px] hover:-translate-y-1 hover:shadow-xl sm:col-start-2 sm:col-end-3 sm:row-start-1 sm:row-end-2">
          <div className="max-w-[90%] mx-auto">
            <h3 className="text-[22px] font-extrabold mb-4 relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-1 after:bg-gradient-to-r after:from-[#20b2aa] after:via-white after:to-[#20b2aa] after:bg-[length:20px_4px]">
              2. Posms: Dizaina izstrāde
            </h3>
            <p className="text-base leading-relaxed">
              Mūsu dizaineri veido sākotnējo konceptu jūsu mājaslapai. Mēs
              izstrādājam vairākus dizaina variantus un pielāgojam tos,
              pamatojoties uz jūsu atsauksmēm.
            </p>
          </div>
          <div className="absolute left-1/2 bottom-[-13px] transform -translate-x-1/2 border-l-8 border-r-8 border-t-[13px] border-transparent border-t-white sm:block hidden"></div>
        </div>
        <div className="step max-h-[250px] relative p-7 flex flex-col justify-center transition-all duration-300 ease-in-out rounded-2xl shadow-lg z-10 bg-[#20b2aa] bg-opacity-90 text-white opacity-0 translate-x-[50px] hover:-translate-y-1 hover:shadow-xl sm:col-start-2 sm:col-end-3 sm:row-start-2 sm:row-end-3">
          <div className="max-w-[90%] mx-auto">
            <h3 className="text-[22px] font-extrabold mb-4 relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-1 after:bg-gradient-to-r after:from-[#20b2aa] after:via-white after:to-[#20b2aa] after:bg-[length:20px_4px]">
              3. Posms: Koncepta izstrāde un precizēšana
            </h3>
            <p className="text-base leading-relaxed">
              Pēc sākotnējā dizaina izstrādes mēs veicam finetuning, lai
              nodrošinātu, ka dizains pilnībā atbilst jūsu prasībām un vēlmēm.
            </p>
          </div>
          <div className="absolute top-1/2 left-[-13px] transform -translate-y-1/2 border-t-8 border-b-8 border-r-[13px] border-transparent border-r-[#20b2aae6] sm:block hidden"></div>
        </div>
        <div className="step max-h-[250px] relative p-7 flex flex-col justify-center transition-all duration-300 ease-in-out rounded-2xl shadow-lg z-10 bg-white bg-opacity-90 text-gray-800 opacity-0 translate-y-[50px] hover:-translate-y-1 hover:shadow-xl sm:col-start-1 sm:col-end-2 sm:row-start-2 sm:row-end-3">
          <div className="max-w-[90%] mx-auto">
            <h3 className="text-[22px] font-extrabold mb-4 relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-1 after:bg-gradient-to-r after:from-[#20b2aa] after:via-white after:to-[#20b2aa] after:bg-[length:20px_4px]">
              4. Posms: Vienošanās un līguma noslēgšana
            </h3>
            <p className="text-base leading-relaxed">
              Pēc dizaina apstiprināšanas mēs pārrunājam gala nosacījumus un
              noslēdzam līgumu. Šajā posmā mēs pārliecināmies, ka viss ir gatavs
              mājaslapas izstrādei un ieviešanai.
            </p>
          </div>
          <div className="absolute left-1/2 top-[-13px] transform -translate-x-1/2 border-l-8 border-r-8 border-b-[13px] border-transparent border-b-white sm:block hidden"></div>
        </div>
      </div>
      <style jsx>{`
        @keyframes flowAnimation {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -30;
          }
        }
        @keyframes slideIn {
          to {
            opacity: 1;
            transform: translate(0, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default DoContainer;
