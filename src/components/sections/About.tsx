import { Link } from 'react-router-dom';
import { skills } from '@/data/portfolioData';
import { useIntersectionObserver } from '@/utils/animations';
import profileImage from '@/assets/images/profile.jpg';
import { ArrowRight } from 'lucide-react';

export default function About() {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.1 });

  const technicalSkills = skills.filter(s => s.category === 'technical');
  const analyticalSkills = skills.filter(s => s.category === 'analytical');
  const softSkills = skills.filter(s => s.category === 'soft');

  return (
    <section id="about" className="py-4 md:py-8 bg-white scroll-mt-20 md:scroll-mt-12" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <div 
          className={`text-center mb-1 transition-all duration-700 ${
            hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1 bg-[#3498db]/10 text-[#3498db] rounded-full text-sm font-medium mb-4">
            About Me
          </span>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div 
            className={`relative transition-all duration-700 delay-200 ${
              hasIntersected ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-[#3498db]/20 to-[#2c3e50]/20 rounded-2xl" />
              
              {/* Main image */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={profileImage}
                  alt="Sanjeev Bhurtyal - Transportation Data Specialist"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2c3e50]/30 to-transparent" />
              </div>

              {/* Experience badge */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-4 md:p-6">
                <div className="text-3xl md:text-4xl font-bold text-[#3498db]">5+</div>
                <div className="text-sm text-[#95a5a6]">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div 
            className={`transition-all duration-700 delay-300 ${
              hasIntersected ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <h3 className="text-2xl font-bold text-[#2c3e50] mb-6">
              Transportation Data Specialist
            </h3>
            
            <div className="space-y-4 text-[#555] leading-relaxed mb-8">
              <p>
                I'm a transportation data professional with over 5 years of experience across 
                government, consulting, and research, specializing in freight and transportation 
                systems analytics. My work bridges the gap between complex data sets and actionable insights for transportation 
                planners and researchers.
              </p>
              <p>
                My expertise includes large scale data analysis, optimization, network analysis, 
                forecasting, and performance metrics development. 
              </p>
              <p>
                When I'm not crunching numbers, I'm exploring new transportation technologies, 
                participating in planning discussions, or contributing to open data 
                initiatives that make transportation information more accessible to the public.
              </p>
            </div>
            
            <div className="mb-8">
              <Link to="/publications" className="inline-flex items-center gap-2 text-lg text-[#3498db] font-semibold hover:gap-3 transition-all duration-300">
                View Publications
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Skills */}
            <div className="space-y-2">
              {/* Technical Skills */}
              <div>
                <h4 className="text-sm font-semibold text-[#2c3e50] uppercase tracking-wider mb-1">
                  Technical Skills
                </h4>
                <div className="flex flex-wrap gap-1">
                  {technicalSkills.map((skill) => (
                    <span key={skill.name} className="skill-tag text-xs">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Analytical Skills */}
              <div>
                <h4 className="text-sm font-semibold text-[#2c3e50] uppercase tracking-wider mb-1">
                  Analytical Skills
                </h4>
                <div className="flex flex-wrap gap-1">
                  {analyticalSkills.map((skill) => (
                    <span key={skill.name} className="skill-tag">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div>
                <h4 className="text-sm font-semibold text-[#2c3e50] uppercase tracking-wider mb-1">
              Soft Skills
                </h4>
                <div className="flex flex-wrap gap-1">
                  {softSkills.map((skill) => (
                    <span key={skill.name} className="skill-tag">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
