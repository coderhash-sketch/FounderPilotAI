
import React, { useState, useEffect } from 'react';
import { ReadinessQuestion, ReadinessResult } from '../types';
import { generateReadinessQuestions, evaluateReadiness } from '../services/gemini';

interface DeepReadinessProps {
  idea: string;
  onFinish: () => void;
}

const DeepReadiness: React.FC<DeepReadinessProps> = ({ idea, onFinish }) => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<ReadinessQuestion[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<ReadinessResult | null>(null);
  const [evaluating, setEvaluating] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const q = await generateReadinessQuestions(idea);
        setQuestions(q);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, [idea]);

  const handleAnswer = async (option: string) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setEvaluating(true);
      try {
        const r = await evaluateReadiness(idea, newAnswers);
        setResult(r);
      } catch (e) {
        console.error(e);
      } finally {
        setEvaluating(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-40 text-center">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-8"></div>
        <h2 className="text-2xl font-black text-white italic">Scanning Idea Blindspots...</h2>
        <p className="text-slate-500 mt-4">Generating unique stress-test questions for your project.</p>
      </div>
    );
  }

  if (evaluating) {
    return (
      <div className="max-w-2xl mx-auto py-40 text-center">
        <div className="text-6xl mb-8 animate-bounce">🧠</div>
        <h2 className="text-3xl font-black text-white">Calculating Reality Grade...</h2>
        <p className="text-slate-500 mt-4">Analyzing your responses against Indian startup ecosystem constraints.</p>
      </div>
    );
  }

  if (result) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 animate-in fade-in duration-700">
        <div className="glass rounded-[3rem] p-12 border-indigo-500/30 bg-indigo-500/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8">
            <div className="text-8xl font-black text-indigo-500/20">{result.grade}</div>
          </div>
          
          <h1 className="text-4xl font-black text-white mb-2">Readiness Report</h1>
          <p className="text-slate-400 mb-12">Precision Assessment for: <span className="text-white italic">"{idea}"</span></p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="text-6xl font-black text-white mb-2">{result.score}<span className="text-indigo-500">/100</span></div>
              <div className="text-xs font-black uppercase tracking-widest text-slate-500 mb-8">Overall Reality Score</div>
              
              <h3 className="text-xl font-black text-white mb-4">The Verdict</h3>
              <p className="text-slate-300 leading-relaxed italic border-l-2 border-indigo-500 pl-6">{result.verdict}</p>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-black text-white">Critical Blindspots</h3>
              {result.blindspots.map((b, i) => (
                <div key={i} className="flex items-start space-x-4 p-4 bg-red-500/5 border border-red-500/10 rounded-2xl">
                  <div className="w-6 h-6 bg-red-500/20 text-red-400 rounded-lg flex items-center justify-center font-black text-xs shrink-0">!</div>
                  <p className="text-sm text-slate-200 font-medium">{b}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 flex justify-center">
             <button 
              onClick={onFinish}
              className="px-12 py-4 bg-white text-navy-950 font-black rounded-2xl shadow-xl hover:bg-cyan-400 transition-all active:scale-95"
             >
               Return to Execution Hub
             </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentStep];

  return (
    <div className="max-w-3xl mx-auto py-20 px-4 animate-in slide-in-from-bottom-8 duration-500">
      <div className="mb-12">
        <div className="flex justify-between items-center mb-8">
           <span className="text-xs font-black text-indigo-400 uppercase tracking-[0.3em]">Stress Test {currentStep + 1} / {questions.length}</span>
           <div className="flex space-x-2">
             {questions.map((_, i) => (
               <div key={i} className={`h-1.5 w-8 rounded-full transition-all ${i <= currentStep ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-white/10'}`} />
             ))}
           </div>
        </div>
        
        <h2 className="text-4xl font-black text-white tracking-tighter leading-tight mb-4">
          {currentQ.question}
        </h2>
        <p className="text-slate-400 font-medium italic">"{currentQ.context}"</p>
      </div>

      <div className="space-y-4">
        {currentQ.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt)}
            className="w-full text-left p-6 glass border border-white/5 rounded-2xl hover:border-indigo-500 hover:bg-white/5 transition-all group flex items-center justify-between"
          >
            <span className="text-slate-200 font-bold group-hover:text-white transition-colors text-lg">{opt}</span>
            <div className="w-6 h-6 rounded-full border border-white/20 group-hover:border-indigo-500 transition-colors flex items-center justify-center">
               <div className="w-2 h-2 rounded-full bg-indigo-500 scale-0 group-hover:scale-100 transition-transform"></div>
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-12 p-6 bg-navy-950/40 border border-white/5 rounded-3xl text-center">
        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Powered by Gemini Pro High-Precision Reasoning</p>
      </div>
    </div>
  );
};

export default DeepReadiness;
