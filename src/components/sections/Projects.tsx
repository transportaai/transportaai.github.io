import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/data/portfolioData';
import { useIntersectionObserver, getStaggerDelay } from '@/utils/animations';



export default function Projects() {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.05 });

  return (
    <section id="projects" className="py-4 md:py-8 bg-[#f8f9fa] scroll-mt-20 md:scroll-mt-12" ref={ref}>
      <div className="container-custom">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="section-title text-3xl md:text-4xl font-bold text-[#2c3e50] mb-4">
            Featured Projects
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, 3).map((project, index) => {

            return (
              <article
                key={project.id}
                className={`card-modern group transition-all duration-700 flex flex-col h-full ${
                  hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${getStaggerDelay(index, 100)}ms` }}
              >
                {/* Image Area */}
                <Link to={project.link} className="block h-48 relative overflow-hidden group cursor-pointer">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-[#2c3e50] mb-3 group-hover:text-[#3498db] transition-colors duration-300">
                    <Link to={project.link} className="hover:underline">
                      {project.title}
                    </Link>
                  </h3>
                  
                  <p className="text-[#95a5a6] text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Link */}
                  <div className="mt-auto">
                    <Link
                      to={project.link}
                      className="inline-flex items-center gap-2 text-[#3498db] font-medium text-sm hover:gap-3 transition-all duration-300"
                    >
                      View Case Study
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* View All Button */}
        <div 
          className={`text-center mt-12 transition-all duration-700 delay-700 ${
            hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Link to="/projects" className="btn-outline inline-flex items-center gap-2">
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
