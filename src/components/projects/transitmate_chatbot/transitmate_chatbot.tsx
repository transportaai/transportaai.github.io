import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Bot,
  MessageSquare,
  Search,
  Database,
  Brain,
  Server,
  Zap,
  Clock,
  MapPin,
  Route,
  Calendar,
  Menu,
  X,
  Github,
  Cpu
} from "lucide-react";
import Footer from '@/components/sections/Footer';
import Header from '@/components/sections/Header';
import HumorWarning from '@/components/HumorWarning';
// Import assets
import serviceUpdatesUrl from './assets/figures/translink_service_updates.png?url';
import frontendUrl from './assets/figures/frontend.png?url';
import example1Url from './assets/figures/Example1.png?url';
import example1TsaUrl from './assets/figures/Example1TSA.png?url';
import example2Url from './assets/figures/Example2.png?url';
import example2TsaUrl from './assets/figures/Example2TSA.png?url';
import example3Url from './assets/figures/Example3.png?url';
import example3TsaUrl from './assets/figures/Example3TSA.png?url';
import example4Url from './assets/figures/Example4.png?url';
import example4TsaUrl from './assets/figures/Example4TSA.png?url';
import algorithmUrl from './assets/figures/algorithm.png?url';

// Image component with expand functionality
const ExpandableImage = ({ src, alt, caption }: { src: string, alt: string, caption?: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <>
      <div className="w-full mb-6">
        <div 
          className="relative bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setIsExpanded(true)}
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-auto"
          />
        </div>
        {caption && (
          <p className="text-xs text-[#95a5a6] mt-2 text-center italic">
            Figure: {caption}
          </p>
        )}
      </div>

      {/* Full-screen modal */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsExpanded(false)}
        >
          <button 
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsExpanded(false)}
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={src}
            alt={alt}
            className="max-h-[95vh] max-w-[95vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

// Use case images component with side-by-side modal
const UseCaseImages = ({ image, tsaImage, title }: { image: string, tsaImage: string, title: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <>
      <div className="space-y-2">
        <div 
          className="bg-gray-50 rounded-lg p-2 cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => setIsExpanded(true)}
        >
          <img src={image} alt={`${title} example`} className="w-full rounded" />
        </div>
        <div 
          className="bg-gray-50 rounded-lg p-2 cursor-pointer hover:bg-gray-100 transition-colors"
          onClick={() => setIsExpanded(true)}
        >
          <img src={tsaImage} alt={`${title} technical`} className="w-full rounded" />
        </div>
      </div>

      {/* Side-by-side modal */}
      {isExpanded && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setIsExpanded(false)}
        >
          <button 
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
            onClick={() => setIsExpanded(false)}
          >
            <X className="w-6 h-6" />
          </button>
          <div 
            className="grid md:grid-cols-2 gap-4 max-h-[95vh] max-w-[95vw] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-lg p-2">
              <img src={image} alt={`${title} example`} className="w-full h-auto" />
            </div>
            <div className="bg-white rounded-lg p-2">
              <img src={tsaImage} alt={`${title} technical`} className="w-full h-auto" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default function TransitmateChatbot() {
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -35% 0px" }
    );

    document.querySelectorAll('div[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      observer.disconnect();
    };
  }, []);

  const sections = [
    { id: "overview", label: "1. Overview" },
    { id: "examples", label: "2. Examples in Action" },
    { id: "how-it-works", label: "3. How it Works" },
    { id: "technical", label: "4. Technical Implementation" },
    { id: "notes", label: "Notes and References" },
  ];

  const techStack = [
    "Python", "Flask", "Ollama", "RSS Feeds", "BeautifulSoup", "Local LLMs"
  ];

  const externalLinks = [
    {
      label: "GitHub Repository",
      url: "https://github.com/sanjeevbhurtyal/Translink_Service_Update_RAG_Chatbot ",
      icon: Github,
    }
  ];

  const useCases = [
    {
      title: "Location-Based Queries",
      image: example1Url,
      tsaImage: example1TsaUrl,
      description: "Ask about 'Logan South' and actually get answers about Logan South. Revolutionary.",
      icon: MapPin,
    },
    {
      title: "Route-Specific Impacts",
      image: example2Url,
      tsaImage: example2TsaUrl,
      description: "Is the 330 route running? Finally, a bot that understands route numbers.",
      icon: Route,
    },
    {
      title: "Stop Accessibility",
      image: example3Url,
      tsaImage: example3TsaUrl,
      description: "Will my stop be open? The crystal ball of public transport, but with actual data.",
      icon: MapPin,
    },
    {
      title: "Event Impact Analysis",
      image: example4Url,
      tsaImage: example4TsaUrl,
      description: "What's closed because of The Triathlon? Because planning ahead is apparently still a thing people do.",
      icon: Calendar,
    },
  ];

  const features = [
    {
      icon: Zap,
      title: "Rapid Data Access",
      description: "Query current service impacts instantly without manually navigating through 47 web pages.",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      icon: Database,
      title: "Structured Insight Extraction",
      description: "Automatically parses unstructured transit notices into actionable summaries. Like having a really smart intern who never sleeps.",
      color: "bg-blue-100 text-blue-700",
    },
    {
      icon: Search,
      title: "Enhanced Search Accuracy",
      description: "Combines keyword search with semantic understanding. It knows 'closures' and 'disruptions' are basically the same thing.",
      color: "bg-green-100 text-green-700",
    },
  ];

  return (
    <div className="min-h-screen bg-background w-full">
      <Header />
      
      {/* Hero Header */}
      <div className="gradient-primary pt-24 pb-8 w-full">
        <div className="container-custom px-4 sm:px-6 lg:px-8 xl:px-12 w-full max-w-full">
          <Link
            to="/"
            state={{ targetId: 'projects' }}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
          <HumorWarning variant="disclaimer"/>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            TransitMate: AI-Powered TransLink Service Update Chatbot
          </h1>

          <p className="text-white/80 text-base sm:text-lg max-w-5xl">
            An AI chatbot that actually understands what you mean when you ask "Is my bus broken?" Built with RAG architecture, local LLMs, and a deep frustration with navigating transit websites. 
          </p>
        </div>
      </div>

      {/* Project Overview */}
      <section className="py-8 sm:py-12 lg:py-16 w-full">
        <div className="container-custom px-4 sm:px-6 lg:px-8 xl:px-12 w-full max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            
            {/* Left Navigation - Desktop */}
            <div className="hidden lg:block lg:col-span-2 xl:col-span-2">
              <div className="sticky top-24 space-y-2">
                <h4 className="font-bold text-primary mb-4 px-3 uppercase text-xs tracking-wider">Contents</h4>
                <nav>
                  <ul className="space-y-1">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                            window.history.replaceState(window.history.state, '', `#${section.id}`);
                          }}
                          className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                            activeSection === section.id
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                          }`}
                        >
                          {section.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="lg:hidden col-span-1 mb-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center gap-2 w-full p-4 bg-white rounded-xl shadow-sm border border-gray-200 text-primary font-semibold"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                {isMobileMenuOpen ? "Close Table of Contents" : "Table of Contents"}
              </button>
              {isMobileMenuOpen && (
                <div className="mt-2 bg-white rounded-xl shadow-sm border border-gray-200 p-2">
                  <ul className="space-y-1">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            setIsMobileMenuOpen(false);
                            document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="block px-3 py-2 text-sm rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                        >
                          {section.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="col-span-1 lg:col-span-7 xl:col-span-8 space-y-6 lg:space-y-8 w-full min-w-0">
              
              {/* Overview */}
              <div id="overview" className="bg-white rounded-2xl p-2 sm:p-2 lg:p-2 shadow-sm border-l-4 border-secondary scroll-mt-24 w-full">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                  1. Overview: The Problem With Transit Updates
                </h2>

                <p className="text-[#555] leading-relaxed mb-6 text-sm sm:text-base">
                  Transport networks operate dynamically, which is a fancy way of saying "stuff breaks, closes, and changes constantly." 
                  Staying informed about service disruptions presents an ongoing challenge for commuters and transport planners alike. 
                  While TransLink regularly updates service status through website notices and RSS feeds, extracting specific information 
                  about particular routes or stations from these fragmented sources remains time-consuming and inefficient. 
                </p>

                <ExpandableImage 
                  src={serviceUpdatesUrl} 
                  alt="Translink Service Updates" 
                  caption="The current state of transit updates" 
                />

                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4 sm:p-6 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Bot className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                    <h3 className="text-lg sm:text-xl font-bold text-primary">Enter TransitMate</h3>
                  </div>
                  <p className="text-[#555] leading-relaxed text-sm sm:text-base">
                    TransitMate addresses this information fragmentation through an intelligent conversational AI system. 
                    Leveraging Retrieval-Augmented Generation (RAG), it delivers real-time, context-aware responses to natural language 
                    queries about disruptions, track closures, and stop impacts across the TransLink network. 
                  </p>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-primary mb-4">
                  Key Benefits for Planners & Modellers (And Regular Humans Too)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {features.map((feature, idx) => (
                    <div key={idx} className={`rounded-xl p-4 ${feature.color} bg-opacity-20 border border-current`}>
                      <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 mb-3" />
                      <h4 className="font-bold mb-2 text-sm sm:text-base">{feature.title}</h4>
                      <p className="text-xs sm:text-sm opacity-90">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Examples in Action */}
              <div id="examples" className="bg-white rounded-2xl p-2 sm:p-2 lg:p-2 shadow-sm scroll-mt-24 w-full">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                  2. Examples in Action: Watch It Actually Work
                </h2>

                <p className="text-[#555] leading-relaxed mb-6 text-sm sm:text-base">
                  TransitMate enables users to query the transit network using natural language, receiving clear, concise summaries 
                  of service impacts.
                </p>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <ExpandableImage 
                    src={frontendUrl} 
                    alt="Interactive Chatbot Interface" 
                    caption="The interface: clean, simple, and doesn't require a computer science degree to operate" 
                  />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-primary mb-4">
                  Common Use Cases (Or: Things You Can Actually Ask It)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {useCases.map((useCase, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                      <div className="flex items-center gap-2 mb-3">
                        <useCase.icon className="w-5 h-5 text-primary" />
                        <h4 className="font-bold text-primary text-sm sm:text-base">{useCase.title}</h4>
                      </div>
                      <p className="text-sm text-[#555] mb-3">{useCase.description}</p>
                      <UseCaseImages 
                        image={useCase.image}
                        tsaImage={useCase.tsaImage}
                        title={useCase.title}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* How It Works */}
              <div id="how-it-works" className="bg-white rounded-2xl p-2 sm:p-2 lg:p-2 shadow-sm scroll-mt-24 w-full">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                  3. How it Works: The Magic Explained (Without Actual Magic)
                </h2>

                <ExpandableImage 
                  src={algorithmUrl} 
                  alt="System Architecture" 
                  caption="The pipeline: data goes in, intelligence comes out, coffee consumption remains high" 
                />

                <p className="text-[#555] leading-relaxed mb-6 text-sm sm:text-base">
                  The system operates as a pipeline that transforms raw transit notices into a searchable, 
                  semantically-enriched knowledge base. It's like having a really fast, really thorough research assistant 
                  who never needs bathroom breaks.
                </p>

                <div className="space-y-4 sm:space-y-6">
                  {/* Step 1 */}
                  <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Database className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-primary text-base sm:text-lg">1. Data Ingestion & Enrichment</h3>
                    </div>
                    <p className="text-[#555] leading-relaxed mb-3 text-sm sm:text-base">
                      The pipeline monitors official Translink RSS feeds and scrapes detailed service update pages. 
                      It doesn't just collect text; it uses AI to <strong>extract structured metadata</strong> such as:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-blue-50 rounded-lg p-3 text-center">
                        <Route className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-sm font-semibold text-blue-900">Affected Routes</div>
                        <div className="text-xs text-blue-700">Not just "some buses"</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3 text-center">
                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-sm font-semibold text-blue-900">Specific Stops</div>
                        <div className="text-xs text-blue-700">Actual locations, not "various"</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3 text-center">
                        <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-sm font-semibold text-blue-900">Start & End Dates</div>
                        <div className="text-xs text-blue-700">When things break and when they un-break</div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                      </div>
                      <h3 className="font-bold text-primary text-base sm:text-lg">2. Intelligent Knowledge Base</h3>
                    </div>
                    <p className="text-[#555] leading-relaxed text-sm sm:text-base">
                      Information is stored in a specialized "Vector Store" that allows the system to understand the meaning of a query, 
                      not just exact keywords. This means it can connect "closures" with "disruptions" or "track work" automatically. 
                      It's like the system actually paid attention in synonym class, unlike your average search engine.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      </div>
                      <h3 className="font-bold text-primary text-base sm:text-lg">3. Contextual Query Engine</h3>
                    </div>
                    <p className="text-[#555] leading-relaxed mb-3 text-sm sm:text-base">
                      When a user asks a question, the system performs a three-step dance of computational linguistics:
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 text-green-800 font-bold text-sm">1</div>
                        <p className="text-sm text-[#555]"><strong>Analyzes the timeframe:</strong> Identifies if you're asking about "today", "next week", or "that time I got stranded in February"</p>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 text-green-800 font-bold text-sm">2</div>
                        <p className="text-sm text-[#555]"><strong>Retrieves Relevant Notices:</strong> Performs hybrid search to find the most accurate notices based on keywords and context</p>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 text-green-800 font-bold text-sm">3</div>
                        <p className="text-sm text-[#555]"><strong>Generates Human-Like Responses:</strong> Summarizes technical details into clear answers with official links (for the skeptics)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Implementation */}
              <div id="technical" className="bg-white rounded-2xl p-2 sm:p-2 lg:p-2 shadow-sm scroll-mt-24 w-full">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                  4. Technical Implementation: The Nerdy Bits (That Make It Work)
                </h2>

                <p className="text-[#555] leading-relaxed mb-6 text-sm sm:text-base">
                  While designed for transit riders, the system is built on a robust, privacy-focused tech stack that won't sell your 
                  commute patterns to advertisers. Because some things should remain between you and your transit app.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
                      <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
                    </div>
                    <h4 className="font-bold text-indigo-900 mb-2 text-sm sm:text-base">Local Intelligence</h4>
                    <p className="text-xs sm:text-sm text-indigo-800">
                      Powered by local Large Language Models (LLMs) via Ollama, ensuring data processing remains local and secure. 
                      (Also because I can't afford ChatGPT... yet.)
                    </p>
                  </div>

                  <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-full flex items-center justify-center mb-3">
                      <Search className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                    </div>
                    <h4 className="font-bold text-amber-900 mb-2 text-sm sm:text-base">Hybrid Retrieval</h4>
                    <p className="text-xs sm:text-sm text-amber-800">
                      Employs semantic and keyword search to ensure high precision in identifying specific transit routes and stops. 
                      Best of both worlds, like a mullet but for search algorithms.
                    </p>
                  </div>

                  <div className="bg-rose-50 rounded-xl p-4 border border-rose-200 sm:col-span-2 lg:col-span-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-rose-100 rounded-full flex items-center justify-center mb-3">
                      <Server className="w-5 h-5 sm:w-6 sm:h-6 text-rose-600" />
                    </div>
                    <h4 className="font-bold text-rose-900 mb-2 text-sm sm:text-base">Micro-Backend</h4>
                    <p className="text-xs sm:text-sm text-rose-800">
                      A lightweight Flask-based backend handles data orchestration and real-time querying. 
                      Small but mighty, like a chihuahua with a computer science degree.
                    </p>
                  </div>
                </div>
              </div>

              <div id="notes" className="bg-white rounded-2xl p-2 sm:p-2 lg:p-2 shadow-sm scroll-mt-24 w-full">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                  Notes and References (The "Try it yourself" Section)
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  {externalLinks.map((link) => (
                    <a 
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group text-center"
                    >
                      <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <link.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-primary group-hover:text-secondary transition-colors">
                        {link.label}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            

            {/* Sidebar - Desktop */}
            <div className="hidden lg:block lg:col-span-3 xl:col-span-2 space-y-4">
              
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h3 className="font-bold text-primary mb-3 text-sm">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => <span key={tech} className="project-tag text-xs">{tech}</span>)}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h3 className="font-bold text-primary mb-3 text-sm">Resources</h3>
                <div className="space-y-2">
                  {externalLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-[#555] hover:text-secondary transition-colors p-2 rounded-lg hover:bg-gray-50 group"
                    >
                      <link.icon className="w-4 h-4 text-gray-400 group-hover:text-secondary transition-colors" />
                      <span className="truncate">{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}