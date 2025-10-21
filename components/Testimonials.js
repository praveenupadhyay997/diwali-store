'use client';

import { motion } from 'framer-motion';
import Avatar from './Avatar';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Happy Customer',
    content: 'The Diwali decor items I bought were absolutely stunning! The quality exceeded my expectations and the delivery was super fast.'
  },
  {
    id: 2,
    name: 'Rahul Verma',
    role: 'Return Customer',
    content: 'Amazing collection of diyas and pooja items. The packaging was excellent and the products arrived in perfect condition.'
  },
  {
    id: 3,
    name: 'Anjali Patel',
    role: 'First-time Buyer',
    content: 'I was skeptical about buying online, but this store proved me wrong. The silk saree I ordered is beautiful and worth every penny!'
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <h2 className="section-title text-white">What Our Customers Say</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-slate-800 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <Avatar name={testimonial.name} size={48} />
                </div>
                <div>
                  <h4 className="text-white font-bold">{testimonial.name}</h4>
                  <p className="text-yellow-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-slate-300">&ldquo;{testimonial.content}&rdquo;</p>
              <div className="flex mt-4 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
