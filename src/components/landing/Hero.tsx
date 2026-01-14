'use client';

import { Button } from '@/components/ui/Button';
import { ShieldCheck, PlayCircle, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden py-20 md:py-32 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800">
      <div className="absolute inset-0 bg-[url('/pattern-dots.svg')] opacity-10" />
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-8">
            <ShieldCheck className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Trusted by 5000+ Companies</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-6 drop-shadow-lg">
            Modern <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">HRMS</span>
            <br />
            for Growing Teams
          </h1>

          <p className="text-xl md:text-2xl text-blue-100/90 max-w-2xl mx-auto mb-12 leading-relaxed">
            Streamline employee management, payroll, attendance, and performance tracking
            with our all-in-one HR solution built for scale.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Button
              size="lg"
              variant="primary"
              className="shadow-2xl shadow-blue-500/25 group cursor-pointer"
              onClick={() => router.push('/login')}
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="secondary" className="border-2 border-white/30 backdrop-blur-sm cursor-pointer">
              <PlayCircle className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          <div className="flex justify-center space-x-8 text-sm text-blue-200">
            <div>14-day free trial • No credit card needed</div>
          </div>
        </div>
      </div>
    </section>
  );
}
