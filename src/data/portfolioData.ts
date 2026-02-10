import translinkBus from '@/assets/images/TranslinkBus.png';
import brisbaneCityNetwork from '@/assets/images/BrisbaneCityNetwork.png';
import transitMateChatbot from '@/assets/images/TransitMateChatbot.png';
import featureEngineering from '@/assets/images/FeatureEngineering.png';

export interface Project {
  id: number;
  title: string;
  description: string;
  icon: string;
  image: string;
  tags: string[];
  link: string;
  color: string;
}

export interface Skill {
  name: string;
  category: 'technical' | 'analytical' | 'soft';
}

export interface Stat {
  icon: string;
  value: string;
  label: string;
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  tableau: string;
}

export interface SocialLink {
  platform: string;
  icon: string;
  url: string;
}

export interface Publication {
  id: number;
  title: string;
  authors: string;
  venue: string;
  year: string;
  link: string;
  type: 'journal' | 'conference' | 'dissertation';
  summary?: string;
  doi?: string;
}

export const publications: Publication[] = [
  {
    id: 1,
    title: "Data Fusion for the Development of a Multimodal Freight Transload Facilities Dataset in the U.S.",
    authors: "Asborno, M., Bhurtyal, S., Mitchell, K. N., Peterson, S. K., & Kress, M. M.",
    venue: "Transportation Research Record: Journal of the Transportation Research Board, 0(0)",
    year: "2026",
    link: "https://doi.org/10.1177/03611981251394678",
    type: "journal"
  },
  {
    id: 2,
    title: "Prediction of waterborne freight activity with Automatic Identification System using Machine learning",
    authors: "Bhurtyal, S., Bui, H., Hernandez, S., Eksioglu, S., Asborno, M., Mitchell, K. N., & Kress, M.",
    venue: "Computers & Industrial Engineering, 200, 110757",
    year: "2025",
    link: "https://www.sciencedirect.com/science/article/abs/pii/S0360835224008799",
    type: "journal"
  },
  {
    id: 3,
    title: "Data-Driven Methods to Assess Transportation System Resilience: Case Study of the Arkansas Roadway Network",
    authors: "Bhurtyal, S., Hernandez, S., Amankwah-Nkyi, K.",
    venue: "Journal of Transportation Engineering, Part A: Systems. 10.1061/JTEPBS/TEENG-8064",
    year: "2024",
    link: "https://ascelibrary.org/doi/10.1061/JTEPBS.TEENG-8064",
    type: "journal"
  },
  {
    id: 4,
    title: "A two-stage stochastic optimization model for port infrastructure planning",
    authors: "Bhurtyal, S., Hernandez, S., Eksioglu, S., & Yves, M.",
    venue: "Maritime Economics & Logistics, 26(2), 185-211",
    year: "2024",
    link: "https://link.springer.com/article/10.1057/s41278-023-00262-0",
    type: "journal"
  },
  {
    id: 5,
    title: "Impacts of a Highway Bypass on Residential Property Values in a Small City in Arkansas",
    authors: "Bhurtyal, S., Giebler, M., Mitra, S., & Hernandez, S.",
    venue: "Transportation Research Board Annual Meeting (No. TRBAM-21-01535)",
    year: "2021",
    link: "https://trid.trb.org/View/1759364",
    type: "conference"
  },
  {
    id: 6,
    title: "Addressing Data Limitations of Commercial Waterways via Machine Learning and Stochastic Optimization",
    authors: "Bhurtyal, S.",
    venue: "University of Arkansas, USA",
    year: "Disertation",
    link: "https://www.proquest.com/openview/4f0f170da25e6f4efe5a615cdbe155c0/1?pq-origsite=gscholar&cbl=18750&diss=y",
    type: "dissertation",
    summary: "Developed machine learning and optimization frameworks to overcome data constraints in waterborne freight systems, improving prediction accuracy and supporting infrastructure planning decisions."
  }
];

