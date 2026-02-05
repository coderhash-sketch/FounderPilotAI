
import React, { useState } from 'react';
import { SurveyData } from '../types';

interface SurveyProps {
  onComplete: (data: SurveyData) => void;
}

const Survey: React.FC<SurveyProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<SurveyData>({
    hoursPerWeek: '10',
    hasSpokenToUsers: false,
    teamSize: '1',
    canBuild: false,
    startingBudget: '₹0 - Zero Budget'
  });

  const steps = [
    {
      label: "Weekly Bandwidth",
      question: "How many hours a week can you realistically commit around classes and exams?",
      options: ["< 5 hours", "5 - 15 hours", "15 - 30 hours", "30+ hours (All in)"],
      field: 'hoursPerWeek'
    },
    {
      label: "Market Validation",
      question: "Have you spoken to at least 10 potential users about this problem?",
      options: ["Yes, I have real feedback", "No, just an idea so far"],
      field: 'hasSpokenToUsers'
    },
    {
      label: "The Team",
      question: "Are you building this solo or do you have co-founders?",
      options: ["Solo Founder", "Team of 2", "Team of 3+", "Looking for a team"],
      field: 'teamSize'
    },
    {
      label: "Technical Skill",
      question: "Can you build the prototype/MVP yourself (Code or No-code tools)?",
      options: ["Yes, I can build it", "No, I need a technical partner"],
      field: 'canBuild'
    },
    {
      label: "Starting Capital",
      question: "Do you have any budget for initial costs (domain, server, marketing)?",
      options: ["₹0 - Zero Budget", "₹500 - ₹2000 (Pocket Money)", "₹5000+ (Savings/Grant)"],
      field: 'startingBudget'
    }
  ];

  const handleNext = (val: any) => {
    const field = steps[step].field as keyof SurveyData;
    let processedVal = val;
    
    if (field === 'hasSpokenToUsers') processedVal = val === steps[step].options[0];
    if (field === 'canBuild') processedVal = val === steps[step].options[0];
    
    const newData = { ...data, [field]: processedVal };
    setData(newData);

    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(newData);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-20 px-4 animate-in fade-in duration-500">
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1.5 rounded-full flex-1 mx-1 transition-all duration-500 ${i <= step ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-white/10'}`}
            />
          ))}
        </div>
        <span className="text-cyan-400 font-black text-[10px] tracking-widest uppercase mb-2 block">Survey Step {step + 1} of {steps.length}</span>
        <h2 className="text-3xl font-black text-white tracking-tight leading-tight">{steps[step].question}</h2>
      </div>

      <div className="space-y-4">
        {steps[step].options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleNext(opt)}
            className="w-full text-left p-6 glass border border-white/5 rounded-2xl hover:border-indigo-500/50 hover:bg-white/5 transition-all group flex items-center justify-between"
          >
            <span className="text-slate-200 font-bold group-hover:text-white transition-colors">{opt}</span>
            <div className="w-6 h-6 rounded-full border border-white/20 group-hover:border-indigo-500 transition-colors flex items-center justify-center">
               <div className="w-2 h-2 rounded-full bg-indigo-500 scale-0 group-hover:scale-100 transition-transform"></div>
            </div>
          </button>
        ))}
      </div>
      
      <p className="text-slate-600 text-xs mt-8 text-center italic">This data is used to calculate your High-Precision Founder Readiness Score.</p>
    </div>
  );
};

export default Survey;
