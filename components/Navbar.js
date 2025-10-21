'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/products' },
    { name: 'Categories', href: '/categories' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-yellow-400 text-xl font-bold">
              Diwali Delights
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === link.href
                      ? 'text-yellow-400 bg-slate-800'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Cart and Mobile menu button */}
          <div className="flex items-center
          ">
            <Link 
              href="/cart" 
              className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 relative"
            >
              <FiShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-slate-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden ml-2 p-2 rounded-md text-slate-300 hover:text-white hover:bg-slate-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.href
                    ? 'text-yellow-400 bg-slate-800'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