export const projects: Project[] = [
  {
    id: 1,
    title: "TransitMate Chatbot",
    description: "An intelligent conversational AI system that delivers real-time, context-aware responses to natural language queries about TransLink service disruptions, track closures, and stop impacts using Retrieval-Augmented Generation (RAG).",
    icon: "route",
    image: transitMateChatbot,
    tags: ["Translink", "Chatbot", "Service Disruptions", "Python", "RAG", "LLM", "Conversational AI"],
    link: "/projects/transitmate_chatbot",
    color: "from-green-500 to-teal-500"
  },
  {
    id: 2,
    title: "Mapping Connectivity Across Brisbane: What GTFS Reveals",
    description: "Analyzing 244 direct suburb connections to Brisbane City using GTFS data (January 12-18, 2026) to reveal how efficiently residents can reach the city center across different modes and time periods.",
    icon: "route",
    image: brisbaneCityNetwork,
    tags: ["GTFS", "Network Analysis", "Geospatial Analysis", "Brisbane City", "Python", "Accessibility Analysis", "Translink"],
    link: "/projects/brisbane_connectivity",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    title: "Decoding Translink Origin Destination Patronage Data",
    description: "Examined 470 million trips across TransLink’s bus, train, and ferry networks from January 2022 to October 2025, revealing a public transport system experiencing rapid transformation.",
    icon: "subway",
    image: translinkBus,
    tags: ["Translink", "Patronage", "Python", "Data Visualization", "Tableau"],
    link: "/projects/translink_od",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 4,
    title: "Feature Engineering Impact Analysis",
    description: "demonstrates the fundamental importance of feature engineering in machine learning model performance through a controlled experiment using London bike sharing demand forecasting.",
    icon: "robot",
    image: featureEngineering,
    tags: ["Machine Learning", "Feature Engineering", "Time Series Forecasting", "Python", "Bike Sharing"],
    link: "/projects/feature_engineering_impact_analysis",
    color: "from-purple-500 to-pink-500"
  }
];

export const skills: Skill[] = [
  { name: "Python", category: "technical" },
  { name: "SQL", category: "technical" },
  { name: "GIS", category: "technical" },
  { name: "Tableau", category: "technical" },
  { name: "Large Data Analysis", category: "analytical" },
  { name: "Transit Network Analysis", category: "analytical" },
  { name: "Network Optimization", category: "analytical" },
  { name: "Performance Metrics Development", category: "analytical" },
  { name: "Machine Learning", category: "technical" },
  { name: "Data Visualization", category: "technical" },
  { name: "R", category: "technical" },
  { name: "Stakeholder Engagement", category: "soft" },
  { name: "Project Management", category: "soft" },
  { name: "Problem Solving", category: "soft" },
];

export const stats: Stat[] = [
  { icon: "city", value: "25+", label: "Cities Analyzed" },
  { icon: "users", value: "1.2M+", label: "Passengers Impacted" },
  { icon: "chart-bar", value: "35%", label: "Avg. Service Improvement" },
  { icon: "globe-americas", value: "12", label: "Countries Worked" }
];

export const contactInfo: ContactInfo = {
  email: "transportanalyticsandinsights@gmail.com",
  linkedin: "https://www.linkedin.com/in/sanjeev-bhurtyal/",
  github: "https://github.com/sanjeevbhurtyal",
  tableau: "https://public.tableau.com/app/profile/sanjeev.bhurtyal2011/vizzes"
};

export const socialLinks: SocialLink[] = [
  { platform: "Email", icon: "envelope", url: "mailto:transportanalyticsandinsights@gmail.com" },
  { platform: "LinkedIn", icon: "linkedin-in", url: "https://www.linkedin.com/in/sanjeev-bhurtyal/" },
  { platform: "GitHub", icon: "github", url: "https://github.com/sanjeevbhurtyal" },
  { platform: "Tableau", icon: "tableau", url: "https://public.tableau.com/app/profile/sanjeev.bhurtyal2011/vizzes" },
];

export const areaOfExpertise = [
  "Big Data Analytics",
  "Network Optimization",
  "Data Visualization",
  "Demand Forecasting",
  "Spatial Analysis"
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "About Me", href: "#about" },
  { label: "Contact", href: "#contact" }
];
