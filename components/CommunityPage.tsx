
import React, { useState } from 'react';

const CommunityPage: React.FC = () => {
  const [registeredEvents, setRegisteredEvents] = useState<Record<number, boolean>>({});

  const meetups = [
    { city: "Bangalore (HSR Layout)", event: "Builder's Mixer", date: "Nov 05", members: 84, type: "In-Person" },
    { city: "IIT Delhi Campus", event: "Pitch & Chai Night", date: "Nov 08", members: 120, type: "On-Campus" },
    { city: "Remote (Discord)", event: "No-Code Demo Day", date: "Nov 12", members: 450, type: "Virtual" },
    { city: "Pune", event: "Founder's Breakfast", date: "Nov 15", members: 32, type: "In-Person" },
  ];

  const toggleRegister = (id: number) => {
    setRegisteredEvents(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const activeChapters = [
    { name: "IIT Bombay", founders: 215, activity: "High" },
    { name: "BITS Pilani", founders: 180, activity: "Steady" },
    { name: "NIT Trichy", founders: 95, activity: "Rising" },
    { name: "VIT Vellore", founders: 310, activity: "Very High" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 animate-in fade-in duration-700">
      <div className="text-center mb-20">
        <div className="inline-flex items-center space-x-2 px-4 py-2 mb-6 text-[10px] font-black tracking-widest text-indigo-400 uppercase bg-indigo-400/10 border border-indigo-400/20 rounded-full">
          <span>10,000+ Students Building Globally</span>
        </div>
        <h1 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tighter">Built Together.</h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
          The loneliest part of entrepreneurship is starting. Don't build in isolation—connect with peers at IITs, BITS, and NITs turning dorm-room ideas into real companies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Events & Meetups */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-black text-white flex items-center">
              <span className="w-3 h-3 bg-indigo-500 rounded-full mr-3 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
              Founder Mixers
            </h2>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Next 14 Days</span>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {meetups.map((m, i) => (
              <div key={i} className="glass p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between hover:bg-white/5 transition-all border-white/5 group border hover:border-indigo-500/20">
                <div className="flex items-center space-x-8 w-full md:w-auto mb-6 md:mb-0">
                  <div className="text-center bg-indigo-500/10 px-5 py-3 rounded-2xl border border-indigo-500/20 min-w-[100px]">
                    <div className="text-indigo-400 font-black text-xs uppercase tracking-tighter">{m.date.split(' ')[0]}</div>
                    <div className="text-white font-black text-2xl">{m.date.split(' ')[1]}</div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`text-[8px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest ${m.type === 'Virtual' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'}`}>
                        {m.type}
                      </span>
                      <span className="text-[10px] text-slate-500 font-bold">{m.members} Founders Attending</span>
                    </div>
                    <h3 className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors">{m.event}</h3>
                    <p className="text-slate-400 text-sm font-medium">{m.city}</p>
                  </div>
                </div>
                <button 
                  onClick={() => toggleRegister(i)}
                  className={`w-full md:w-auto px-8 py-3 rounded-xl font-black text-sm transition-all active:scale-95 ${registeredEvents[i] ? 'bg-green-600/20 text-green-400 border border-green-600/30' : 'bg-white text-navy-950 hover:bg-cyan-400'}`}
                >
                  {registeredEvents[i] ? '✓ Going' : 'Register'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Sidebar Activity */}
        <div className="space-y-8">
          {/* Active Chapters */}
          <div className="glass p-8 rounded-[2.5rem] border-indigo-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
            </div>
            <h2 className="text-xl font-black text-white mb-8 tracking-tight">Active Chapters</h2>
            <div className="space-y-6">
              {activeChapters.map((chapter) => (
                <div key={chapter.name} className="flex items-center justify-between group cursor-pointer">
                  <div>
                    <h4 className="text-sm font-black text-slate-200 group-hover:text-indigo-400 transition-colors">{chapter.name}</h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{chapter.founders} Members</p>
                  </div>
                  <div className={`px-2 py-1 rounded-md text-[8px] font-black uppercase ${chapter.activity === 'Very High' ? 'bg-green-500/10 text-green-400' : 'bg-indigo-500/10 text-indigo-400'}`}>
                    {chapter.activity}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-slate-300 font-bold text-xs transition-all uppercase tracking-widest">
              View All 42 Chapters
            </button>
          </div>

          {/* Discord/Slack CTA */}
          <div className="bg-gradient-to-br from-indigo-600 to-cyan-600 p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-600/20 relative overflow-hidden group">
            <div className="relative z-10">
              <h2 className="text-2xl font-black text-white mb-4 tracking-tighter">Join the Digital E-Cell</h2>
              <p className="text-indigo-50 text-sm font-medium mb-8 leading-relaxed opacity-80">
                24/7 support for pitch decks, debugging, and finding co-founders. Direct access to early-stage investors.
              </p>
              <a 
                href="https://discord.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center w-full py-4 bg-navy-950 text-white font-black rounded-2xl hover:scale-[1.02] transition-transform active:scale-95 shadow-xl"
              >
                Join Discord
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </a>
            </div>
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none translate-x-10 translate-y-10">
               <svg className="w-full h-full" fill="currentColor" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="0.5" fill="none" />
                  <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="0.5" fill="none" />
                  <circle cx="50" cy="50" r="20" stroke="white" strokeWidth="0.5" fill="none" />
               </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Founder Spotlight */}
      <div className="mt-32 pt-16 border-t border-white/5">
        <h2 className="text-3xl font-black text-white mb-12 tracking-tighter italic">Recent Student Launches</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Siddharth V.", campus: "IIT Delhi", project: "EcoCart", tag: "SaaS" },
            { name: "Ananya R.", campus: "BITS Pilani", project: "Stellar AI", tag: "AI/ML" },
            { name: "Kunal S.", campus: "NIT Trichy", project: "PayNode", tag: "Fintech" },
            { name: "Riya M.", campus: "SRM KTR", project: "HealthBuddy", tag: "MedTech" },
          ].map((founder, i) => (
            <div key={i} className="glass p-6 rounded-[2rem] border-white/5 hover:border-indigo-500/20 transition-all group">
              <div className="w-12 h-12 bg-white/10 rounded-full mb-6 flex items-center justify-center font-black text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                {founder.name[0]}
              </div>
              <h4 className="text-white font-black tracking-tight">{founder.project}</h4>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-4">{founder.campus}</p>
              <span className="px-3 py-1 bg-white/5 rounded-full text-[8px] font-black text-slate-400 uppercase tracking-widest">{founder.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
