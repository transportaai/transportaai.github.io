import { Mail, Linkedin, Github, BarChart3 } from 'lucide-react';
import { contactInfo } from '@/data/portfolioData';
import { useIntersectionObserver } from '@/utils/animations';

export default function Contact() {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="contact" className="py-4 md:py-8 bg-[#f8f9fa] scroll-mt-20 md:scroll-mt-12" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <div 
          className={`text-center mb-1 transition-all duration-700 ${
            hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="section-title text-3xl md:text-4xl font-bold text-[#2c3e50] mb-4">
            Get In Touch
          </h2>
          <p className="text-[#95a5a6] max-w-xl mx-auto">
            Interested in collaborating on transportation data projects? Let's discuss how I can help.
          </p>
        </div>

        {/* Contact Grid - Full Width Single Row */}
        <div className="w-full max-w-4xl mx-auto flex flex-wrap justify-between gap-8">
          
          {/* Email */}
          <div className="flex flex-col items-center gap-3 group">
            <a 
              href={`mailto:${contactInfo.email}`}
              className="w-16 h-16 bg-[#3498db]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#3498db] transition-all duration-300 group-hover:scale-110 shadow-sm"
            >
              <Mail className="w-7 h-7 text-[#3498db] group-hover:text-white transition-colors duration-300" />
            </a>
            <a 
              href={`mailto:${contactInfo.email}`}
              className="font-semibold text-[#2c3e50] hover:text-[#3498db] transition-colors duration-300 text-lg"
            >
              Email
            </a>
          </div>

          {/* LinkedIn */}
          <div className="flex flex-col items-center gap-3 group">
            <a 
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 bg-[#3498db]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#3498db] transition-all duration-300 group-hover:scale-110 shadow-sm"
            >
              <Linkedin className="w-7 h-7 text-[#3498db] group-hover:text-white transition-colors duration-300" />
            </a>
            <a 
              href={contactInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#2c3e50] hover:text-[#3498db] transition-colors duration-300 text-lg"
            >
              LinkedIn
            </a>
          </div>

          {/* GitHub */}
          <div className="flex flex-col items-center gap-3 group">
            <a 
              href={contactInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 bg-[#3498db]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#3498db] transition-all duration-300 group-hover:scale-110 shadow-sm"
            >
              <Github className="w-7 h-7 text-[#3498db] group-hover:text-white transition-colors duration-300" />
            </a>
            <a 
              href={contactInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#2c3e50] hover:text-[#3498db] transition-colors duration-300 text-lg"
            >
              GitHub
            </a>
          </div>

          {/* Tableau */}
          <div className="flex flex-col items-center gap-3 group">
            <a 
              href={contactInfo.tableau}
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 bg-[#3498db]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#3498db] transition-all duration-300 group-hover:scale-110 shadow-sm"
            >
              <BarChart3 className="w-7 h-7 text-[#3498db] group-hover:text-white transition-colors duration-300" />
            </a>
            <a 
              href={contactInfo.tableau}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#2c3e50] hover:text-[#3498db] transition-colors duration-300 text-lg"
            >
              Tableau
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
