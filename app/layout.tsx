import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./redux/Provider";
import Header from "./component/Header";
import Footer from "./component/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <Providers>
      <Header/>
      {children}
      <Footer/>
    </Providers>
      </body>
    </html>
  );
}
