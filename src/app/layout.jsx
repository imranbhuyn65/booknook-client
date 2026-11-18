import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "BookNook | Home",
  description: "Add a book, borrow a book, return a book – BookNook Online Library",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className="min-h-screen flex flex-col bg-base-100 text-base-content">
        <Toaster position="top-right" />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
