'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const teamMembers = [
  {
    name: 'Priya Sharma',
    role: 'Founder & CEO',
    image: '/images/team-1.jpg',
    description: 'With over 10 years of experience in traditional Indian handicrafts, Priya leads our team with passion and vision.'
  },
  {
    name: 'Rahul Verma',
    role: 'Head of Design',
    image: '/images/team-2.jpg',
    description: 'Rahul brings innovative design concepts while staying true to traditional Indian art forms.'
  },
  {
    name: 'Anjali Patel',
    role: 'Customer Experience',
    image: '/images/team-3.jpg',
    description: 'Anjali ensures every customer receives exceptional service and support throughout their shopping journey.'
  },
  {
    name: 'Arjun Mehta',
    role: 'Operations Manager',
    image: '/images/team-4.jpg',
    description: 'Arjun oversees our supply chain and ensures timely delivery of our products across India.'
  }
];

const stats = [
  { number: '10,000+', label: 'Happy Customers' },
  { number: '500+', label: 'Products' },
  { number: '50+', label: 'Artisans Supported' },
  { number: '5+', label: 'Years in Business' }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/diwali-about.jpg"
            alt="Diwali decorations"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-slate-900/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4 text-yellow-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Story
          </motion.h1>
          <motion.p 
            className="text-xl text-slate-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Celebrating the spirit of Diwali with authentic, handcrafted treasures
          </motion.p>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-16 bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-yellow-400">Our Journey</h2>
            <div className="space-y-8">
              <motion.div 
                className="bg-slate-700/50 p-6 rounded-xl"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-2">How It All Began</h3>
                <p className="text-slate-300">
                  Founded in 2018, Diwali Delights started as a small family business with a passion for preserving and sharing the rich cultural heritage of India's most beloved festival. What began as a humble collection of handcrafted diyas has blossomed into a premier destination for authentic Diwali decorations and gifts.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-slate-700/50 p-6 rounded-xl"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                <p className="text-slate-300">
                  We're dedicated to bringing the magic of Diwali to homes around the world. Our mission is to provide high-quality, ethically sourced products that celebrate the festival of lights while supporting local artisans and preserving traditional craftsmanship.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-slate-700/50 p-6 rounded-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-2">Our Values</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• <span className="font-medium">Authenticity:</span> We source directly from skilled artisans across India</li>
                  <li>• <span className="font-medium">Quality:</span> Every product is carefully inspected for excellence</li>
                  <li>• <span className="font-medium">Sustainability:</span> We prioritize eco-friendly materials and practices</li>
                  <li>• <span className="font-medium">Community:</span> Supporting local communities is at our core</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-yellow-500 text-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-4"
              >
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-yellow-400">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.name}
                className="bg-slate-800 rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative h-64 bg-slate-700">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-yellow-400 mb-3">{member.role}</p>
                  <p className="text-slate-400 text-sm">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-yellow-400">Join Our Diwali Celebration</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Discover our curated collection of Diwali products and bring the magic of the festival of lights to your home.
          </p>
          <Link 
            href="/products"
            className="inline-block px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-medium rounded-full transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </main>
  );
}
