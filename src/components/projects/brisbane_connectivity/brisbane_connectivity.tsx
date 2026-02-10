import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  MapPin,
  Train,
  Bus,
  Ship,
  Calendar,
  AlertCircle,
  ExternalLink,
  Compass,
  Zap,
  Info,
  TrendingUp,
  AlertTriangle,
  Users,
  Menu,
  X,
  Github,
  BarChart3,
  Database
} from "lucide-react";
import Footer from '@/components/sections/Footer';
import Header from '@/components/sections/Header';
import HumorWarning from '@/components/HumorWarning';

// Import all chart assets with ?url suffix for Vite
// This ensures they get processed and copied to dist with hashed filenames
import localitiesMapUrl from './assets/figures/localities_with_direct_connections.html?url';

import sharedModeMapUrl from './assets/figures/shared_mode_map.html?url';
import bus30MinMapUrl from './assets/figures/localities_within_30_minutes_Bus_map.html?url';
import rail30MinMapUrl from './assets/figures/localities_within_30_minutes_Rail_map.html?url';
import connectionsByDayUrl from './assets/figures/direct_connections_by_mode_and_day.html?url';
import weekendServiceDropUrl from './assets/figures/weekday_weekend_service_drop.html?url';
import quadrantsMapUrl from './assets/figures/locality_quadrants_map.html?url';
import quadrantsScatterUrl from './assets/figures/locality_quadrants_scatter.html?url';
import quadrantsModeUrl from './assets/figures/locality_quadrants_mode.html?url';

// Reusable Chart Component defined outside to prevent re-renders
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

