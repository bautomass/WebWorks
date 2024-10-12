"use client";

import React, { useState, useCallback } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiClock,
  FiVideo,
  FiMessageSquare,
  FiCheckCircle,
  FiStar,
  FiX,
  FiSend,
  FiPhone,
} from "react-icons/fi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Header from "../../components/Header";

interface ConsultationType {
  icon: React.ReactNode;
  title: string;
  duration: string;
}

const consultationTypes: ConsultationType[] = [
  { icon: <FiVideo />, title: "Video Konsultācija", duration: "45 min" },
  { icon: <FiMessageSquare />, title: "Čata Konsultācija", duration: "30 min" },
  { icon: <FiCalendar />, title: "Klātienes Tikšanās", duration: "60 min" },
  { icon: <FiPhone />, title: "Telefona Konsultācija", duration: "30 min" },
];

interface Testimonial {
  name: string;
  company: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Jānis K.",
    company: "StartUp Latvia",
    quote:
      "Konsultācija ar WebWorks komandu bija ārkārtīgi vērtīga. Viņi sniedza skaidru redzējumu par mūsu digitālo stratēģiju.",
  },
  {
    name: "Linda B.",
    company: "EcoStore",
    quote:
      "Pēc konsultācijas mums bija skaidrs plāns, kā uzlabot mūsu e-komercijas platformu. Rezultāti bija acīmredzami jau pēc mēneša.",
  },
  {
    name: "Mārtiņš O.",
    company: "TechInnovate",
    quote:
      "WebWorks konsultanti spēja ātri identificēt mūsu galvenās problēmas un piedāvāja konkrētus risinājumus. Ļoti ieteicams!",
  },
];

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "Kā es varu sagatvoties konsultācijai?",
    answer:
      "Sagatavojiet jautājumus un informāciju par savu projektu vai biznesu. Jo vairāk informācijas jūs sniegsiet, jo produktīvāka būs konsultācija.",
  },
  {
    question: "Vai es varu mainīt konsultācijas laiku?",
    answer:
      "Jā, jūs varat mainīt konsultācijas laiku līdz 24 stundām pirms plānotās tikšanās, izmantojot mūsu tiešsaistes rezervēšanas sistēmu.",
  },
  {
    question: "Kādas ir konsultāciju cenas?",
    answer:
      "Pirmā konsultācija ir bezmaksas. Turpmāko konsultāciju cenas sākas no 50 EUR par 30 minūšu sesiju. Precīzas cenas ir atkarīgas no konsultācijas veida un ilguma.",
  },
  {
    question: "Vai pēc konsultācijas es saņemšu kopsavilkumu?",
    answer:
      "Jā, pēc katras konsultācijas mēs nosūtīsim jums e-pastu ar galveno apspriesto punktu un ieteikumu kopsavilkumu.",
  },
];

interface Message {
  text: string;
  sender: "user" | "bot";
}

const LiveChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const sendMessage = useCallback(() => {
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, sender: "user" },
      ]);
      setInput("");
      // Simulate response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "Paldies par jūsu ziņojumu! Mūsu konsultants ar jums sazināsies tuvākajā laikā.",
            sender: "bot",
          },
        ]);
      }, 1000);
    }
  }, [input]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#EEC71B] text-[#3D3B4A] p-4 rounded-full shadow-lg"
        >
          <FiMessageSquare size={24} />
        </button>
      )}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-lg w-80 sm:w-96">
          <div className="bg-[#3D3B4A] text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">Live Konsultācija</h3>
            <button onClick={() => setIsOpen(false)}>
              <FiX />
            </button>
          </div>
          <div className="h-64 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block p-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-[#EEC71B] text-[#3D3B4A]"
                      : "bg-gray-200"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Rakstiet savu jautājumu šeit..."
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

