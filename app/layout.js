// Google-ээс шаардлагатай фонтуудыг импортлох
import { Poppins, Playfair_Display } from 'next/font/google';
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";

// Outfit-ийг устгаад оронд нь Poppins, Playfair Display-г тохируулах
// Poppins фонтыг үндсэн фонт болгон тохируулах
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'], // Шаардлагатай жингүүдийг зааж өгөх
  variable: '--font-poppins', // CSS хувьсагчийн нэр
});

// Playfair Display фонтыг гарчиг/логонд ашиглахаар тохируулах
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'], // Шаардлагатай жингүүдийг зааж өгөх
  variable: '--font-playfair', // CSS хувьсагчийн нэр
});


export const metadata = {
  // Вэбсайтынхаа гарчгийг өөрийн брэнд нэрээр солиорой
  title: "ZOL - Үл хөдлөх хөрөнгө",
  description: "Таны хайж буй үл хөдлөх хөрөнгийн мэдээлэл",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      {/* Хоёр фонтын хувьсагчийг html тагт нэмж өгөх */}
      <html lang="en" className={`${poppins.variable} ${playfair.variable}`}>
        {/* Үндсэн фонтыг poppins болгоод, өнгийг нь тохируулах */}
        <body className={`font-poppins antialiased text-zolDark`}>
          <Toaster />
          <AppContextProvider>
            {children}
          </AppContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}