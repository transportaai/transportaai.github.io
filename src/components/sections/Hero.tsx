import { ArrowRight, ChevronDown } from 'lucide-react';
import { useIntersectionObserver } from '@/utils/animations';

export default function Hero() {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });

  const handleScrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-primary">
        {/* Decorative shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#3498db]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 pt-24 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          {/* Title */}
          <h1 
            className={`hero-title text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 transition-all duration-700 delay-100 ${
              hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Transforming Transportation with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3498db] to-cyan-300">
              Data Analytics
            </span>
          </h1>

          {/* Description */}
          <p 
            className={`text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${
              hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Specializing in data analysis, network optimization, visualization, and performance assessment for freight and passenger transport systems.
            Helping transform raw transport data into meaningful operational intelligence.  
          </p>

          {/* CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 delay-300 ${
              hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <button 
              onClick={handleScrollToProjects}
              className="btn-primary group"
            >
              View Projects
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button 
              onClick={handleScrollToContact}
              className="btn-outline border-white/30 text-white hover:bg-white hover:text-[#2c3e50]"
            >
              Contact Me
            </button>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/50" />
      </div>
    </section>
  );
}
