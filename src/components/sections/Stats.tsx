import { useEffect, useState, useRef } from 'react';
import { Building2, Users, BarChart3, Globe } from 'lucide-react';
import { useIntersectionObserver } from '@/utils/animations';

interface StatItem {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  { icon: Building2, value: 25, suffix: '+', label: 'Cities Analyzed' },
  { icon: Users, value: 1.2, suffix: 'M+', label: 'Passengers Impacted' },
  { icon: BarChart3, value: 35, suffix: '%', label: 'Avg. Service Improvement' },
  { icon: Globe, value: 12, suffix: '', label: 'Countries Worked' }
];

function AnimatedCounter({ 
  value, 
  suffix, 
  isVisible 
}: { 
  value: number; 
  suffix: string; 
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);
  const countRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const startTime = performance.now();
    const isDecimal = value % 1 !== 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function - ease out quart
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      const currentValue = easeOutQuart * value;
      countRef.current = currentValue;
      
      if (isDecimal) {
        setCount(parseFloat(currentValue.toFixed(1)));
      } else {
        setCount(Math.floor(currentValue));
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isVisible, value]);

  const displayValue = value % 1 !== 0 ? count.toFixed(1) : count;

  return (
    <span>
      {displayValue}{suffix}
    </span>
  );
}

export default function Stats() {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.3 });

  return (
    <section 
      id="stats" 
      className="py-20 md:py-28 gradient-primary relative overflow-hidden"
      ref={ref}
    >
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#3498db]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1 bg-white/10 text-white/80 rounded-full text-sm font-medium mb-4">
            Impact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Numbers That Speak
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Measurable results from transportation data projects across the globe
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            
            return (
              <div
                key={stat.label}
                className={`text-center p-6 md:p-8 bg-white/5 backdrop-blur-sm rounded-2xl hover:bg-white/10 transition-all duration-500 ${
                  hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-[#3498db]/20 rounded-xl mb-5">
                  <IconComponent className="w-7 h-7 text-[#3498db]" />
                </div>
                
                <div className="stat-number mb-2">
                  <AnimatedCounter 
                    value={stat.value} 
                    suffix={stat.suffix} 
                    isVisible={hasIntersected} 
                  />
                </div>
                
                <p className="text-white/70 text-sm md:text-base">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div 
          className={`text-center mt-16 transition-all duration-700 delay-500 ${
            hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-white/60 mb-4">
            Ready to transform your transportation network?
          </p>
          <a 
            href="#contact" 
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-white font-medium hover:text-[#3498db] transition-colors duration-300"
          >
            Let's work together
            <span className="text-xl">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
