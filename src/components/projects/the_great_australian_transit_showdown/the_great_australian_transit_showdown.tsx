import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  MapPin,
  Train,
  Bus,
  Ship,
  Users,
  Menu,
  X,
  Github,
  BarChart3,
  Database,
  AlertCircle,
  TrendingUp,
  Zap,
  Info,
  Navigation,
  Car,
  Coffee
} from "lucide-react";
import Footer from '@/components/sections/Footer';
import Header from '@/components/sections/Header';
import HumorWarning from '@/components/HumorWarning';

// Placeholder for maps - UPDATE THESE PATHS
import mapBrisbane from './assets/figures/brisbane_isochrone_map.html?url';
import mapSydney from './assets/figures/sydney_isochrone_map.html?url';
import mapMelbourne from './assets/figures/melbourne_isochrone_map.html?url';

// ==================== INLINE VISUALIZATION COMPONENTS ====================

// Donut Chart Component
const DonutChart = ({ percentage, color, city, subtitle }: { percentage: number; color: string; city: string; subtitle: string }) => {
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="64" cy="64" r="40" stroke="#e5e7eb" strokeWidth="12" fill="none" />
          <circle 
            cx="64" cy="64" r="40" 
            stroke={color} 
            strokeWidth="12" 
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="butt"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-800">{percentage.toFixed(1)}%</span>
        </div>
      </div>
      <div className="text-center mt-2">
        <div className="font-bold text-gray-800">{city}</div>
        <div className="text-xs text-gray-500">{subtitle}</div>
      </div>
    </div>
  );
};

// Horizontal Bar Chart
const HorizontalBar = ({ label, value, color, maxValue, comment }: { label: string; value: number; color: string; maxValue: number; comment?: string }) => (
  <div className="mb-4">
    <div className="flex justify-between items-center mb-1">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <span className="text-sm font-bold" style={{ color }}>{value.toFixed(2)}</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
      <div 
        className="h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
        style={{ width: `${(value / maxValue) * 100}%`, backgroundColor: color }}
      >
        {value > 15 && <span className="text-white text-xs font-bold">{value.toFixed(1)}%</span>}
      </div>
    </div>
    {comment && <p className="text-xs text-gray-500 mt-1 italic">{comment}</p>}
  </div>
);

