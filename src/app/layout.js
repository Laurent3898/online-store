import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });
import Provider from "./components/Providers";

export const metadata = {
  title: "Online Store",
  description: "Marketplace for everyone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <Provider>
          <Navbar />
          {children}
        </Provider>
        <Footer />
      </body>
    </html>
  );
}
