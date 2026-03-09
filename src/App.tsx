import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import Header from '@/components/sections/Header';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import TransitShowdown from '@/components/projects/the_great_australian_transit_showdown/the_great_australian_transit_showdown';
import BrisbaneConnectivity from '@/components/projects/brisbane_connectivity/brisbane_connectivity';
import TranslinkOD from '@/components/projects/translink_od/translink_od';
import TransitmateChatbot from '@/components/projects/transitmate_chatbot/transitmate_chatbot';
import FeatureEngineeringImpactAnalysis from '@/components/projects/feature_engineering_impact_analysis/feature_engineering_impact_analysis';
import AllProjects from '@/components/AllProjects';
import Publications from '@/components/Publications';

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (command: string, id: string, config?: any) => void;
  }
}

function PageMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Update Document Title
    const baseTitle = "Transport Analytics & Insights";
    const routeTitles: Record<string, string> = {
      "/": "Home | " + baseTitle,
      "/projects": "All Projects | " + baseTitle,
      "/publications": "Publications | " + baseTitle,
      "/projects/brisbane-connectivity": "Brisbane Connectivity | " + baseTitle,
      "/brisbane-connectivity": "Brisbane Connectivity | " + baseTitle,
      "/projects/translink-od": "Translink Patronage | " + baseTitle,
      "/translink-od": "Translink Patronage | " + baseTitle,
      "/projects/transitmate-chatbot": "TransitMate Chatbot | " + baseTitle,
      "/projects/feature-engineering-impact-analysis": "Feature Engineering | " + baseTitle,
      "/projects/the-great-australian-transit-showdown": "Transit Showdown | " + baseTitle,
    };

    const newTitle = routeTitles[pathname] || "Transport Analytics & Insights | " + baseTitle;
    document.title = newTitle;

    // 2. Track Page View in Google Analytics
    if (window.gtag) {
      window.gtag('config', 'G-8CTJS8JXM1', {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}

function ScrollToTopOrHash() {
  const { pathname, hash, state } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    // If navigation is a back/forward action (POP), let the browser handle scroll restoration
    if (navType === 'POP') {
      return;
    }

    // If state has a targetId, scroll to it (clean URL navigation)
    if (state && state.targetId) {
      const element = document.getElementById(state.targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } 
    // Fallback for hash navigation
    else if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
    // Otherwise scroll to top on route change (PUSH or REPLACE)
    else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, state, navType]);

  return null;
}

function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <PageMetadata />
      <ScrollToTopOrHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/the-great-australian-transit-showdown" element={<TransitShowdown />} />
        <Route path="/projects/brisbane-connectivity" element={<BrisbaneConnectivity />} />
        <Route path="/brisbane-connectivity" element={<BrisbaneConnectivity />} />
        <Route path="/projects/translink-od" element={<TranslinkOD />} />
        <Route path="/translink-od" element={<TranslinkOD />} />
        <Route path="/projects/transitmate-chatbot" element={<TransitmateChatbot />} />
        <Route path="/projects/feature-engineering-impact-analysis" element={<FeatureEngineeringImpactAnalysis />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/publications" element={<Publications />} />
      </Routes>
    </Router>
  );
}

export default App;
