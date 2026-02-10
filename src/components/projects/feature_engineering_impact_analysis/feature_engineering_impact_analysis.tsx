import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Brain,
  TrendingUp,
  AlertTriangle,
  Database,
  Clock,
  Cloud,
  Bike,
  BarChart3,
  Github,
  Menu,
  X,
  Lightbulb,
  Target
} from "lucide-react";
import Footer from '@/components/sections/Footer';
import Header from '@/components/sections/Header';
import HumorWarning from '@/components/HumorWarning';
// Import assets (placeholders - replace with actual paths)
import datasetSampleUrl from './assets/figures/dataset_sample.png?url';
import aggregationComparisonUrl from './assets/figures/aggregation_comparison.png?url';
import comparisonValuesUrl from './assets/figures/comparison_values.png?url';
import comparisonPercentageUrl from './assets/figures/comparison_percentage.png?url';
import comparisonValuesGoodUrl from './assets/figures/comparison_values_good.png?url';
import prophetActualPredictionUrl from './assets/figures/Prophet_Actual_Prediction.png?url';

// Image component
const ChartImage = ({ src, title, caption }: { src: string, title: string, caption?: string }) => (
  <div className="w-full mb-6">
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
      <img
        src={src}
        alt={title}
        className="w-full h-auto object-contain"
      />
    </div>
    {caption && (
      <p className="text-xs text-[#95a5a6] mt-2 text-center italic">
        Figure: {caption}
      </p>
    )}
  </div>
);

