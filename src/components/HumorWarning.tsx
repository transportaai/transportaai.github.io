import { useState } from 'react';
import { AlertCircle, Coffee, Brain, TrendingUp, Sparkles, X } from 'lucide-react';

/**
 * HumorWarning - A reusable, funny disclaimer component for data analysis blogs
 * 
 * Drop this into any case study or blog post to add self-deprecating humor
 * and set expectations about the content's tone.
 * 
 * Usage:
 * <HumorWarning variant="random" /> // Picks a random style each time
 * <HumorWarning variant="disclaimer" /> // Uses specific variant
 * <HumorWarning dismissible={true} /> // Can be closed
 */

export default function HumorWarning({ 
  variant = 'random',
  dismissible = false 
}: { 
  variant?: 'disclaimer' | 'academic' | 'therapist' | 'commitment' | 'random';
  dismissible?: boolean;
}) {
  const [isVisible, setIsVisible] = useState(true);

  const warnings = {
    disclaimer: {
      icon: AlertCircle,
      title: "⚠️ Content Warning: Excessive Sarcasm Ahead",
      gradient: "from-yellow-50 to-orange-50",
      borderColor: "border-yellow-400",
      textColor: "text-yellow-800",
      content: (
        <>
          <p className="text-sm leading-relaxed mb-2">
            This analysis contains traces of sarcasm, dad jokes, 
            and occasional questionable life choice. Side effects may include: uncontrollable 
            eye-rolling, sudden desire to fact-check everything.
          </p>
          <p className="text-xs italic">
            <strong>Disclaimer:</strong> All data is real. All insights are genuine. The jokes are just how I survive staring at data for far too long.
          </p>
        </>
      )
    },

    academic: {
      icon: Brain,
      title: "⚠️ Academic Disclosure (Sort Of)",
      gradient: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-400",
      textColor: "text-blue-800",
      content: (
        <>
          <p className="text-sm leading-relaxed mb-2">
            This document attempts to maintain academic rigor while simultaneously questioning every decision 
            that led to its creation. Think of it as a thesis defense, but the defense is mostly "I was curious 
            and things got out of hand."
          </p>
          <p className="text-xs">
            <strong>Methodology:</strong> Legitimate data analysis.{' '}
            <strong>Presentation style:</strong> Stand-up comedy meets TED Talk meets therapy session.{' '}
            <strong>Author's mental state:</strong> Questionable but functional.
          </p>
        </>
      )
    },

    therapist: {
      icon: Coffee,
      title: "⚠️ A Note From The Author's Inner Monologue",
      gradient: "from-purple-50 to-pink-50",
      borderColor: "border-purple-400",
      textColor: "text-purple-800",
      content: (
        <>
          <p className="text-sm leading-relaxed mb-2">
            You're about to read an analysis written by someone who thought "I'll just do a quick exploration" 
            and ended up three weeks deep in data. The analysis is solid. The commentary is how I process 
            the realization that this is what I do for fun now.
          </p>
          <p className="text-xs italic">
            If you're here for dry, formal analysis: this ain't it, chief. If you're here for data delivered 
            with the energy of someone who's had too much coffee and made it everyone else's problem: welcome home.
          </p>
        </>
      )
    },

    commitment: {
      icon: Sparkles,
      title: "⚠️ Before You Commit To This Journey",
      gradient: "from-green-50 to-emerald-50",
      borderColor: "border-green-400",
      textColor: "text-green-800",
      content: (
        <>
          <p className="text-sm leading-relaxed mb-2">
            Fair warning: this analysis is presented in a tone best described as "professionally unhinged." 
            The data is real, the insights are valid, and the delivery is... well, it's a choice. My choice. 
            A choice I'm making you live with now.
          </p>
          <p className="text-xs">
            <strong>What you'll get:</strong> Accurate analysis, useful insights, occasional existential commentary.{' '}
            <strong>What you won't get:</strong> Boring corporate jargon, unnecessarily complex sentences, 
            pretending I didn't spend my weekend doing this voluntarily.
          </p>
        </>
      )
    },

    random: {
      icon: TrendingUp,
      title: "⚠️ Random Humor Mode Activated",
      gradient: "from-amber-50 to-yellow-50",
      borderColor: "border-amber-400",
      textColor: "text-amber-800",
      content: (
        <>
          <p className="text-sm leading-relaxed mb-2">
            Plot twist: this disclaimer is a placeholder because the 'random' variant is supposed to pick 
            one of the other styles. But if you're seeing this, something went wrong and honestly? 
            That's very on-brand for this entire project.
          </p>
          <p className="text-xs italic">
            Anyway, expect humor, sarcasm, and data. Not necessarily in that order. Probably all at once.
          </p>
        </>
      )
    }
  };

  // If random, pick a random variant (excluding 'random' itself)
  const actualVariant = variant === 'random' 
    ? (['disclaimer', 'academic', 'therapist', 'commitment'] as const)[Math.floor(Math.random() * 4)]
    : variant;

  const warning = warnings[actualVariant];

  if (!isVisible) return null;

  return (
    <div className={`relative bg-gradient-to-r ${warning.gradient} border-l-4 ${warning.borderColor} rounded-r-xl p-2 mb-4 shadow-sm`}>
      {dismissible && (
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Dismiss warning"
        >
          <X className="w-5 h-5" />
        </button>
      )}
      
      <div className="flex items-start gap-2">
        <div className="flex-1">
          <h3 className={`font-semibold ${warning.textColor} mb-2 text-sm`}>
            {warning.title}
          </h3>
          <div className={warning.textColor}>
            {warning.content}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// ALTERNATIVE: Minimal Version (Less Verbose)
// ============================================

export function HumorWarningMinimal() {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg p-4 mb-8">
      <div className="flex items-center gap-3">
        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
        <div className="text-sm text-yellow-800">
          <strong>Heads up:</strong> This analysis is factually accurate but tonally... a choice. 
          Expect data with a side of sarcasm. You've been warned. ☕
        </div>
      </div>
    </div>
  );
}

// ============================================
// ALTERNATIVE: Expandable Version
// ============================================

export function HumorWarningExpandable() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-l-4 border-purple-400 rounded-r-lg p-5 mb-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left flex items-start gap-3 group"
      >
        <Coffee className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-purple-800 text-sm">
              ⚠️ Content Style Warning
            </h3>
            <span className="text-xs text-purple-600 group-hover:text-purple-800">
              {isExpanded ? 'Hide' : 'Read'} →
            </span>
          </div>
          
          {!isExpanded && (
            <p className="text-xs text-purple-700 mt-1">
              This analysis contains humor. Click to learn what you're getting into.
            </p>
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="mt-3 pl-8 text-sm text-purple-800 space-y-2">
          <p>
            You're about to read data analysis written by someone who copes with spreadsheets through sarcasm. 
            The data is real, the insights are valid, the delivery is... personality-forward.
          </p>
          <p className="text-xs italic">
            <strong>Translation:</strong> Expect legitimate analysis presented like a stand-up routine. 
            It's informative! It's accurate! It's also kinda funny! We contain multitudes!
          </p>
        </div>
      )}
    </div>
  );
}

