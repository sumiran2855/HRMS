'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  stats: string;
  delay?: number;
}

export default function FeatureCard({
  icon: Icon,
  title,
  description,
  stats,
  delay = 0
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay: delay / 1000,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="group cursor-pointer h-full"
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative h-full min-h-[280px] sm:min-h-[320px] p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-2xl hover:border-blue-300 transition-all duration-500"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <motion.div
          className="absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full opacity-0 blur-2xl group-hover:opacity-20 transition-opacity duration-500"
          initial={false}
        />

        <div className="relative z-10 flex flex-col h-full">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
            className="relative w-14 h-14 sm:w-16 sm:h-16 mb-4 sm:mb-6"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-500" />
            <div className="relative w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={2.5} />
            </div>
          </motion.div>

          <div className="flex-grow">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4 group-hover:text-blue-600 transition-colors duration-300">
              {title}
            </h3>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-6">
              {description}
            </p>
          </div>

          {/* Stats badge with shimmer effect */}
          <div className="relative mt-auto">
            <div className="relative overflow-hidden text-xs sm:text-sm font-semibold text-blue-600 bg-blue-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full inline-flex items-center gap-2 group-hover:bg-blue-100 transition-colors duration-300">
              <span className="relative z-10">{stats}</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                initial={{ x: "-100%" }}
                whileInView={{ x: "100%" }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut"
                }}
              />
            </div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ delay: delay / 1000 + 0.3, duration: 0.6 }}
        />
      </motion.div>
    </motion.div>
  );
}
