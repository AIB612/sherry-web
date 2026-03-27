'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Digital Maturity Assessment Framework
const assessmentCategories = [
  {
    id: 'strategy',
    title: 'Strategy & Leadership',
    description: 'Digital vision, leadership commitment, and strategic alignment',
    questions: [
      {
        id: 's1',
        text: 'Does your company have a clear digital transformation strategy?',
        options: [
          { value: 1, label: 'No formal strategy' },
          { value: 2, label: 'Basic awareness, no formal plan' },
          { value: 3, label: 'Strategy exists but not widely communicated' },
          { value: 4, label: 'Well-defined strategy with some implementation' },
          { value: 5, label: 'Fully integrated into business strategy' }
        ]
      },
      {
        id: 's2',
        text: 'How committed is leadership to digital transformation?',
        options: [
          { value: 1, label: 'No visible commitment' },
          { value: 2, label: 'Limited interest from few leaders' },
          { value: 3, label: 'Moderate commitment, some initiatives' },
          { value: 4, label: 'Strong commitment with dedicated resources' },
          { value: 5, label: 'Leadership drives digital culture' }
        ]
      },
      {
        id: 's3',
        text: 'Is digital transformation aligned with business goals?',
        options: [
          { value: 1, label: 'No alignment' },
          { value: 2, label: 'Minimal connection to business goals' },
          { value: 3, label: 'Some alignment in specific areas' },
          { value: 4, label: 'Mostly aligned across departments' },
          { value: 5, label: 'Fully integrated with all business objectives' }
        ]
      }
    ]
  },
  {
    id: 'technology',
    title: 'Technology & Infra',
    description: 'IT systems, cloud adoption, data management, and cybersecurity',
    questions: [
      {
        id: 't1',
        text: 'How mature is your cloud adoption?',
        options: [
          { value: 1, label: 'No cloud usage' },
          { value: 2, label: 'Basic cloud services (email, storage)' },
          { value: 3, label: 'Some applications migrated to cloud' },
          { value: 4, label: 'Hybrid cloud environment established' },
          { value: 5, label: 'Cloud-native architecture with multi-cloud strategy' }
        ]
      },
      {
        id: 't2',
        text: 'How effective is your data management?',
        options: [
          { value: 1, label: 'Data silos, no central management' },
          { value: 2, label: 'Basic data collection, limited analysis' },
          { value: 3, label: 'Some data integration, basic analytics' },
          { value: 4, label: 'Data lake/warehouse, advanced analytics' },
          { value: 5, label: 'Real-time data insights driving decisions' }
        ]
      },
      {
        id: 't3',
        text: 'What is your cybersecurity maturity level?',
        options: [
          { value: 1, label: 'No formal security measures' },
          { value: 2, label: 'Basic antivirus/firewall protection' },
          { value: 3, label: 'Regular security assessments' },
          { value: 4, label: 'Advanced threat detection and response' },
          { value: 5, label: 'Proactive security with AI/ML protection' }
        ]
      }
    ]
  },
  {
    id: 'process',
    title: 'Process & Operations',
    description: 'Digital workflows, automation, and operational efficiency',
    questions: [
      {
        id: 'p1',
        text: 'How automated are your core business processes?',
        options: [
          { value: 1, label: 'Manual processes only' },
          { value: 2, label: 'Basic automation in few areas' },
          { value: 3, label: 'Moderate automation across departments' },
          { value: 4, label: 'Extensive automation with some AI integration' },
          { value: 5, label: 'Fully automated, AI-driven operations' }
        ]
      },
      {
        id: 'p2',
        text: 'How digital are your customer interactions?',
        options: [
          { value: 1, label: 'Traditional (phone, in-person only)' },
          { value: 2, label: 'Basic website/email communication' },
          { value: 3, label: 'Multiple digital channels available' },
          { value: 4, label: 'Omnichannel experience with personalization' },
          { value: 5, label: 'AI-powered predictive customer service' }
        ]
      },
      {
        id: 'p3',
        text: 'How agile are your development processes?',
        options: [
          { value: 1, label: 'Waterfall methodology only' },
          { value: 2, label: 'Some agile practices in IT' },
          { value: 3, label: 'Agile adopted in most projects' },
          { value: 4, label: 'DevOps/CI-CD implemented' },
          { value: 5, label: 'Full agile transformation across organization' }
        ]
      }
    ]
  },
  {
    id: 'people',
    title: 'People & Culture',
    description: 'Digital skills, training, and organizational culture',
    questions: [
      {
        id: 'pe1',
        text: 'How developed are digital skills in your workforce?',
        options: [
          { value: 1, label: 'Limited digital literacy' },
          { value: 2, label: 'Basic skills in specific roles' },
          { value: 3, label: 'Moderate skills across departments' },
          { value: 4, label: 'Advanced skills with continuous training' },
          { value: 5, label: 'Digital-native workforce with innovation mindset' }
        ]
      },
      {
        id: 'pe2',
        text: 'How supportive is your organizational culture for innovation?',
        options: [
          { value: 1, label: 'Resistant to change' },
          { value: 2, label: 'Some openness to new ideas' },
          { value: 3, label: 'Moderate innovation culture' },
          { value: 4, label: 'Strong innovation support' },
          { value: 5, label: 'Culture of continuous innovation and experimentation' }
        ]
      },
      {
        id: 'pe3',
        text: 'How effective is your digital training program?',
        options: [
          { value: 1, label: 'No formal training' },
          { value: 2, label: 'Occasional workshops' },
          { value: 3, label: 'Regular training sessions' },
          { value: 4, label: 'Comprehensive digital upskilling program' },
          { value: 5, label: 'Continuous learning with personalized development paths' }
        ]
      }
    ]
  },
  {
    id: 'product-ux',
    title: 'Product & UX',
    description: 'Product-Market Fit, UX measurement (HEART/NPS), and customer-centricity',
    questions: [
      {
        id: 'ux1',
        text: 'How does your company develop and validate digital products?',
        options: [
          { value: 1, label: 'Feature-factory without clear user feedback' },
          { value: 2, label: 'Basic MVP testing but limited iteration' },
          { value: 3, label: 'Data-informed development with clear KPIs' },
          { value: 4, label: 'Continuous product discovery and agile testing' },
          { value: 5, label: 'Strong focus on PMF with continuous market validation' }
        ]
      },
      {
        id: 'ux2',
        text: 'How do you measure User Experience (UX) success?',
        options: [
          { value: 1, label: 'No formal UX measurement' },
          { value: 2, label: 'Basic analytics (page views, clicks)' },
          { value: 3, label: 'Tracking usability metrics (e.g., PULSE model)' },
          { value: 4, label: 'Behavior + Attitude metrics (HEART, NPS, CES)' },
          { value: 5, label: 'Predictive real-time UX analytics driving all decisions' }
        ]
      },
      {
        id: 'ux3',
        text: 'How is user feedback integrated into the development cycle?',
        options: [
          { value: 1, label: 'Feedback collected only through complaints' },
          { value: 2, label: 'Occasional surveys or support ticket analysis' },
          { value: 3, label: 'Regular user interviews and structured feedback loops' },
          { value: 4, label: 'Cross-functional teams actively participate in user research' },
          { value: 5, label: 'Deep customer-centric culture; empathy drives every feature' }
        ]
      }
    ]
  }
];

