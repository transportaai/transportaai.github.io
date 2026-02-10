import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import Header from '@/components/sections/Header';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import BrisbaneConnectivity from '@/components/projects/brisbane_connectivity/brisbane_connectivity';
import TranslinkOD from '@/components/projects/translink_od/translink_od';
import TransitmateChatbot from '@/components/projects/transitmate_chatbot/transitmate_chatbot';
import FeatureEngineeringImpactAnalysis from '@/components/projects/feature_engineering_impact_analysis/feature_engineering_impact_analysis';
import AllProjects from '@/components/AllProjects';
import Publications from '@/components/Publications';

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
      <ScrollToTopOrHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/brisbane_connectivity" element={<BrisbaneConnectivity />} />
        <Route path="/projects/translink_od" element={<TranslinkOD />} />
        <Route path="/projects/transitmate_chatbot" element={<TransitmateChatbot />} />
        <Route path="/projects/feature_engineering_impact_analysis" element={<FeatureEngineeringImpactAnalysis />} />
        <Route path="/projects" element={<AllProjects />} />
        <Route path="/publications" element={<Publications />} />
      </Routes>
    </Router>
  );
}

export default App;
