import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Bus,
  Train,
  Ship,
  Smartphone,
  MapPin,
  Users,
  AlertCircle,
  Github,
  BarChart3,
  Database,
  Menu,
  X
} from "lucide-react";
import Footer from '@/components/sections/Footer';
import Header from '@/components/sections/Header';
import HumorWarning from '@/components/HumorWarning';
// Import chart assets
import monthlyTrendsUrl from './assets/figures/monthly_trends.html?url';
import modeTrendsUrl from './assets/figures/mode_trends.html?url';
import modeShareGroupedBarUrl from './assets/figures/mode_share_grouped_bar.html?url';
import modeDayTypePieUrl from './assets/figures/mode_day_type_pie.html?url';
import ticketTypeTrendsUrl from './assets/figures/ticket_type_trends.html?url';
import ticketByModePieUrl from './assets/figures/ticket_by_mode_pie.html?url';
import topNLocalityByModeUrl from './assets/figures/top_n_locality_by_mode.html?url';
import topNODPairsUrl from './assets/figures/top_n_OD_pairs.html?url';
import topNHighestLowestChangeUrl from './assets/figures/top_n_highest_lowest_change.html?url';

// Reusable Chart Component
const ChartIframe = ({ src, title, height }: { src: string, title: string, height: string }) => (
  <div className="w-full mb-6">
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
      <iframe
        src={src}
        width="100%"
        height={height}
        style={{ border: "none", minHeight: height }}
        title={title}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-popups"
      />
    </div>
    <p className="text-xs text-[#95a5a6] mt-2 text-center italic">
      Figure: {title}
    </p>
  </div>
);