// Vertical Bar Chart
const VerticalBarChart = ({ data, maxValue }: { data: { label: string; value: number; color: string; subtext: string }[]; maxValue: number }) => (
  <div className="flex items-end justify-around h-64 gap-4">
    {data.map((item, idx) => (
      <div key={idx} className="flex flex-col items-center flex-1">
        <div 
          className="w-full rounded-t-lg transition-all duration-1000 ease-out relative"
          style={{ 
            height: `${(item.value / maxValue) * 200}px`, 
            backgroundColor: item.color,
            minHeight: '20px'
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-xs font-bold text-center px-1">{item.subtext}</span>
          </div>
        </div>
        <div className="text-xs text-gray-600 mt-2 text-center font-medium">{item.label}</div>
      </div>
    ))}
  </div>
);

// Stacked Bar Segment
const StackedBar = ({ segments, height = "h-12" }: { segments: { label: string; value: number; color: string }[]; height?: string }) => {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  
  return (
    <div className={`w-full ${height} rounded-lg overflow-hidden flex`}>
      {segments.map((segment, idx) => (
        <div 
          key={idx}
          className="h-full flex items-center justify-center text-white text-xs font-bold transition-all duration-1000"
          style={{ 
            width: `${(segment.value / total) * 100}%`, 
            backgroundColor: segment.color,
            minWidth: segment.value > 5 ? '40px' : '20px'
          }}
        >
          {segment.value > 8 && `${segment.value.toFixed(1)}%`}
        </div>
      ))}
    </div>
  );
};

// Gauge Chart
const GaugeChart = ({ value, color, label, sublabel }: { value: number; color: string; label: string; sublabel: string }) => {
  const angle = (value / 100) * 180;
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-24 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 100 50">
          {/* Background arc */}
          <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#e5e7eb" strokeWidth="10" />
          {/* Value arc */}
          <path 
            d="M 10 50 A 40 40 0 0 1 90 50" 
            fill="none" 
            stroke={color} 
            strokeWidth="10"
            strokeDasharray={`${(value / 100) * 126} 126`}
            className="transition-all duration-1000"
          />
          {/* Needle */}
          <line 
            x1="50" y1="50" 
            x2={50 - 35 * Math.cos((angle * Math.PI) / 180)} 
            y2={50 - 35 * Math.sin((angle * Math.PI) / 180)}
            stroke="#374151" 
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="50" cy="50" r="3" fill="#374151" />
        </svg>
      </div>
      <div className="text-3xl font-bold" style={{ color }}>{value.toFixed(1)}%</div>
      <div className="text-sm font-medium text-gray-700">{label}</div>
      <div className="text-xs text-gray-500">{sublabel}</div>
    </div>
  );
};

// Comparison Cards
const ComparisonCard = ({ city, color, icon: Icon, population, stops, trips, tagline, wins }: { 
  city: string; color: string; icon: any; population: string; stops: string; trips: string; tagline: string; wins: string[] 
}) => (
  <div 
    className="rounded-2xl p-5 text-white grid grid-rows-[auto_1fr_auto_auto]" 
    style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
  >
    {/* Row 1: Header */}
    <div className="flex items-center gap-2 mb-3">
      <Icon className="w-6 h-6" />
      <h3 className="font-bold text-lg">{city}</h3>
    </div>
    
    {/* Row 2: Tagline - fills available space to push stats down */}
    <div className="mb-3">
      <p className="text-sm text-white/90 italic">"{tagline}"</p>
    </div>
    
    {/* Row 3: Stats - always at same position */}
    <div className="text-xs text-white/80 mb-3 space-y-1">
      <div>Pop: {population} | Stops: {stops}</div>
      <div>Trips: {trips}</div>
    </div>
    
    {/* Row 4: Wins section - always at bottom */}
    <div className="border-t border-white/30 pt-2">
      <div className="text-xs font-semibold text-white/90 mb-1">Wins:</div>
      <ul className="text-xs text-white/80 space-y-0.5">
        {wins.map((win, i) => <li key={i}>• {win}</li>)}
      </ul>
    </div>
  </div>
);

// Scorecard Table
const ScorecardRow = ({ metric, brisbane, sydney, melbourne, winner }: { metric: string; brisbane: string; sydney: string; melbourne: string; winner?: 'brisbane' | 'sydney' | 'melbourne' }) => (
  <tr className="border-b border-gray-100">
    <td className="py-3 px-4 text-sm font-medium text-gray-700">{metric}</td>
    <td className={`py-3 px-4 text-sm text-center ${winner === 'brisbane' ? 'bg-green-100 font-bold text-green-800' : 'text-gray-600'}`}>{brisbane}</td>
    <td className={`py-3 px-4 text-sm text-center ${winner === 'sydney' ? 'bg-green-100 font-bold text-green-800' : 'text-gray-600'}`}>{sydney}</td>
    <td className={`py-3 px-4 text-sm text-center ${winner === 'melbourne' ? 'bg-green-100 font-bold text-green-800' : 'text-gray-600'}`}>{melbourne}</td>
  </tr>
);

// Map Iframe
const MapIframe = ({ src, title, height }: { src: string; title: string; height: string }) => (
  <div className="w-full mb-6">
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
      <iframe src={src} width="100%" height={height} style={{ border: "none", minHeight: height }} title={title} loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups" />
    </div>
    <p className="text-xs text-gray-400 mt-2 text-center italic">Figure: {title}</p>
  </div>
);

// ==================== MAIN COMPONENT ====================

export default function TransitShowdown() {
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id); }),
      { rootMargin: "-20% 0px -35% 0px" }
    );
    document.querySelectorAll('div[id]').forEach((section) => observer.observe(section));
    return () => { document.documentElement.style.scrollBehavior = 'auto'; observer.disconnect(); };
  }, []);

  const sections = [
    { id: "executive-summary", label: "Executive Summary" },
    { id: "the-contenders", label: "1. The Contenders" },
    { id: "reachability", label: "2. The Reachability Test" },
    { id: "infrastructure", label: "3. Infrastructure Wars" },
    { id: "travel-times", label: "4. Travel Time Reality" },
    { id: "30-minute-city", label: "5. The 30-Minute City" },
    { id: "mode-wars", label: "6. The Mode Wars" },
    { id: "forgotten-souls", label: "7. The Forgotten Souls" },
    { id: "walkability", label: "8. Walkability Score" },
    { id: "speed-vs-coverage", label: "9. Speed vs Coverage" },
    { id: "scorecard", label: "10. Final Scorecard" },
    { id: "maps", label: "11. Geographic View" },
    { id: "conclusion", label: "Conclusion" },
  ];

  // Data from JSON files
  const cityData = {
    brisbane: { name: 'Brisbane', color: '#3b82f6', population: 2783782, stops: 12794, trips: 20622, reachable: 92.713, walkable: 73.145, min30: 6.341, unreachable: 202842, stopsPer1k: 4.596, tripsPer1k: 7.408 },
    sydney: { name: 'Sydney', color: '#10b981', population: 5558560, stops: 42847, trips: 47707, reachable: 98.043, walkable: 90.733, min30: 6.094, unreachable: 108772, stopsPer1k: 7.708, tripsPer1k: 8.583 },
    melbourne: { name: 'Melbourne', color: '#f59e0b', population: 5353539, stops: 28807, trips: 37328, reachable: 98.353, walkable: 82.968, min30: 4.301, unreachable: 88161, stopsPer1k: 5.381, tripsPer1k: 6.973 }
  };

  const travelTimeData = {
    brisbane: [
      { label: '0-15 min', value: 0.249, color: '#10b981' },
      { label: '15-30 min', value: 6.092, color: '#34d399' },
      { label: '30-45 min', value: 13.280, color: '#fbbf24' },
      { label: '45-60 min', value: 17.610, color: '#f59e0b' },
      { label: '60-90 min', value: 35.500, color: '#ef4444' },
      { label: '90+ min', value: 19.982, color: '#7c2d12' }
    ],
    sydney: [
      { label: '0-15 min', value: 0.178, color: '#10b981' },
      { label: '15-30 min', value: 5.917, color: '#34d399' },
      { label: '30-45 min', value: 12.584, color: '#fbbf24' },
      { label: '45-60 min', value: 20.558, color: '#f59e0b' },
      { label: '60-90 min', value: 38.338, color: '#ef4444' },
      { label: '90+ min', value: 20.468, color: '#7c2d12' }
    ],
    melbourne: [
      { label: '0-15 min', value: 0.537, color: '#10b981' },
      { label: '15-30 min', value: 3.765, color: '#34d399' },
      { label: '30-45 min', value: 10.064, color: '#fbbf24' },
      { label: '45-60 min', value: 18.151, color: '#f59e0b' },
      { label: '60-90 min', value: 43.634, color: '#ef4444' },
      { label: '90+ min', value: 22.204, color: '#7c2d12' }
    ]
  };

  const modeData = {
    brisbane: { bus: 71.616, train: 16.845, ferry: 5.027, tram: 0 },
    sydney: { bus: 88.867, train: 24.024, ferry: 3.178, tram: 2.657 },
    melbourne: { bus: 78.136, train: 23.060, ferry: 0, tram: 14.267 }
  };

  return (
    <div className="min-h-screen bg-background w-full">
      <Header />
      
      {/* Hero */}
      <div className="gradient-primary pt-24 pb-8 w-full">
        <div className="container-custom px-4 sm:px-6 lg:px-8 xl:px-12 w-full max-w-full">
          <Link to="/" state={{ targetId: 'projects' }} className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />Back to Projects
          </Link>
          <HumorWarning variant="disclaimer"/>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            The Great Australian Transit Showdown
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-3xl">
            Brisbane vs Sydney vs Melbourne: Who's actually getting their citizens to work on time? 
            Spoiler: Everyone's losing, but some with more style than others.
          </p>
        </div>
      </div>

      <section className="py-8 sm:py-12 lg:py-16 w-full">
        <div className="container-custom px-4 sm:px-6 lg:px-8 xl:px-12 w-full max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            
            {/* Navigation */}
            <div className="hidden lg:block lg:col-span-2 xl:col-span-2">
              <div className="sticky top-24 space-y-2">
                <h4 className="font-bold text-primary mb-4 px-3 uppercase text-xs tracking-wider">Contents</h4>
                <nav>
                  <ul className="space-y-1">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <a href={`#${section.id}`} onClick={(e) => { e.preventDefault(); document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' }); }} className={`block px-3 py-2 text-sm rounded-lg transition-colors ${activeSection === section.id ? "bg-primary/10 text-primary font-medium" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}`}>
                          {section.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>

            {/* Mobile Nav */}
            <div className="lg:hidden col-span-1 mb-4">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="flex items-center gap-2 w-full p-4 bg-white rounded-xl shadow-sm border border-gray-200 text-primary font-semibold">
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                {isMobileMenuOpen ? "Close" : "Contents"}
              </button>
              {isMobileMenuOpen && (
                <div className="mt-2 bg-white rounded-xl shadow-sm border border-gray-200 p-2">
                  {sections.map((section) => (
                    <a key={section.id} href={`#${section.id}`} onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' }); }} className="block px-3 py-2 text-sm rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50">
                      {section.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="col-span-1 lg:col-span-7 xl:col-span-8 space-y-6 lg:space-y-8">
              
              {/* Executive Summary */}
              <div id="executive-summary" className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-secondary scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">Executive Summary (For People Who Skipped to the End)</h2>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6 border border-blue-200">
                  <p className="text-gray-600 leading-relaxed">
                    <strong>The TL;DR:</strong> Sydney's got the most stops (42,847) but Melbourne's got the trams (14.3% access). 
                    Brisbane has ferries (5.0%) which is cool but also 203,000 people who can't get to the CBD in under 3 hours. 
                    Everyone thinks they're the best, but the data has opinions.
                  </p>
                </div>
                
                {/* Donut Charts */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                  <DonutChart percentage={92.7} color="#3b82f6" city="Brisbane" subtitle="92.7% Can Reach CBD" />
                  <DonutChart percentage={98.0} color="#10b981" city="Sydney" subtitle="98.0% Can Reach CBD" />
                  <DonutChart percentage={98.4} color="#f59e0b" city="Melbourne" subtitle="98.4% Can Reach CBD" />
                </div>

                <p className="text-gray-600 leading-relaxed">
                  This analysis compares transit accessibility across Australia's three largest cities using GTFS data 
                  from February 19, 2026, 06:00 with a 1-hour departure window. We looked at who can get to their CBD 
                  within 3 hours (the bar is low, people), who's within walking distance of a stop, and who needs to 
                  pack a lunch for their commute.
                </p>
              </div>

              {/* The Contenders */}
              <div id="the-contenders" className="bg-white rounded-2xl p-6 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">1. The Contenders: Meet the Fighters</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <ComparisonCard 
                    city="Brisbane" color="#3b82f6" icon={Ship}
                    population="2.78M" stops="12,794" trips="20,622"
                    tagline="At least we have good weather"
                    wins={["Trips per 1,000 (7.41)", "30-min access (6.34%)", "Ferry game (5.0%)"]}
                  />
                  <ComparisonCard 
                    city="Sydney" color="#10b981" icon={Train}
                    population="5.56M" stops="42,847" trips="47,707"
                    tagline="Size matters"
                    wins={["Total stops (42,847)", "Walkable access (90.7%)", "Reachability (98.0%)"]}
                  />
                  <ComparisonCard 
                    city="Melbourne" color="#f59e0b" icon={Navigation}
                    population="5.35M" stops="28,807" trips="37,328"
                    tagline="Trams fix everything"
                    wins={["Best reachability (98.4%)", "Tram access (14.3%)", "Fewest unreachable (88k)"]}
                  />
                </div>

                {/* Raw Numbers Bar Chart */}
                <h3 className="font-semibold text-gray-800 mb-4">Raw Infrastructure Numbers</h3>
                <VerticalBarChart 
                  data={[
                    { label: 'Brisbane', value: 12794, color: '#3b82f6', subtext: '12,794 stops' },
                    { label: 'Sydney', value: 42847, color: '#10b981', subtext: '42,847 stops' },
                    { label: 'Melbourne', value: 28807, color: '#f59e0b', subtext: '28,807 stops' }
                  ]}
                  maxValue={42847}
                />
                <p className="text-xs text-gray-400 mt-2 text-center italic">Sydney has more stops than a magpie has reasons to swoop you.</p>
              </div>

              {/* Reachability */}
              <div id="reachability" className="bg-white rounded-2xl p-6 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">2. The Reachability Test: Can You Actually Get There?</h2>
                <p className="text-gray-600 mb-4">We set a very generous threshold: if you can't get to your CBD within 3 hours, something has gone terribly wrong. Think of it as the "are you technically in the same city?" test.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="text-3xl font-bold text-blue-600">92.7%</div>
                    <div className="text-sm text-blue-700">Brisbane Reachable</div>
                    <div className="text-xs text-blue-600 mt-1">7.3% unreachable</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="text-3xl font-bold text-green-600">98.0%</div>
                    <div className="text-sm text-green-700">Sydney Reachable</div>
                    <div className="text-xs text-green-600 mt-1">2.0% unreachable</div>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-xl border border-amber-200">
                    <div className="text-3xl font-bold text-amber-600">98.4%</div>
                    <div className="text-sm text-amber-700">Melbourne Reachable</div>
                    <div className="text-xs text-amber-600 mt-1">1.6% unreachable</div>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-700 text-sm mb-1">The Brisbane Problem</h4>
                      <p className="text-xs text-red-600">Brisbane leaves behind <strong>202,842 people</strong> who can't reach the CBD in 3 hours. That's roughly the population of Mackay just... stranded. Sydney and Melbourne only forget about 109k and 88k respectively. Brisbane, we need to talk.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Infrastructure */}
              <div id="infrastructure" className="bg-white rounded-2xl p-6 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">3. Infrastructure Wars: Quantity vs Quality</h2>
                <p className="text-gray-600 mb-4">Raw numbers don't tell the whole story, but they do tell a story. Sydney's got more stops than it knows what to do with, while Melbourne's playing the efficiency game.</p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Stops per 1,000 People</h3>
                    <HorizontalBar label="Brisbane" value={4.596} color="#3b82f6" maxValue={8} comment="Running lean" />
                    <HorizontalBar label="Sydney" value={7.708} color="#10b981" maxValue={8} comment="Spray and pray strategy" />
                    <HorizontalBar label="Melbourne" value={5.381} color="#f59e0b" maxValue={8} comment="Quality over quantity" />
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Trips per 1,000 People</h3>
                    <HorizontalBar label="Brisbane" value={7.408} color="#3b82f6" maxValue={9} comment="Working hard" />
                    <HorizontalBar label="Sydney" value={8.583} color="#10b981" maxValue={9} comment="Working harder" />
                    <HorizontalBar label="Melbourne" value={6.973} color="#f59e0b" maxValue={9} comment="Working smarter?" />
                  </div>
                </div>

                <div className="mt-6 bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600 italic">
                    <strong>Fun Fact:</strong> Brisbane has the fewest stops per capita (4.60) but the highest trips per capita relative to its size. They're running buses like their lives depend on it.
                  </p>
                </div>
              </div>

              {/* Travel Times */}
              <div id="travel-times" className="bg-white rounded-2xl p-6 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">4. Travel Time Reality: How Long Until You Regret Not Driving?</h2>
                <p className="text-gray-600 mb-4">We broke down travel times into bands because "it takes a while" isn't scientific enough. From "I could walk" (0-15 min) to "I should have moved" (90+ min).</p>
                
                <div className="space-y-6">
                  {[
                    { city: 'Brisbane', data: travelTimeData.brisbane, color: '#3b82f6' },
                    { city: 'Sydney', data: travelTimeData.sydney, color: '#10b981' },
                    { city: 'Melbourne', data: travelTimeData.melbourne, color: '#f59e0b' }
                  ].map(({ city, data, color }) => (
                    <div key={city} className="border rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
                        <h3 className="font-semibold text-gray-800">{city}</h3>
                      </div>
                      <StackedBar segments={data} height="h-10" />
                      <div className="flex flex-wrap gap-2 mt-2 text-xs">
                        {data.map((d, i) => (
                          <span key={i} className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></span>
                            {d.label}: {d.value.toFixed(1)}%
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <span className="font-semibold text-green-700 text-sm">The Lucky Few (0-15 min):</span>
                      <span className="text-xs text-green-600 ml-2">Brisbane leads with 0.25% (6,939 people). Basically, if you're this close, you're already in the CBD.</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="flex-1">
                      <span className="font-semibold text-red-700 text-sm">The Marathon (90+ min):</span>
                      <span className="text-xs text-red-600 ml-2">Melbourne wins... at losing. 22.2% of Melburnians (1.19M people) need 90+ minutes. That's a lot of podcasts.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 30-Minute City */}
              <div id="30-minute-city" className="bg-white rounded-2xl p-6 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">5. The 30-Minute City: Urban Planning's Broken Promise</h2>
                <p className="text-gray-600 mb-4">Urban planners love talking about the "30-minute city" where everyone can reach essential services within half an hour. Let's see how that's going...</p>
                
                <HorizontalBar label="Brisbane" value={6.341} color="#3b82f6" maxValue={10} comment="At least we have ferries?" />
                <HorizontalBar label="Sydney" value={6.094} color="#10b981" maxValue={10} comment="The 30-minute city dream" />
                <HorizontalBar label="Melbourne" value={4.301} color="#f59e0b" maxValue={10} comment="Trams help, apparently" />
                
                <div className="mt-4 p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-orange-700 text-sm mb-1">The Harsh Reality</h4>
                      <p className="text-xs text-orange-600">Even the best performer (Brisbane at 6.34%) only gets about 6% of its population to the CBD in under 30 minutes. The "30-minute city" is more like the "30-minute... sometimes... if you're lucky... and live in specific suburbs" city.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mode Wars */}
              <div id="mode-wars" className="bg-white rounded-2xl p-6 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">6. The Mode Wars: Bus vs Train vs Ferry vs Tram</h2>
                <p className="text-gray-600 mb-4">Each city has its favorites. Brisbane loves buses and ferries. Sydney has everything. Melbourne has trams and will never let you forget it.</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 bg-blue-50 rounded-xl text-center border border-blue-200">
                    <Bus className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-lg font-bold text-blue-600">88.9%</div>
                    <div className="text-xs text-blue-700">Sydney Bus</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-xl text-center border border-green-200">
                    <Train className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <div className="text-lg font-bold text-green-600">24.0%</div>
                    <div className="text-xs text-green-700">Sydney Train</div>
                  </div>
                  <div className="p-4 bg-cyan-50 rounded-xl text-center border border-cyan-200">
                    <Ship className="w-8 h-8 text-cyan-500 mx-auto mb-2" />
                    <div className="text-lg font-bold text-cyan-600">5.0%</div>
                    <div className="text-xs text-cyan-700">Brisbane Ferry</div>
                  </div>
                  <div className="p-4 bg-amber-50 rounded-xl text-center border border-amber-200">
                    <Navigation className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                    <div className="text-lg font-bold text-amber-600">14.3%</div>
                    <div className="text-xs text-amber-700">Melbourne Tram</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Bus Access Winner</span>
                    <span className="text-green-600 font-bold">Sydney (88.9%)</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Train Access Winner</span>
                    <span className="text-green-600 font-bold">Sydney (24.0%)</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Ferry Access Winner</span>
                    <span className="text-blue-600 font-bold">Brisbane (5.0%)</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium">Tram Access Winner</span>
                    <span className="text-amber-600 font-bold">Melbourne (14.3%)</span>
                  </div>
                </div>
              </div>

              {/* Forgotten Souls */}
              <div id="forgotten-souls" className="bg-white rounded-2xl p-6 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">7. The Forgotten Souls: Who Can't Get to the CBD?</h2>
                <p className="text-gray-600 mb-4">In a 3-hour window, some people still can't make it to the CBD. These are the truly forgotten souls of the transit network.</p>
                
                <VerticalBarChart 
                  data={[
                    { label: 'Brisbane', value: 202842, color: '#ef4444', subtext: '~203k people' },
                    { label: 'Sydney', value: 108772, color: '#f97316', subtext: '~109k people' },
                    { label: 'Melbourne', value: 88161, color: '#fbbf24', subtext: '~88k people' }
                  ]}
                  maxValue={220000}
                />
                
                <div className="mt-4 bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Car className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-red-700 text-sm mb-1">The Car Dependency Reality</h4>
                      <p className="text-xs text-red-600">Brisbane has 202,842 unreachable people. That's a whole city's worth of folks who have no choice but to drive (or move). Sydney (108,772) and Melbourne (88,161) do better, but 88k+ people in Melbourne still being left behind isn't exactly a win.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Walkability */}
              <div id="walkability" className="bg-white rounded-2xl p-6 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">8. The Walkability Score: Can You Walk to a Stop?</h2>
                <p className="text-gray-600 mb-4">We defined "accessible" as 400m from a bus/tram stop or 800m from a train/ferry stop. Basically: can you walk there without needing a rest halfway?</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <GaugeChart value={73.1} color="#3b82f6" label="Brisbane" sublabel="Rivers make walking hard" />
                  <GaugeChart value={90.7} color="#10b981" label="Sydney" sublabel="Density helps" />
                  <GaugeChart value={83.0} color="#f59e0b" label="Melbourne" sublabel="Trams fill the gaps" />
                </div>

                <div className="mt-6 bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-600">Sydney dominates with 90.7% of its population within walking distance of transit. Melbourne's trams help it reach 83%, while Brisbane's river and sprawl limit it to 73.1%.</p>
                </div>
              </div>

              {/* Speed vs Coverage */}
              <div id="speed-vs-coverage" className="bg-white rounded-2xl p-6 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">9. Speed vs Coverage: The Transit Dilemma</h2>
                <p className="text-gray-600 mb-4">Every transit network faces this trade-off: do you cover more area with less frequency, or focus on core areas with better service? Let's see where each city lands.</p>
                
                <div className="relative h-64 bg-gray-50 rounded-xl p-4">
                  {/* Quadrant labels */}
                  <div className="absolute top-2 left-2 text-xs text-red-600 font-bold bg-red-100 px-2 py-1 rounded">Slow & Sparse (Nightmare)</div>
                  <div className="absolute top-2 right-2 text-xs text-green-600 font-bold bg-green-100 px-2 py-1 rounded">Fast & Dense (Dream)</div>
                  <div className="absolute bottom-2 left-2 text-xs text-amber-600 font-bold bg-amber-100 px-2 py-1 rounded">Fast but Sparse</div>
                  <div className="absolute bottom-2 right-2 text-xs text-blue-600 font-bold bg-blue-100 px-2 py-1 rounded">Slow but Dense</div>
                  
                  {/* Grid lines */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300"></div>
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-300"></div>
                  
                  {/* Data points - positioned by 30-min % and stops per 1k */}
                  <div className="absolute" style={{ left: '65%', bottom: '20%' }}>
                    <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow"></div>
                    <span className="text-xs font-bold text-blue-600 -ml-2">Brisbane</span>
                  </div>
                  <div className="absolute" style={{ left: '62%', bottom: '85%' }}>
                    <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow"></div>
                    <span className="text-xs font-bold text-green-600 -ml-2">Sydney</span>
                  </div>
                  <div className="absolute" style={{ left: '44%', bottom: '55%' }}>
                    <div className="w-4 h-4 bg-amber-500 rounded-full border-2 border-white shadow"></div>
                    <span className="text-xs font-bold text-amber-600 -ml-3">Melbourne</span>
                  </div>
                  
                  {/* Axis labels */}
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">% Within 30 Min →</div>
                  <div className="absolute left-1 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-gray-500">Stops per 1,000 →</div>
                </div>
                
                <div className="mt-4 text-sm text-gray-600">
                  <strong>Analysis:</strong> Brisbane sits in "Fast but Sparse" - fewer stops per capita but better 30-minute accessibility thanks to its smaller size. Sydney and Melbourne are both in "Slow but Dense" territory - more infrastructure but longer average travel times due to their larger geographic spread.
                </div>
              </div>

              {/* Scorecard */}
              <div id="scorecard" className="bg-white rounded-2xl p-6 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">10. The Final Scorecard: And the Winner Is...</h2>
                <p className="text-gray-600 mb-4">Let's tally up the wins. Green cells indicate the winner for each metric.</p>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-800 text-white">
                        <th className="py-3 px-4 text-left">Metric</th>
                        <th className="py-3 px-4 text-center">Brisbane</th>
                        <th className="py-3 px-4 text-center">Sydney</th>
                        <th className="py-3 px-4 text-center">Melbourne</th>
                      </tr>
                    </thead>
                    <tbody>
                      <ScorecardRow metric="Population" brisbane="2.78M" sydney="5.56M" melbourne="5.35M" winner="sydney" />
                      <ScorecardRow metric="Total Stops" brisbane="12,794" sydney="42,847" melbourne="28,807" winner="sydney" />
                      <ScorecardRow metric="Total Trips" brisbane="20,622" sydney="47,707" melbourne="37,328" winner="sydney" />
                      <ScorecardRow metric="Stops per 1,000" brisbane="4.60" sydney="7.71" melbourne="5.38" winner="sydney" />
                      <ScorecardRow metric="Trips per 1,000" brisbane="7.41" sydney="8.58" melbourne="6.97" winner="sydney" />
                      <ScorecardRow metric="Reachable %" brisbane="92.7%" sydney="98.0%" melbourne="98.4%" winner="melbourne" />
                      <ScorecardRow metric="Walkable Access %" brisbane="73.1%" sydney="90.7%" melbourne="83.0%" winner="sydney" />
                      <ScorecardRow metric="30-Min Access %" brisbane="6.34%" sydney="6.09%" melbourne="4.32%" winner="brisbane" />
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  <div className="bg-blue-100 rounded-xl p-4 text-center border-2 border-blue-300">
                    <div className="text-lg font-bold text-blue-700 mb-1">Brisbane Wins:</div>
                    <ul className="text-xs text-blue-600 text-left space-y-1">
                      <li>• Trips per 1,000 (7.41)</li>
                      <li>• 30-min access (6.34%)</li>
                      <li>• Ferry game (5.0%)</li>
                      <li>• Weather (unofficial)</li>
                    </ul>
                  </div>
                  <div className="bg-green-100 rounded-xl p-4 text-center border-2 border-green-300">
                    <div className="text-lg font-bold text-green-700 mb-1">Sydney Wins:</div>
                    <ul className="text-xs text-green-600 text-left space-y-1">
                      <li>• Total stops (42,847)</li>
                      <li>• Walkable access (90.7%)</li>
                      <li>• Reachability (98.0%)</li>
                      <li>• Having all the modes</li>
                    </ul>
                  </div>
                  <div className="bg-amber-100 rounded-xl p-4 text-center border-2 border-amber-300">
                    <div className="text-lg font-bold text-amber-700 mb-1">Melbourne Wins:</div>
                    <ul className="text-xs text-amber-600 text-left space-y-1">
                      <li>• Best reachability (98.4%)</li>
                      <li>• Tram access (14.3%)</li>
                      <li>• Fewest unreachable (88k)</li>
                      <li>• Coffee culture (unofficial)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Maps */}
              <div id="maps" className="bg-white rounded-2xl p-6 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">11. Geographic View: Where the Pain Lives</h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-700 text-sm mb-1">Map Placeholders</h4>
                      <p className="text-xs text-yellow-600">Update the src paths below to point to your actual HTML map files showing population distribution by travel time bands (0-15, 15-30, 30-45, 45-60, 60-90, 90+ minutes).</p>
                    </div>
                  </div>
                </div>
                
                <h3 className="font-semibold text-gray-800 mb-3">Brisbane: The River Effect</h3>
                <MapIframe src={mapBrisbane} title="Brisbane Travel Time Bands" height="500px" />
                <p className="text-gray-600 text-sm mb-6">Notice how the river creates natural barriers? The southside vs northside divide is real, people.</p>
                
                <h3 className="font-semibold text-gray-800 mb-3">Sydney: The Sprawl</h3>
                <MapIframe src={mapSydney} title="Sydney Travel Time Bands" height="500px" />
                <p className="text-gray-600 text-sm mb-6">Sydney's geography (harbour, beaches, national parks) creates interesting accessibility patterns. The west is doing a lot of heavy lifting.</p>
                
                <h3 className="font-semibold text-gray-800 mb-3">Melbourne: The Grid</h3>
                <MapIframe src={mapMelbourne} title="Melbourne Travel Time Bands" height="500px" />
                <p className="text-gray-600 text-sm">Melbourne's famous grid pattern shows up in the data. The tram network creates distinct corridors of better accessibility radiating from the CBD.</p>
              </div>

              {/* Conclusion */}
              <div id="conclusion" className="bg-white rounded-2xl p-6 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">Conclusion: Everyone's a Winner (Except the Commuters)</h2>
                <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-200 mb-6">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    After all this analysis, what's the verdict? Each city has its strengths and weaknesses:
                  </p>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold">•</span>
                      <span><strong>Brisbane</strong> punches above its weight for a smaller city, with excellent ferry connectivity and decent 30-minute accessibility. But it leaves too many people behind (202k unreachable) and could use more stops.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 font-bold">•</span>
                      <span><strong>Sydney</strong> has the infrastructure (42k+ stops!) and the best walkable access, but its sheer size means long commutes for many. The "everything everywhere" approach works, but can't overcome geography.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span><strong>Melbourne</strong> has the best reachability and the tram network is genuinely excellent for local trips. But its sprawl means 1.19 million people need 90+ minutes to reach the CBD. That's... a lot of podcasts.</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    <strong>The Real Takeaway:</strong> Australian cities are car-dependent by design, and transit is playing catch-up. The "30-minute city" remains a dream for most. But hey, at least we have data to complain about now. That's progress, right?
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                  <span>Data from February 19, 2026</span>
                  <span>•</span>
                  <span>GTFS Analysis</span>
                  <span>•</span>
                  <span>Don't @ me, I just work here</span>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="hidden lg:block lg:col-span-3 xl:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h3 className="font-bold text-primary mb-3 text-sm">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {["Python", "Pandas", "GTFS", "Matplotlib", "GeoPandas", "React", "Tailwind", "Data Analysis"].map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{tech}</span>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h3 className="font-bold text-primary mb-3 text-sm">Key Metrics</h3>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between"><span>Departure Time:</span><span className="font-medium">2026-02-19 06:00</span></div>
                  <div className="flex justify-between"><span>Time Window:</span><span className="font-medium">1 hour</span></div>
                  <div className="flex justify-between"><span>Max Trip Time:</span><span className="font-medium">3 hours</span></div>
                  <div className="flex justify-between"><span>Max Walk Time:</span><span className="font-medium">60 minutes</span></div>
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-[10px] text-gray-400">Accessible region: 400m (bus/tram) or 800m (train/ferry)</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h3 className="font-bold text-primary mb-3 text-sm">Resources</h3>
                <div className="space-y-1">
                  <a href="#" className="flex items-center gap-2 text-xs text-gray-600 hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-50">
                    <Database className="w-4 h-4" />GTFS Data Sources
                  </a>
                  <a href="#" className="flex items-center gap-2 text-xs text-gray-600 hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-50">
                    <Github className="w-4 h-4" />Analysis Code
                  </a>
                  <a href="#" className="flex items-center gap-2 text-xs text-gray-600 hover:text-primary transition-colors p-2 rounded-lg hover:bg-gray-50">
                    <BarChart3 className="w-4 h-4" />Raw Data
                  </a>
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