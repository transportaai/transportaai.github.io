import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { projects } from '@/data/portfolioData';
import { getStaggerDelay } from '@/utils/animations';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';



export default function AllProjects() {


  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container-custom">
          {/* Header */}
          <div className="mb-12">
            <Link 
              to="/" 
              state={{ targetId: 'projects' }}
              className="inline-flex items-center gap-2 text-[#95a5a6] hover:text-[#3498db] mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            
            <h1 className="text-3xl md:text-5xl font-bold text-[#2c3e50] mb-4">
              Projects
            </h1>
            <p className="text-[#95a5a6] text-lg max-w-2xl">
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
                <article
                  key={project.id}
                  className="card-modern group animate-fade-in-up flex flex-col h-full"
                  style={{ animationDelay: `${getStaggerDelay(index, 50)}ms` }}
                >
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
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