export default function TranslinkOD() {
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
    { id: "executive-summary", label: "Executive Summary" },
    { id: "introduction", label: "1. Introduction" },
    { id: "patronage-trends", label: "2. Patronage Trends" },
    { id: "mode-split", label: "3. Mode Split" },
    { id: "payment-method", label: "4. Payment Method" },
    { id: "origin-destination", label: "5. Origin-Destination" },
    { id: "growth-analysis", label: "6. Growth Analysis" },
    { id: "key-insights", label: "7. Key Insights & Limitations" },
    { id: "notes", label: "Notes and References" },
  ];

  const charts = {
    patronage: {
      monthlyTrends: { src: monthlyTrendsUrl, title: "Monthly Patronage Evolution", height: "500px" },
    },
    mode: {
      modeTrends: { src: modeTrendsUrl, title: "Patronage by Mode Over Time", height: "500px" },
      modeShareGroupedBar: { src: modeShareGroupedBarUrl, title: "Relative Mode Share by Year", height: "500px" },
      modeDayTypePie: { src: modeDayTypePieUrl, title: "Mode Share by Day Type", height: "500px" },
    },
    payment: {
      ticketTypeTrends: { src: ticketTypeTrendsUrl, title: "Payment Method Evolution", height: "500px" },
      ticketByModePie: { src: ticketByModePieUrl, title: "Payment Method by Mode", height: "400px" },
    },
    od: {
      topNLocalityByMode: { src: topNLocalityByModeUrl, title: "Highest Patronage Localities by Mode", height: "600px" },
      topNODPairs: { src: topNODPairsUrl, title: "Top Origin-Destination Pairs", height: "700px" },
    },
    growth: {
      topNHighestLowestChange: { src: topNHighestLowestChangeUrl, title: "Spatial Winners and Losers", height: "800px" },
    },
  };

  const keyFindings = [
    {
      icon: Users,
      label: "Total Trips Analyzed",
      value: "470M",
      description: "From Jan 2022 to Oct 2025 (that's a lot of tapping on and off)",
    },
    {
      icon: TrendingUp,
      label: "Monthly Growth",
      value: "+65.8%",
      description: "From 7.8M to 13.0M trips (math checks out)",
    },
    {
      icon: Bus,
      label: "Bus Mode Share",
      value: "62%",
      description: "Dominant but ferry is the dark horse with 172% growth",
    },
    {
      icon: Smartphone,
      label: "EMV Adoption",
      value: "30%+",
      description: "In just 6 months. Go card is having an existential crisis",
    },
  ];

  const modeStats = [
    { mode: "Bus", share: "62%", growth: "+64%", color: "bg-blue-500", icon: Bus },
    { mode: "Train", share: "34%", growth: "+60%", color: "bg-green-500", icon: Train },
    { mode: "Ferry", share: "4%", growth: "+172%", color: "bg-cyan-500", icon: Ship },
  ];

  const growthWinners = [
    { locality: "Springfield Central", growth: "+40%", reason: "Master-planned TOD magic" },
    { locality: "Bowen Hills", growth: "+36%", reason: "Inner-city redevelopment fever" },
    { locality: "Surfers Paradise", growth: "+36%", reason: "Tourism never sleeps" },
  ];

  const growthLosers = [
    { locality: "Donnan", decline: "-75%", reason: "Needs investigation ASAP" },
    { locality: "Riverbend", decline: "-70%", reason: "Also concerning" },
    { locality: "North Arm", decline: "-52%", reason: "Send help" },
  ];

  const techStack = [
    "Python", "Pandas", "Plotly", "GeoPandas", "Tableau"
  ];

  const externalLinks = [
    {
      label: "Queensland Open Data",
      url: "https://www.data.qld.gov.au/dataset/translink-origin-destination-trips-2022-onwards",
      icon: Database,
    },
    {
      label: "GitHub Repository",
      url: "https://github.com/sanjeevbhurtyal/Translink_OD_Trip_Analysis",
      icon: Github,
    },
    {
      label: "Tableau Dashboard",
      url: "https://public.tableau.com/views/TranslinkPatronageAnlaysis/SuburbProfile",
      icon: BarChart3,
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
            Decoding Translink Origin Destination Patronage Data
          </h1>

          <p className="text-white/80 text-base sm:text-lg max-w-5xl">
            We analyzed nearly half a billion public transport trips across Brisbane, Gold Coast, and Sunshine Coast 
            to answer one question: where is everyone going, and how are they getting there?
          </p>
          <p className="text-white/80 text-base sm:text-lg max-w-5xl">
            Spoiler: 
            the CBD is popular, ferries are having a moment, and your Go card is becoming vintage.
          </p>
        </div>
      </div>

      {/* Project Overview */}
      <section className="py-8 sm:py-12 lg:py-16 w-full">
        <div className="container-custom px-4 sm:px-6 lg:px-8 xl:px-12 w-full max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            
            {/* Left Navigation */}
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
              
              {/* Executive Summary */}
              <div id="executive-summary" className="bg-white rounded-2xl p-2 sm:p-2 lg:p-2 shadow-sm border-l-4 border-secondary scroll-mt-24 w-full">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                  Executive Summary (For The Impatient)
                </h2>
                
                <p className="text-[#555] leading-relaxed mb-6">
                  We crunched the numbers on <strong>470 million trips</strong> across TransLink's network from January 2022 to October 2025. 
                  That's roughly the number of times you've checked your phone 
                  while waiting for a delayed train. Monthly patronage surged 65.8% from 7.8 million to 13.0 million trips, 
                  proving that Southeast Queenslanders really love their public transport—or really hate traffic.
                </p>

                {/* Key Findings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {keyFindings.map((finding, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-xl p-4 flex gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <finding.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">{finding.value}</div>
                        <div className="font-semibold text-gray-900">{finding.label}</div>
                        <div className="text-sm text-gray-600">{finding.description}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Highlights */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Bus className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <span className="font-semibold text-gray-900">Bus dominates with 62% mode share</span>
                      <p className="text-gray-600 text-sm mb-2">64% growth since 2022. Brisbane's dispersed urban form loves a good bus route.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Train className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <span className="font-semibold text-gray-900">Train captures 34% share</span>
                      <p className="text-gray-600 text-sm mb-2">60% growth since 2022. Major commuter corridors are basically train fan clubs.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Ship className="w-5 h-5 text-cyan-600 mt-0.5" />
                    <div>
                      <span className="font-semibold text-gray-900">Ferry shows explosive 172% growth</span>
                      <p className="text-gray-600 text-sm mb-2">From a small 4% base, but hey, percentage-wise they're winning. Water transport is having a renaissance.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Smartphone className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <span className="font-semibold text-gray-900">EMV adoption hit 30%+ in six months</span>
                      <p className="text-gray-600 text-sm mb-2">Ferries lead at &gt;50%. Go card's dominance is ending faster than a Netflix free trial.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <span className="font-semibold text-gray-900">Brisbane CBD dominates all top OD pairs</span>
                      <p className="text-gray-600 text-sm mb-2">Monocentric economy confirmed. Also, St. Lucia and Woolloongabba rely almost entirely on buses—hope they have backup plans.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <span className="font-semibold text-gray-900">Growth is spatially uneven</span>
                      <p className="text-gray-600 text-sm mb-2">Springfield Central and Bowen Hills grew 35%+ while Donnan and Riverbend declined 80%. Not all suburbs are having the same party.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Introduction */}
              <div id="introduction" className="bg-white rounded-2xl p-2 sm:p-2 lg:p-2 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                  1. Introduction: Why We Counted Half a Billion Trips
                </h2>
                
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
                  <h3 className="font-semibold text-primary mb-2 text-lg sm:text-xl">
                    1.1 The Setup
                  </h3>
                  <p className="text-[#555] leading-relaxed mb-4">
                    TransLink operates Southeast Queensland's integrated public transport network, serving Brisbane, Gold Coast, Sunshine Coast, 
                    and surrounding regions across three modes. Think of it as the region's circulatory system, except instead of blood cells, 
                    we're moving humans who are mostly checking their emails and hoping they remembered to tap on.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <Bus className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="font-semibold text-blue-900">Buses</div>
                      <div className="text-sm text-blue-700">Multiple operators, maximum flexibility, occasional traffic surprises</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <Train className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="font-semibold text-green-900">Trains</div>
                      <div className="text-sm text-green-700">QR suburban network + Gold Coast Light Rail. Mostly on rails.</div>
                    </div>
                    <div className="bg-cyan-50 rounded-lg p-4 text-center">
                      <Ship className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
                      <div className="font-semibold text-cyan-900">Ferries</div>
                      <div className="text-sm text-cyan-700">TfB Ferries + SeaLink. The scenic route, now with better adoption.</div>
                    </div>
                  </div>

                  <p className="text-[#555] leading-relaxed">
                    <strong>Why Origin-Destination Analysis Matters:</strong> Understanding patronage data is fundamental to transport planning. 
                    OD analysis reveals where people travel, which modes they prefer, how they pay (spoiler: increasingly with their phones), 
                    and which areas are booming or busting. It's like social media analytics, but for public infrastructure and with fewer cat videos.
                  </p>
                </div>
              </div>

              {/* Patronage Trends */}
              <div id="patronage-trends" className="bg-white rounded-2xl p-2 sm:p-2 lg:p-2 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                  2. Patronage Trends
                </h2>

                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-primary mb-2 text-lg sm:text-xl">
                    2.1 Monthly Patronage Evolution
                  </h3>
                  
                  <ChartIframe {...charts.patronage.monthlyTrends} />

                  <p className="text-[#555] leading-relaxed mb-4">
                    Between January 2022 and October 2025, the network carried <strong>470 million passenger trips</strong>. 
                    That's roughly one trip for every time someone complained about traffic on the M1.
                  </p>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-400 rounded-r-lg p-4 mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-700">The Growth Story</span>
                    </div>
                    <p className="text-sm text-green-800">
                      Average monthly patronage increased from <strong>7.8 million to 13.0 million</strong>, a substantial 
                      <strong> 65.8% growth</strong> representing an additional 5.1 million trips per month. 
                      The network is basically doing the transport equivalent of bulking season.
                    </p>
                  </div>

                  <p className="text-[#555] leading-relaxed">
                    This upward trajectory demonstrates consistent ridership expansion, punctuated only by predictable seasonal variations. 
                    Each year shows reduced patronage during December and January, reflecting holiday travel patterns when commuter demand 
                    naturally declines—presumably because even public transport needs a Christmas break.
                  </p>
                </div>
              </div>

              {/* Mode Split */}
              <div id="mode-split" className="bg-white rounded-2xl p-2 sm:p-2 lg:p-2 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                  3. Mode Split: Who's Winning The Transport Popularity Contest?
                </h2>

                <div className="space-y-6">
                  {/* Mode Trends */}
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-primary mb-2 text-lg sm:text-xl">
                      3.1 Mode Patronage Trends
                    </h3>
                    
                    <ChartIframe {...charts.mode.modeTrends} />

                    <p className="text-[#555] leading-relaxed mb-4">
                      Bus services form the backbone of TransLink's network, commanding the largest share of passenger trips. 
                      But examining growth rates reveals a plot twist worthy of a soap opera.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      {modeStats.map((stat) => (
                        <div key={stat.mode} className="bg-background rounded-xl p-4 text-center border-2 border-gray-100">
                          <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-2`}>
                            <stat.icon className="w-6 h-6" />
                          </div>
                          <div className="text-2xl font-bold text-primary">{stat.share}</div>
                          <div className="text-sm text-[#555] mb-1">{stat.mode} Share</div>
                          <div className={`text-sm font-semibold ${stat.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {stat.growth} growth
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Ship className="w-5 h-5 text-cyan-600" />
                        <span className="font-semibold text-cyan-700">The Ferry Phenomenon</span>
                      </div>
                      <p className="text-sm text-cyan-800">
                        <strong>Ferry services experienced explosive growth</strong> with a 172% increase in average monthly patronage 
                        (adding 0.3 million trips per month). While this reflects expansion from a smaller base, it's still the kind of growth 
                        that makes analysts spill their coffee. Water transport is officially cool again.
                      </p>
                    </div>
                  </div>

                  {/* Mode Share Over Time */}
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-primary mb-2 text-lg sm:text-xl">
                      3.2 Mode Share Over Time
                    </h3>
                    
                    <ChartIframe {...charts.mode.modeShareGroupedBar} />

                    <p className="text-[#555] leading-relaxed">
                      Despite significant absolute growth across all modes, <strong>relative mode share remained remarkably stable </strong> 
                      throughout the period. Bus maintains approximately 62% of trips, train holds steady at 34%, and ferry serves around 4% of passengers. 
                      This stability suggests that network expansion has been proportional across modes—like a well-choreographed dance where everyone 
                      grows together, but ferry is definitely trying to steal the spotlight with those percentage gains.
                    </p>
                  </div>

                  {/* Weekday vs Weekend */}
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-primary mb-2 text-lg sm:text-xl">
                      3.3 Weekday vs. Weekend Patterns (Work Hard, Ferry Harder)
                    </h3>
                    
                    <ChartIframe {...charts.mode.modeDayTypePie} />

                    <div className="space-y-3 mt-4">
                      <div className="flex items-start gap-3">
                        <Ship className="w-5 h-5 text-cyan-600 mt-0.5" />
                        <p>
                          <strong>Ferry mode share increases on weekends</strong>, suggesting strong recreational and tourism demand. 
                          Turns out people actually like looking at the river when they're not rushing to work.
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Train className="w-5 h-5 text-green-600 mt-0.5" />
                        <p>
                          <strong>Train usage declines proportionally on weekends</strong> relative to bus, likely reflecting reduced 
                          commuter demand for longer-distance travel to employment centers. Even trains need weekends off.
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <Bus className="w-5 h-5 text-blue-600 mt-0.5" />
                        <p>
                          <strong>Bus maintains dominant share across both periods</strong>, underscoring its role as the network's 
                          most flexible and accessible mode. The reliable friend who's always there, weekday or weekend.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div id="payment-method" className="bg-white rounded-2xl p-2 sm:p-2 lg:p-2 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                  4. Payment Method: The Great Go Card Rebellion
                </h2>

                <div className="space-y-6">
                  {/* Payment Trends */}
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-primary mb-2 text-lg sm:text-xl">
                      4.1 Payment Method Trends
                    </h3>
                    
                    <ChartIframe {...charts.payment.ticketTypeTrends} />

                    <p className="text-[#555] leading-relaxed mb-4">
                      For the first three years of the analysis period, <strong>go card dominated with approximately 99% of all transactions</strong>, 
                      representing the standard for Brisbane public transport since its 2008 introduction. It was the king of the castle, 
                      the top of the heap, the... well, you get it. It was basically the only game in town.
                    </p>

                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-400 rounded-r-lg p-4 mb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Smartphone className="w-5 h-5 text-purple-600" />
                        <span className="font-semibold text-purple-700">The EMV Revolution</span>
                      </div>
                      <p className="text-sm text-purple-800">
                        In April 2025, EMV contactless payment technology arrived. Within just six months, 
                        <strong> EMV adoption surged to over 30% of all trips</strong>. Go card went from 99% to 70% faster than you can say 
                        "I forgot to top up my go card."
                      </p>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-yellow-800">
                        <strong>Data Note:</strong> Historical data from January 2022 to March 2025 captures only go card and paper ticket transactions. 
                        EMV transaction data became available from April 2025 onwards. Queensland's Open Data Portal indicates that historical datasets 
                        will be retroactively updated, which may reveal earlier adoption patterns currently not visible. Stay tuned for plot twists.
                      </p>
                    </div>
                  </div>

                  {/* Payment by Mode */}
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-primary mb-2 text-lg sm:text-xl">
                      4.2 Payment Method Distribution by Mode
                    </h3>
                    
                    <ChartIframe {...charts.payment.ticketByModePie} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                      <div className="bg-cyan-50 rounded-lg p-4 text-center border border-cyan-200">
                        <Ship className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-cyan-700">&gt;50%</div>
                        <div className="text-sm text-cyan-800 font-semibold">Ferry EMV Adoption</div>
                        <div className="text-xs text-cyan-600 mt-1">Tourists love tap-and-go</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
                        <Bus className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-blue-700">~30%</div>
                        <div className="text-sm text-blue-800 font-semibold">Bus EMV Adoption</div>
                        <div className="text-xs text-blue-600 mt-1">Steady but slower</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4 text-center border border-green-200">
                        <Train className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-green-700">~40%</div>
                        <div className="text-sm text-green-800 font-semibold">Train EMV Adoption</div>
                        <div className="text-xs text-green-600 mt-1">Commuters are creatures of habit</div>
                      </div>
                    </div>

                    <p className="text-[#555] leading-relaxed mt-4">
                      <strong>Ferry services lead the EMV revolution</strong> with over 50% of trips now using contactless bank cards. 
                      This disproportionate adoption likely reflects ferry's strong tourist and recreational user base—passengers who prefer 
                      the convenience of tap-and-go without needing to purchase or maintain a dedicated go card for occasional trips. 
                      It's the "I'm just visiting and don't want another card in my wallet" effect.
                    </p>
                  </div>
                </div>
              </div>

              {/* Origin-Destination Analysis */}
              <div id="origin-destination" className="bg-white rounded-2xl p-2 sm:p-2 lg:p-2 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                  5. Origin-Destination Analysis
                </h2>

                <div className="space-y-6">
                  {/* Top Localities */}
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-primary mb-2 text-lg sm:text-xl">
                      5.1 Top Origin and Destination Localities
                    </h3>
                    
                    <ChartIframe {...charts.od.topNLocalityByMode} />

                    <p className="text-[#555] leading-relaxed mb-4">
                      Geographic analysis reveals Southeast Queensland's dominant travel destinations. 
                      <strong> Brisbane CBD emerges as the overwhelming attractor</strong>, commanding the highest patronage for both trip origins 
                      and destinations. This is followed by <strong>South Brisbane</strong> and <strong>Fortitude Valley</strong>, 
                      confirming the inner-city core's magnetic pull for employment, education, and entertainment. 
                      Basically, everyone wants to be downtown. Shocking, we know.
                    </p>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <span className="font-semibold text-red-700">The Single-Mode Vulnerability</span>
                      </div>
                      <p className="text-red-800">
                        Localities such as <strong>St. Lucia, Woolloongabba, and Upper Mount Gravatt</strong> generate substantial patronage 
                        but rely almost exclusively on bus services. This single-mode dependency creates significant risk—any disruption to 
                        bus operations can effectively strand these communities. It's like having one key for your house and hoping you never 
                        lose it, except the house is your ability to get to work.
                      </p>
                    </div>
                  </div>

                  {/* Top OD Pairs */}
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-primary mb-2 text-lg sm:text-xl">
                      5.2 Dominant Travel Corridors (The Usual Suspects)
                    </h3>
                    
                    <ChartIframe {...charts.od.topNODPairs} />

                    <p className="text-[#555] leading-relaxed">
                      Examining specific origin-destination pairs reveals the network's most critical travel corridors. 
                      <strong> Brisbane CBD dominates both ends of the region's busiest routes.</strong> The highest-volume corridors connect 
                      Brisbane City with South Brisbane, Fortitude Valley, and Herston—reflecting dense employment, medical 
                      (Royal Brisbane Hospital), and educational concentrations. This radial pattern confirms Southeast Queensland's 
                      monocentric economic structure, where the CBD remains the primary destination for regional travel. 
                      It's like a wheel, and everything leads to the middle. Very medieval, very organized.
                    </p>
                  </div>
                </div>
              </div>

              {/* Growth Analysis */}
              <div id="growth-analysis" className="bg-white rounded-2xl p-2 sm:p-2 lg:p-2 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                  6. Growth Analysis
                </h2>

                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-primary mb-2 text-lg sm:text-xl">
                    6.1 Spatial Winners and Losers
                  </h3>
                  
                  <ChartIframe {...charts.growth.topNHighestLowestChange} />

                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-sm text-gray-600">
                      <strong>Methodology Note:</strong> Impact is calculated by weighting year-over-year percentage change against the logarithm 
                      of prior-year patronage. This captures not just magnitude of change, but its significance relative to baseline ridership. 
                      It's like regular statistics, but with extra steps to make sure we're not just counting noise.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Winners */}
                    <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                        <h4 className="font-bold text-green-800">High-Growth Localities</h4>
                      </div>
                      <div className="space-y-3">
                        {growthWinners.map((winner) => (
                          <div key={winner.locality} className="bg-white rounded-lg p-3">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-semibold text-gray-900">{winner.locality}</span>
                              <span className="text-green-600 font-bold">{winner.growth}</span>
                            </div>
                            <p className="text-xs text-gray-600">{winner.reason}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Losers */}
                    <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                      <div className="flex items-center gap-2 mb-3">
                        <TrendingDown className="w-6 h-6 text-red-600" />
                        <h4 className="font-bold text-red-800">Declining Localities</h4>
                      </div>
                      <div className="space-y-3">
                        {growthLosers.map((loser) => (
                          <div key={loser.locality} className="bg-white rounded-lg p-3">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-semibold text-gray-900">{loser.locality}</span>
                              <span className="text-red-600 font-bold">{loser.decline}</span>
                            </div>
                            <p className="text-xs text-gray-600">{loser.reason}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-amber-800 text-sm mb-1">Construction Impacts</h4>
                        <p className="text-sm text-amber-700">
                          <strong>Salisbury's patronage decline</strong> illustrates temporary disruption effects from major infrastructure projects. 
                          The Cross River Rail construction necessitated track closures and service modifications, suppressing ridership in affected corridors. 
                          Sometimes you have to break a few eggs to make a transport omelet.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Insights */}
              <div id="key-insights" className="bg-white rounded-2xl p-2 sm:p-2 lg:p-2 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                  7. Key Insights & Limitations
                </h2>

                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-primary mb-3 text-xl">
                      7.1 Summary of Findings
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm text-[#555]">
                          <li><strong>Strong Growth:</strong> The network has experienced remarkable recovery with patronage increasing 65.8% from 2022 to 2025. 
                          The consistent upward trajectory indicates sustained confidence in public transport as a viable mobility option—either that or traffic got worse.</li>
                      
                        <li><strong>Bus-Dominant Network:</strong> The persistent dominance of bus (62%) over rail (34%) and ferry (4%) reveals Brisbane's polycentric urban structure. 
                          However, ferry's 172% growth rate, while from a small base, signals untapped potential for water-based transport in this river city. 
                          Water: it's not just for drinking anymore.</li>

                        <li><strong>Digital Payment Transformation:</strong> EMV adoption exceeded 30% within six months of launch, with ferries leading at &gt;50%. 
                          This signals strong preference for tap-and-go payments, especially among casual users and tourists. 
                          Go card is basically becoming the Blockbuster Video of transport payments.</li>

                        <li><strong>CBD-Centric with Single-Mode Vulnerabilities:</strong> Brisbane CBD dominates OD pairs, while localities like St. Lucia and Woolloongabba 
                          rely almost entirely on buses. This creates fragility during service disruptions—putting all your transport eggs in one basket, as it were.</li>

                        <li><strong>Uneven Spatial Growth:</strong> Springfield Central, Bowen Hills, and Surfers Paradise show 35%+ growth, 
                          while Donnan and Riverbend declined up to 75%, requiring targeted intervention. 
                          It's a transport tale of two cities—some are booming, some need a hug.</li>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-primary mb-3 text-xl">
                      7.2 Limitations
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm text-[#555]">
                      <li><strong>Population Data:</strong> Data doesn't capture trip purpose or demographics—we know where they went, not why they went there</li>
                      <li><strong>EMV Data:</strong> EMV data is only available from April 2025 onwards, limiting historical payment trend analysis (the before-times are murky)</li>
                      <li><strong>Failed Trips:</strong> No capture of failed trips (people who wanted to use PT but couldn't—the invisible commuters)</li>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes and References */}
              <div id="notes" className="bg-white rounded-2xl p-8 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                  Notes and References (The "We Didn't Make This Up" Section)
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

            {/* Sidebar */}
            <div className="hidden lg:block lg:col-span-3 xl:col-span-2 space-y-4">
              
              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h3 className="font-bold text-primary mb-3 text-sm">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => <span key={tech} className="project-tag text-xs">{tech}</span>)}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 shadow-sm">
                <h3 className="font-bold text-primary mb-3 text-sm">Resources</h3>
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