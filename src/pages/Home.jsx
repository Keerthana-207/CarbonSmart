
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from "../components/Footer";
import { Header } from '../components/Header';


const CarIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
  </svg>
);

const BulbIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.674M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
  </svg>
);

const LeafIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
  </svg>
);

const Home = () => {
  return (
    <div className="min-h-screen font-sans text-slate-900 bg-white">
      {/* Navbar */}
      {/* <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Logo />
          <span className="font-bold text-2xl tracking-tight text-slate-800">CarbonSmart</span>
        </div>
        <div className="hidden md:flex gap-10 text-sm font-bold text-slate-500 uppercase tracking-widest">
          <a href="#" className="hover:text-emerald-600 transition-colors">Features</a>
          <a href="#" className="hover:text-emerald-600 transition-colors">Science</a>
          <a href="#" className="hover:text-emerald-600 transition-colors">Pricing</a>
        </div>
        <Link 
          to="/dashboard" 
          className="px-6 py-2.5 bg-emerald-50 text-emerald-700 font-bold rounded-xl hover:bg-emerald-100 transition-all border border-emerald-200"
        >
          Login
        </Link>
      </nav> */}
      <Header />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-12 pb-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-black uppercase tracking-widest w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Now Tracking over 100k Tons
            </div>
            
            <h1 className="font-extrabold text-5xl md:text-7xl leading-[1.05] tracking-tight text-slate-900">
              Measure Your Carbon. <br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent italic">Change the Future.</span>
            </h1>
            
            <p className="text-xl text-slate-500 max-w-xl leading-relaxed font-medium">
              Join thousands of eco-conscious individuals using data-driven insights to shrink their footprint and lead a more sustainable life.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                to="/dashboard" 
                className="px-10 py-5 bg-emerald-600 text-white font-bold rounded-2xl shadow-2xl shadow-emerald-200/50 hover:bg-emerald-700 hover:-translate-y-1 transition-all duration-300"
              >
                Start Free Check-In
              </Link>
              <button className="px-8 py-5 bg-white text-slate-600 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all">
                View Methodology
              </button>
            </div>

            <div className="flex items-center gap-6 mt-4">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-slate-200">
                    <img src={`https://picsum.photos/seed/${i*10}/100`} alt="user" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-bold text-slate-400">
                <span className="text-slate-900">+12k others</span> joined this week
              </p>
            </div>
          </div>
   
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-4 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 bg-white p-2">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800"
                className="w-full h-[500px] object-cover rounded-[2rem]"
                alt="Nature"
              />
              <div className="absolute bottom-10 left-10 right-10 bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl">
                 <div className="flex items-center gap-4 mb-3">
                   <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white text-lg">🌍</div>
                   <div>
                     <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Live Milestone</p>
                     <p className="font-bold text-slate-800">Stella reached 50% EV goal</p>
                   </div>
                 </div>
                 <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-emerald-500 w-[75%]"></div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Vibrant Features
      <section id="features" className="bg-slate-900 py-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-600/20 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
              Powerful Tools for a <br />
              <span className="text-emerald-400">Better Planet</span>
            </h2>
            <p className="text-lg text-slate-400 font-medium">
              We provide the data you need to make better decisions every single day.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { 
                title: "Live Transport", 
                desc: "Calculate emissions from every mile. Biking, driving, or flying — we see it all.",
                icon: <TravelIcon />,
                bg: "bg-emerald-600",
                glow: "group-hover:shadow-emerald-500/40"
              },
              { 
                title: "Smart Energy", 
                desc: "Monitor your home footprint. Connect with energy providers for real-time tracking.",
                icon: <ElectricityIcon />,
                bg: "bg-amber-500",
                glow: "group-hover:shadow-amber-500/40"
              },
              { 
                title: "Eco Habits", 
                desc: "Track diet and lifestyle changes. See the compounding effect of your small wins.",
                icon: <HabitIcon />,
                bg: "bg-teal-500",
                glow: "group-hover:shadow-teal-500/40"
              }
            ].map((feature, idx) => (
              <div key={idx} className="group bg-white/5 backdrop-blur-sm rounded-[2.5rem] p-12 border border-white/10 hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2">
                <div className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl ${feature.bg} text-white shadow-xl transition-all duration-500 ${feature.glow}`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{feature.title}</h3>
                <p className="text-slate-400 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Why it matters */}
      <section className="bg-slate-50 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">
              Awareness is the First Step.
            </h2>
            <p className="text-lg text-slate-500 font-medium">
              We break down your lifestyle into three critical buckets to help you understand exactly where your emissions come from.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { 
                title: "Daily Commute", 
                desc: "Track every trip, whether by bus, car, or bike. Discover how much CO2 you save by choosing greener modes.",
                icon: <CarIcon />,
                color: "bg-emerald-600"
              },
              { 
                title: "Energy Footprint", 
                desc: "Monitor your home's electricity and heating usage. Uncover the hidden impact of your appliance choices.",
                icon: <BulbIcon />,
                color: "bg-teal-600"
              },
              { 
                title: "Life & Habits", 
                desc: "From the food you eat to the things you buy. Learn how lifestyle shifts create compounding positive effects.",
                icon: <LeafIcon />,
                color: "bg-emerald-700"
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300">
                <div className={`w-14 h-14 ${feature.color} text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works
      <section className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="flex-1 space-y-12">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">How CarbonSmart Works</h2>
              <div className="space-y-10">
                {[
                  { step: "01", title: "Log Daily Habits", desc: "Spend 30 seconds each evening tracking your meals, transport, and home energy." },
                  { step: "02", title: "Instant Analysis", desc: "Our verified algorithm calculates your impact in real-time, showing your score out of 100." },
                  { step: "03", title: "Personalized Roadmap", desc: "Get specific, low-effort tips tailored to your lifestyle to start lowering your score." },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="text-3xl font-black text-emerald-100 group-hover:text-emerald-500 transition-colors duration-500">{item.step}</div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h4>
                      <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex-1 relative">
              <div className="bg-emerald-600 rounded-[3rem] w-full aspect-square rotate-3 absolute inset-0 -z-10 opacity-10"></div>
              <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-8 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full">Daily Snapshot</span>
                  <span className="text-slate-400 text-xs">May 12, 2025</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white font-black text-xl">82</div>
                  <div>
                    <p className="font-bold text-slate-800">High Score Day!</p>
                    <p className="text-xs text-slate-500">You're in the top 10% in Seattle</p>
                  </div>
                </div>
                <div className="space-y-3 pt-4">
                  <div className="flex justify-between text-sm font-bold">
                    <span className="text-slate-600">Transport</span>
                    <span className="text-emerald-600">Perfect</span>
                  </div>
                  <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-full"></div>
                  </div>
                  <div className="flex justify-between text-sm font-bold pt-2">
                    <span className="text-slate-600">Diet</span>
                    <span className="text-emerald-400">Good</span>
                  </div>
                  <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Colorful Process Section */}
      <section id="how-it-works" className="py-32 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
               <div className="absolute -inset-10 bg-amber-100/50 rounded-full blur-3xl -z-10 animate-pulse" />
               <div className="bg-gradient-to-br from-white to-slate-50 rounded-[4rem] p-4 shadow-inner border border-slate-100">
                 <div className="bg-white rounded-[3rem] p-10 shadow-2xl space-y-8">
                   <div className="flex justify-between items-center">
                     <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Activity Report</span>
                     <span className="w-3 h-3 rounded-full bg-emerald-500" />
                   </div>
                   <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-2xl">🥗</div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="font-bold text-slate-800">Plant-based Diet</span>
                            <span className="text-emerald-600 font-black">+15 pts</span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-full" />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-2xl">🚗</div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="font-bold text-slate-800">Car Commute</span>
                            <span className="text-amber-600 font-black">-10 pts</span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-400 w-[40%]" />
                          </div>
                        </div>
                      </div>
                   </div>
                   <button className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                     Complete My Check-In
                   </button>
                 </div>
               </div>
            </div>

            <div className="order-1 lg:order-2 space-y-12">
              <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-none">
                Simple. Fast. <br />
                <span className="italic text-emerald-600">Scientifically Grounded.</span>
              </h2>
              <div className="space-y-10">
                {[
                  { step: "01", title: "Daily Pulse", desc: "Spend just 30 seconds logging your primary activities. No complex forms, just quick taps.", color: "text-emerald-500" },
                  { step: "02", title: "Instant Score", desc: "Our verified algorithm maps your habits to CO2 equivalents using the latest IPCC models.", color: "text-teal-500" },
                  { step: "03", title: "Carbon Roadmap", desc: "Receive automated, personalized challenges that actually fit your specific lifestyle.", color: "text-amber-500" },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className={`text-4xl font-black opacity-20 ${item.color} group-hover:opacity-100 transition-all duration-500`}>{item.step}</div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h4>
                      <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Stats */}
      <section className="bg-emerald-600 py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl -mr-48 -mt-48 opacity-50"></div>
        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center text-white">
          {[
            { value: "50,000+", label: "Habits Tracked" },
            { value: "4.8M kg", label: "CO₂ Identified" },
            { value: "18%", label: "Avg User Reduction" },
            { value: "24/7", label: "Real-time Data" }
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-4xl md:text-5xl font-black mb-3">{stat.value}</div>
              <div className="text-emerald-100 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-600/20 to-transparent"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight">Ready to live CarbonSmart?</h2>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-medium">
              Start your journey today. It takes less than a minute to see your impact.
            </p>
            <Link 
              to="/dashboard" 
              className="px-12 py-6 bg-emerald-500 text-white font-black rounded-3xl hover:bg-emerald-400 hover:scale-105 transition-all inline-block shadow-2xl shadow-emerald-900/50"
            >
              Get Started Now — It's Free
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;