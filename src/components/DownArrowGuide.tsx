import React from "react";

const DownArrowGuide: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-full h-[50px] relative">
      <div className="flex justify-around w-full max-w-[1200px]">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`w-0 h-0 border-l-[15px] border-r-[15px] border-t-[20px] border-l-transparent border-r-transparent animate-arrowAnimation opacity-0`}
            style={{
              animationDelay: `${i * 0.5}s`,
              borderTopColor: "#8CB8B4",
              filter: "drop-shadow(0 0 1px black)",
            }}
          ></div>
        ))}
      </div>
      <style jsx>{`
        @keyframes arrowAnimation {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          50% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(20px);
            opacity: 0;
          }
        }
        .animate-arrowAnimation {
          animation: arrowAnimation 2.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default DownArrowGuide;
