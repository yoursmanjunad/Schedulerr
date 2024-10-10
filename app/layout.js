import {Inter} from 'next/font/google';
import "./globals.css";
import Header from '@/components/header';
import { SWRConfig } from 'swr';
import { ClerkProvider } from '@clerk/clerk-react';

export const metadata = {
  title: "Scheduler",
  description: "A simple application to make your meeting bookings easier",
};

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`inter.classname`}
      >
        {/* {Header} */}
        <Header />
        <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
          {children}
        </main>
        {/* {Footer} */}
        <footer className='bg-blue-100 py-12'>
          <div className='container mx-auto px-4 text-center text-gray-600'>
            <p>
              Made with Love by Manjunath
            </p>
          </div>
        </footer>
      </body>
    </html>
    </ClerkProvider>
  );
}
