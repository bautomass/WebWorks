import React, { useMemo } from "react";

interface ArrowProps {
  delay: number;
}

const Arrow: React.FC<ArrowProps> = React.memo(({ delay }) => (
  <div
    className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[20px] border-l-transparent border-r-transparent animate-arrowAnimation"
    style={{
      animationDelay: `${delay}s`,
      borderTopColor: "#8CB8B4",
      filter: "drop-shadow(0 0 1px black)",
    }}
  />
));

Arrow.displayName = "Arrow";

const DownArrowGuide: React.FC = () => {
  const arrows = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => (
      <Arrow key={i} delay={i * 0.5} />
    ));
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-[50px] relative">
      <div className="flex justify-around w-full max-w-[1200px]">{arrows}</div>
      <style jsx global>{`
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
