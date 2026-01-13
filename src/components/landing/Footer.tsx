import { 
  Github, 
  Twitter, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';

const navigation = {
  product: ['Features', 'Pricing', 'Security', 'Integrations'],
  company: ['About', 'Careers', 'Contact', 'Press'],
  resources: ['Blog', 'Help Center', 'Status', 'Documentation']
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-blue-400">
              HRMS Pro
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              The modern HR platform that scales with your business. Trusted by thousands of teams worldwide.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              {[
                { icon: Github, href: '#', label: 'Github' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' }
              ].map(({ icon: Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Navigation Links */}
          {Object.entries(navigation).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-base mb-4 capitalize text-white">{title}</h4>
              <ul className="space-y-2.5 text-sm">
                {links.map((item) => (
                  <li key={item}>
                    <a 
                      href="#" 
                      className="text-gray-400 hover:text-white transition-colors inline-block"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6 mb-6 sm:mb-8 justify-center sm:justify-start">
            <a 
              href="mailto:hello@hrmspro.com" 
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span>hello@hrmspro.com</span>
            </a>
            <a 
              href="tel:+15551234567" 
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>+1 (555) 123-4567</span>
            </a>
          </div>
          
          {/* Copyright */}
          <div className="text-center sm:text-left">
            <p className="text-sm text-gray-500">
              &copy; 2026 HRMS Pro. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}