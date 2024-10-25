"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMonitor,
  FiTool,
  FiSearch,
  FiShoppingCart,
  FiTrendingUp as FiTrend,
  FiLayout,
  FiCode,
  FiShield,
  FiArrowRight,
  FiArrowLeft,
  FiCheck,
  FiX,
  FiCalendar,
  FiClock,
  IconType,
  FiLoader,
} from "react-icons/fi";
import { supabase } from "../../utils/supabase";
import Header from "../../components/Header";

// Updated interfaces to match database schema
interface ConsultationType {
  id: string;
  name: string;
  description: string;
  icon_name: string;
  icon?: React.ReactElement;
  duration: string;
  questions: FormQuestion[];
}

interface FormQuestion {
  id: string;
  type: "text" | "textarea" | "select" | "radio" | "checkbox";
  label: string;
  placeholder?: string;
  options?: string[];
  required?: boolean;
  validation?: RegExp;
  errorMessage?: string;
}

interface FormData {
  consultation_type_id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  companyName?: string;
  projectDescription?: string;
  currentWebsite?: string;
  budgetRange?: string;
  timeline?: string;
  preferredDate?: string;
  preferredTime?: string;
  additionalNotes?: string;
  [key: string]: string | undefined;
}

interface FormErrors {
  [key: string]: string;
  submit?: string;
}

interface BookingStep {
  id: number;
  title: string;
  description: string;
}

interface DatabaseConsultationType {
  id: string;
  name: string;
  description: string;
  icon_name: string;
  duration: string;
  created_at: string;
}

// Mapping for icons to ensure type safety
const iconMap: { [key: string]: React.ReactElement } = {
  FiMonitor: <FiMonitor className="w-6 h-6" />,
  FiTool: <FiTool className="w-6 h-6" />,
  FiSearch: <FiSearch className="w-6 h-6" />,
  FiShoppingCart: <FiShoppingCart className="w-6 h-6" />,
  FiTrend: <FiTrend className="w-6 h-6" />,
  FiLayout: <FiLayout className="w-6 h-6" />,
  FiCode: <FiCode className="w-6 h-6" />,
  FiShield: <FiShield className="w-6 h-6" />,
};

// Questions mapping for each consultation type
const typeQuestions: { [key: string]: FormQuestion[] } = {
  "Website Development": [
    {
      id: "business-type",
      type: "text",
      label: "Kāda veida bizness jums ir?",
      placeholder: "Piemēram: e-komercija, pakalpojumi, u.c.",
      required: true,
    },
    {
      id: "website-goals",
      type: "textarea",
      label: "Kādi ir galvenie mājas lapas mērķi?",
      placeholder: "Piemēram: pārdošana, informēšana, zīmola veidošana",
      required: true,
    },
    {
      id: "target-audience",
      type: "textarea",
      label: "Kas ir jūsu mērķauditorija?",
      placeholder: "Aprakstiet savu ideālo klientu",
      required: true,
    },
  ],
  "Website Redesign": [
    {
      id: "current-website",
      type: "text",
      label: "Jūsu pašreizējās mājas lapas adrese",
      placeholder: "www.jusulapasadrese.lv",
      required: true,
    },
    {
      id: "main-issues",
      type: "textarea",
      label: "Kādas ir galvenās problēmas ar pašreizējo mājas lapu?",
      placeholder: "Aprakstiet, kas neapmierina pašreizējā risinājumā",
      required: true,
    },
  ],
  // Add remaining question mappings for other consultation types...
};

const bookingSteps: BookingStep[] = [
  {
    id: 1,
    title: "Izvēlieties Konsultācijas Veidu",
    description:
      "Izvēlieties konsultācijas veidu, kas vislabāk atbilst jūsu vajadzībām",
  },
  {
    id: 2,
    title: "Aizpildiet Informāciju",
    description: "Pastāstiet mums vairāk par savu projektu",
  },
  {
    id: 3,
    title: "Izvēlieties Laiku",
    description: "Izvēlieties jums ērtāko konsultācijas laiku",
  },
  {
    id: 4,
    title: "Apstipriniet Detaļas",
    description: "Pārskatiet un apstipriniet konsultācijas detaļas",
  },
];

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