// Flat list of all questions for the card flow
const allQuestions = assessmentCategories.flatMap(cat => 
  cat.questions.map(q => ({ ...q, categoryId: cat.id, categoryTitle: cat.title }))
);

const maturityLevels = [
  { min: 0, max: 15, level: 'Initial', description: 'Ad-hoc processes, limited digital awareness' },
  { min: 16, max: 30, level: 'Developing', description: 'Basic digital capabilities, some initiatives' },
  { min: 31, max: 45, level: 'Defined', description: 'Structured approach, moderate maturity' },
  { min: 46, max: 60, level: 'Managed', description: 'Measured processes, good maturity' },
  { min: 61, max: 75, level: 'Optimizing', description: 'Continuous improvement, digital leader' }
];

// SVG Radar Chart Component
function RadarChart({ scores, isGlobalView = false }: { scores: number[], isGlobalView?: boolean }) {
  const size = isGlobalView ? 400 : 300;
  const center = size / 2;
  const radius = (size / 2) - 80; // Increased padding inside SVG to make room for labels
  const labels = assessmentCategories.map(c => c.title);

  const getPoint = (value: number, index: number, total: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const distance = radius * (value / 15); // max score per category is 15 (3 questions * 5 points)
    return {
      x: center + distance * Math.cos(angle),
      y: center + distance * Math.sin(angle)
    };
  };

  // Generate grid pentagons
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1];
  
  // Calculate current score polygon
  const scorePolygon = scores.map((score, i) => {
    const pt = getPoint(score, i, 5);
    return `${pt.x},${pt.y}`;
  }).join(' ');

  return (
    <div className="relative flex justify-center items-center overflow-visible px-10">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible" style={{ overflow: "visible" }}>
        {/* Draw Grid */}
        {gridLevels.map((level, i) => {
          const points = Array.from({ length: 5 }).map((_, idx) => {
            const pt = getPoint(15 * level, idx, 5);
            return `${pt.x},${pt.y}`;
          }).join(' ');
          return (
            <polygon 
              key={i} 
              points={points} 
              fill="none" 
              stroke="#e5e5e5" 
              strokeWidth="1" 
              strokeDasharray={i % 2 === 0 ? "4 4" : "none"}
            />
          );
        })}

        {/* Draw Axes */}
        {Array.from({ length: 5 }).map((_, idx) => {
          const endPt = getPoint(15, idx, 5);
          return (
            <line 
              key={idx} 
              x1={center} y1={center} 
              x2={endPt.x} y2={endPt.y} 
              stroke="#e5e5e5" strokeWidth="1" 
            />
          );
        })}

        {/* Draw Score Polygon */}
        {scores.some(s => s > 0) && (
          <motion.polygon
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            points={scorePolygon}
            fill="rgba(0, 0, 0, 0.1)"
            stroke="#000"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        )}

        {/* Draw Score Dots */}
        {scores.map((score, idx) => {
          if (score === 0) return null;
          const pt = getPoint(score, idx, 5);
          return (
            <motion.circle
              key={idx}
              initial={{ r: 0 }}
              animate={{ r: 4 }}
              transition={{ delay: 0.2 }}
              cx={pt.x} cy={pt.y}
              fill="#000"
            />
          );
        })}

        {/* Draw Labels with Scores */}
        {labels.map((label, idx) => {
          // Calculate the point for the label text
          const pt = getPoint(22, idx, 5); 
          
          // Custom text anchor and alignment logic to prevent cutoff
          let textAnchor = "middle";
          let xOffset = 0;
          
          if (pt.x < center - 20) {
            textAnchor = "end";
            xOffset = -10; // Push further left outside the point
          } else if (pt.x > center + 20) {
            textAnchor = "start";
            xOffset = 10; // Push further right outside the point
          }

          // Calculate current score (0 for global view)
          const currentScore = scores[idx] || 0;
          const maxScore = 15;

          return (
            <g key={idx}>
              <text
                x={pt.x + xOffset}
                y={pt.y + (pt.y > center ? 15 : -12)} // Adjusted vertical padding
                textAnchor={textAnchor}
                className={`font-sans font-bold tracking-widest fill-black uppercase ${isGlobalView ? 'text-[11px] md:text-xs' : 'text-[9px] md:text-[10px]'}`}
              >
                {label}
              </text>
              {/* Add Score Label */}
              <text
                x={pt.x + xOffset}
                y={pt.y + (pt.y > center ? 28 : 0)} // Position below the main label
                textAnchor={textAnchor}
                className={`font-mono tracking-widest ${currentScore > 0 ? 'fill-black font-semibold' : 'fill-neutral-400'} ${isGlobalView ? 'text-[9px] md:text-[10px]' : 'text-[8px] md:text-[9px]'}`}
              >
                {currentScore} / {maxScore}
              </text>
            </g>
          );
        })}
      </svg>
      
      {/* Center Empty State Text */}
      {!scores.some(s => s > 0) && isGlobalView && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-neutral-300 font-medium text-sm">Discover your shape</span>
        </div>
      )}
    </div>
  );
}

