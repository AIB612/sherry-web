'use client';

import { motion } from 'framer-motion';

// Build-Measure-Learn Loop
export function BMLoopChart() {
  const steps = [
    { label: 'BUILD', sub: 'Hypothesis', color: '#000', x: 150, y: 30 },
    { label: 'MEASURE', sub: 'Data', color: '#404040', x: 260, y: 200 },
    { label: 'LEARN', sub: 'Insights', color: '#737373', x: 40, y: 200 },
  ];
  return (
    <div className="my-6 ml-5">
      <svg width="320" height="260" viewBox="0 0 320 260">
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#a3a3a3" />
          </marker>
        </defs>
        <motion.path d="M 190 55 Q 260 80 255 170" fill="none" stroke="#d4d4d4" strokeWidth="2" markerEnd="url(#arrow)"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.2 }} />
        <motion.path d="M 230 220 Q 160 250 80 220" fill="none" stroke="#d4d4d4" strokeWidth="2" markerEnd="url(#arrow)"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.5 }} />
        <motion.path d="M 55 175 Q 40 100 130 45" fill="none" stroke="#d4d4d4" strokeWidth="2" markerEnd="url(#arrow)"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.8 }} />
        {steps.map((s, i) => (
          <motion.g key={i} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: i * 0.2 }}>
            <circle cx={s.x} cy={s.y + 15} r="32" fill="white" stroke={s.color} strokeWidth="2" />
            <text x={s.x} y={s.y + 12} textAnchor="middle" fontSize="10" fontWeight="bold" fill={s.color}>{s.label}</text>
            <text x={s.x} y={s.y + 24} textAnchor="middle" fontSize="9" fill="#a3a3a3">{s.sub}</text>
          </motion.g>
        ))}
        <text x="160" y="140" textAnchor="middle" fontSize="11" fill="#d4d4d4" fontWeight="bold">LOOP</text>
      </svg>
    </div>
  );
}