const budgetRanges = [
  "Līdz 1000 EUR",
  "1000 - 3000 EUR",
  "3000 - 5000 EUR",
  "5000 - 10000 EUR",
  "Virs 10000 EUR",
];

const timelineOptions = [
  "Steidzami (1-2 nedēļas)",
  "Tuvākajā laikā (2-4 nedēļas)",
  "Vidējā termiņā (1-2 mēneši)",
  "Ilgtermiņā (3+ mēneši)",
];
// Utility functions for validation
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

const validateUrl = (url: string): boolean => {
  if (!url) return true;
  const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  return urlRegex.test(url);
};

// Database integration functions
// const fetchConsultationTypes = async (): Promise<ConsultationType[]> => {
//   try {
//     const { data, error } = await supabase
//       .from("consultation_types")
//       .select("*");

//     if (error) throw error;

//     return data.map((type: DatabaseConsultationType) => ({
//       ...type,
//       icon: iconMap[type.icon_name],
//       questions: typeQuestions[type.name] || [],
//     }));
//   } catch (error) {
//     console.error("Error fetching consultation types:", error);
//     return [];
//   }
// };

const fetchConsultationTypes = async (): Promise<ConsultationType[]> => {
  try {
    const { data, error } = await supabase
      .from("consultation_types")
      .select("*");

    if (error) throw error;

    // Frontend display translations
    const displayTranslations: {
      [key: string]: { name: string; description: string };
    } = {
      "Website Development": {
        name: "Mājas Lapas Izstrāde",
        description: "Jauna mājas lapa ar modernām tehnoloģijām",
      },
      "Website Redesign": {
        name: "Mājas Lapas Modernizācija",
        description: "Esošās mājas lapas uzlabošana un modernizācija",
      },
      "SEO Services": {
        name: "SEO Pakalpojumi",
        description: "Meklētājprogrammu optimizācija un redzamības uzlabošana",
      },
      "E-commerce Solutions": {
        name: "E-komercijas Risinājumi",
        description: "Interneta veikala izstrāde un optimizācija",
      },
      "Digital Marketing": {
        name: "Digitālais Mārketings",
        description: "Visaptveroša digitālā mārketinga stratēģija",
      },
      "UX/UI Design": {
        name: "UX/UI Dizains",
        description: "Lietotāja pieredzes un saskarnes dizains",
      },
      "Technical Solutions": {
        name: "Tehniskā Konsultācija",
        description: "Tehnisku problēmu risināšana un sistēmu integrācija",
      },
      "Security Audit": {
        name: "Drošības Audits",
        description: "Mājas lapas drošības novērtējums un uzlabojumi",
      },
    };

    return data.map((type: DatabaseConsultationType) => ({
      ...type,
      // Override the display name and description with Latvian translations
      name: displayTranslations[type.name].name,
      description: displayTranslations[type.name].description,
      icon: iconMap[type.icon_name],
      questions: typeQuestions[type.name] || [],
    }));
  } catch (error) {
    console.error("Error fetching consultation types:", error);
    return [];
  }
};