// ============================================
// ALTERNATIVE: Rotating Quotes Version
// ============================================

export function HumorWarningQuote() {
  const quotes = [
    {
      text: "I spent way too long on this analysis and now you have to deal with my personality.",
      author: "The Author"
    },
    {
      text: "Data analysis: because apparently 'normal hobbies' weren't complicated enough.",
      author: "Also The Author"
    },
    {
      text: "The numbers don't lie, but the commentary is subjective and caffeinated.",
      author: "Still The Author"
    },
    {
      text: "This could have been a boring report. I chose chaos instead. You're welcome.",
      author: "Yeah, Me Again"
    }
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-400 rounded-r-lg p-6 mb-8">
      <blockquote className="text-sm italic text-blue-800">
        "{randomQuote.text}"
        <footer className="text-xs text-blue-600 mt-2 not-italic">
          — {randomQuote.author}
        </footer>
      </blockquote>
    </div>
  );
}

// ============================================
// ALTERNATIVE: Interactive Checkbox Version
// ============================================

export function HumorWarningCheckbox() {
  const [hasAgreed, setHasAgreed] = useState(false);

  return (
    <div className={`border-l-4 rounded-r-lg p-5 mb-8 transition-all ${
      hasAgreed 
        ? 'bg-green-50 border-green-400' 
        : 'bg-yellow-50 border-yellow-400'
    }`}>
      <div className="flex items-start gap-4">
        <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-1 ${
          hasAgreed ? 'text-green-600' : 'text-yellow-600'
        }`} />
        
        <div className="flex-1">
          <h3 className={`font-bold mb-2 ${
            hasAgreed ? 'text-green-800' : 'text-yellow-800'
          }`}>
            Before You Proceed...
          </h3>
          
          <p className={`text-sm mb-3 ${
            hasAgreed ? 'text-green-700' : 'text-yellow-800'
          }`}>
            This analysis is delivered with humor and personality. The data is serious, 
            the presentation is... less so.
          </p>

          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={hasAgreed}
              onChange={(e) => setHasAgreed(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className={`text-sm ${
              hasAgreed 
                ? 'text-green-700 font-medium' 
                : 'text-yellow-700 group-hover:text-yellow-900'
            }`}>
              {hasAgreed 
                ? "✓ I'm ready for data with personality" 
                : "I understand this won't be boring corporate speak"}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
