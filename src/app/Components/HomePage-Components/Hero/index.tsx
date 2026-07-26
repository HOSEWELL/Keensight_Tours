'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 relative overflow-hidden md:py-[150px] py-14 px-6 md:px-20'>
       <div className="absolute top-10 left-10 w-40 h-40 md:w-72 md:h-72 bg-[#00C767] opacity-20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-36 h-36 md:w-64 md:h-64 bg-[#03624C] opacity-20 rounded-full blur-3xl"></div>

      {/* Text Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='flex flex-col justify-center space-y-5'
      >
        <motion.h1
          className='text-3xl sm:text-4xl font-medium'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Book your Adventure Tickets online with Keensight Tours and Travel 
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Keensight  revolutionizes ticket booking by connecting you effortlessly. Explore listings, 
          filter by preferences, and enjoy a seamless experience with our user-friendly platform.
        </motion.p>
        
        <motion.div
          className='flex flex-col sm:flex-row gap-3 sm:gap-10'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Link href="/tours">
            <motion.button
              className='px-8 py-2 cursor-pointer rounded-md bg-[#03624C] text-white'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Your Tour
            </motion.button>
          </Link>

          <Link href="/about">
            <motion.button
              className='px-5 py-2 border cursor-pointer rounded-md'
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </Link>
        </motion.div>
      </motion.section>
      
      {/* Image Section */}
      <motion.section 
        className='flex items-center justify-center'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <Image
          src="/hero-bg.png"
          alt="Hero Image"
          width={500}
          height={500}
          className="w-full h-auto max-w-sm md:max-w-none"
        />
      </motion.section>
    </div>
  );
}
