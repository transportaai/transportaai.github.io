import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, BookOpen, GraduationCap, Users, Calendar } from 'lucide-react';
import { publications } from '@/data/portfolioData';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';

export default function Publications() {
  const journals = publications.filter(p => p.type === 'journal');
  const conferences = publications.filter(p => p.type === 'conference');
  const dissertations = publications.filter(p => p.type === 'dissertation');

  const PublicationCard = ({ pub }: { pub: typeof publications[0] }) => (
    <div className="bg-white rounded-xl p-2 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold text-[#2c3e50] leading-tight">
          {pub.title}
        </h3>
        
        <div className="flex items-start gap-2 text-sm text-[#555]">
          <Users className="w-4 h-4 mt-1 flex-shrink-0 text-[#3498db]" />
          <span dangerouslySetInnerHTML={{ __html: pub.authors.replace('Bhurtyal, S.', '<strong>Bhurtyal, S.</strong>') }} />
        </div>

        <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-[#7f8c8d]">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-[#e67e22]" />
            <span className="italic">{pub.venue}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#27ae60]" />
            <span>{pub.year}</span>
          </div>
        </div>

        {pub.summary && (
          <p className="text-sm text-[#555] bg-gray-50 p-3 rounded-lg mt-2">
            <strong>Summary:</strong> {pub.summary}
          </p>
        )}

        {pub.link && (
          <div className="mt-2">
            <a 
              href={pub.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#3498db] hover:text-[#2980b9] transition-colors"
            >
              Available here
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-5 overflow-hidden mb-10">
          {/* Background Gradient */}
          <div className="absolute inset-0 gradient-primary">
            {/* Decorative shapes */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#3498db]/10 rounded-full blur-3xl" />
            
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

          <div className="container-custom relative z-10">
            <Link 
              to="/" 
              state={{ targetId: 'about' }}
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Publications
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
              Research contributions in transportation systems, freight logistics, and resilience analysis.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <div className="container-custom py-16">
          <div className="space-y-12">
            {/* Peer-Reviewed Journal Articles */}
            <section>
              <div className="flex items-center gap-3 mb-4 border-b border-gray-200 pb-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-[#2c3e50]">Peer-Reviewed Journal Articles</h2>
              </div>
              <div className="grid gap-3">
                {journals.map(pub => (
                  <PublicationCard key={pub.id} pub={pub} />
                ))}
              </div>
            </section>

            {/* Conference Proceedings */}
            <section>
              <div className="flex items-center gap-3 mb-4 border-b border-gray-200 pb-2">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-[#2c3e50]">Conference Proceedings</h2>
              </div>
              <div className="grid gap-3">
                {conferences.map(pub => (
                  <PublicationCard key={pub.id} pub={pub} />
                ))}
              </div>
            </section>

            {/* Dissertation */}
            <section>
              <div className="flex items-center gap-3 mb-4 border-b border-gray-200 pb-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-[#2c3e50]">Dissertation</h2>
              </div>
              <div className="grid gap-3">
                {dissertations.map(pub => (
                  <PublicationCard key={pub.id} pub={pub} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