const submitConsultationRequest = async (formData: FormData) => {
  try {
    const { data, error } = await supabase
      .from("consultation_requests")
      .insert([
        {
          consultation_type_id: formData.consultation_type_id,
          client_name: formData.clientName,
          client_email: formData.clientEmail,
          client_phone: formData.clientPhone,
          company_name: formData.companyName,
          project_description: formData.projectDescription,
          current_website: formData.currentWebsite,
          budget_range: formData.budgetRange,
          timeline: formData.timeline,
          preferred_date: formData.preferredDate,
          preferred_time: formData.preferredTime,
          additional_notes: formData.additionalNotes,
          status: "pending",
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error("Error submitting consultation request:", error);
      if (error.code === "42501") {
        throw new Error("Authorization error. Please contact support.");
      }
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error submitting consultation request:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
};

// Custom hooks
const useConsultationTypes = () => {
  const [types, setTypes] = useState<ConsultationType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTypes = async () => {
      try {
        const fetchedTypes = await fetchConsultationTypes();
        setTypes(fetchedTypes);
      } catch (err) {
        setError("Failed to load consultation types");
      } finally {
        setLoading(false);
      }
    };

    loadTypes();
  }, []);

  return { types, loading, error };
};

const useFormValidation = (initialState: FormData) => {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = (
    step: number,
    selectedType?: ConsultationType
  ): boolean => {
    const newErrors: FormErrors = {};

    switch (step) {
      case 1:
        if (!formData.consultation_type_id) {
          newErrors.consultation_type_id =
            "Lūdzu, izvēlieties konsultācijas veidu";
        }
        break;

      case 2:
        if (!formData.clientName?.trim()) {
          newErrors.clientName = "Vārds ir obligāts";
        }
        if (!formData.clientEmail?.trim()) {
          newErrors.clientEmail = "E-pasts ir obligāts";
        } else if (!validateEmail(formData.clientEmail)) {
          newErrors.clientEmail = "Nederīgs e-pasta formāts";
        }
        if (!formData.clientPhone?.trim()) {
          newErrors.clientPhone = "Tālrunis ir obligāts";
        } else if (!validatePhone(formData.clientPhone)) {
          newErrors.clientPhone = "Nederīgs tālruņa formāts";
        }

        if (formData.currentWebsite && !validateUrl(formData.currentWebsite)) {
          newErrors.currentWebsite = "Nederīga mājas lapas adrese";
        }

        if (selectedType) {
          selectedType.questions.forEach((question) => {
            if (question.required && !formData[question.id]) {
              newErrors[question.id] = "Šis lauks ir obligāts";
            }
          });
        }
        break;

      case 3:
        if (!formData.preferredDate) {
          newErrors.preferredDate = "Lūdzu, izvēlieties vēlamo datumu";
        }
        if (!formData.preferredTime) {
          newErrors.preferredTime = "Lūdzu, izvēlieties vēlamo laiku";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = () => {
    setErrors({});
    setSubmitError(null);
  };

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field if it exists
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  return {
    formData,
    errors,
    submitError,
    isSubmitting,
    setIsSubmitting,
    handleInputChange,
    validateForm,
    setFormData,
    setErrors,
    clearErrors,
    setSubmitError,
  };
};

const useBookingFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedType, setSelectedType] = useState<ConsultationType | null>(
    null
  );

  const goToNextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, bookingSteps.length));
  }, []);

  const goToPreviousStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const resetFlow = useCallback(() => {
    setCurrentStep(1);
    setIsComplete(false);
    setSelectedType(null);
  }, []);

  return {
    currentStep,
    isComplete,
    selectedType,
    setSelectedType,
    goToNextStep,
    goToPreviousStep,
    resetFlow,
    setIsComplete,
  };
};