// PMF Sean Ellis Bar Chart
export function PMFChart() {
  const data = [
    { label: 'Very\ndisappointed', pct: 45, color: '#000' },
    { label: 'Somewhat\ndisappointed', pct: 30, color: '#525252' },
    { label: 'Not\ndisappointed', pct: 25, color: '#d4d4d4' },
  ];
  const maxH = 120;
  return (
    <div className="my-6 ml-5">
      <p className="text-[10px] tracking-[0.2em] text-neutral-400 mb-3">SEAN ELLIS TEST — EXAMPLE RESULT</p>
      <div className="flex items-end gap-6">
        {data.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <span className="text-xs font-bold" style={{ color: d.color }}>{d.pct}%</span>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: (d.pct / 100) * maxH }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="w-12 rounded-t-md"
              style={{ backgroundColor: d.color }}
            />
            <span className="text-[10px] text-neutral-400 text-center whitespace-pre-line leading-tight">{d.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <div className="inline-block border border-dashed border-green-300 bg-green-50 rounded-md px-3 py-1.5 text-[10px] text-green-700">
          ✓ 45% &gt; 40% threshold → PMF achieved
        </div>
      </div>
    </div>
  );
}

// Retention Curve
export function RetentionChart() {
  const withPMF = [100, 72, 58, 50, 46, 43, 41, 40, 39, 38];
  const noPMF = [100, 55, 32, 18, 10, 6, 3, 2, 1, 0];
  const w = 300, h = 140, px = 30, py = 10;
  const toX = (i: number) => px + (i / 9) * (w - px * 2);
  const toY = (v: number) => py + ((100 - v) / 100) * (h - py * 2);
  const pathD = (data: number[]) => data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(v)}`).join(' ');

  return (
    <div className="my-6 ml-5">
      <p className="text-[10px] tracking-[0.2em] text-neutral-400 mb-3">RETENTION CURVE COMPARISON</p>
      <svg width={w} height={h + 30} viewBox={`0 0 ${w} ${h + 30}`}>
        {[0, 25, 50, 75, 100].map(v => (
          <g key={v}>
            <line x1={px} y1={toY(v)} x2={w - px} y2={toY(v)} stroke="#f5f5f5" strokeWidth="1" />
            <text x={px - 5} y={toY(v) + 3} textAnchor="end" fontSize="8" fill="#d4d4d4">{v}%</text>
          </g>
        ))}
        <motion.path d={pathD(noPMF)} fill="none" stroke="#d4d4d4" strokeWidth="2" strokeDasharray="4 4"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
        <motion.path d={pathD(withPMF)} fill="none" stroke="#000" strokeWidth="2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.3 }} />
        <text x={w - px + 5} y={toY(38)} fontSize="9" fill="#000" fontWeight="bold">PMF ✓</text>
        <text x={w - px + 5} y={toY(0)} fontSize="9" fill="#d4d4d4">No PMF</text>
        {[0, 3, 6, 9].map(i => (
          <text key={i} x={toX(i)} y={h + 20} textAnchor="middle" fontSize="8" fill="#a3a3a3">D{i * 3}</text>
        ))}
      </svg>
    </div>
  );
}

// Product Lifecycle Phases
export function LifecycleChart() {
  const phases = [
    { label: 'Discovery', h: 25, color: '#e5e5e5' },
    { label: 'Definition', h: 40, color: '#d4d4d4' },
    { label: 'Development', h: 60, color: '#a3a3a3' },
    { label: 'Growth', h: 100, color: '#525252' },
    { label: 'Maturity', h: 85, color: '#262626' },
    { label: 'Decline', h: 45, color: '#737373' },
  ];
  return (
    <div className="my-6 ml-5">
      <p className="text-[10px] tracking-[0.2em] text-neutral-400 mb-3">PRODUCT LIFECYCLE CURVE</p>
      <div className="flex items-end gap-3">
        {phases.map((p, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: p.h }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="w-10 rounded-t-md"
              style={{ backgroundColor: p.color }}
            />
            <span className="text-[9px] text-neutral-400 text-center leading-tight">{p.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// AARRR Funnel
export function AARRRFunnel() {
  const steps = [
    { label: 'Acquisition', desc: 'Users find you', pct: 100, color: '#000' },
    { label: 'Activation', desc: 'Great first experience', pct: 65, color: '#262626' },
    { label: 'Retention', desc: 'Users come back', pct: 40, color: '#525252' },
    { label: 'Revenue', desc: 'Users pay', pct: 20, color: '#737373' },
    { label: 'Referral', desc: 'Users tell others', pct: 12, color: '#a3a3a3' },
  ];
  return (
    <div className="my-6 ml-5">
      <p className="text-[10px] tracking-[0.2em] text-neutral-400 mb-3">AARRR PIRATE FUNNEL</p>
      <div className="space-y-1.5 max-w-sm">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: `${s.pct}%`, opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="rounded-md px-3 py-2 flex items-center justify-between"
            style={{ backgroundColor: s.color, minWidth: 80 }}
          >
            <span className="text-[10px] font-bold text-white">{s.label}</span>
            <span className="text-[9px] text-white/70">{s.pct}%</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// OKR Structure
export function OKRChart() {
  return (
    <div className="my-6 ml-5">
      <p className="text-[10px] tracking-[0.2em] text-neutral-400 mb-3">OKR STRUCTURE EXAMPLE</p>
      <div className="border border-neutral-200 rounded-xl p-4 max-w-sm">
        <div className="bg-black text-white rounded-lg px-4 py-2.5 text-xs font-bold mb-3">
          O: Become #1 choice for SME e-commerce
        </div>
        <div className="space-y-2 ml-4">
          {[
            { kr: 'KR1', text: 'NPS 40 → 60', pct: 75 },
            { kr: 'KR2', text: 'MAU → 10,000', pct: 55 },
            { kr: 'KR3', text: 'Churn 5% → 2%', pct: 40 },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.15 }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono text-neutral-400">{item.kr}</span>
                <span className="text-xs text-neutral-700">{item.text}</span>
              </div>
              <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.pct}%` }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
                  className="h-full bg-black rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-3 text-center">
          <span className="text-[10px] text-neutral-400">Target: 70% = Success</span>
        </div>
      </div>
    </div>
  );
}

