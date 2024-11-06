import { Metadata } from "next";
import ApiDocumentation from "@/components/ApiDocumentation";

export const metadata: Metadata = {
  title: "API Dokumentācija | WebWorks",
  description:
    "WebWorks API dokumentācija - drošs un efektīvs veids, kā integrēt mūsu pakalpojumus savā platformā.",
  keywords:
    "api dokumentācija, webworks api, web api, restful api, api integrācija, latvija",
};

export default function ApiDocumentationPage() {
  return <ApiDocumentation />;
}
