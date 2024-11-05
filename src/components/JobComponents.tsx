import { motion } from "framer-motion";
import { FiArrowRight, FiBriefcase, FiMail } from "react-icons/fi";
import { fadeInUp, float } from "@/utils/animationUtils";

type JobCardProps = {
  job: {
    title: string;
    department: string;
    location: string;
    type: string;
    experience_level: string;
    description: string;
  };
};

export const JobCard = ({ job }: JobCardProps) => (
  <motion.div
    variants={fadeInUp}
    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
  >
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-xl font-semibold text-[#3D3B4A]">{job.title}</h3>
        <p className="text-gray-600">
          {job.department} • {job.location}
        </p>
      </div>
      <span className="px-3 py-1 bg-[#EEC71B]/10 text-[#EEC71B] rounded-full text-sm font-medium">
        {job.type}
      </span>
    </div>

    <p className="text-gray-600 mb-4 line-clamp-3">{job.description}</p>

    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">
        {job.experience_level} līmenis
      </span>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-2 bg-[#3D3B4A] text-white rounded-lg flex items-center space-x-2 hover:bg-[#3D3B4A]/90 transition-colors"
      >
        <span>Uzzināt Vairāk</span>
        <FiArrowRight />
      </motion.button>
    </div>
  </motion.div>
);

export const NoOpenings = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-white rounded-xl shadow-lg p-8 text-center max-w-2xl mx-auto"
  >
    <div className="mb-6">
      <motion.div
        variants={float}
        initial="initial"
        animate="animate"
        className="w-20 h-20 bg-[#EEC71B]/10 rounded-full flex items-center justify-center mx-auto"
      >
        <FiBriefcase className="text-3xl text-[#EEC71B]" />
      </motion.div>
    </div>

    <h3 className="text-2xl font-semibold text-[#3D3B4A] mb-4">
      Pašlaik nav aktīvu vakanču
    </h3>

    <p className="text-gray-600 mb-6">
      Kaut arī pašlaik mums nav aktīvu vakanču, mēs vienmēr meklējam talantīgus
      profesionāļus. Sūti mums savu CV, un mēs sazināsimies, tiklīdz radīsies
      piemērota pozīcija.
    </p>

    <motion.a
      href="mailto:careers@webworks.lv"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center space-x-2 bg-[#EEC71B] text-[#3D3B4A] px-6 py-3 rounded-lg font-semibold hover:bg-[#EEC71B]/90 transition-colors"
    >
      <FiMail className="text-xl" />
      <span>Sūtīt CV</span>
    </motion.a>
  </motion.div>
);
