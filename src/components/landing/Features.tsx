'use client';

import FeatureCard from './FeatureCard';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  BarChart3,
  LucideIcon
} from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  stats: string;
}

const features: Feature[] = [
  {
    icon: Users,
    title: "Employee Management",
    description: "Centralized profiles, onboarding workflows, and org chart visualization.",
    stats: "10K+ active users"
  },
  {
    icon: Calendar,
    title: "Smart Attendance",
    description: "Biometric integration, geo-fencing, and automated leave management.",
    stats: "99.9% uptime"
  },
  {
    icon: DollarSign,
    title: "Payroll Automation",
    description: "Statutory compliance, multiple payment methods, and payslip.",
    stats: "24hr processing"
  },
  {
    icon: BarChart3,
    title: "Performance Reviews",
    description: "360-degree feedback, OKR tracking, and promotion recommendations.",
    stats: "Custom workflows"
  }
];

export default function Features() {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Everything You Need to Manage Your Workforce
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From hiring to retirement, we've got every HR workflow covered with enterprise-grade security.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} delay={index * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
