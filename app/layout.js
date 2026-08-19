import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata = {
  title: "Price Pilot",
  description: "Price tracker app for best deals",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="min-h-full flex flex-col font-sans">
        {children}
        < Toaster richColors />
        </body>
    </html>
  );
}