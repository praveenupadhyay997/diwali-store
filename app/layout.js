import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'Diwali Delights - Shop Festive Collection',
  description: 'Discover the best Diwali merchandise, decorations, and gifts for the festival of lights',
  keywords: 'diwali, festival of lights, diwali shopping, diwali gifts, diwali decor',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#eab308" />
      </head>
      <body className={`${inter.className} bg-slate-900 text-slate-100`}>
        <CartProvider>
          <Navbar />
          <main className="min-h-screen pt-16">
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
