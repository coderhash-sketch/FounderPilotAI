
import React, { useState } from 'react';

interface IdeaFormProps {
  onAnalyze: (idea: string) => void;
  loading: boolean;
}

const IdeaForm: React.FC<IdeaFormProps> = ({ onAnalyze, loading }) => {
  const [idea, setIdea] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (idea.trim()) {
      onAnalyze(idea);
    }
  };

  const suggestions = [
    "A local Chai delivery app for late night study sessions",
    "A campus-wide peer-to-peer textbook and cycle rental",
    "An AI tutor for GATE and placement preparation",
    "A platform to connect student freelancers with local small businesses"
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-600 rounded-3xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
          <div className="relative glass border border-white/10 rounded-3xl p-8 shadow-2xl">
            <label className="block text-xl font-black text-white mb-6">
              Launch your vision.
            </label>
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="E.g. I want to build a platform for Tier-2 college students to find internships in regional languages..."
              className="w-full h-44 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none text-white placeholder-slate-500 text-lg font-medium"
              disabled={loading}
            />
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={loading || !idea.trim()}
                className="inline-flex items-center px-10 py-4 bg-white text-navy-950 font-black rounded-2xl shadow-xl hover:bg-cyan-400 disabled:bg-slate-800 disabled:text-slate-500 transition-all active:scale-95"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  <>
                    Generate Execution Plan
                    <svg className="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setIdea(suggestion)}
              className="text-left p-5 glass border border-white/5 rounded-2xl hover:border-indigo-500/50 hover:bg-white/5 transition-all text-xs font-bold text-slate-400 italic leading-relaxed"
            >
              "{suggestion}"
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};

export default IdeaForm;
