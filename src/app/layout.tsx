import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "MedLearn - Plataforma de Ensino Medico Online",
  description: "Plataforma completa de educacao medica com banco de questoes, simulados, trilhas de estudo personalizadas com IA e analytics avancado.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} h-full`}>
      <body className="min-h-full font-poppins antialiased bg-gray-50">
        {children}
      </body>
    </html>
  );
}
