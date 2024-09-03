import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Identity Registry",
  description: "A decentralized identity management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </head>
      <body className={`${inter.className} bg-gray-100 text-gray-900`}>
        <div className="min-h-screen flex flex-col justify-center items-center">
          {children}
        </div>
      </body>
    </html>
  );
}
