'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUp, Users, CheckCircle2, Clock } from 'lucide-react';

interface Stat {
  value: string;
  label: string;
  suffix: string;
  icon: React.ElementType;
}

const stats: Stat[] = [
  { value: '5000+', label: 'Happy Companies', suffix: '', icon: Users },
  { value: '25000+', label: 'Active Employees', suffix: '', icon: Users },
  { value: '99.9', label: 'Uptime Guarantee', suffix: '%', icon: CheckCircle2 },
  { value: '24', label: 'Payroll Hours', suffix: 'hrs', icon: Clock }
];

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  // Simple counter animation (implement with useEffect/useState in real app)
  return (
    <span>{end.toLocaleString()}{suffix}</span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-800">
      <div className="container mx-auto px-6 lg:px-8" ref={ref}>
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Trusted by Teams Worldwide
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Real results from real companies using our HRMS platform.
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.2 }}
              className="space-y-4"
            >
              <div className="icon-placeholder w-16 h-16 mx-auto bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">
                {inView ? <CountUp end={parseFloat(stat.value)} suffix={stat.suffix} /> : stat.value}
              </div>
              <div className="text-xl font-semibold text-blue-100">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
