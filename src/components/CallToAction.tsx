import React from "react";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiCheck,
  FiAward,
  FiTrendingUp,
  FiShield,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";

interface InteractiveCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  achievements: string[];
  color: string;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({
  icon,
  title,
  description,
  achievements,
  color,
}) => {
  return (
    <motion.div
      className={`bg-white/80 p-6 rounded-lg shadow-md backdrop-blur-sm overflow-hidden transform transition-all duration-300 hover:shadow-xl`}
      whileHover={{ scale: 1.03 }}
    >
      <div className="flex items-center mb-4">
        <div className={`text-4xl ${color} mr-4`}>{icon}</div>
        <h3 className="text-xl font-bold text-[#3D3B4A]">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="text-left space-y-2 mb-4">
        {achievements.map((achievement, index) => (
          <li key={index} className="flex items-center">
            <FiCheck className={`${color} mr-2 flex-shrink-0`} />
            <span>{achievement}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const EnhancedInteractiveCTASection: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-16 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-100/70 to-[#3D3B4A]/90"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-[#3D3B4A] mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Pārveidojiet Savu Biznesu ar WebWorks
        </motion.h2>
        <motion.p
          className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Digitālā transformācija nav tikai par tehnoloģijām - tā ir par jūsu
          biznesa nākotni. Ar WebWorks, jūs iegūstat partneri, kas ne tikai
          saprot jaunākās tendences, bet arī to, kā tās var palīdzēt jūsu
          biznesam augt un attīstīties.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <InteractiveCard
            icon={<FiAward />}
            title="Pierādīta Pieredze"
            description="Ar vairāk nekā 10 gadu pieredzi digitālajā nozarē, mēs esam palīdzējuši simtiem uzņēmumu sasniegt savus mērķus."
            achievements={[
              "500+ veiksmīgi pabeigti projekti",
              "98% klientu apmierinātība",
              "Nozares atzinības un balvas",
            ]}
            color="text-yellow-500"
          />
          <InteractiveCard
            icon={<FiTrendingUp />}
            title="Izmērāmi Rezultāti"
            description="Mūsu fokuss ir uz reāliem, izmērāmiem rezultātiem, kas tiešā veidā ietekmē jūsu biznesa panākumus."
            achievements={[
              "Vidēji 200% ROI mūsu klientiem",
              "35% pieaugums konversijās",
              "50% uzlabojums vietnes ātrumā",
            ]}
            color="text-green-500"
          />
          <InteractiveCard
            icon={<FiShield />}
            title="Ilgtermiņa Partnerība"
            description="Mēs neesam tikai pakalpojumu sniedzēji - mēs esam jūsu ilgtermiņa partneri digitālajā izaugsmē."
            achievements={[
              "Nepārtraukts atbalsts un uzturēšana",
              "Regulāras stratēģiskās konsultācijas",
              "Elastīga pieeja mainīgām vajadzībām",
            ]}
            color="text-blue-500"
          />
        </div>

        <motion.div
          className="bg-[#3D3B4A]/90 text-white p-8 rounded-lg backdrop-blur-sm shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-6 text-center">
            Gatavi Sākt Savu Digitālo Transformāciju?
          </h2>
          <p className="text-xl mb-8 text-center max-w-3xl mx-auto">
            Neatkarīgi no tā, vai jūs vēlaties uzlabot savu esošo digitālo
            klātbūtni vai sākt pilnīgi no jauna, mūsu komanda ir gatava palīdzēt
            jums sasniegt un pārsniegt jūsu mērķus. Kopā mēs varam izstrādāt
            stratēģiju, kas ne tikai atbilst jūsu šodienas vajadzībām, bet arī
            nodrošina pamatu ilgtermiņa izaugsmei un panākumiem.
          </p>
          <div className="flex justify-center">
            <Button
              asChild
              className="bg-[#EEC71B] text-[#3D3B4A] px-8 py-6 rounded-full font-bold text-lg hover:bg-white transition-colors duration-300 group"
            >
              <motion.a
                href="/contact-us"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center"
              >
                Sazinies Ar Mums
                <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-2" />
              </motion.a>
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default EnhancedInteractiveCTASection;