const useAvailableDates = () => {
  const getAvailableDates = () => {
    const dates: string[] = [];
    const today = new Date();
    let count = 0;
    let daysAdded = 0;

    while (daysAdded < 14) {
      const date = new Date();
      date.setDate(today.getDate() + count);
      const dayOfWeek = date.getDay();

      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        dates.push(date.toISOString().split("T")[0]);
        daysAdded++;
      }
      count++;
    }

    return dates;
  };

  const [availableDates] = useState(getAvailableDates());

  return { availableDates };
};
// Progress Bar Component
const ProgressBar: React.FC<{ currentStep: number; totalSteps: number }> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="w-full mb-8">
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          {bookingSteps.map((step, index) => (
            <div
              key={step.id}
              className={`flex flex-col items-center ${
                index === bookingSteps.length - 1 ? "flex-1" : "flex-1"
              }`}
            >
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${
                  currentStep >= step.id
                    ? "bg-[#EEC71B] text-[#3D3B4A]"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step.id}
              </div>
              <div className="text-xs text-center mt-2 hidden sm:block">
                {step.title}
              </div>
            </div>
          ))}
        </div>
        <div className="flex mb-2 items-center justify-between">
          <div className="w-full bg-gray-200 rounded-full">
            <div
              className="bg-[#EEC71B] h-2 rounded-full transition-all duration-500"
              style={{
                width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Type Selection Step Component
const TypeSelectionStep: React.FC<{
  selectedType: ConsultationType | null;
  onTypeSelect: (type: ConsultationType) => void;
  types: ConsultationType[];
  loading: boolean;
}> = ({ selectedType, onTypeSelect, types, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FiLoader className="animate-spin text-4xl text-[#EEC71B]" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {types.map((type) => (
        <motion.div
          key={type.id}
          className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer transform transition-all duration-300 ${
            selectedType?.id === type.id
              ? "border-2 border-[#EEC71B] scale-105"
              : "hover:scale-105"
          }`}
          onClick={() => onTypeSelect(type)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="text-3xl text-[#EEC71B] mb-4 flex justify-center">
            {type.icon}
          </div>
          <h3 className="text-xl font-bold mb-2 text-center">{type.name}</h3>
          <p className="text-gray-600 text-center text-sm">
            {type.description}
          </p>
          <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
            <FiClock className="mr-2" />
            {type.duration}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Project Details Step Component
const ProjectDetailsStep: React.FC<{
  formData: FormData;
  errors: FormErrors;
  selectedType: ConsultationType;
  onInputChange: (name: keyof FormData, value: string) => void;
}> = ({ formData, errors, selectedType, onInputChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-lg p-6 space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jūsu vārds *
          </label>
          <input
            type="text"
            value={formData.clientName || ""}
            onChange={(e) => onInputChange("clientName", e.target.value)}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EEC71B] focus:border-transparent ${
              errors.clientName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Ievadiet savu vārdu"
          />
          {errors.clientName && (
            <p className="mt-1 text-sm text-red-500">{errors.clientName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Uzņēmuma nosaukums
          </label>
          <input
            type="text"
            value={formData.companyName || ""}
            onChange={(e) => onInputChange("companyName", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EEC71B] focus:border-transparent"
            placeholder="Ievadiet uzņēmuma nosaukumu"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            E-pasts *
          </label>
          <input
            type="email"
            value={formData.clientEmail || ""}
            onChange={(e) => onInputChange("clientEmail", e.target.value)}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EEC71B] focus:border-transparent ${
              errors.clientEmail ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="jusu@epasts.lv"
          />
          {errors.clientEmail && (
            <p className="mt-1 text-sm text-red-500">{errors.clientEmail}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tālrunis *
          </label>
          <input
            type="tel"
            value={formData.clientPhone || ""}
            onChange={(e) => onInputChange("clientPhone", e.target.value)}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EEC71B] focus:border-transparent ${
              errors.clientPhone ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="+371 xxxxxxxx"
          />
          {errors.clientPhone && (
            <p className="mt-1 text-sm text-red-500">{errors.clientPhone}</p>
          )}
        </div>
      </div>

      {/* Dynamic fields based on consultation type */}
      {selectedType.questions.map((question) => (
        <div key={question.id}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {question.label} {question.required && "*"}
          </label>
          {question.type === "textarea" ? (
            <textarea
              value={(formData[question.id as keyof FormData] as string) || ""}
              onChange={(e) =>
                onInputChange(question.id as keyof FormData, e.target.value)
              }
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EEC71B] focus:border-transparent ${
                errors[question.id] ? "border-red-500" : "border-gray-300"
              }`}
              rows={4}
              placeholder={question.placeholder}
            />
          ) : (
            <input
              type={question.type}
              value={(formData[question.id as keyof FormData] as string) || ""}
              onChange={(e) =>
                onInputChange(question.id as keyof FormData, e.target.value)
              }
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#EEC71B] focus:border-transparent ${
                errors[question.id] ? "border-red-500" : "border-gray-300"
              }`}
              placeholder={question.placeholder}
            />
          )}
          {errors[question.id] && (
            <p className="mt-1 text-sm text-red-500">{errors[question.id]}</p>
          )}
        </div>
      ))}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Budžeta diapazons
        </label>
        <select
          value={formData.budgetRange || ""}
          onChange={(e) => onInputChange("budgetRange", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EEC71B] focus:border-transparent"
        >
          <option value="">Izvēlieties budžeta diapazonu</option>
          {budgetRanges.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Vēlamais projekta termiņš
        </label>
        <select
          value={formData.timeline || ""}
          onChange={(e) => onInputChange("timeline", e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EEC71B] focus:border-transparent"
        >
          <option value="">Izvēlieties termiņu</option>
          {timelineOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </motion.div>
  );
};
// Time Selection Step Component
const TimeSelectionStep: React.FC<{
  formData: FormData;
  errors: FormErrors;
  availableDates: string[];
  onInputChange: (name: keyof FormData, value: string) => void;
}> = ({ formData, errors, availableDates, onInputChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Izvēlieties datumu</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {availableDates.map((date) => (
            <motion.button
              key={date}
              onClick={() => onInputChange("preferredDate", date)}
              className={`p-4 rounded-lg text-center ${
                formData.preferredDate === date
                  ? "bg-[#EEC71B] text-[#3D3B4A]"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {new Date(date).toLocaleDateString("lv-LV", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </motion.button>
          ))}
        </div>
        {errors.preferredDate && (
          <p className="mt-2 text-sm text-red-500">{errors.preferredDate}</p>
        )}
      </div>

      {formData.preferredDate && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h3 className="text-xl font-bold mb-4">Izvēlieties laiku</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
            {timeSlots.map((time) => (
              <motion.button
                key={time}
                onClick={() => onInputChange("preferredTime", time)}
                className={`p-4 rounded-lg text-center ${
                  formData.preferredTime === time
                    ? "bg-[#EEC71B] text-[#3D3B4A]"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {time}
              </motion.button>
            ))}
          </div>
          {errors.preferredTime && (
            <p className="mt-2 text-sm text-red-500">{errors.preferredTime}</p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

// Confirmation Step Component
const ConfirmationStep: React.FC<{
  formData: FormData;
  selectedType: ConsultationType;
}> = ({ formData, selectedType }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-lg p-6 space-y-6"
    >
      <h3 className="text-2xl font-bold text-center mb-6">
        Pārskatiet rezervācijas detaļas
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-bold mb-2">Konsultācijas tips</h4>
          <p>{selectedType.name}</p>
        </div>
        <div>
          <h4 className="font-bold mb-2">Ilgums</h4>
          <p>{selectedType.duration}</p>
        </div>
        <div>
          <h4 className="font-bold mb-2">Datums</h4>
          <p>
            {new Date(formData.preferredDate!).toLocaleDateString("lv-LV", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-2">Laiks</h4>
          <p>{formData.preferredTime}</p>
        </div>
        <div>
          <h4 className="font-bold mb-2">Kontaktinformācija</h4>
          <p>{formData.clientName}</p>
          <p>{formData.clientEmail}</p>
          <p>{formData.clientPhone}</p>
          {formData.companyName && <p>{formData.companyName}</p>}
        </div>
        {selectedType.questions.map((question) => (
          <div key={question.id}>
            <h4 className="font-bold mb-2">{question.label}</h4>
            <p>{formData[question.id as keyof FormData]}</p>
          </div>
        ))}
        {formData.budgetRange && (
          <div>
            <h4 className="font-bold mb-2">Budžeta diapazons</h4>
            <p>{formData.budgetRange}</p>
          </div>
        )}
        {formData.timeline && (
          <div>
            <h4 className="font-bold mb-2">Vēlamais termiņš</h4>
            <p>{formData.timeline}</p>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <p className="text-sm text-gray-600">
          Pēc rezervācijas apstiprināšanas jūs saņemsiet e-pastu ar detalizētu
          informāciju par konsultāciju un sagatavošanās norādēm.
        </p>
      </div>
    </motion.div>
  );
};

// Success Message Component
const SuccessMessage: React.FC<{
  onReset: () => void;
}> = ({ onReset }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <FiCheck className="w-8 h-8 text-green-500" />
      </div>
      <h2 className="text-2xl font-bold mb-4">
        Paldies! Jūsu konsultācija ir rezervēta
      </h2>
      <p className="text-gray-600 mb-8">
        Mēs esam nosūtījuši apstiprinājuma e-pastu ar visiem nepieciešamajiem
        datiem un sagatavošanās norādēm.
      </p>
      <button
        onClick={onReset}
        className="bg-[#EEC71B] text-[#3D3B4A] px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors duration-300"
      >
        Rezervēt vēl vienu konsultāciju
      </button>
    </motion.div>
  );
};

// Main Consultation Page Component
const ConsultationPage: React.FC = () => {
  const { types, loading: typesLoading } = useConsultationTypes();

  const {
    currentStep,
    isComplete,
    selectedType,
    setSelectedType,
    goToNextStep,
    goToPreviousStep,
    resetFlow,
    setIsComplete,
  } = useBookingFlow();

  const {
    formData,
    errors,
    submitError,
    isSubmitting,
    setIsSubmitting,
    handleInputChange,
    validateForm,
    setFormData,
    clearErrors,
    setSubmitError,
  } = useFormValidation({
    consultation_type_id: "",
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    companyName: "",
    projectDescription: "",
    currentWebsite: "",
    budgetRange: "",
    timeline: "",
    preferredDate: "",
    preferredTime: "",
    additionalNotes: "",
  });

  const { availableDates } = useAvailableDates();

  const handleTypeSelect = (type: ConsultationType) => {
    setSelectedType(type);
    handleInputChange("consultation_type_id", type.id);
  };

  const handleNext = async () => {
    if (validateForm(currentStep, selectedType)) {
      if (currentStep === bookingSteps.length) {
        setIsSubmitting(true);
        clearErrors();

        const result = await submitConsultationRequest(formData);
        setIsSubmitting(false);

        if (result.success) {
          setIsComplete(true);
        } else {
          setSubmitError(
            result.error || "Radās kļūda. Lūdzu, mēģiniet vēlreiz vēlāk."
          );

          // Optional: Scroll to error message
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      } else {
        goToNextStep();
      }
    }
  };

  const renderStep = () => {
    if (isComplete) {
      return <SuccessMessage onReset={resetFlow} />;
    }

    switch (currentStep) {
      case 1:
        return (
          <TypeSelectionStep
            selectedType={selectedType}
            onTypeSelect={handleTypeSelect}
            types={types}
            loading={typesLoading}
          />
        );
      case 2:
        return selectedType ? (
          <ProjectDetailsStep
            formData={formData}
            errors={errors}
            selectedType={selectedType}
            onInputChange={handleInputChange}
          />
        ) : null;
      case 3:
        return (
          <TimeSelectionStep
            formData={formData}
            errors={errors}
            availableDates={availableDates}
            onInputChange={handleInputChange}
          />
        );
      case 4:
        return selectedType ? (
          <div>
            <ConfirmationStep formData={formData} selectedType={selectedType} />
            {submitError && (
              <div className="mt-4 p-4 bg-red-50 rounded-lg">
                <p className="text-sm text-red-600">{submitError}</p>
              </div>
            )}
          </div>
        ) : null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F3F5F4] to-white">
      <Head>
        <title>
          Bezmaksas Konsultācija | WebWorks - Jūsu Digitālais Partneris
        </title>
        <meta
          name="description"
          content="Pieprasiet bezmaksas konsultāciju ar WebWorks ekspertiem. Uzziniet, kā mēs varam palīdzēt jūsu biznesam augt digitālajā vidē."
        />
        <link rel="canonical" href="https://www.webworks.lv/konsultacija" />
      </Head>

      <Header />

      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#3D3B4A] mb-6">
            Izvēlieties Savu Digitālo Ceļu
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nav svarīgi, vai jums ir skaidra vīzija vai tikai idejas - mēs
            palīdzēsim izvēlēties labāko risinājumu jūsu biznesam.
          </p>
        </motion.div>

        {!isComplete && (
          <ProgressBar
            currentStep={currentStep}
            totalSteps={bookingSteps.length}
          />
        )}

        <div className="max-w-6xl mx-auto">{renderStep()}</div>

        {!isComplete && (
          <div className="max-w-6xl mx-auto mt-8 flex justify-between">
            {currentStep > 1 && (
              <button
                onClick={goToPreviousStep}
                className="flex items-center px-6 py-2 text-gray-600 hover:text-gray-900"
              >
                <FiArrowLeft className="mr-2" />
                Atpakaļ
              </button>
            )}
            {currentStep === 1 && <div></div>}
            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className={`bg-[#EEC71B] text-[#3D3B4A] px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-colors duration-300 flex items-center ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                "Apstrādā..."
              ) : currentStep === bookingSteps.length ? (
                "Apstiprināt Rezervāciju"
              ) : (
                <>
                  Turpināt
                  <FiArrowRight className="ml-2" />
                </>
              )}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ConsultationPage;
