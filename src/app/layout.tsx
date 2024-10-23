import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WebWorks - Unikālu Mājaslapu un E-komercijas Risinājumu Izstrāde",
  description:
    "Mēs veidojam inovatīvas un modernas mājaslapas un interneta veikalus. Atšķirīga pieeja, izcili rezultāti. Specializējamies mājas lapu izstrādē, interneta veikalu izveidē un web lapu izstrādē.",
  keywords:
    "interneta veikalu izstrāde, mājas lapu izstrāde, mājas lapas izveide, mājaslapu izstrāde, interneta veikala izveide, mājas lapas izstrāde, mājas lapas izveide cenas, interneta veikala izstrāde, majas lapu izstrade, majas lapas izstrade, majaslapas izveide, web lapu izstrāde",
  openGraph: {
    type: "website",
    locale: "lv_LV",
    url: "https://www.webworks.lv/",
    siteName:
      "WebWorks - Unikālu Mājaslapu un E-komercijas Risinājumu Izstrāde",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="lv">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