export default function BrisbaneConnectivity() {
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // window.scrollTo(0, 0); // Removed to allow scroll restoration
    
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Intersection Observer for active section highlighting
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
    { id: "coverage", label: "2. Coverage by Mode" },
    { id: "travel-time", label: "3. Travel Time Analysis" },
    { id: "thirty-minute-city", label: "4. The 30-Minute City" },
    { id: "weekday-weekend", label: "5. Weekday vs Weekend" },
    { id: "accessibility", label: "6. Accessibility Classification" },
    { id: "key-insights", label: "7. Key Insights & Limitations" },
    { id: "notes", label: "Notes and References" },
  ];

  // Chart configuration array using imported URLs
  const charts = {
    coverage: {
      localitiesMap: { src: localitiesMapUrl, title: "Localities with Direct Connections", height: "850px" },
    },
    travelTime: {
      sharedModeMap: { src: sharedModeMapUrl, title: "Bus-Rail Travel Time Comparison Map", height: "600px" },
    },
    thirtyMin: {
      bus30MinMap: { src: bus30MinMapUrl, title: "Suburbs Within 30 Minutes (Bus)", height: "400px" },
      rail30MinMap: { src: rail30MinMapUrl, title: "Suburbs Within 30 Minutes (Rail)", height: "400px" },
    },
    weekend: {
      connectionsByDay: { src: connectionsByDayUrl, title: "Direct Connections by Mode and Day", height: "300px" },
      weekendServiceDrop: { src: weekendServiceDropUrl, title: "Weekday vs Weekend Service Drop", height: "600px" },
    },
    accessibility: {
      quadrantsMap: { src: quadrantsMapUrl, title: "Accessibility Classification Map", height: "600px" },
      quadrantsScatter: { src: quadrantsScatterUrl, title: "Accessibility Classification Scatter", height: "500px" },
      quadrantsMode: { src: quadrantsModeUrl, title: "Accessibility Classification by Mode", height: "400px" },
    },
  };

  const coverageStats = [
    { mode: "Bus", suburbs: 181, percentage: "74%", color: "bg-blue-500", icon: Bus },
    { mode: "Train", suburbs: 107, percentage: "44%", color: "bg-green-500", icon: Train },
    { mode: "Ferry", suburbs: 13, percentage: "5%", color: "bg-cyan-500", icon: Ship },
  ];

  const accessibilityClasses = [
    {
      category: "Fast & Frequent",
      percentage: "40%",
      description: "Low travel time, high trip frequency-premium connectivity",
      color: "bg-green-100 text-green-700",
    },
    {
      category: "Slow & Infrequent",
      percentage: "37%",
      description: "High travel time, low trip frequency-limited connectivity",
      color: "bg-red-100 text-red-700",
    },
    {
      category: "Fast but Infrequent",
      percentage: "12%",
      description: "Low travel time, low trip frequency-good speed, limited options",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      category: "Slow but Frequent",
      percentage: "10%",
      description: "High travel time, high trip frequency-many services, long journeys",
      color: "bg-orange-100 text-orange-700",
    },
  ];

  const techStack = [
    "Python", "Pandas", "GeoPandas", "GTFS", "Plotly", "QGIS", "Tableau", "Folium", "Jupyter",
  ];

  const externalLinks = [
    {
      label: "SEQ GTFS Data",
      url: "https://www.data.qld.gov.au/dataset/general-transit-feed-specification-gtfs-translink/resource/e43b6b9f-fc2b-4630-a7c9-86dd5483552b",
      icon: Database,
    },
    {
      label: "GitHub Repository",
      url: "https://github.com/sanjeevbhurtyal/SEQ_Suburb_Transit_Metrics",
      icon: Github,
    },
    {
      label: "Tableau Dashboard",
      url: "https://public.tableau.com/app/profile/sanjeev.bhurtyal2011/viz/SEQSuburbTransitMetrics/Dashboard",
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
            Mapping Connectivity Across Brisbane: What GTFS Reveals
          </h1>

          <p className="text-white/80 text-base sm:text-lg max-w-3xl">
            A comprehensive analysis of direct transit connectivity to Brisbane City-because apparently, 
            I thought spending weeks analyzing timetables was a normal hobby. Spoiler alert: it's not, 
            but the data is fascinating, so buckle up!
          </p>
        </div>
      </div>

      {/* Project Overview */}
      <section className="py-8 sm:py-12 lg:py-16 w-full">
        <div className="container-custom px-4 sm:px-6 lg:px-8 xl:px-12 w-full max-w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            
            {/* Left Navigation Pane (Desktop) */}
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

             {/* Mobile Navigation Toggle (Visible only on mobile) */}
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
                              window.history.replaceState(window.history.state, '', `#${section.id}`);
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
                  Executive Summary (For People Who Actually Have Lives)
                </h2>
                <p className="text-[#555] leading-relaxed mb-4">
                  So here's what happened: I downloaded some transit data, did some math, made some pretty charts, 
                  and discovered what every Brisbane commuter already knew-getting to the city is... complicated. 
                  This analysis examines direct transit connectivity to Brisbane City using GTFS data from the week 
                  of January 12-18, 2026. Think of it as a relationship status update for Brisbane's suburbs: 
                  "It's complicated" with a side of "read receipts turned off on weekends."
                </p>
              
              {/* Key Findings - Visual Version */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Findings</h3>
                
                {/* Finding 1: Coverage */}
                <div className="flex gap-4 mb-3 p-2 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900">Network Coverage: Choose Your Fighter</h4>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">244 suburbs have direct public transport connections to Brisbane City, but most of them are ride-or-die with one mode.</p>
                    <div className="flex gap-2">
                      <div className="bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium">
                        53% Suburbs are Bus Only (No Plan B)
                      </div>
                      <div className="bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium">
                        26% Suburbs are Rail Only (All Aboard or Walk)
                      </div>
                      <div className="bg-purple-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium">
                        16% Suburbs are Bus + Rail (Living Their Best Life)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Finding 2: Speed */}
                <div className="flex gap-4 mb-3 p-2 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0 w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center">
                    <Ship className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900">Speed Hierarchy: Ferry Shows Up Like a Boss</h4>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">Ferry wins by a landslide. It's basically the Usain Bolt of Brisbane transit-if Usain Bolt only ran to 13 very specific locations. Median travel time to city:</p>
                    <div className="flex items-center gap-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-cyan-600">23<span className="text-sm">m</span></div>
                        <div className="text-xs text-cyan-600">Ferry (Showing Off)</div>
                      </div>
                      <div className="text-gray-300">→</div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">37<span className="text-sm">m</span></div>
                        <div className="text-xs text-green-600">Train (Solid Effort)</div>
                      </div>
                      <div className="text-gray-300">→</div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">40<span className="text-sm">m</span></div>
                        <div className="text-xs text-blue-600">Bus (Doing Its Best)</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Finding 3: 30-Minute City */}
                <div className="flex gap-4 mb-3 p-2 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900">The 30-Minute City: More Like "30-Minute Dream"</h4>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">Only 31% of suburbs can reach the city directly in 30 minutes.</p>
                    <div className="flex items-center gap-5">
                      <div className="h-10 w-14 bg-cyan-500 rounded flex flex-col items-center justify-center text-white">
                        <Ship className="w-4 h-4 mb-0.5" />
                        <span className="text-xs font-bold">77%</span>
                      </div>
                      <div className="h-10 w-14 bg-green-500 rounded flex flex-col items-center justify-center text-white">
                        <Train className="w-4 h-4 mb-0.5" />
                        <span className="text-xs font-bold">39%</span>
                      </div>
                      <div className="h-10 w-14 bg-blue-500 rounded flex flex-col items-center justify-center text-white">
                        <Bus className="w-4 h-4 mb-0.5" />
                        <span className="text-xs font-bold">28%</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">% of suburbs by mode (ferry absolutely crushing it for those 13 lucky suburbs)</p>
                  </div>
                </div>

                {/* Finding 4: Weekend Service */}
                <div className="flex gap-4 mb-3 p-2 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900">Weekend Service: The Great Disappearing Act</h4>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">Bus riders, we need to talk. Your weekend plans just got complicated. Rail passengers, you're mostly fine-please don't gloat.</p>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-1xl font-bold text-red-600">-24%</div>
                        <div className="flex items-center gap-1 text-xs text-blue-600 mt-1">
                          <Bus className="w-3 h-3" /> Bus (Ghosted)
                        </div>
                      </div>
                      <div className="h-px w-8 bg-gray-300"></div>
                      <div className="text-center">
                        <div className="text-1xl font-bold text-green-600">-9%</div>
                        <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
                          <Train className="w-3 h-3" /> Rail (Reliable Friend)
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 italic">
                        Suburbs losing<br/>their weekend privilege
                      </div>
                    </div>
                  </div>
                </div>

                {/* Finding 5: Accessibility Classification */}
                <div className="flex gap-4 p-2 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900">Service Quality: The Great Divide</h4>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">Brisbane's transit network has commitment issues. It either loves you completely or barely acknowledges your existence. There is no middle ground.</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-6 bg-green-500 rounded-l-lg flex items-center justify-center text-white text-sm font-bold">
                        40%
                      </div>
                      <div className="w-12 h-6 bg-yellow-400 flex items-center justify-center text-white text-xs font-bold">
                        12%
                      </div>
                      <div className="w-10 h-6 bg-orange-400 flex items-center justify-center text-white text-xs font-bold">
                        10%
                      </div>
                      <div className="flex-1 h-6 bg-red-500 rounded-r-lg flex items-center justify-center text-white text-sm font-bold">
                        37%
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>Fast and Frequent Suburbs</span>
                      <span>Slow and Infrequent Suburbs</span>
                    </div>
                  </div>
                </div>
              </div>
              </div>

              {/* Introduction */}
              <div id="introduction" className="bg-white rounded-2xl p-2 sm:p-2 lg:p-2 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                  1. Introduction
                </h2>
                
                <div className="space-y-6">
                  {/* 1.1 Background */}
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-primary mb-2 text-lg sm:text-xl">
                      1.1 Background
                    </h3>
                    <div className="space-y-4 text-[#555]">
                      <p className="leading-relaxed">
                        Look, we all know patronage data tells us <strong>how many</strong> people are brave enough to use public transport. 
                        But travel time data? That reveals <strong>how efficiently</strong> they can escape their suburban existence and reach civilization. 
                        Understanding travel times is critical for several deeply important reasons that I'm definitely not making up:
                      </p>
                      
                      <ul className="space-y-2 list-disc pl-5">
                        <li><strong>Commuter planning</strong>: Can workers reach their jobs without aging 10 years in transit?</li>
                        <li><strong>Service equity</strong>: Do all communities get comparable access, or is it more like "hunger games but with bus routes"?</li>
                        <li><strong>Network efficiency</strong>: Which mode actually delivers on its promises versus which one is just... trying?</li>
                        <li><strong>Policy evaluation</strong>: Are we throwing money at problems or at solutions? (Asking for a taxpayer friend)</li>
                      </ul>
                    </div>
                  </div>

                  {/* 1.2 Methodology */}
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-primary mb-2 text-lg sm:text-xl">
                      1.2 Methodology
                    </h3>
                    
                    <div className="space-y-6 text-[#555]">
                      <div>
                        <h3 className="font-semibold text-primary mb-2 flex items-center gap-2">
                          Data Source
                        </h3>
                          I grabbed the GTFS feed from Queensland's Open Data Portal-shoutout to whoever maintains that, you're the real MVP. 
                          <a href="https://www.data.qld.gov.au/dataset/general-transit-feed-specification-gtfs-translink/resource/e43b6b9f-fc2b-4630-a7c9-86dd5483552b" target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline ml-1 inline-flex items-center gap-1">
                            Available Here <ExternalLink className="w-3 h-3" />
                          </a>
                      </div>

                      <div>
                        <h3 className="font-semibold text-primary mb-2">Processing</h3>
                        <ul className="space-y-1">
                          <li className="flex items-start gap-2"><span className="text-secondary">•</span>Extracted every single valid trip—yes, ALL of them—from weekdays and weekends</li>
                          <li className="flex items-start gap-2"><span className="text-secondary">•</span>Calculated median travel times because averages are for people who enjoy being lied to by outliers</li>
                          <li className="flex items-start gap-2"><span className="text-secondary">•</span>Mapped stops to suburbs using official boundaries (because apparently "near the shops" isn't precise enough)</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold text-primary mb-2">Key Metrics (The Numbers We're Obsessing Over)</h3>
                        <ul className="space-y-1">
                          <li><span className="text-secondary">•</span><strong>Travel Time</strong>: How long you'll be contemplating your life choices</li>
                          <li><span className="text-secondary">•</span><strong>Trip Frequency</strong>: How many chances you get to miss your connection</li>
                          <li><span className="text-secondary">•</span><strong>Weekday/Weekend Coverage</strong>: Service availability</li>
                          <li><span className="text-secondary">•</span><strong>Mode Type</strong>: Bus, train, ferry, tram—pick your adventure!</li>
                        </ul>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-yellow-800">
                          <strong>Reality Check:</strong> This analysis covers January 12-18, 2026. If your experience differs, blame seasonal variations, 
                          service changes, or the universe's general indifference to schedules.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coverage Analysis with Charts */}
              <div id="coverage" className="bg-white rounded-2xl p-2 sm:p-2 lg:p-2  shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-2">
                  2. Coverage by Mode
                </h2>
                <p className="text-[#555] leading-relaxed mb-2">
                  244 suburbs have direct public transport to Brisbane City-which sounds impressive until you realize route availability 
                  is like dating app matches: some suburbs have ONE option (looking at you, Victory Heights and Redland Bay), 
                  while Fortitude Valley is out here with 65 routes like some kind of transit royalty.
                </p>
                
                <ChartIframe {...charts.coverage.localitiesMap} />
                
                <p className="text-[#555] leading-relaxed mb-2">
                  Breaking it down by mode: bus serves 181 suburbs (the workhorse), train reaches 107 (the speedster), 
                  and ferry connects 13 localities (the exclusive waterfront club that the rest of us weren't invited to).
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2">
                  {coverageStats.map((stat) => (
                    <div key={stat.mode} className="bg-background rounded-xl p-2 text-center">
                      <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-2`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <div className="text-2xl font-bold text-primary">{stat.suburbs}</div>
                      <div className="text-sm text-[#555]">{stat.mode} Suburbs</div>
                    </div>
                  ))}
                </div>

                <p className="text-[#555] leading-relaxed mt-4">
                  But here's where it gets spicy: this coverage is hiding some serious commitment issues. 128 suburbs (53%) 
                  are in an exclusive relationship with buses, 63 (26%) have put all their eggs in the rail basket, 
                  and only 40 suburbs (16%) are living their best polyamorous transit life with both options. This lack of redundancy means 
                  when your primary mode has a bad day, you'll need to find a backup plan.
                </p>

                  {/* Main Stats Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-1 p-4">
                    <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-2 text-white overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
                      <Bus className="w-8 h-8 mb-1 text-blue-100" />
                      <div className="text-2xl font-bold mb-1">128</div>
                      <div className="text-lg text-blue-100">Bus Only Suburbs</div>
                      <div className="text-2xl font-bold text-blue-200 mt-2">53%</div>
                      <div className="text-xs text-blue-100 mt-1">"It's not you, it's literally just you"</div>
                    </div>

                    <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-2 text-white overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
                      <Train className="w-8 h-8 mb-1 text-green-100" />
                      <div className="text-2xl font-bold mb-1">63</div>
                      <div className="text-lg text-green-100">Rail Only Suburbs</div>
                      <div className="text-2xl font-bold text-green-200 mt-2">26%</div>
                      <div className="text-xs text-green-100 mt-1">"Train or nothing, baby"</div>
                    </div>

                    <div className="relative bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-2 text-white overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
                      <div className="flex gap-2 mb-1">
                        <Bus className="w-6 h-6 text-purple-100" />
                        <Train className="w-6 h-6 text-purple-100" />
                      </div>
                      <div className="text-2xl font-bold mb-1">40</div>
                      <div className="text-lg text-purple-100">Bus + Rail Suburbs</div>
                      <div className="text-2xl font-bold text-purple-200 mt-2">16%</div>
                      <div className="text-xs text-purple-100 mt-1">"Living their best life"</div>
                    </div>
                  </div>

                  {/* Stacked Bar */}
                  <div className="bg-gray-50 rounded-xl p-1">
                    <div className="h-6 rounded-full overflow-hidden flex">
                      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-[53%]" />
                      <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-[26%]" />
                      <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-[16%]" />
                      <div className="bg-gradient-to-br from-orange-500 to-red-600 w-[4%]" />
                      <div className="bg-gradient-to-br from-amber-500 to-yellow-600 w-[1%]" />
                    </div>
                    <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded" />
                        <span className="text-gray-700 font-medium">Bus Only 53%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded" />
                        <span className="text-gray-700 font-medium">Rail Only 26%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded" />
                        <span className="text-gray-700 font-medium">Bus+Rail 16%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gradient-to-br from-orange-500 to-red-800 rounded" />
                        <span className="text-gray-700 font-medium">Bus+Ferry 4%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gradient-to-br from-amber-500 to-yellow-600 rounded" />
                        <span className="text-gray-700 font-medium">All Three 1% (The 1%!)</span>
                      </div>
                    </div>
                  </div>
              </div>

              {/* Travel Time Analysis with Charts */}
              <div id="travel-time" className="bg-white rounded-2xl p-2 sm:p-2 lg:p-2 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-2">
                  3. Travel Time Analysis
                </h2>
                
                <div className="space-y-6">
                  <div className="space-y-8">
                    {/* Section 3.1: Travel Time to Brisbane City - Infographic Version */}
                    <div className="bg-white rounded-2xl p-2 shadow-sm">
                      <h3 className="font-semibold text-primary mb-2 text-lg sm:text-xl">
                        3.1 Travel Time to Brisbane City
                      </h3>
                      
                      {/* Key Insight Banner */}
                      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-l-4 border-cyan-400 rounded-r-lg p-4 mb-6">
                        <p className="text-[#555] text-sm">
                          <strong className="text-cyan-700">Ferry dominates with 23min</strong> median travel time - 
                          nearly <strong>2x faster</strong> than bus or rail. It's basically showing off at this point.
                        </p>
                      </div>

                      {/* Mode Comparison Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {/* Ferry Card */}
                        <div className="relative bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-2 text-white overflow-hidden">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
                          <Ship className="w-8 h-8 mb-1 text-cyan-100" />
                          <div className="text-2xl font-bold mb-1">23<span className="text-lg font-normal text-cyan-100">min</span></div>
                          <div className="text-sm text-cyan-100 mb-2">Median: basically teleportation</div>
                          <div className="inline-flex items-center gap-1 bg-white/20 rounded-full px-2 py-1 text-xs">
                            <Clock className="w-3 h-3" />
                            Max: 41 min
                          </div>
                          <div className="mt-3 text-xs text-cyan-100">
                            Serves 13 suburbs but makes them feel SEEN
                          </div>
                        </div>

                        {/* Train Card */}
                        <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-2 text-white overflow-hidden">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
                          <Train className="w-8 h-8 mb-1 text-green-100" />
                          <div className="text-2xl font-bold mb-1">37<span className="text-lg font-normal text-green-100">min</span></div>
                          <div className="text-sm text-green-100 mb-2">Median: respectable</div>
                          <div className="inline-flex items-center gap-1 bg-white/20 rounded-full px-2 py-1 text-xs">
                            <Clock className="w-3 h-3" />
                            Max: 175 min (yikes)
                          </div>
                          <div className="mt-3 text-xs text-green-100">
                            Goes the distance (literally to the Gold Coast)
                          </div>
                        </div>

                        {/* Bus Card */}
                        <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-2 text-white overflow-hidden">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
                          <Bus className="w-8 h-8 mb-1 text-blue-100" />
                          <div className="text-2xl font-bold mb-1">40<span className="text-lg font-normal text-blue-100">min</span></div>
                          <div className="text-sm text-blue-100 mb-2">Median: it's trying its best</div>
                          <div className="inline-flex items-center gap-1 bg-white/20 rounded-full px-2 py-1 text-xs">
                            <Clock className="w-3 h-3" />
                            Max: 86 min
                          </div>
                          <div className="mt-3 text-xs text-blue-100">
                            Goes everywhere (the hero we don't deserve)
                          </div>
                        </div>
                      </div>


                      {/* Visual Comparison Bar */}
                      <div className="bg-gray-50 rounded-xl p-2 mb-2">
                        <h4 className="text-sm font-semibold text-primary mb-2">Half of Brisbane's connected suburbs can reach the city within:</h4>
                        <div className="space-y-2">
                          {/* Ferry Bar */}
                          <div className="flex items-center gap-4">
                            <span className="w-12 text-sm font-medium text-cyan-600">Ferry</span>
                            <div className="flex-1 h-8 bg-gray-200 rounded-full overflow-hidden relative">
                              <div className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full flex items-center justify-end pr-3" style={{ width: '23%' }}>
                                <span className="text-white text-xs font-bold">23m</span>
                              </div>
                            </div>
                          </div>
                          {/* Train Bar */}
                          <div className="flex items-center gap-4">
                            <span className="w-12 text-sm font-medium text-green-600">Train</span>
                            <div className="flex-1 h-8 bg-gray-200 rounded-full overflow-hidden relative">
                              <div className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-end pr-3" style={{ width: '37%' }}>
                                <span className="text-white text-xs font-bold">37m</span>
                              </div>
                            </div>
                          </div>
                          {/* Bus Bar */}
                          <div className="flex items-center gap-4">
                            <span className="w-12 text-sm font-medium text-blue-600">Bus</span>
                            <div className="flex-1 h-8 bg-gray-200 rounded-full overflow-hidden relative">
                              <div className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-end pr-3" style={{ width: '40%' }}>
                                <span className="text-white text-xs font-bold">40m</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 text-xs text-[#95a5a6] text-center">
                          Scale: 0–100 minutes (ferry is basically flexing)
                        </div>
                      </div>

                      {/* Coverage vs Speed Trade-off */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-orange-700 text-sm">The Marathon Runner</h4>
                            <p className="text-xs text-orange-600">
                              Train hits 175 min max-it'll get you to the Gold Coast if you're patient (very patient)
                            </p>
                          </div>
                        </div>
                        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 flex items-start gap-3">
                          <Zap className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-purple-700 text-sm">The Sprint Champion</h4>
                            <p className="text-xs text-purple-600">
                              Ferry's 41 min max is 2× better than its median-consistency is its middle name
                            </p>
                          </div>
                        </div>
                      </div>
                      <p className="text-[#555] mt-6 leading-relaxed">
                        Bus and train have similar median times (40 vs 37 minutes-basically a photo finish), but their maximum times tell different stories. 
                        Bus caps at 86 minutes, while train goes full endurance mode at 175 minutes, thanks to serving outer suburbs that are basically 
                        in different time zones.
                      </p>

                      
                      {/* Context Note */}
                      <div className="mt-4 bg-gray-50 rounded-lg p-3 flex items-start gap-2">
                        <Info className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-gray-500">
                          <strong>Plot Twist:</strong> Direct train service to Helensvale got replaced by bus during Jan 12-18, 2026. 
                        </p>
                      </div>
                    </div>

                    {/* Section 3.2: Bus-Rail Comparison - Infographic Version */}
                    <div className="bg-white rounded-2xl p-2 shadow-sm">
                      <h3 className="font-semibold text-primary mb-4 text-lg sm:text-xl">
                        3.2 Bus-Rail Travel Time Comparison
                      </h3>

                      {/* Key Stat Highlight */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2">

                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 text-center border border-blue-200">
                          <div className="text-2xl font-bold text-blue-600 mb-1">22</div>
                          <div className="text-xs text-blue-700 font-medium">Lucky Suburbs</div>
                          <div className="text-xs text-blue-600 mt-1">Get to choose their fighter</div>
                        </div>

                        <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-4 text-center border border-gray-200">
                          <div className="text-2xl font-bold text-gray-600 mb-1">50%</div>
                          <div className="text-xs text-gray-700 font-medium">Within 15min Gap</div>
                          <div className="text-xs text-gray-600 mt-1">"Eh, close enough"</div>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 text-center border border-green-200">
                          <div className="text-2xl font-bold text-green-600 mb-1">33<span className="text-lg">min</span></div>
                          <div className="text-xs text-green-700 font-medium">Rail's Best Win</div>
                          <div className="text-xs text-green-600 mt-1">Nudgee showing off</div>
                        </div>
                        
                      </div>
                      <p className="text-[#555] mb-4 leading-relaxed">
                        Where both modes exist, rail usually wins-because dedicated tracks beat mixed traffic. In half the dual-mode suburbs, 
                        the difference is under 15 minutes (aka "worth it if you like trains but not life-changing"). But sometimes the gap 
                        hits 33 minutes, which is "I could have listened to an entire podcast episode" territory.
                      </p>


                      {/* Geographic Pattern */}
                      <div className="bg-slate-50 rounded-xl p-2 mb-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Compass className="w-5 h-5 text-slate-600" />
                          <h4 className="font-semibold text-slate-700">Geographic Patterns (Location, Location, Location)</h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <div>
                              <div className="text-sm font-medium text-slate-700">Northern Suburbs</div>
                              <div className="text-xs text-slate-500">Rail advantage up to 30 min (crushing it)</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                            <div>
                              <div className="text-sm font-medium text-slate-700">SE & SW Suburbs</div>
                              <div className="text-xs text-slate-500">Minimal difference (choose your vibe)</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      

                      {/* Exception Highlight */}
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-2 mb-4 flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-800 text-sm">The ONE Bus Victory: Woolloongabba</h4>
                          <p className="text-xs text-blue-700">
                            Bus beats rail by 2 whole minutes. CBD proximity + busway = rare bus W. Savor it, buses. This doesn't happen often.
                          </p>
                        </div>
                      </div>

                      <ChartIframe {...charts.travelTime.sharedModeMap} />
                    </div>
                    
                    <div className="space-y-4 text-[#555] leading-relaxed">
                      <p>
                        Nudgee holds the record for "biggest rail flex" with a 33-minute advantage, followed by Wynnum and Carseldine going 
                        "yeah, train is definitely the move here." Meanwhile, Woolloongabba is the lone bus champion with a whopping 2-minute win-
                        probably because the bus just... drives straight there. South Brisbane is like "eh, they're the same," which tracks 
                        for somewhere that's basically already in the city.
                      </p>
                      <p>
                        Geographically, northern suburbs show more love for rail (up to 30 minutes faster), while southeastern and southwestern suburbs 
                        are more "meh, whatever works." The lesson? Your mode choice matters way more if you live north. Everyone else, flip a coin.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 30-Minute City with Charts */}
              <div id="thirty-minute-city" className="bg-white rounded-2xl p-2 sm:p-2 lg:p-2 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                  4. The 30-Minute City Reality
                </h2>
                
                {/* Main Stat - Donut Style */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-4">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="96" cy="96" r="70" stroke="#e5e7eb" strokeWidth="16" fill="none" />
                      <circle 
                        cx="96" 
                        cy="96" 
                        r="70" 
                        stroke="#f59e0b" 
                        strokeWidth="16" 
                        fill="none"
                        strokeDasharray="553"
                        strokeDashoffset="381"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-gray-800">31%</span>
                      <span className="text-xs text-gray-500 mt-1">75 of 244 suburbs</span>
                    </div>
                  </div>
                  <div className="text-center md:text-left max-w-xs">
                    <p className="text-[#555] text-sm leading-relaxed">
                      <strong className="text-amber-600">The 30-minute city?</strong> 
                      Only 1 in 3 suburbs can actually pull this off.
                    </p>
                  </div>
                </div>

                {/* Visual Comparison */}
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <h4 className="text-sm font-semibold text-primary mb-4 text-center">30-Minute Accessibility: The Report Card</h4>
                  <div className="space-y-4">
                    {/* Ferry */}
                    <div className="flex items-center gap-4">
                      <span className="w-16 text-xs font-medium text-cyan-600">Ferry</span>
                      <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full flex items-center justify-end pr-2" style={{ width: '77%' }}>
                          <span className="text-white text-xs font-bold">77% A+</span>
                        </div>
                      </div>
                      <span className="w-12 text-xs text-gray-500 text-right">10/13 Suburbs</span>
                    </div>
                    {/* Train */}
                    <div className="flex items-center gap-4">
                      <span className="w-16 text-xs font-medium text-green-600">Train</span>
                      <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-end pr-2" style={{ width: '39%' }}>
                          <span className="text-white text-xs font-bold">39% C</span>
                        </div>
                      </div>
                      <span className="w-12 text-xs text-gray-500 text-right">41/107 Suburbs</span>
                    </div>
                    {/* Bus */}
                    <div className="flex items-center gap-4">
                      <span className="w-16 text-xs font-medium text-blue-600">Bus</span>
                      <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-end pr-2" style={{ width: '28%' }}>
                          <span className="text-white text-xs font-bold">28% D</span>
                        </div>
                      </div>
                      <span className="w-12 text-xs text-gray-500 text-right">51/181 Suburbs</span>
                    </div>
                  </div>
                </div>

                {/* Role Differentiation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Train className="w-5 h-5 text-green-600" />
                      <h4 className="font-semibold text-green-700 text-sm">Rail's Job Description</h4>
                    </div>
                    <p className="text-xs text-green-600">
                      Move lots of people efficiently along fixed corridors. Like a highway, but classier and you can read a book.
                    </p>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Bus className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-blue-700 text-sm">Bus's Job Description</h4>
                    </div>
                    <p className="text-xs text-blue-600">
                      Go literally everywhere rail can't. The Swiss Army knife of public transport. Jack of all trades, master of... coverage.
                    </p>
                  </div>
                </div>

                <p className="text-[#555] mb-6 leading-relaxed">
                  Look, only 75 out of 244 suburbs hit that sweet 30-minute mark. Rail edges out bus slightly despite serving fewer places. 
                  Ferry is basically doing victory laps-but let's be real, it only serves 13 waterfront suburbs. Easy to win when you're competing in a smaller league. 
                  The real story? Bus and rail aren't competing-they're playing different sports. Rail is the sprinter; bus is doing the obstacle course.
                </p>

                <ChartIframe {...charts.thirtyMin.bus30MinMap} />
                
                <p className="text-[#555] mt-4 mb-6 leading-relaxed">
                  Bus actually crushes it for reach-suburbs like Rochedale and Eight Mile Plains hitting 30-minute times is genuinely impressive. 
                  And why? The Southeast Busway, folks. Grade-separated infrastructure is the MVP. Turns out, not getting stuck behind cars makes you... faster. 
                  Revolutionary concept.
                </p>

                <ChartIframe {...charts.thirtyMin.rail30MinMap} />
                
                <p className="text-[#555] mt-4 leading-relaxed">
                  Rail's 30-minute zone stretches to Darra, Carseldine, and Keperra-basically drawing a neat circle around the city along the tracks. 
                  This is what dedicated infrastructure looks like: consistent, predictable, and doesn't care about traffic jams. The dream.
                </p>
              </div>

              <div id="weekday-weekend" className="bg-white rounded-2xl p-2 sm:p-2 lg:p-2 shadow-sm scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                5. Weekday vs Weekend Connectivity
              </h2>

              <ChartIframe {...charts.weekend.connectionsByDay} />
              
              <p className="text-[#555] mb-6 leading-relaxed">
                Weekend service drops hit buses like a ton of bricks-18% fewer suburbs keep their direct city connection. Meanwhile, train service 
                is like "what recession?" with only a 3% drop. Ferry doesn't even flinch-100% weekend coverage. Different energy, honestly.
              </p>


              {/* Impact Header */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-400 rounded-r-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <span className="font-semibold text-red-700 text-sm">The Weekend Inequality Plot Twist</span>
                </div>
                <p className="text-[#555] text-sm">
                  Bus riders are <strong className="text-red-600">3× more likely</strong> to lose weekend city access than rail passengers. 
                  It's giving "different treatment for different customers" energy, and not in a good way.
                </p>
              </div>

              {/* Comparison Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Bus Impact */}
                <div className="relative bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
                  <div className="absolute -top-3 left-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    OOF LEVEL: HIGH
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Bus className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">-24%</div>
                      <div className="text-xs text-gray-500">Bus-only suburbs taking the L</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Monday-Friday vibes</span>
                      <span className="font-semibold text-gray-800">128 suburbs</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Weekend reality check</span>
                      <span className="font-semibold text-red-600">97 suburbs</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '76%' }}></div>
                    </div>
                    <p className="text-xs text-red-600 mt-2">
                      <strong>31 suburbs</strong> just got left on read by their buses
                    </p>
                  </div>
                </div>

                {/* Train Impact */}
                <div className="relative bg-white border-2 border-green-200 rounded-2xl p-6 shadow-sm">
                  <div className="absolute -top-3 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    BARELY NOTICED
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Train className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">-9%</div>
                      <div className="text-xs text-gray-500">Train only suburbs chilling</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Weekday service</span>
                      <span className="font-semibold text-gray-800">63 suburbs</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Weekend service (basically same)</span>
                      <span className="font-semibold text-green-600">57 suburbs</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '91%' }}></div>
                    </div>
                    <p className="text-xs text-green-600 mt-2">
                      <strong>6 suburbs</strong> lost service (but like, gently)
                    </p>
                  </div>
                </div>
              </div>


              {/* Equity Impact */}
              <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-5 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-orange-800 text-sm mb-1">The Equity Conversation We Need to Have</h4>
                    <p className="text-xs text-orange-700">
                      People in bus-dependent suburbs-often folks without cars as a backup-are basically stranded on weekends. 
                      No job access, no healthcare visits, no social life. It's isolation with a schedule.
                    </p>
                  </div>
                </div>
              </div>

              {/* Charts */}
              <ChartIframe {...charts.weekend.weekendServiceDrop} />
              
              <p className="text-[#555] mt-4 leading-relaxed">
                The geography is telling. Southwest (Rosewood, Walloon), south (Park Ridge, Crestmead), and southeast (Victoria Point, Redland Bay) 
                basically become transit deserts on weekends. It's like the network said "you're on your own, good luck." For buses, the affected suburbs 
                cluster in the south and southeast. For trains, it's mostly southwest. Either way, someone's weekend plans just got complicated.
              </p>

              {/* Context Note */}
              <div className="mt-4 bg-yellow-50 rounded-lg p-3 flex items-start gap-2">
                <Info className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-yellow-800">
                  <strong>Fair Warning:</strong> This data is from Jan 12-18, 2026. Some reductions might be temporary (track work, maintenance, etc.). 
                  Or they might not be. Nobody knows! Transit is a mystery.
                </p>
              </div>
            </div>



              {/* Accessibility Classification with Charts */}
              <div id="accessibility" className="bg-white rounded-2xl p-2 sm:p-2 lg:p-2 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                  6. Accessibility Classification
                </h2>
                
                <p className="text-[#555] mb-6 leading-relaxed">
                  To figure out who's winning and who's... not, I classified suburbs based on two factors: travel time (how long you're complaining) 
                  and service frequency (how many chances you get to miss your ride). This creates four categories, ranging from "living your best life" 
                  to "maybe consider moving." Thresholds determined by median values because I'm a professional data person (citation needed).
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {accessibilityClasses.map((cls) => (
                    <div key={cls.category} className={`rounded-lg p-2 ${cls.color} bg-opacity-20 border border-current`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">{cls.category}</span>
                        <span className="text-2xl font-bold">{cls.percentage}</span>
                      </div>
                      <p className="text-sm opacity-90">{cls.description}</p>
                    </div>
                  ))}
                </div>

                <ChartIframe {...charts.accessibility.quadrantsMap} />
                <p className="text-[#555] mt-4 mb-4 leading-relaxed">
                  Surprise, surprise-geography matters. Fast and frequent suburbs form a cozy little ring around Brisbane City, then gradually 
                  fade into "slow and infrequent" as you venture outward. It's like the transit version of "the further you get from the core, 
                  the less anyone cares." This is the fundamental challenge: providing top-tier service to expanding suburbs with limited money. 
                  Spoiler: it's hard.
                </p>

                <ChartIframe {...charts.accessibility.quadrantsScatter} />
                <p className="text-[#555] mt-4 mb-4 leading-relaxed">
                  Individual suburb performance reveals the outliers living their truth. South Brisbane, Fortitude Valley, and Woolloongabba are basically 
                  transit royalty-close to the city, drowning in route options, living the dream. On the flip side, Victoria Heights, Traveston, and Cooran 
                  represent the "connectivity desert" demographic: long travel times, barely any departures, and a prayer. The range is... dramatic.
                </p>

                <ChartIframe {...charts.accessibility.quadrantsMode} />
                <div className="text-[#555] mt-4 space-y-4 leading-relaxed">
                  <p>
                    Mode-specific breakdowns? Wild. Bus-only suburbs are split right down the middle between "fast/frequent" and "slow/infrequent"-
                    which tells you everything about how variable bus performance is. Dedicated busways? Amazing. Mixed traffic? Not so much. 
                    Rail-only suburbs lean heavily toward "slow and infrequent," which makes sense-rail connects distant communities with 
                    fewer trains because... distance.
                  </p>
                  <p>
                    Suburbs blessed with both bus AND rail? Mostly "fast and frequent." Having options is a cheat code, apparently. 
                    This is your reminder that modal redundancy isn't just nice-it's genuinely game-changing. More suburbs need this energy.
                  </p>
                </div>

              </div>

              {/* Key Insights & Limitations */}
              <div id="key-insights" className="bg-white rounded-2xl p-2 sm:p-2 lg:p-2 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                  7. Key Insights & Limitations
                </h2>
                
                <div className="space-y-2">
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-primary mb-1">7.1 Summary of Findings</h3>
                    <ul className="bg-gray-50 rounded-lg p-4 text-sm text-[#555] space-y-2">
                      <li><strong>Network Coverage:</strong> 244 suburbs connected, but most are in monogamous relationships with their mode. Only 40 lucky suburbs get to see both bus and train-the polyamory we need.</li>
                      <li><strong>Travel Time Performance:</strong> Ferry dominates with 23-minute medians but only serves 13 suburbs (exclusive club vibes). Bus and rail tie at around 40/37 minutes, though rail reaches way farther for the adventurous commuter.</li>
                      <li><strong>Accessibility Gaps:</strong> Only 31% hit the 30-minute mark. The network is polarized: 40% have it good, 37% are struggling, and the rest are somewhere in between wondering what they did wrong.</li>
                      <li><strong>Weekend Service:</strong> Bus routes ghost 18% of their suburbs on weekends, while rail barely changes (3% drop). Some outer suburbs just... lose all weekend service. Equity concerns? Absolutely.</li>
                      <li><strong>Infrastructure Matters:</strong> Busways consistently outperform mixed-traffic routes. Dedicated infrastructure is the secret sauce. Turns out, not competing with cars makes you faster. Who knew?</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-primary mb-1">7.2 Limitations (The Disclaimer Section Nobody Reads But I'm Including Anyway)</h3>
                    <ul className="bg-gray-50 rounded-lg p-4 text-sm text-[#555] space-y-2">
                      <li><strong>Temporal</strong>: One week in January 2026. This ain't a longitudinal study-seasonal patterns, trends, and temporary changes are not captured. Don't @ me if your experience differs.</li>
                      <li><strong>Methodology</strong>: GTFS shows scheduled times, not reality. Delays, traffic, acts of nature-none of that's in here. Also, no transfers, no walking time, no waiting around contemplating existence. Just pure in-vehicle time.</li>
                      <li><strong>Demand</strong>: I didn't consider population density or actual ridership. This analysis is connectivity-focused, not demand-weighted. High service doesn't mean high need, and vice versa.</li>
                      <li><strong>Geographic</strong>: Brisbane City focus only. Suburb-to-suburb trips? Other major centers? Not here. Different analysis for another time (or never, we'll see).</li>
                      <li><strong>Interpretation</strong>: Classifications use median-based thresholds, which are... somewhat arbitrary. Weekend reductions might be temporary maintenance, not policy. Take it all with a grain of salt.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Notes and References */}
              <div id="notes" className="bg-white rounded-2xl p-2 sm:p-2 lg:p-2 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                  Notes and References (For the People Who Want to Fact-Check Me)
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
