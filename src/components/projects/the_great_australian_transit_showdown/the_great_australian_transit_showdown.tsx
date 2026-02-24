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

// Maps and Graphs
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
// Vertical Bar Chart
const VerticalBarChart = ({ data, maxValue }: { data: { label: string; value: number; color: string; subtext: string }[]; maxValue: number }) => (
  <div className="flex items-end justify-around h-64 gap-4">
    {data.map((item, idx) => (
      <div key={idx} className="flex flex-col items-center flex-1">

        {/* Percentage label above bar */}
        <span className="text-xs font-bold text-gray-700 mb-1">
          {item.value}%
        </span>

        <div
          className="w-full rounded-t-lg transition-all duration-1000 ease-out relative"
          style={{
            height: `${(item.value / maxValue) * 200}px`,
            backgroundColor: item.color,
            minHeight: '20px'
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-xs font-bold text-center px-1">
              {item.subtext}
            </span>
          </div>
        </div>

        <div className="text-xs text-gray-600 mt-2 text-center font-medium">
          {item.label}
        </div>
      </div>
    ))}
  </div>
);


// Grouped Bar Chart
const GroupedBarChart = ({
  data, // [{ category: "Train", items: [{ label, value, color }] }]
  maxValue
}: {
  data: {
    category: string;
    items: { label: string; value: number; color: string }[];
  }[];
  maxValue: number;
}) => (
  <div className="w-full border border-gray-200 rounded-lg p-1">
    {/* Title */}
    <h3 className="text-center font-semibold mb-4">
      Population with access to transit stop
    </h3>

    <div className="flex justify-around gap-6">
      {data.map((group, idx) => (
        <div key={idx} className="flex flex-col items-center flex-1">
          {/* Bars in each category */}
          <div className="flex items-end gap-2 h-64">
            {group.items.map((item, i) =>
              item.value === 0 ? null : (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className="w-6 rounded-t-md relative transition-all duration-700"
                    style={{
                      height: `${(item.value / maxValue) * 200}px`,
                      backgroundColor: item.color
                    }}
                  >
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-700">
                      {item.value}%
                    </span>
                  </div>
                </div>
              )
            )}
          </div>

          {/* Category label */}
          <div className="text-sm font-medium mt-2">{group.category}</div>
        </div>
      ))}
    </div>

    {/* Legend */}
    <div className="flex justify-center gap-6 mt-6 text-sm">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-sm" style={{ background: "#10b981" }}></span>
        Greater Sydney
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-sm" style={{ background: "#f59e0b" }}></span>
        Greater Melbourne
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-sm" style={{ background: "#3b82f6" }}></span>
        Greater Brisbane
      </div>
    </div>

    {/* Footnote */}
    <p className="text-center text-xs text-gray-500 mt-4 mb-4">
      Access to transit stop is defined as 400m from bus or tram stop and 800m from train or ferry stop.
    </p>
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
      <h3 className="font-bold text-lg whitespace-pre-line">{city}</h3>
    </div>
    
    {/* Row 3: Stats - always at same position */}
    <div className="text-sm text-white/80 mb-0 space-y-1">
      <div>Population: {population}</div>
      <div>Transit Stops: {stops}</div>
      <div>Daily Trips: {trips}</div>
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
    { id: "walkability", label: "6. Walkability Score" },
    { id: "forgotten-souls", label: "7. The Forgotten Souls" },
    { id: "maps", label: "8. Geographic View" },
    { id: "scorecard", label: "9. Final Scorecard" },
    { id: "conclusion", label: "Conclusion" },
  ];

    const externalLinks = [
      {
        label: "GitHub Repository",
        url: "https://github.com/sanjeevbhurtyal/australia-urban-transit",
        icon: Github,
      }
    ];

    const techStack = [
      "Python", "Pandas", "GeoPandas", "GTFS", "QGIS", "Folium", "Jupyter",
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
            Brisbane vs Sydney vs Melbourne: Who's the true transit champion? We analyzed GTFS data to compare accessibility, travel times, and infrastructure across Australia's three largest cities.
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
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">Executive Summary</h2>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-4 border border-blue-200">
                  <p className="text-gray-600 leading-relaxed">
                  This analysis compares transit accessibility across Australia's three largest cities using GTFS data 
                  from February 19, 2026, 06:00 AM with a 1-hour departure window. We looked at who can get to their CBD 
                  within 3 hours, who's within walking distance of a stop, and who needs to 
                  pack a lunch for their commute.
                </p>
                </div>
                
                {/* Donut Charts */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-0">
                  <p className="text-center text-gray-700 text-sm mb-0 col-span-full">Percentage of population that can reach CBD within 3 hours</p>
                  <DonutChart percentage={92.7} color="#3b82f6" city="Greater Brisbane" subtitle="" />
                  <DonutChart percentage={98.0} color="#10b981" city="Greater Sydney" subtitle="" />
                  <DonutChart percentage={98.4} color="#f59e0b" city="Greater Melbourne" subtitle="" />
                </div>
              </div>

              {/* The Contenders */}
              <div id="the-contenders" className="bg-white rounded-2xl p-6 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">1. The Contenders: Meet the Fighters</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-0">
                  <ComparisonCard 
                    city={"Greater\nBrisbane"} color="#3b82f6" icon={Ship}
                    population="2.78M" stops="12,794" trips="20,622"
                    tagline=""
                    wins={[""]}
                  />
                  <ComparisonCard 
                    city={"Greater\nSydney"} color="#10b981" icon={Train}
                    population="5.56M" stops="42,847" trips="47,707"
                    tagline=""
                    wins={[""]}
                  />
                  <ComparisonCard 
                    city={"Greater\nMelbourne"} color="#f59e0b" icon={Navigation}
                    population="5.35M" stops="28,807" trips="37,328"
                    tagline=""
                    wins={[""]}
                  />
                </div>
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
                      <p className="text-sm text-red-600">Brisbane leaves behind <strong>202K people</strong> who can't reach the CBD in 3 hours. That's roughly the population of Mackay just... stranded. Sydney and Melbourne only forget about 109k and 88k respectively. Brisbane, we need to talk.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Infrastructure */}
              <div id="infrastructure" className="bg-white rounded-2xl p-6 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">3. Infrastructure Wars</h2>
                <p className="text-gray-600 mb-4">Sydney has got more stops than a magpie has vendettas. Meanwhile, Brisbane’s working lean and Melbourne’s trying to work smarter, but let’s be honest: everyone’s just trying to survive the Infrastructure Hunger Games.</p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 text-center">Stops per 1,000 People</h3>
                    <HorizontalBar label="Brisbane" value={4.596} color="#3b82f6" maxValue={8} comment="Running lean" />
                    <HorizontalBar label="Sydney" value={7.708} color="#10b981" maxValue={8} comment="Spray and pray strategy" />
                    <HorizontalBar label="Melbourne" value={5.381} color="#f59e0b" maxValue={8} comment="Right Amount?" />
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 text-center">Trips per 1,000 People</h3>
                    <HorizontalBar label="Brisbane" value={7.408} color="#3b82f6" maxValue={9} comment="Working hard" />
                    <HorizontalBar label="Sydney" value={8.583} color="#10b981" maxValue={9} comment="Working harder" />
                    <HorizontalBar label="Melbourne" value={6.973} color="#f59e0b" maxValue={9} comment="Working smarter?" />
                  </div>
                </div>

              </div>

              {/* Travel Times */}
              <div id="travel-times" className="bg-white rounded-2xl p-6 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">4. Travel Time Reality: How Long Until You Regret Not Driving?</h2>
                <p className="text-gray-600 mb-4">We broke down travel times into bands because "it takes a while" isn't scientific enough. From "I could walk" (0-15 min) to "I should have moved" (90+ min).</p>
                <p className="text-gray-700 font-medium mb-4 text-center">
                  Percentage of population falling into each travel‑time band.
                </p>
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
                      <span className="text-sm text-green-600 ml-2">Melbourne leads with 0.5% (28K people). Basically, if you're this close, you're already in the CBD.</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="flex-1">
                      <span className="font-semibold text-red-700 text-sm">The Marathon (90+ min):</span>
                      <span className="text-sm text-red-600 ml-2">Melbourne wins again... at losing. 22.2% of Melburnians (1.19M people) need 90+ minutes. That's a lot of podcasts.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 30-Minute City */}
              <div id="30-minute-city" className="bg-white rounded-2xl p-6 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">5. The 30-Minute City</h2>
                <p className="text-gray-600 mb-4">Urban planners love talking about the "30-minute city". Let's see how that's going...</p>
                
                <HorizontalBar label="Brisbane" value={6.341} color="#3b82f6" maxValue={10} comment="Best in show - if you ignore the other 93%." />
                <HorizontalBar label="Sydney" value={6.094} color="#10b981" maxValue={10} comment="The 30-minute city: now available in theory and marketing brochures." />
                <HorizontalBar label="Melbourne" value={4.301} color="#f59e0b" maxValue={10} comment="Trams help. But not enough to save your morning meeting." />
                
                <div className="mt-4 p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-orange-700 text-sm mb-1">The Harsh Reality</h4>
                      <p className="text-sm text-orange-600">Even the best performer (Brisbane at 6.34%) only gets about 6% of its population to the CBD in under 30 minutes. The "30-minute city" is more like the "30-minute... sometimes... if you're lucky... and live in specific suburbs" city.</p>
                    </div>
                  </div>
                </div>
              </div>

              
              {/* Walkability */}
              <div id="walkability" className="bg-white rounded-2xl p-6 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">6. The Walkability Score: Can You Walk to a Stop?</h2>
                <p className="text-gray-600 mb-4">We defined "accessible" as 400m from a bus/tram stop or 800m from a train/ferry stop. Basically: can you walk there without needing a rest halfway?</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <GaugeChart value={73.1} color="#3b82f6" label="Brisbane" sublabel="Rivers make walking hard" />
                  <GaugeChart value={90.7} color="#10b981" label="Sydney" sublabel="Density helps" />
                  <GaugeChart value={83.0} color="#f59e0b" label="Melbourne" sublabel="Trams fill the gaps" />
                </div>

                <div className="mt-6 bg-gray-50 rounded-xl p-4 mb-4">
                  <p className="text-sm text-gray-600">Sydney dominates with 90.7% of its population within walking distance of transit. Melbourne's trams help it reach 83%, while Brisbane's river and sprawl limit it to 73.1%.</p>
                </div>
              

              <p className="text-gray-600 mb-4">Each city has its favorites. Brisbane loves buses and ferries. Sydney has everything. Melbourne has trams and will never let you forget it.
                Sydney doubled up with wins in buses and trains, flexing its walkable catchments like it’s showing off at a transport‑planner talent show. Brisbane’s ferries glided into first place with river access confidence, and Melbourne’s trams took the tram title because, honestly, who else was ever going to beat them.  </p>

                <GroupedBarChart
                  maxValue={100}
                  data={[
                    {
                      category: "Train",
                      items: [
                        { label: "Sydney", value: 24, color:    "#10b981" },
                        { label: "Melbourne", value: 23, color: "#f59e0b" },
                        { label: "Brisbane", value: 17, color:  "#3b82f6" }
                      ]
                    },
                    {
                      category: "Bus",
                      items: [
                        { label: "Sydney", value: 89, color: "#10b981" },
                        { label: "Melbourne", value: 78, color: "#f59e0b" },
                        { label: "Brisbane", value: 72, color: "#3b82f6" }
                      ]
                    },
                    {
                      category: "Tram",
                      items: [
                        { label: "Sydney", value: 3, color: "#10b981" },
                        { label: "Melbourne", value: 14, color: "#f59e0b" },
                        { label: "Brisbane", value: 0, color: "#3b82f6" }
                      ]
                    },
                    {
                      category: "Ferries",
                      items: [
                        { label: "Sydney", value: 3, color: "#10b981" },
                        { label: "Melbourne", value: 0, color: "#f59e0b" },
                        { label: "Brisbane", value: 5, color: "#3b82f6" }
                      ]
                    }
                  ]}
                />

              </div>


              {/* Forgotten Souls */}
              <div id="forgotten-souls" className="bg-white rounded-2xl p-6 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">7. The Forgotten Souls: Who Can't Get to the CBD?</h2>
                <p className="text-gray-600 mb-4">In a 3-hour window, some people still can't make it to the CBD. These are the truly forgotten souls of the transit network.
                  Brisbane’s 7.3% are so far from the CBD that even Google Maps shrugs. Sydney and Melbourne’s outliers may be fewer, but they’re still out there bravely attempting the impossible commute like it’s an extreme sport.
                </p>
                <p className="text-gray-700 font-medium mb-4 text-center"> Percentage of Population who can't get to the CBD in under 3 hours</p>
                <VerticalBarChart 
                  data={[
                    { label: 'Brisbane', value: 7.3, color: '#3b82f6', subtext: '~203k people' },
                    { label: 'Sydney', value: 2, color: '#10b981', subtext: '~109k people' },
                    { label: 'Melbourne', value: 1.6, color: '#f59e0b', subtext: '~88k people' }
                  ]}
                  maxValue={7.5}
                />
              </div>

              

              {/* Maps */}
              <div id="maps" className="bg-white rounded-2xl p-6 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">8. Geographic View: Where the Pain Lives</h2>
                
                <h3 className="font-semibold text-gray-800 mb-3">Brisbane</h3>
                <MapIframe src={mapBrisbane} title="Brisbane Travel Time Bands" height="500px" />
                <p className="text-gray-600 mb-6">The southside’s got some hefty blobs of high travel time, and honestly, the map isn’t being subtle about it. The northside–southside divide is looking very, very real.</p>
                
                <h3 className="font-semibold text-gray-800 mb-3">Sydney</h3>
                <MapIframe src={mapSydney} title="Sydney Travel Time Bands" height="500px" />
                <p className="text-gray-600 mb-6">The CBD and harbour area are living the dream with 15-minute access, while the western suburbs are stuck in a slow-motion montage set to sad violin.</p>
                
                <h3 className="font-semibold text-gray-800 mb-3">Melbourne</h3>
                <MapIframe src={mapMelbourne} title="Melbourne Travel Time Bands" height="500px" />
                <p className="text-gray-600">The CBD is getting aggressively cuddled by a time-traveling octopus. Each tentacle represents a commuter’s broken dream of arriving before lunch.</p>
              </div>

              {/* Scorecard */}
              <div id="scorecard" className="bg-white rounded-2xl p-6 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">9. The Final Scorecard: And the Winner Is...</h2>
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
                    <ul className="text-sm text-blue-600 text-left space-y-1">
                      <li>• 30-min access (6.34%)</li>
                      <li>• Ferry game (5.0%)</li>
                      <li>• Weather (unofficial)</li>
                    </ul>
                  </div>
                  <div className="bg-green-100 rounded-xl p-4 text-center border-2 border-green-300">
                    <div className="text-lg font-bold text-green-700 mb-1">Sydney Wins:</div>
                    <ul className="text-sm text-green-600 text-left space-y-1">
                      <li>• Trips per 1,000 (7.71)</li>
                      <li>• Walkable access (90.7%)</li>
                      <li>• Bus and Train game</li>
                    </ul>
                  </div>
                  <div className="bg-amber-100 rounded-xl p-4 text-center border-2 border-amber-300">
                    <div className="text-lg font-bold text-amber-700 mb-1">Melbourne Wins:</div>
                    <ul className="text-sm text-amber-600 text-left space-y-1">
                      <li>• Best reachability (98.4%)</li>
                      <li>• Tram access (14.3%)</li>
                      <li>• Coffee culture (unofficial)</li>
                    </ul>
                  </div>
                </div>
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
              </div>
            
            {/* Notes and References */}
            <div id="notes" className="bg-white rounded-2xl p-2 sm:p-2 lg:p-2 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                  Notes and References
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
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

              {/* Acknowledgements */}
              <div id="acknowledgements" className="bg-white rounded-2xl p-6 shadow-sm scroll-mt-24">
                  <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                    Acknowledgements
                  </h2>
                  <p className="text-gray-600 mb-4">This project was made possible by the open data provided by the transit agencies of Brisbane, Sydney, and Melbourne. 
                    A big shout-out to contributors of the awesome <a href="https://github.com/r5py/r5py" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">r5py</a> library for Rapid Realistic Routing.
                  </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="hidden lg:block lg:col-span-3 xl:col-span-2 space-y-4">
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h3 className="font-bold text-primary mb-3 text-sm">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => <span key={tech} className="project-tag text-xs">{tech}</span>)}
                </div>
              </div>
              
              {/* Quick Links */}
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h3 className="font-bold text-primary mb-3 text-sm">
                  Resources
                </h3>
                <div className="space-y-1">
                  {externalLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-[#555] hover:text-secondary transition-colors p-2 rounded-lg hover:bg-gray-50 group"
                    >
                      <link.icon className="w-4 h-4 text-gray-400 group-hover:text-secondary transition-colors" />
                      {link.label}
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