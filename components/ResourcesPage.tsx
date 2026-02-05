
import React, { useState } from 'react';

const ResourcesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [signedUp, setSignedUp] = useState(false);
  const [email, setEmail] = useState('');

  const resources = [
    {
      title: "The Campus Founder Playbook",
      desc: "Comprehensive guide on balancing B.Tech exams with MVP development. Essential for Indian student founders.",
      tag: "Guide",
      icon: "📚",
      url: "https://www.ycombinator.com/library"
    },
    {
      title: "Zero-Cost Tool Stack",
      desc: "A curated list of free tiers for Vercel, Firebase, and Clerk specifically optimized for Indian students.",
      tag: "Tools",
      icon: "🛠️",
      url: "https://free-for.dev/"
    },
    {
      title: "Alumni Outreach Templates",
      desc: "Proven email and LinkedIn templates to get IIT/BITS/NIT alumni to mentor your startup.",
      tag: "Growth",
      icon: "✉️",
      url: "https://notion.so"
    },
    {
      title: "Indian Grant Database 2024",
      desc: "Direct links to NIDHI-PRAYAS, Startup India Learning, and TIDES campus-specific grants.",
      tag: "Funding",
      icon: "💰",
      url: "https://www.startupindia.gov.in/"
    },
    {
      title: "Student VC Networks",
      desc: "Connect with student-run VC funds like Campus Fund and Dorm Room Fund equivalents in India.",
      tag: "Funding",
      icon: "🤝",
      url: "https://www.campusfund.in/"
    },
    {
      title: "No-Code for Founders",
      desc: "Learn to build professional apps without code using Bubble and Glide free tiers.",
      tag: "Tools",
      icon: "🚀",
      url: "https://bubble.io"
    }
  ];

  const categories = ['All', 'Guide', 'Tools', 'Growth', 'Funding'];
  const filtered = activeTab === 'All' ? resources : resources.filter(r => r.tag === activeTab);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSignedUp(true);
    setTimeout(() => {
      setSignedUp(false);
      setEmail('');
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h1 className="text-5xl font-black text-white mb-4 tracking-tighter">Execution Vault</h1>
          <p className="text-slate-400 max-w-2xl text-lg font-medium">Curated high-precision resources for Indian university entrepreneurs. No fluff, just the raw material to build.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all border ${activeTab === cat ? 'bg-indigo-600 text-white border-indigo-400 shadow-[0_0_20px_rgba(79,70,229,0.3)]' : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/20 hover:bg-white/10'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((card, i) => (
          <a 
            key={i} 
            href={card.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="glass p-8 rounded-3xl hover:border-indigo-500/50 hover:shadow-[0_0_40px_rgba(99,102,241,0.1)] transition-all group block relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
               <span className="text-6xl">{card.icon}</span>
            </div>
            <div className="text-[10px] font-black tracking-[0.2em] text-cyan-400 uppercase mb-4">{card.tag}</div>
            <h3 className="text-2xl font-black text-white mb-3 group-hover:text-cyan-400 transition-colors">{card.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 relative z-10">{card.desc}</p>
            <span className="text-indigo-400 text-[10px] font-black uppercase tracking-widest group-hover:translate-x-2 transition-transform inline-flex items-center">
              Explore Resource 
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </span>
          </a>
        ))}
      </div>

      <div className="mt-24 glass rounded-[3rem] p-12 overflow-hidden relative border-white/5 shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-black text-white mb-4 tracking-tighter italic">The WhatsApp Digest</h2>
            <p className="text-slate-400 text-lg max-w-xl">Get the top 3 student-founder deep dives delivered to your WhatsApp every Monday. Joined by 5,000+ hackers from IITs and BITS.</p>
          </div>
          <form onSubmit={handleSignUp} className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
            <input 
              type="tel" 
              placeholder="+91 WhatsApp Number" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-indigo-500 w-full sm:w-64 font-bold" 
            />
            <button 
              disabled={signedUp}
              className={`bg-indigo-600 hover:bg-indigo-500 text-white font-black px-8 py-4 rounded-2xl transition-all shadow-xl shadow-indigo-600/20 whitespace-nowrap active:scale-95 ${signedUp ? 'bg-green-600' : ''}`}
            >
              {signedUp ? 'Success!' : 'Join 5k+ Founders'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
