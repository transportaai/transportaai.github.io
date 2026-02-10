import { Linkedin, Twitter, Github, MessageCircle, Mail, BarChart3 } from 'lucide-react';
import { navLinks, areaOfExpertise, socialLinks } from '@/data/portfolioData';
import logo from '@/assets/images/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';

const iconMap: Record<string, React.ElementType> = {
  'linkedin-in': Linkedin,
  twitter: Twitter,
  github: Github,
  'envelope': Mail,
  'tableau': BarChart3,
  'medium-m': MessageCircle
};

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // If we're already on the home page, just scroll to the section
    if (location.pathname === '/') {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on a project page, navigate to home and scroll to section
      const targetId = href.replace('#', '');
      navigate('/', { state: { targetId } });
    }
  };

  return (
    <footer className="bg-[#2c3e50] text-white md:py-4">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Brand Column - Centered */}
          <div className="text-center">
            <a 
              href="#home" 
              onClick={(e) => handleNavClick(e, '#home')}
              className="inline-flex flex-col items-center gap-3 mb-5 group"
            >
              <div className="transition-all duration-300">
                <img 
                  src={logo} 
                  alt="Transport Analytics Logo" 
                  className="w-30 h-12 object-contain"
                />
              </div>
              <span className="text-xl font-bold">
                <span className="text-[#2980b9]">Transport</span> <br />
                <span className="text-[#27ae60]"> Analytics </span>
                <span className="text-[#e67e22]"> & Insights</span>
              </span>
            </a>
            <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-sm mx-auto">
              Transforming urban mobility through data-driven insights and analytics for public transportation networks.
            </p>
            <div className="flex gap-3 justify-center">
              {socialLinks.map((social) => {
                const IconComponent = iconMap[social.icon] || MessageCircle;
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={social.platform}
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links - Centered */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-5">
              <div className="inline-block relative pb-3">
                <span>Quick Links</span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-[#3498db]" />
              </div>
            </h3>
            <ul className="space-y-3 inline-block">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-white/70 hover:text-[#3498db] transition-colors duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-[#3498db]/50 rounded-full group-hover:bg-[#3498db] transition-colors duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services - Centered */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-5">
              <div className="inline-block relative pb-3">
                <span>Areas of Expertise</span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-[#3498db]" />
              </div>
            </h3>
            <ul className="space-y-3 inline-block">
              {areaOfExpertise.map((service) => (
                <li key={service}>
                  <span className="text-white/70 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#3498db]/50 rounded-full" />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      </div>
    </footer>
  );
}