'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaInstagram, FaTwitter, FaPinterest } from 'react-icons/fa';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, you would send this data to your backend
      console.log('Form submitted:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus({
        success: true,
        message: 'Your message has been sent successfully! We\'ll get back to you soon.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus({
        success: false,
        message: 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
      
      // Clear status message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-yellow-400 text-2xl" />,
      title: 'Our Location',
      content: '123 Diwali Street, Mumbai, Maharashtra 400001, India'
    },
    {
      icon: <FaPhone className="text-yellow-400 text-2xl" />,
      title: 'Phone Number',
      content: '+91 98765 43210'
    },
    {
      icon: <FaEnvelope className="text-yellow-400 text-2xl" />,
      title: 'Email Address',
      content: 'hello@diwalidelights.com'
    },
    {
      icon: <FaClock className="text-yellow-400 text-2xl" />,
      title: 'Working Hours',
      content: 'Mon - Sat: 9:00 AM - 9:00 PM\nSunday: 10:00 AM - 7:00 PM'
    }
  ];

  const socialLinks = [
    { icon: <FaFacebook />, url: '#' },
    { icon: <FaInstagram />, url: '#' },
    { icon: <FaTwitter />, url: '#' },
    { icon: <FaPinterest />, url: '#' }
  ];

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/images/diwali-pattern.jpg')] opacity-10 bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 to-slate-900/70" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4 text-yellow-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Contact Us
          </motion.h1>
          <motion.p 
            className="text-xl text-slate-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            We'd love to hear from you. Get in touch with our team for any questions or feedback.
          </motion.p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((item, index) => (
              <motion.div 
                key={index}
                className="bg-slate-700/50 p-6 rounded-xl text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-yellow-400">{item.title}</h3>
                <p className="text-slate-300 whitespace-pre-line">{item.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Side - Form */}
              <div className="p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-6 text-yellow-400">Send Us a Message</h2>
                
                {submitStatus && (
                  <div className={`p-4 mb-6 rounded-lg ${submitStatus.success ? 'bg-green-900/30 text-green-300' : 'bg-red-900/30 text-red-300'}`}>
                    {submitStatus.message}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-1">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white"
                      placeholder="What's this about?"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white"
                      placeholder="How can we help you?"
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-medium rounded-lg transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
              
              {/* Right Side - Map */}
              <div className="bg-slate-900 p-8 md:p-12 flex flex-col">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-6 text-yellow-400">Find Us on Map</h3>
                  <div className="bg-slate-800 rounded-xl overflow-hidden h-64 md:h-full">
                    {/* Replace with your actual map embed code */}
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800">
                      <div className="text-center p-6">
                        <div className="text-4xl mb-4">📍</div>
                        <p className="text-slate-300">Mumbai, India</p>
                        <p className="text-sm text-slate-500 mt-2">Map integration would appear here</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-700">
                  <h4 className="text-lg font-semibold mb-4 text-slate-300">Follow Us</h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <a 
                        key={index}
                        href={social.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-slate-700 hover:bg-yellow-500 hover:text-slate-900 flex items-center justify-center transition-colors text-yellow-400"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-slate-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-yellow-400">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "What are your delivery options?",
                answer: "We offer standard and express shipping across India. Standard delivery takes 3-5 business days, while express delivery takes 1-2 business days. International shipping is also available with varying delivery times."
              },
              {
                question: "Do you offer international shipping?",
                answer: "Yes, we ship worldwide! International delivery times vary by destination, typically ranging from 7-14 business days. Additional customs fees may apply depending on your country's import regulations."
              },
              {
                question: "What is your return policy?",
                answer: "We accept returns within 14 days of delivery. Items must be unused, in their original packaging, and in the same condition as received. Please contact our customer service team to initiate a return."
              },
              {
                question: "How can I track my order?",
                answer: "Once your order is shipped, you'll receive a confirmation email with a tracking number and a link to track your package. You can also log in to your account to view the status of your order."
              },
              {
                question: "Do you offer bulk or wholesale orders?",
                answer: "Yes, we offer special pricing for bulk and wholesale orders. Please contact our sales team at wholesale@diwalidelights.com with your requirements, and we'll provide you with a customized quote."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                className="bg-slate-700/50 rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <details className="group">
                  <summary className="flex justify-between items-center p-4 cursor-pointer">
                    <h3 className="font-medium text-lg text-white">{faq.question}</h3>
                    <span className="transition-transform duration-200 group-open:rotate-180">
                      <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-4 pb-4 pt-2 text-slate-300">
                    {faq.answer}
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-slate-400 mb-4">Still have questions?</p>
            <a 
              href="mailto:support@diwalidelights.com" 
              className="inline-block px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-medium rounded-lg transition-colors"
            >
              Email Our Support Team
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