interface BookingCalendarProps {
  selectedType: ConsultationType | null;
  onSelectDateTime: (date: Date, time: string) => void;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({
  selectedType,
  onSelectDateTime,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const availableTimes = [
    "09:00",
    "10:00",
    "11:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
  ];

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    onSelectDateTime(selectedDate, time);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        minDate={new Date()}
        className="w-full"
      />
      <div className="mt-4">
        <h4 className="font-bold mb-2">Pieejamie laiki:</h4>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {availableTimes.map((time) => (
            <button
              key={time}
              onClick={() => handleTimeSelect(time)}
              className={`p-2 rounded ${
                selectedTime === time
                  ? "bg-[#EEC71B] text-[#3D3B4A]"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const KonsultacijaPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<ConsultationType | null>(
    null
  );
  const [selectedDateTime, setSelectedDateTime] = useState<{
    date: Date;
    time: string;
  } | null>(null);
  const [bookingStep, setBookingStep] = useState<number>(0);

  const handleTypeSelect = (type: ConsultationType) => {
    setSelectedType(type);
    setBookingStep(1);
  };

  const handleDateTimeSelect = (date: Date, time: string) => {
    setSelectedDateTime({ date, time });
    setBookingStep(2);
  };

  const handleBookingSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the booking information to your backend
    alert(
      "Jūsu konsultācija ir rezervēta! Mēs ar jums sazināsimies, lai apstiprinātu detaļas."
    );
    setBookingStep(0);
    setSelectedType(null);
    setSelectedDateTime(null);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-b from-[#F3F5F4] to-white overflow-hidden">
        <Head>
          <title>
            Bezmaksas Konsultācija | WebWorks - Jūsu Digitālais Partneris
          </title>
          <meta
            name="description"
            content="Pieprasiet bezmaksas konsultāciju ar WebWorks ekspertiem. Uzziniet, kā mēs varam palīdzēt jūsu biznesam augt digitālajā vidē."
          />
          <meta
            name="keywords"
            content="konsultācija, digitālā stratēģija, web izstrāde, SEO, e-komercija, Latvija"
          />
          <link rel="canonical" href="https://www.webworks.lv/konsultacija" />
        </Head>

        <Header />

        <main className="container mx-auto px-4 py-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#3D3B4A] mb-8"
          >
            Bezmaksas Konsultācija ar Mūsu Ekspertiem
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-center text-gray-700 mb-12 max-w-3xl mx-auto"
          >
            Uzziniet, kā WebWorks var palīdzēt jūsu biznesam augt digitālajā
            vidē. Pieprasiet bezmaksas konsultāciju ar mūsu ekspertiem jau
            šodien!
          </motion.p>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3D3B4A] mb-8 text-center">
              Rezervējiet Konsultāciju 3 Vienkāršos Soļos
            </h2>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div className="flex-1 text-center mb-4 md:mb-0">
                <div className="inline-block bg-[#EEC71B] rounded-full p-4 mb-2">
                  <FiVideo className="text-2xl sm:text-3xl text-[#3D3B4A]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold">
                  1. Izvēlieties Konsultācijas Veidu
                </h3>
              </div>
              <div className="flex-1 text-center mb-4 md:mb-0">
                <div className="inline-block bg-[#EEC71B] rounded-full p-4 mb-2">
                  <FiCalendar className="text-2xl sm:text-3xl text-[#3D3B4A]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold">
                  2. Izvēlieties Datumu un Laiku
                </h3>
              </div>
              <div className="flex-1 text-center">
                <div className="inline-block bg-[#EEC71B] rounded-full p-4 mb-2">
                  <FiSend className="text-2xl sm:text-3xl text-[#3D3B4A]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold">
                  3. Apstipriniet Rezervāciju
                </h3>
              </div>
            </div>

            {bookingStep === 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {consultationTypes.map((type, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-lg shadow-lg p-6 text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-3xl sm:text-4xl text-[#EEC71B] mb-4 flex justify-center">
                      {type.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2">
                      {type.title}
                    </h3>
                    <p className="text-gray-700">{type.duration}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 bg-[#EEC71B] text-[#3D3B4A] px-6 py-2 rounded-full font-bold text-sm sm:text-base"
                      onClick={() => handleTypeSelect(type)}
                    >
                      Izvēlēties
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            )}

            {bookingStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-[#3D3B4A] mb-4 text-center">
                  Izvēlieties Konsultācijas Laiku
                </h3>
                <BookingCalendar
                  selectedType={selectedType}
                  onSelectDateTime={handleDateTimeSelect}
                />
              </motion.div>
            )}

            {bookingStep === 2 && selectedType && selectedDateTime && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl sm:text-2xl font-bold text-[#3D3B4A] mb-4 text-center">
                  Apstipriniet Rezervāciju
                </h3>
                <form
                  onSubmit={handleBookingSubmit}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <div className="mb-4">
                    <p>
                      <strong>Konsultācijas veids:</strong> {selectedType.title}
                    </p>
                    <p>
                      <strong>Datums:</strong>{" "}
                      {selectedDateTime.date.toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Laiks:</strong> {selectedDateTime.time}
                    </p>
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Jūsu vārds:</label>
                    <input
                      type="text"
                      required
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Jūsu e-pasts:</label>
                    <input
                      type="email"
                      required
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Jūsu tālrunis:</label>
                    <input
                      type="tel"
                      required
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2">Papildus informācija:</label>
                    <textarea
                      className="w-full p-2 border rounded"
                      rows={4}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-[#EEC71B] text-[#3D3B4A] px-6 py-2 rounded-full font-bold text-sm sm:text-base"
                  >
                    Apstiprināt Rezervāciju
                  </button>
                </form>
              </motion.div>
            )}
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-16 bg-white rounded-lg shadow-lg p-6 sm:p-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3D3B4A] mb-6 text-center">
              Kāpēc Izvēlēties Mūsu Konsultācijas?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: <FiCheckCircle />,
                  text: "Personalizēta pieeja katram klientam",
                },
                {
                  icon: <FiStar />,
                  text: "Pieredzējuši eksperti ar plašām zināšanām",
                },
                {
                  icon: <FiClock />,
                  text: "Elastīgs grafiks, kas pielāgojas jūsu vajadzībām",
                },
                {
                  icon: <FiSend />,
                  text: "Konkrēti ieteikumi un rīcības plāns",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="text-xl sm:text-2xl text-[#EEC71B] mr-4">
                    {item.icon}
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3D3B4A] mb-8 text-center">
              Ko Saka Mūsu Klienti
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-gray-700 mb-4 text-sm sm:text-base">
                    "{testimonial.quote}"
                  </p>
                  <p className="font-bold text-sm sm:text-base">
                    {testimonial.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {testimonial.company}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="mb-16"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[#3D3B4A] mb-8 text-center">
              Bieži Uzdotie Jautājumi
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg shadow-lg p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3 className="text-lg sm:text-xl font-bold mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="mb-16 bg-[#3D3B4A] text-white p-6 sm:p-8 rounded-lg text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">
              Vai Jums Nepieciešama Tūlītēja Palīdzība?
            </h2>
            <p className="text-lg sm:text-xl mb-8">
              Ja jums ir steidzams jautājums vai vēlaties tūlītēju konsultāciju,
              mūsu eksperti ir gatavi palīdzēt.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.a
                href="tel:+37112345678"
                className="bg-[#EEC71B] text-[#3D3B4A] px-6 sm:px-8 py-3 rounded-full font-bold text-base sm:text-lg hover:bg-white transition-colors duration-300 inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiPhone className="mr-2" />
                Zvanīt Tagad
              </motion.a>
              <motion.button
                onClick={() => {
                  const chatButton = document.querySelector<HTMLButtonElement>(
                    ".fixed.bottom-4.right-4 button"
                  );
                  if (chatButton) {
                    chatButton.click();
                  }
                }}
                className="bg-white text-[#3D3B4A] px-6 sm:px-8 py-3 rounded-full font-bold text-base sm:text-lg hover:bg-[#EEC71B] transition-colors duration-300 inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiMessageSquare className="mr-2" />
                Tērzēt Tiešsaistē
              </motion.button>
            </div>
          </motion.section>
        </main>
        <LiveChat />
      </div>
    </TooltipProvider>
  );
};

export default KonsultacijaPage;