export default function DigitalToolPage() {
  const [step, setStep] = useState<'intro' | 'assessment' | 'results'>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const handleAnswer = (questionId: string, value: number) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    // Wait a brief moment before advancing to show the selected state
    setTimeout(() => {
      if (currentIndex < allQuestions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setStep('results');
      }
    }, 400);
  };

  // Calculate current radar scores
  const categoryScores = useMemo(() => {
    return assessmentCategories.map(cat => {
      return cat.questions.reduce((sum, q) => {
        return sum + (answers[q.id] || 0);
      }, 0);
    });
  }, [answers]);

  const calculateFinalResults = () => {
    const totalScore = categoryScores.reduce((a, b) => a + b, 0);
    const maxTotalScore = allQuestions.length * 5;
    const overallPercentage = Math.round((totalScore / maxTotalScore) * 100);
    
    const maturityLevel = maturityLevels.find(level => 
      totalScore >= level.min && totalScore <= level.max
    ) || maturityLevels[0]!;

    return { totalScore, maxTotalScore, overallPercentage, maturityLevel };
  };

  const currentQuestion = allQuestions[currentIndex];
  const progressPercentage = (Object.keys(answers).length / allQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-white flex flex-col font-serif">
      {/* Top Progress Bar for Assessment Step */}
      {step === 'assessment' && (
        <div className="fixed top-0 left-0 w-full h-1 bg-neutral-100 z-50">
          <motion.div 
            className="h-full bg-black" 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
          />
        </div>
      )}

      <div className="flex-grow flex items-center justify-center px-5 py-12 md:px-8 lg:px-20 bg-white">
        
        {/* STEP 1: INTRO (GLOBAL VIEW) */}
        {step === 'intro' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl w-full text-center flex flex-col items-center justify-center min-h-[70vh]"
          >
            <div className="space-y-4 mb-4">
              <p className="text-[10px] tracking-[0.35em] text-neutral-500 font-medium uppercase font-sans">
                Interactive Assessment
              </p>
              <h1 className="text-[1.75rem] sm:text-[2.4rem] md:text-[3.2rem] font-bold tracking-[-0.03em] leading-[1.1] text-black">
                Enterprise Digital Shape
              </h1>
              <p className="text-sm md:text-base text-neutral-500 max-w-2xl mx-auto leading-relaxed font-sans">
                Discover your organization's maturity across Strategy, Technology, Process, People, and UX. 
                Based on academic research and industry case studies.
              </p>
            </div>

            <div className="py-0 flex justify-center w-full mt-[-20px] mb-[-10px] overflow-visible">
              <div className="scale-[0.65] md:scale-[0.85] transform origin-center overflow-visible">
                <RadarChart scores={[0,0,0,0,0]} isGlobalView={true} />
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={() => setStep('assessment')}
                className="px-8 py-3.5 bg-black text-white rounded-full text-[11px] font-medium tracking-[0.1em] uppercase hover:bg-neutral-800 transition-transform duration-300 hover:scale-105 font-sans"
              >
                Start Assessment
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: ASSESSMENT (INTERACTIVE CARDS + RADAR) */}
        {step === 'assessment' && currentQuestion && (
          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Left Side: Real-time Radar */}
            <div className="hidden lg:flex flex-col items-center justify-center p-8 bg-neutral-50/50 rounded-sm border border-neutral-100 h-[480px] w-full overflow-visible">
              <h3 className="text-[10px] tracking-[0.25em] font-medium mb-12 text-neutral-400 uppercase font-sans">Live Shape</h3>
              <div className="scale-90 transform origin-center overflow-visible">
                <RadarChart scores={categoryScores} />
              </div>
            </div>

            {/* Right Side: Interactive Cards */}
            <div className="relative h-[480px] w-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion.id}
                  initial={{ opacity: 0, x: 40, rotate: 1 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  exit={{ opacity: 0, x: -40, rotate: -1 }}
                  transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                  className="absolute inset-0 bg-white shadow-xl p-8 md:p-12 border border-neutral-100 flex flex-col rounded-sm"
                >
                  <div className="text-[10px] tracking-[0.25em] font-medium text-neutral-400 uppercase mb-6 font-sans">
                    {currentQuestion.categoryTitle} <span className="mx-2 opacity-50">•</span> {currentIndex + 1} / {allQuestions.length}
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold mb-6 text-black leading-[1.3] tracking-[-0.02em]">
                    {currentQuestion.text}
                  </h2>
                  
                  <div className="space-y-3 flex-grow overflow-y-auto pr-2 pb-4">
                    {currentQuestion.options.map((option) => {
                      const isSelected = answers[currentQuestion.id] === option.value;
                      return (
                        <button
                          key={option.value}
                          onClick={() => handleAnswer(currentQuestion.id, option.value)}
                          className={`w-full text-left p-4 md:p-5 rounded-sm border transition-all duration-300 flex items-center gap-5 group font-sans ${
                            isSelected 
                              ? 'border-black bg-black text-white' 
                              : 'border-neutral-200 bg-white hover:border-black text-neutral-600'
                          }`}
                        >
                          <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold tracking-widest transition-colors duration-300 ${
                            isSelected ? 'bg-white text-black' : 'bg-neutral-100 text-neutral-400 group-hover:bg-black group-hover:text-white'
                          }`}>
                            {option.value}
                          </div>
                          <span className="text-sm font-medium leading-snug">{option.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* STEP 3: RESULTS */}
        {step === 'results' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className="max-w-5xl w-full bg-white shadow-2xl border border-neutral-100 rounded-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Radar Result */}
              <div className="lg:col-span-2 p-12 bg-neutral-50/50 flex flex-col items-center justify-center border-r border-neutral-100 overflow-visible">
                <p className="text-[10px] tracking-[0.3em] font-medium text-neutral-400 uppercase mb-8 font-sans">Digital Profile</p>
                <div className="scale-75 md:scale-90 transform origin-center overflow-visible">
                  <RadarChart scores={categoryScores} />
                </div>
              </div>

              {/* Score & Insights */}
              <div className="lg:col-span-3 p-10 md:p-14 flex flex-col justify-center">
                {(() => {
                  const { totalScore, maxTotalScore, overallPercentage, maturityLevel } = calculateFinalResults();
                  
                  // Calculate dynamic strengths and weaknesses
                  const categoryPerformance = assessmentCategories.map((cat, idx) => ({
                    title: cat.title,
                    score: categoryScores[idx] || 0,
                    percentage: Math.round(((categoryScores[idx] || 0) / 15) * 100)
                  }));
                  
                  categoryPerformance.sort((a, b) => b.score - a.score);
                  const strongest = categoryPerformance[0] || { title: 'N/A', score: 0, percentage: 0 };
                  const weakest = categoryPerformance[categoryPerformance.length - 1] || { title: 'N/A', score: 0, percentage: 0 };

                  return (
                    <div className="space-y-10">
                      <div className="flex justify-between items-end border-b border-neutral-100 pb-8">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <p className="text-[10px] text-neutral-400 uppercase tracking-[0.3em] font-semibold font-sans">Digital Maturity Index</p>
                            <span className="text-[9px] px-2 py-0.5 bg-neutral-100 text-neutral-500 rounded-sm font-sans tracking-widest uppercase">DMI</span>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-6xl font-bold tracking-[-0.03em] text-black">{overallPercentage}</span>
                            <span className="text-xl text-neutral-300 font-medium font-sans">/ 100</span>
                          </div>
                          <div className="mt-2 text-xs font-sans text-neutral-500 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-neutral-300"></div>
                            Industry Average: 58
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="inline-block px-5 py-2.5 bg-black text-white rounded-full text-[11px] tracking-[0.1em] font-medium uppercase font-sans">
                            {maturityLevel.level}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <h3 className="text-[1.5rem] md:text-[2rem] font-bold tracking-[-0.03em] text-black">Strategic Recommendations</h3>
                        <p className="text-neutral-600 text-sm leading-relaxed font-sans">
                          {maturityLevel.description}. 
                          {maturityLevel.level === 'Initial' && ' Start by establishing a basic digital strategy, mapping your core user journeys, and setting up initial UX metrics.'}
                          {maturityLevel.level === 'Developing' && ' Focus on cloud migration, breaking down data silos, and starting to track active user engagement (NPS).'}
                          {maturityLevel.level === 'Defined' && ' Time to scale agile methodologies, implement automated CI/CD pipelines, and use HEART metrics for UX tracking.'}
                          {maturityLevel.level === 'Managed' && ' Leverage AI for process automation and integrate predictive UX analytics into your cross-functional product teams.'}
                          {maturityLevel.level === 'Optimizing' && ' You are a digital leader. Focus on creating entirely new value spaces and thought leadership in your industry.'}
                        </p>

                        <div className="mt-8 space-y-4">
                          <h4 className="text-[11px] font-bold tracking-[0.1em] uppercase text-black font-sans mb-3">Your Digital Profile Analysis</h4>
                          
                          <div className="bg-white border border-neutral-200 rounded-sm p-5 space-y-4">
                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-black font-sans flex items-center gap-2">
                                  <span>🌟</span> Core Strength
                                </span>
                                <span className="text-sm font-bold text-black font-sans">{strongest.title} <span className="text-neutral-400 font-normal">({strongest.percentage}%)</span></span>
                              </div>
                              <div className="w-full bg-neutral-100 rounded-full h-1.5">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${strongest.percentage}%` }}
                                  transition={{ duration: 1, delay: 0.5 }}
                                  className="bg-black h-1.5 rounded-full" 
                                />
                              </div>
                            </div>
                            
                            <div className="pt-2">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-black font-sans flex items-center gap-2">
                                  <span>⚠️</span> Critical Gap
                                </span>
                                <span className="text-sm font-bold text-black font-sans">{weakest.title} <span className="text-neutral-400 font-normal">({weakest.percentage}%)</span></span>
                              </div>
                              <div className="w-full bg-neutral-100 rounded-full h-1.5">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${weakest.percentage}%` }}
                                  transition={{ duration: 1, delay: 0.7 }}
                                  className="bg-neutral-400 h-1.5 rounded-full" 
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-neutral-50 border border-neutral-200 rounded-sm p-6 mt-6">
                          <h4 className="text-[11px] font-bold tracking-[0.1em] uppercase text-black mb-3 font-sans">Product & UX Philosophy</h4>
                          <p className="text-neutral-600 text-sm leading-relaxed font-sans">
                            True <b className="font-serif text-black">Product-Market Fit (PMF)</b> requires moving beyond basic PULSE metrics. By implementing the <b className="font-serif text-black">HEART</b> framework and measuring <b className="font-serif text-black">NPS/CES</b>, you ensure your digital transformation actually delivers value to the end-user.
                          </p>
                        </div>
                      </div>

                      <div className="pt-6">
                        <button
                          onClick={() => {
                            setAnswers({});
                            setCurrentIndex(0);
                            setStep('intro');
                          }}
                          className="text-[11px] tracking-[0.1em] font-medium px-6 py-3 border border-neutral-300 text-black hover:bg-neutral-50 uppercase rounded-full transition-colors duration-300 font-sans"
                        >
                          Retake Assessment
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}