export default function FeatureEngineeringImpactAnalysis() {
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
    { id: "dataset", label: "2. Dataset" },
    { id: "feature-engineering", label: "3. Feature Engineering" },
    { id: "models", label: "4. Model Architectures" },
    { id: "results", label: "5. Results" },
    { id: "discussion", label: "6. Discussion" },
    { id: "conclusion", label: "7. Conclusion" },
    { id: "notes", label: "Notes and References" },
  ];

  const techStack = [
    "Python", "Pandas", "Scikit-learn", "XGBoost", "TensorFlow", "Prophet", "Statsmodels", "Jupyter"
  ];

  const externalLinks = [
    {
      label: "London Bike Dataset",
      url: "https://www.kaggle.com/datasets/hmavrodiev/london-bike-sharing-dataset",
      icon: Database,
    },
    {
      label: "GitHub Repository",
      url: "https://github.com/sanjeevbhurtyal/London-Bike-Sharing-Forecaset-Python-ML",
      icon: Github,
    },
  ];

  const models = [
    {
      name: "SARIMAX",
      description: "Statistical time series model. Fancy math for people who trust autocorrelation more than their gut.",
      icon: BarChart3,
      color: "bg-blue-100 text-blue-700",
    },
    {
      name: "XGBoost",
      description: "Gradient boosting on steroids. Turns weak learners into strong predictors, like a gym for algorithms.",
      icon: TrendingUp,
      color: "bg-green-100 text-green-700",
    },
    {
      name: "LSTM",
      description: "Neural network with memory. Remembers the past better than your ex, but actually useful.",
      icon: Brain,
      color: "bg-purple-100 text-purple-700",
    },
    {
      name: "Prophet",
      description: "Facebook's forecasting tool. For when you want professional results without the PhD trauma.",
      icon: Target,
      color: "bg-orange-100 text-orange-700",
    },
  ];

  const performanceData = [
    { model: "LSTM", rmse: "18%", mae: "22%", mape: "15%", r2: "+0.13", reaction: "😱" },
    { model: "Prophet", rmse: "16%", mae: "19%", mape: "15%", r2: "+0.07", reaction: "😮" },
    { model: "XGBoost", rmse: "6%", mae: "6%", mape: "6%", r2: "+0.04", reaction: "😐" },
    { model: "SARIMAX", rmse: "7%", mae: "10%", mape: "9%", r2: "+0.06", reaction: "🙂" },
  ];

  const timeSegments = [
    { name: "Night", hours: "12am-5am", activity: "Minimal", vibe: "Ghost town" },
    { name: "Dawn", hours: "5am-8am", activity: "Morning commute buildup", vibe: "Coffee required" },
    { name: "Morning", hours: "8am-12pm", activity: "Peak usage", vibe: "Chaos" },
    { name: "Afternoon", hours: "12pm-5pm", activity: "Midday & early evening", vibe: "Business casual" },
    { name: "Dusk", hours: "5pm-8pm", activity: "Evening commute peak", vibe: "Hurry hour" },
    { name: "Evening", hours: "8pm-12am", activity: "Wind-down", vibe: "Netflix and chill" },
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
            Feature Engineering Impact Analysis
          </h1>

          <p className="text-white/80 text-base sm:text-lg max-w-5xl">
            We spent months proving what every data scientist secretly knows: your fancy neural network is only as good as 
            the features you feed it. Spoiler: throwing raw data at LSTM won't save you, but splitting your day into 
            six time segments might. A controlled experiment with London bikes, four models, and a lot of humble pie.
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
                  Executive Summary
                </h2>

                <p className="text-[#555] leading-relaxed mb-6">
                  This analysis demonstrates the fundamental importance of feature engineering through a controlled experiment 
                  using London bike sharing demand forecasting. We compared identical models trained on poorly versus well-engineered 
                  features to quantify the performance gap. Think of it as a cooking show where we use the same chef but different 
                  ingredients—spoiler: fresh ingredients matter.
                </p>

                <ul className="space-y-4 mb-4 list-disc pl-5 text-gray-900">
                  <li className="text-sm">
                    <span className="font-semibold text-base">Feature engineering quality matters more than model selection:</span>
                    <p className="text-gray-600 mt-1">Well-engineered features improved all four models significantly, with improvements ranging from 5% to 22%. Turns out you can't algorithm your way out of bad data.</p>
                  </li>

                  <li className="text-sm">
                    <span className="font-semibold text-base">LSTM showed highest sensitivity to feature quality:</span>
                    <p className="text-gray-600 mt-1">22% improvement, followed by Prophet. Complex models are like fancy sports cars—they need premium fuel or they sputter.</p>
                  </li>

                  <li className="text-sm">
                    <span className="font-semibold text-base">Naive aggregation destroys temporal patterns:</span>
                    <p className="text-gray-600 mt-1">Collapsing hourly data into daily medians/modes eliminated critical intra-day variation. It's like summarizing a symphony as "mostly loud."</p>
                  </li>

                  <li className="text-sm">
                    <span className="font-semibold text-base">Time-aware segmentation unlocked performance:</span>
                    <p className="text-gray-600 mt-1">Dividing days into six temporal categories preserved usage patterns. Sometimes more features are better, especially when they make sense.</p>
                  </li>

                  <li className="text-sm">
                    <span className="font-semibold text-base">Prophet achieved best absolute performance:</span>
                    <p className="text-gray-600 mt-1">With good features, but universal improvement across all architectures proves feature engineering is the real foundation of predictive accuracy.</p>
                  </li>
                </ul>
              </div>

              {/* Introduction */}
              <div id="introduction" className="bg-white rounded-2xl p-2 sm:p-2 lg:p-2 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                  1. Introduction: The Feature Engineering Paradigm
                </h2>

                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
                  <h3 className="font-semibold text-primary mb-2 text-lg sm:text-xl">
                    1.1 The Problem With Machine Learning (It's You, Not The Algorithm)
                  </h3>
                  
                  <p className="text-[#555] leading-relaxed mb-4">
                    Machine learning practitioners often focus on model architecture selection—comparing neural networks, 
                    gradient boosting, and statistical models like they're choosing Pokemon. However, <strong>the quality of features 
                    fed into these models frequently determines success more than the model choice itself</strong>. 
                    It's like arguing about whether to use a Ferrari or a Lamborghini when you haven't put gas in either.
                  </p>

                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-4 mb-4">
                    <h4 className="font-bold text-primary mb-2">Research Question</h4>
                    <p className="text-[#555] italic">
                      "How much does feature engineering quality impact model performance across different forecasting architectures?"
                      (Translation: Will good features save bad models, or are we all just wasting our time?)
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-primary mb-2 text-lg sm:text-xl">
                    1.2 Experimental Design
                  </h3>

                  <p className="text-[#555] leading-relaxed mb-4">
                    To measure feature engineering impact without confounding variables (fancy talk for "messy data"), this study:
                  </p>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-primary font-bold text-sm">1</div>
                      <p className="text-[#555]"><strong>Uses identical model architectures:</strong> Four architectures trained twice each—once with bad features, once with good. Like a taste test, but with algorithms.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-primary font-bold text-sm">2</div>
                      <p className="text-[#555]"><strong>Optimizes hyperparameters separately:</strong> Each model-feature combo gets tuned to peak performance. No excuses about "bad hyperparameters."</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-primary font-bold text-sm">3</div>
                      <p className="text-[#555]"><strong>Isolates feature quality as the key variable:</strong> The only difference is feature engineering approach. Everything else is controlled.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 text-primary font-bold text-sm">4</div>
                      <p className="text-[#555]"><strong>Proves tuning cannot compensate for bad features:</strong> Performance gaps persist even with optimization. You can’t grid‑search your way out of bad data..</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Bike className="w-5 h-5 text-blue-600" />
                      <h4 className="font-bold text-blue-900">Case Study: London Bike Sharing</h4>
                    </div>
                    <p className="text-sm text-blue-800">
                      Bike rental forecasting serves as our guinea pig because it has all the good stuff: strong temporal patterns, 
                      weather dependencies, multi-variate influences, and real-world operational constraints. 
                      Plus, who doesn't like bikes? The <a href="https://www.kaggle.com/datasets/hmavrodiev/london-bike-sharing-dataset" target="_blank" rel="noopener noreferrer" className="underline">London Bike Sharing Dataset</a> provides hourly records 
                      perfect for demonstrating how feature transformation impacts accuracy.
                    </p>
                  </div>
                </div>
              </div>

              {/* Dataset */}
              <div id="dataset" className="bg-white rounded-2xl p-2 sm:p-2 lg:p-2 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                  2. Dataset Description
                </h2>

                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <p className="text-[#555] leading-relaxed mb-4">
                    The dataset contains hourly bike rental records with variables that sound like a weather app had a baby with a bike share app:
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="font-semibold text-primary">timestamp</div>
                      <div className="text-sm text-gray-600">Hourly datetime (the when)</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="font-semibold text-primary">cnt</div>
                      <div className="text-sm text-gray-600">Count of rentals (the what we're predicting)</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="font-semibold text-primary">t1, t2</div>
                      <div className="text-sm text-gray-600">Actual and "feels like" temperature (because perception matters)</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="font-semibold text-primary">hum</div>
                      <div className="text-sm text-gray-600">Humidity percentage (the frizz factor)</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="font-semibold text-primary">wind_speed</div>
                      <div className="text-sm text-gray-600">Wind speed in km/h (bad hair day predictor)</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="font-semibold text-primary">weather_code</div>
                      <div className="text-sm text-gray-600">Categorical weather (sunny, rainy, apocalyptic)</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="font-semibold text-primary">is_holiday, is_weekend</div>
                      <div className="text-sm text-gray-600">Binary flags (do people have jobs today?)</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="font-semibold text-primary">season</div>
                      <div className="text-sm text-gray-600">Meteorological season (fashion calendar)</div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Target className="w-5 h-5 text-amber-600" />
                      <span className="font-semibold text-amber-800">Prediction Task</span>
                    </div>
                    <p className="text-sm text-amber-700">
                      Forecast daily bike rental counts using weather and temporal features. 
                      Simple, right? Just wait until we talk about how we aggregate this data...
                    </p>
                  </div>
                  <ChartImage src={datasetSampleUrl} title="Dataset Sample" caption="Sample of hourly bike rental data showing temporal patterns." />
                </div>
              </div>

              {/* Feature Engineering */}
              <div id="feature-engineering" className="bg-white rounded-2xl p-2 sm:p-2 lg:p-2 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                  3. Feature Engineering Approaches: The Good, The Bad, and The Ugly
                </h2>

                <div className="space-y-6">
                  {/* Bad Features */}
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 border-l-4 border-l-red-400">
                    <h3 className="font-semibold text-red-700 mb-2 text-xl flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      3.1 Bad Feature Engineering: Naive Aggregation (Don't Try This At Home)
                    </h3>
                    
                    <p className="text-[#555] leading-relaxed mb-4">
                      The "bad" approach applies simplistic aggregation to convert hourly data to daily predictions. 
                      It's the data science equivalent of making soup by throwing everything in a blender and hoping for the best.
                    </p>

                    <div className="bg-red-50 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-red-900 mb-2">Aggregation Rules (Of Questionable Wisdom)</h4>
                      <ul className="space-y-2 text-sm text-red-800">
                        <li>• <strong>Temperature, humidity, wind speed:</strong> Daily median (because average weather is definitely a thing)</li>
                        <li>• <strong>Weather code, season:</strong> Most frequent (mode) value (majority rules, minority drools)</li>
                        <li>• <strong>Holiday, weekend:</strong> Maximum value (binary flags remain consistent, at least we got something right)</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Why This Fails (A Tragedy in Three Acts)</h4>
                      <div className="space-y-3 text-sm text-[#555]">
                        <p><strong>Act I - Rain Timing Matters:</strong> If it rains 12am-8am and 6pm-12am, the entire day is marked "rainy" despite dry conditions during peak commute hours (8am-6pm) when most rentals occur. It's like calling a day "wet" because you spilled coffee at breakfast and wine at dinner, but stayed dry all day.</p>
                        
                        <p><strong>Act II - Temperature Variation Ignored:</strong> A day with 10°C morning and 25°C afternoon gets reduced to a median that represents neither the cold start nor warm peak usage period. It's the statistical equivalent of saying "the temperature was fine" when you actually froze in the morning and sweated in the afternoon.</p>
                        
                        <p><strong>Act III - Peak Patterns Lost:</strong> Median aggregation eliminates the relationship between specific weather conditions and hourly demand spikes. It's like averaging a heartbeat and concluding the patient is fine, ignoring that they flatlined twice.</p>
                      </div>
                    </div>
                    <ChartImage src={aggregationComparisonUrl} title="Aggregation Comparison" caption="Naive daily aggregation obscures critical temporal patterns." />
                  </div>

                  {/* Good Features */}
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 border-l-4 border-l-green-400">
                    <h3 className="font-semibold text-green-700 mb-2 text-xl flex items-center gap-2">
                      <Lightbulb className="w-5 h-5" />
                      3.2 Good Feature Engineering: Time-Aware Segmentation (The Enlightened Path)
                    </h3>
                    
                    <p className="text-[#555] leading-relaxed mb-4">
                      The "good" approach preserves temporal granularity through structured segmentation. 
                      It's like organizing your closet by occasion instead of throwing everything in a pile.
                    </p>

                    <div className="bg-green-50 rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-green-900 mb-2">Time-of-Day Categories (The Segmentation Strategy)</h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {timeSegments.map((segment) => (
                          <div key={segment.name} className="bg-white rounded-lg p-3 border border-green-200">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-bold text-green-800">{segment.name}</span>
                              <span className="text-xs text-green-600">{segment.hours}</span>
                            </div>
                            <div className="text-xs text-gray-600">{segment.activity}</div>
                            <div className="text-xs text-green-600 italic mt-1">Vibe: {segment.vibe}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Why This Works (The Success Story)</h4>
                      <div className="space-y-2 text-sm text-[#555]">
                        <p><strong>Peak-hour weather matters:</strong> Morning commute decisions depend on dawn/morning weather, not overnight conditions. Revolutionary concept: people care about weather when they're actually riding.</p>
                        
                        <p><strong>Usage patterns preserved:</strong> Models can learn that afternoon temperature affects afternoon rentals differently than dawn temperature affects morning rentals. Context is everything, apparently.</p>
                        
                        <p><strong>Temporal dependencies maintained:</strong> Six feature sets per day provide 6x more information about when conditions occur relative to usage patterns. More data, better predictions, happier data scientists.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Models */}
              <div id="models" className="bg-white rounded-2xl p-2 sm:p-2 lg:p-2 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                  4. Model Architectures (The Contestants)
                </h2>

                <p className="text-[#555] leading-relaxed mb-4">
                  To prove feature quality impacts diverse model types, we threw four completely different architectures into the ring. 
                  Like a data science Royal Rumble, but with more math and fewer folding chairs.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {models.map((model) => (
                    <div key={model.name} className={`rounded-xl p-4 ${model.color} bg-opacity-20 border border-current`}>
                      <div className="flex items-center gap-2 mb-2">
                        <model.icon className="w-6 h-6" />
                        <h4 className="font-bold">{model.name}</h4>
                      </div>
                      <p className="text-sm opacity-90">{model.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Experimental Protocol:</strong> Each model was trained twice: once with bad features, once with good features, 
                    with best set of tuned hyperparameters for each. Fair fight, controlled conditions, maximum scientific rigor 
                    (and minimum sleep for the researchers).
                  </p>
                </div>
              </div>

              {/* Results */}
              <div id="results" className="bg-white rounded-2xl p-2 sm:p-2 lg:p-2 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                  5. Results and Analysis (The Moment of Truth)
                </h2>

                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-primary mb-2 text-lg sm:text-xl">
                      5.1 Performance Metrics (How We Keep Score)
                    </h3>
                    
                    <p className="text-[#555] leading-relaxed mb-4">
                      Models were evaluated using four standard forecasting metrics. For the non-technical folks: 
                      lower is better for the first three, higher is better for R². For the technical folks: you already knew that, 
                      stop showing off.
                    </p>

                    <div className="grid sm:grid-cols-4 gap-3">
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <div className="font-bold text-primary">RMSE</div>
                        <div className="text-xs text-gray-600">Root Mean Squared Error</div>
                        <div className="text-xs text-gray-500 mt-1">Penalizes big mistakes heavily</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <div className="font-bold text-primary">MAE</div>
                        <div className="text-xs text-gray-600">Mean Absolute Error</div>
                        <div className="text-xs text-gray-500 mt-1">Average "oops" size</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <div className="font-bold text-primary">MAPE</div>
                        <div className="text-xs text-gray-600">Mean Absolute % Error</div>
                        <div className="text-xs text-gray-500 mt-1">Percentage-based oops</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3 text-center">
                        <div className="font-bold text-primary">R² Score</div>
                        <div className="text-xs text-gray-600">Coefficient of Determination</div>
                        <div className="text-xs text-gray-500 mt-1">How much variance explained</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-primary mb-2 text-lg sm:text-xl">
                      5.2 Impact of Feature Engineering Quality (Drumroll Please...)
                    </h3>

                    <ChartImage src={comparisonValuesUrl} title="Comparison Values" caption="Bad vs Good features: The gap is real and it's spectacular" />
                    <ChartImage src={comparisonPercentageUrl} title="Percentage Improvement" caption="Percentage improvements: LSTM is basically doing a happy dance" />

                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-400 rounded-r-lg p-4 mb-4">
                      <h4 className="font-bold text-green-800 mb-2">Critical Finding</h4>
                      <p className="text-sm text-green-800">
                        Good feature engineering improved <strong>every single model</strong> across <strong>all evaluation metrics</strong>. 
                        This universal improvement demonstrates that feature quality is foundational—no model architecture can compensate 
                        for poorly engineered inputs. You can't build a skyscraper on quicksand, and you can't build good predictions on bad features.
                      </p>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="p-3 text-left font-bold text-primary">Model</th>
                            <th className="p-3 text-center font-bold text-primary">RMSE Δ</th>
                            <th className="p-3 text-center font-bold text-primary">MAE Δ</th>
                            <th className="p-3 text-center font-bold text-primary">MAPE Δ</th>
                            <th className="p-3 text-center font-bold text-primary">R² Δ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {performanceData.map((row, idx) => (
                            <tr key={row.model} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="p-3 font-semibold">{row.model}</td>
                              <td className="p-3 text-center text-gray-600 font-medium">{row.rmse}</td>
                              <td className="p-3 text-center text-gray-600 font-medium">{row.mae}</td>
                              <td className="p-3 text-center text-gray-600 font-medium">{row.mape}</td>
                              <td className="p-3 text-center text-gray-600 font-medium">{row.r2}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                        <Brain className="w-5 h-5 text-purple-600 mt-0.5" />
                        <p className="text-[#555]">
                          <strong>LSTM most sensitive (22% improvement):</strong> Complex neural architectures benefit most from rich feature representations, 
                          as they can learn intricate patterns when sufficient information is provided. Give LSTM good data and it shines. 
                          Give it bad data and it sulks.
                        </p>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <BarChart3 className="w-5 h-5 text-blue-600 mt-0.5" />
                        <p className="text-[#555]">
                          <strong>Universal improvement:</strong> Even the relatively simple SARIMAX model improved by up to 10%, 
                          proving that feature quality matters regardless of model sophistication. Even old dogs learn new tricks with good treats.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-primary mb-2 text-lg sm:text-xl">
                      5.3 Best Model Performance (And The Winner Is...)
                    </h3>

                    <ChartImage src={comparisonValuesGoodUrl} title="Good Features Comparison" caption="With good features, everyone's a winner (but Prophet is the biggest winner)" />

                    <p className="text-[#555] leading-relaxed mb-4">
                      When all models use well-engineered features, <strong>Prophet achieved the best overall performance</strong>:
                    </p>

                    <div className="grid sm:grid-cols-4 gap-3 mb-4">
                      <div className="bg-orange-50 rounded-lg p-3 text-center border border-orange-200">
                        <div className="text-2xl font-bold text-orange-600">3,575</div>
                        <div className="text-xs text-orange-800">Lowest RMSE</div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3 text-center border border-orange-200">
                        <div className="text-2xl font-bold text-orange-600">2,700</div>
                        <div className="text-xs text-orange-800">Lowest MAE</div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3 text-center border border-orange-200">
                        <div className="text-2xl font-bold text-orange-600">9.9%</div>
                        <div className="text-xs text-orange-800">Lowest MAPE</div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3 text-center border border-orange-200">
                        <div className="text-2xl font-bold text-orange-600">0.83</div>
                        <div className="text-xs text-orange-800">Highest R²</div>
                      </div>
                    </div>

                    <ChartImage src={prophetActualPredictionUrl} title="Prophet Predictions" caption="Prophet's predictions vs actual: Tracking like a very attentive stalker" />

                    <p className="text-[#555] leading-relaxed">
                      The plot shows Prophet's predicted values closely tracking actual demand, demonstrating that with good features, 
                      even relatively accessible tools like Prophet can achieve strong performance. Sometimes the simple solution works, 
                      provided you don't feed it garbage.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-primary mb-2 text-lg sm:text-xl">
                      5.4 Why Time-Aware Segmentation Worked (The Science Bit)
                    </h3>

                    <p className="text-[#555] leading-relaxed mb-4">
                      The 6-segment approach preserved three critical information types that naive aggregation destroyed:
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                        <p className="text-[#555]">
                          <strong>Temporal alignment:</strong> Weather conditions matched to when rentals actually occur 
                          (dawn weather for morning commute, not overnight weather). Context matters, who knew?
                        </p>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <Cloud className="w-5 h-5 text-green-600 mt-0.5" />
                        <p className="text-[#555]">
                          <strong>Pattern variability:</strong> Intra-day weather changes captured (rainy morning vs sunny afternoon) 
                          rather than collapsed into single daily values. Because weather changes, apparently.
                        </p>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-purple-600 mt-0.5" />
                        <p className="text-[#555]">
                          <strong>Interaction effects:</strong> Models could learn that afternoon temperature affects afternoon demand 
                          differently than morning temperature affects morning demand. Different times, different behaviors. Mind blown.
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <h4 className="font-semibold text-amber-800 mb-2">Example: Rainy Day Scenario</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-bold text-red-700 mb-1">Bad Features:</div>
                          <p className="text-amber-900">Day marked as "rainy" (most frequent), median temp 15°C. Model learns: "Rainy days → low demand." Reality: Rain 12am-8am, sunny 8am-6pm (peak hours), rain 6pm-12am. Result: Model underpredicts because it assumes rain during peak.</p>
                        </div>
                        <div>
                          <div className="font-bold text-green-700 mb-1">Good Features:</div>
                          <p className="text-amber-900">Night/dawn/evening = rainy; morning/afternoon/dusk = clear, with segment-specific temps. Model learns: "Clear morning/afternoon with ~18°C → high demand regardless of night rain." Result: Accurate prediction.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Discussion */}
              <div id="discussion" className="bg-white rounded-2xl p-2 sm:p-2 lg:p-2 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                  6. Discussion: What We Learned (Besides "Features Matter")
                </h2>

                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-primary mb-2 text-lg sm:text-xl">
                      6.1 The Feature Engineering Principle (AKA "Garbage In, Garbage Out")
                    </h3>
                    
                    <p className="text-[#555] leading-relaxed mb-4">
                      This analysis demonstrates a fundamental machine learning principle: <strong>garbage in, garbage out</strong>. 
                      No model architecture—no matter how sophisticated—can extract signal that has been destroyed during feature engineering. 
                      You can't perform CPR on data that's already dead.
                    </p>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                      <p className="text-red-800">
                        The 22% improvement in LSTM performance demonstrates the primacy of feature engineering over model configuration. 
                        Even though both approaches received hyperparameter optimization, the feature quality difference alone drove the massive performance gap. 
                        This proves that <strong>hyperparameter tuning cannot compensate for poorly engineered features</strong>—if the information isn't in the features, 
                        the model cannot learn it regardless of configuration. You can't tune your way out of bad data.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <h3 className="font-semibold text-primary mb-2 text-lg sm:text-xl">
                      6.2 Implications for Practice (How To Not Mess This Up)
                    </h3>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-[#555]">
                          <strong>Before selecting models, invest in features:</strong> Spend more time understanding your data and engineering meaningful features 
                          than experimenting with exotic architectures. A simple model with good features will outperform a complex model with poor features. 
                          Fancy doesn't always mean better.
                        </p>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <p className="text-[#555]">
                          <strong>Domain knowledge matters:</strong> The time-of-day segmentation strategy required understanding when bike rentals occur 
                          and how weather timing affects decisions. Generic aggregation ignores this domain insight. Your intuition about the problem is a feature too.
                        </p>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                        <p className="text-[#555]">
                          <strong>Test feature quality directly:</strong> Rather than just comparing model architectures, explicitly test whether features 
                          preserve predictive information. Train a simple model on different feature sets to quantify information retention. 
                          Measure twice, cut once.
                        </p>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg">
                        <p className="text-[#555]">
                          <strong>Consider the data generation process:</strong> Good features align with how the target variable is actually generated. 
                          Bike rentals depend on weather at rental time, not weather averaged across irrelevant hours. Match your features to reality.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conclusion */}
              <div id="conclusion" className="bg-white rounded-2xl p-2 sm:p-2 lg:p-2 shadow-sm scroll-mt-24">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                  7. Conclusion
                </h2>

                <div className="space-y-2">
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">          
                  <ul className="bg-gray-50 rounded-lg p-4 text-[#555] space-y-2">
                        <li><strong>Feature engineering impacts all architectures:</strong> Improvements ranged from 5% (XGBoost) to 22% (LSTM), 
                      proving universality across statistical, machine learning, and deep learning approaches. Everyone benefits from good food.</li>
                        <li><strong>Information preservation is critical:</strong> Time-aware segmentation that preserved when weather conditions occurred 
                      relative to demand patterns enabled all models to learn meaningful relationships. Context isn't just nice to have, it's essential.</li>
                        <li><strong>Naive aggregation destroys predictive power:</strong> Collapsing hourly data into daily medians/modes eliminated temporal patterns 
                      essential for accurate forecasting. Don't throw away your data's best qualities.</li>
                        <li><strong>Domain knowledge enables good features:</strong> Understanding that rental decisions depend on current weather (not daily averages) 
                      guided the segmentation strategy that unlocked performance. Your brain is a feature engineering tool.</li>
                        <li><strong>Model selection is secondary:</strong> The gap between bad and good features within any model exceeded the gap between models using good features, 
                      suggesting practitioners should prioritize feature engineering over architecture selection. Don't put the cart before the horse.</li>
                      </ul>
                      </div>
                    </div>

                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6">
                  <h4 className="font-bold text-primary mb-2">Final Thought</h4>
                  <p className="text-[#555] italic">
                    "In the beginning was the data, and the data was without form, and void; and darkness was upon the face of the deep. 
                    And the data scientist said, Let there be features: and there was structure. And the scientist saw the features, that they were good."
                    — Data Science Bible, Chapter 1, Verse 1 (probably)
                  </p>
                </div>
              </div>

              {/* References */}
              <div id="notes" className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                  Notes and References (The "We Didn't Make This Up" Section)
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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