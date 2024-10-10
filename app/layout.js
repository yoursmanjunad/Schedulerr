import { Inter } from 'next/font/google';
import "./globals.css";
import Header from '@/components/header';
import { SWRConfig } from 'swr';
import { ClerkProvider } from '@clerk/nextjs';

// Metadata for the application
export const metadata = {
  title: "Scheduler",
  description: "A simple application to make your meeting bookings easier",
};

// Initialize the Inter font
const inter = Inter({ subsets: ["latin"] });

// Root layout component
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* Include the font in the head section */}
          <link rel="stylesheet" href={inter.style} />
        </head>
        <body className={`font-sans`}>
          {/* Header Component */}
          <Header />
          <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {children}
          </main>
          {/* Footer */}
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