// User Journey Stages Chart
export function JourneyStagesChart() {
  const stages = [
    { label: 'Awareness', sub: 'Potential', emoji: '👀', pct: 100 },
    { label: 'Consideration', sub: 'New User', emoji: '🤔', pct: 60 },
    { label: 'Purchase', sub: 'Active', emoji: '✅', pct: 35 },
    { label: 'Retention', sub: 'Retained', emoji: '🔄', pct: 20 },
    { label: 'Advocacy', sub: 'Loyal', emoji: '❤️', pct: 8 },
  ];
  return (
    <div className="my-6 ml-5">
      <p className="text-[10px] tracking-[0.2em] text-neutral-400 mb-3">USER JOURNEY FUNNEL</p>
      <div className="flex items-end gap-1">
        {stages.map((s, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className="text-lg mb-1">{s.emoji}</span>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: s.pct * 1.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="w-14 rounded-t-md bg-gradient-to-t from-neutral-800 to-neutral-500"
            />
            <div className="mt-2 text-center">
              <p className="text-[9px] font-bold text-neutral-700">{s.label}</p>
              <p className="text-[8px] text-neutral-400">{s.sub}</p>
              <p className="text-[10px] font-mono text-neutral-500">{s.pct}%</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <div className="flex-1 h-[1px] bg-neutral-200" />
        <span className="text-[9px] text-neutral-400">Conversion drops at each stage</span>
        <div className="flex-1 h-[1px] bg-neutral-200" />
      </div>
    </div>
  );
}

// Service Blueprint Layers
export function ServiceBlueprintChart() {
  const layers = [
    { label: 'Customer Actions', desc: 'What user does', color: '#000', items: ['Search', 'Compare', 'Purchase', 'Use', 'Review'] },
    { label: 'Front-stage', desc: 'Visible interactions', color: '#404040', items: ['Website', 'App', 'Support Chat', 'Email'] },
    { label: 'Back-stage', desc: 'Internal processes', color: '#737373', items: ['Order Processing', 'Inventory', 'Shipping'] },
    { label: 'Support', desc: 'Systems & tools', color: '#a3a3a3', items: ['Database', 'CRM', 'Analytics'] },
  ];
  return (
    <div className="my-6 ml-5">
      <p className="text-[10px] tracking-[0.2em] text-neutral-400 mb-3">SERVICE BLUEPRINT LAYERS</p>
      <div className="space-y-2 max-w-md">
        {layers.map((layer, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-24 text-right">
                <p className="text-[10px] font-bold" style={{ color: layer.color }}>{layer.label}</p>
                <p className="text-[8px] text-neutral-400">{layer.desc}</p>
              </div>
              <div className="flex-1 flex gap-1">
                {layer.items.map((item, j) => (
                  <motion.div
                    key={j}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2, delay: i * 0.15 + j * 0.05 }}
                    className="px-2 py-1 rounded text-[8px] text-white"
                    style={{ backgroundColor: layer.color }}
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
            </div>
            {i < layers.length - 1 && (
              <div className="ml-24 pl-3 my-1 border-l-2 border-dashed border-neutral-200 h-2 flex items-center">
                <span className="text-[7px] text-neutral-300 ml-2">{i === 0 ? 'Line of Interaction' : i === 1 ? 'Line of Visibility' : 'Line of Internal'}</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// NPS Score Gauge
export function NPSGaugeChart() {
  const score = 45;
  const angle = ((score + 100) / 200) * 180 - 90;
  return (
    <div className="my-6 ml-5">
      <p className="text-[10px] tracking-[0.2em] text-neutral-400 mb-3">NPS SCORE GAUGE</p>
      <div className="flex items-start gap-8">
        <svg width="160" height="100" viewBox="0 0 160 100">
          {/* Background arc */}
          <path d="M 20 90 A 60 60 0 0 1 140 90" fill="none" stroke="#e5e5e5" strokeWidth="12" strokeLinecap="round" />
          {/* Colored segments */}
          <path d="M 20 90 A 60 60 0 0 1 50 35" fill="none" stroke="#ef4444" strokeWidth="12" strokeLinecap="round" />
          <path d="M 50 35 A 60 60 0 0 1 110 35" fill="none" stroke="#fbbf24" strokeWidth="12" strokeLinecap="round" />
          <path d="M 110 35 A 60 60 0 0 1 140 90" fill="none" stroke="#22c55e" strokeWidth="12" strokeLinecap="round" />
          {/* Needle */}
          <motion.line
            x1="80" y1="90" x2="80" y2="40"
            stroke="#000" strokeWidth="2" strokeLinecap="round"
            initial={{ rotate: -90 }}
            animate={{ rotate: angle }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ transformOrigin: '80px 90px' }}
          />
          <circle cx="80" cy="90" r="6" fill="#000" />
          {/* Score */}
          <text x="80" y="75" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#000">{score}</text>
        </svg>
        <div className="text-[9px] space-y-1">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-red-500" /><span>Detractors (0-6)</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-yellow-400" /><span>Passives (7-8)</span></div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-green-500" /><span>Promoters (9-10)</span></div>
          <div className="mt-2 pt-2 border-t border-neutral-200">
            <p className="font-bold">NPS = 45</p>
            <p className="text-neutral-400">Excellent (&gt;30)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Heuristics Checklist
export function HeuristicsChart() {
  const heuristics = [
    { num: '01', name: 'System Status', score: 4 },
    { num: '02', name: 'Real World Match', score: 5 },
    { num: '03', name: 'User Control', score: 3 },
    { num: '04', name: 'Consistency', score: 4 },
    { num: '05', name: 'Error Prevention', score: 2 },
    { num: '06', name: 'Recognition', score: 4 },
    { num: '07', name: 'Flexibility', score: 3 },
    { num: '08', name: 'Minimalist Design', score: 5 },
    { num: '09', name: 'Error Recovery', score: 3 },
    { num: '10', name: 'Help & Docs', score: 2 },
  ];
  return (
    <div className="my-6 ml-5">
      <p className="text-[10px] tracking-[0.2em] text-neutral-400 mb-3">NIELSEN'S 10 HEURISTICS — EVALUATION</p>
      <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 max-w-md">
        {heuristics.map((h, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: i * 0.05 }}
            className="flex items-center gap-2"
          >
            <span className="text-[9px] font-mono text-neutral-300 w-4">{h.num}</span>
            <span className="text-[9px] text-neutral-600 flex-1">{h.name}</span>
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(n => (
                <motion.div
                  key={n}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.15, delay: i * 0.05 + n * 0.03 }}
                  className={`w-2 h-2 rounded-full ${n <= h.score ? 'bg-black' : 'bg-neutral-200'}`}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-3 text-[9px] text-neutral-400">
        Average Score: {(heuristics.reduce((a,b) => a + b.score, 0) / 10).toFixed(1)} / 5
      </div>
    </div>
  );
}

// Design System Structure
export function DesignSystemChart() {
  const layers = [
    { name: 'Tokens', items: ['Colors', 'Typography', 'Spacing', 'Shadows'], color: '#000' },
    { name: 'Atoms', items: ['Button', 'Input', 'Icon', 'Badge'], color: '#404040' },
    { name: 'Molecules', items: ['Form Field', 'Card', 'List Item'], color: '#737373' },
    { name: 'Organisms', items: ['Header', 'Form', 'Table'], color: '#a3a3a3' },
    { name: 'Templates', items: ['Dashboard', 'Settings', 'Profile'], color: '#d4d4d4' },
  ];
  return (
    <div className="my-6 ml-5">
      <p className="text-[10px] tracking-[0.2em] text-neutral-400 mb-3">DESIGN SYSTEM — ATOMIC STRUCTURE</p>
      <div className="flex items-end gap-2">
        {layers.map((layer, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex flex-col items-center"
          >
            <div 
              className="rounded-lg p-2 mb-2"
              style={{ backgroundColor: layer.color, width: 60 + i * 15, height: 50 + i * 20 }}
            >
              <div className="flex flex-wrap gap-0.5 justify-center">
                {layer.items.map((item, j) => (
                  <span key={j} className="text-[6px] text-white/80 bg-white/20 rounded px-1">{item}</span>
                ))}
              </div>
            </div>
            <p className="text-[9px] font-bold text-neutral-700">{layer.name}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-[8px] text-neutral-400">
        <span>Simple</span>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-black to-neutral-300" />
        <span>Complex</span>
      </div>
    </div>
  );
}

// User Research Methods Matrix
export function ResearchMethodsChart() {
  const methods = [
    { label: "Interviews", qual: true, effort: 30, insight: 90 },
    { label: "Contextual", qual: true, effort: 70, insight: 95 },
    { label: "Usability", qual: true, effort: 45, insight: 85 },
    { label: "Card Sort", qual: true, effort: 25, insight: 50 },
    { label: "Surveys", qual: false, effort: 20, insight: 40 },
    { label: "A/B Test", qual: false, effort: 50, insight: 70 },
    { label: "Analytics", qual: false, effort: 15, insight: 60 },
    { label: "NPS", qual: false, effort: 10, insight: 45 },
  ];
  const w = 320, h = 200, px = 45, py = 20;
  const toX = (effort: number) => px + (effort / 100) * (w - px - 20);
  const toY = (insight: number) => py + ((100 - insight) / 100) * (h - py - 30);

  return (
    <div className="my-6 ml-5">
      <p className="text-[10px] tracking-[0.2em] text-neutral-400 mb-3">RESEARCH METHODS — EFFORT vs INSIGHT DEPTH</p>
      <svg width={w} height={h + 20} viewBox={`0 0 ${w} ${h + 20}`}>
        {[0, 25, 50, 75, 100].map(v => (
          <line key={`h${v}`} x1={px} y1={toY(v)} x2={w - 20} y2={toY(v)} stroke="#f5f5f5" strokeWidth="1" />
        ))}
        <line x1={px} y1={toY(0)} x2={px} y2={toY(100)} stroke="#e5e5e5" strokeWidth="1" />
        <line x1={px} y1={toY(0)} x2={w - 20} y2={toY(0)} stroke="#e5e5e5" strokeWidth="1" />
        <text x={px - 5} y={toY(100) + 3} textAnchor="end" fontSize="8" fill="#a3a3a3">High</text>
        <text x={px - 5} y={toY(0) + 3} textAnchor="end" fontSize="8" fill="#a3a3a3">Low</text>
        <text x={w / 2} y={h + 15} textAnchor="middle" fontSize="8" fill="#a3a3a3">Effort →</text>
        <text x={8} y={h / 2} textAnchor="middle" fontSize="8" fill="#a3a3a3" transform={`rotate(-90, 8, ${h / 2})`}>Insight ↑</text>
        {methods.map((m, i) => (
          <motion.g key={i} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: i * 0.08 }}>
            <circle cx={toX(m.effort)} cy={toY(m.insight)} r={m.qual ? 6 : 5} fill={m.qual ? "#000" : "#fff"} stroke="#000" strokeWidth="1.5" />
            <text x={toX(m.effort)} y={toY(m.insight) - 10} textAnchor="middle" fontSize="8" fill="#525252" fontWeight="500">{m.label}</text>
          </motion.g>
        ))}
        <circle cx={w - 100} cy={15} r={5} fill="#000" />
        <text x={w - 90} y={18} fontSize="8" fill="#737373">Qualitative</text>
        <circle cx={w - 100} cy={30} r={5} fill="#fff" stroke="#000" strokeWidth="1.5" />
        <text x={w - 90} y={33} fontSize="8" fill="#737373">Quantitative</text>
      </svg>
    </div>
  );
}
