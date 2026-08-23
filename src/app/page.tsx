"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin, Menu, X, Home, Check } from "lucide-react";
import { useState, useRef } from "react";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const destinations = [
    { title: "MOVE IN", desc: "Your new home, ready before you arrive.", color: "bg-teal-50 text-teal-900 border-teal-100", icon: <Home className="w-8 h-8 text-teal-600" /> },
    { title: "MOVE OUT", desc: "Leave your rental clean, repaired and ready.", color: "bg-orange-50 text-orange-900 border-orange-100", icon: <ArrowRight className="w-8 h-8 text-orange-600" /> },
    { title: "RENT", desc: "Turn an empty property into a tenant-ready home.", color: "bg-blue-50 text-blue-900 border-blue-100", icon: <MapPin className="w-8 h-8 text-blue-600" /> },
    { title: "SELL", desc: "Make your property clean and listing-ready.", color: "bg-purple-50 text-purple-900 border-purple-100", icon: <Check className="w-8 h-8 text-purple-600" /> },
    { title: "HANDOVER", desc: "From possession day to a home you can live in.", color: "bg-rose-50 text-rose-900 border-rose-100", icon: <Home className="w-8 h-8 text-rose-600" /> },
    { title: "REFRESH", desc: "Give your existing home a fresh start.", color: "bg-emerald-50 text-emerald-900 border-emerald-100", icon: <Check className="w-8 h-8 text-emerald-600" /> },
    { title: "GUESTS", desc: "Get your home ready before they arrive.", color: "bg-yellow-50 text-yellow-900 border-yellow-100", icon: <Home className="w-8 h-8 text-yellow-600" /> },
    { title: "PROPERTY CARE", desc: "Someone you trust looking after your property.", color: "bg-slate-50 text-slate-900 border-slate-100", icon: <MapPin className="w-8 h-8 text-slate-600" /> },
  ];

  const steps = [
    { num: "01", title: "Tell us your goal" },
    { num: "02", title: "We create your plan" },
    { num: "03", title: "Our verified partners get to work" },
    { num: "04", title: "Your house is ready" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfbf8] text-[#1c1f22] font-sans selection:bg-teal-500/20" ref={ref}>
      
      {/* Abstract Background Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div style={{ y }} className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-teal-100 blur-[150px] opacity-40"></motion.div>
        <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]) }} className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-orange-100 blur-[120px] opacity-30"></motion.div>
      </div>

      {/* Glassmorphic Navigation */}
      <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-6xl h-16 rounded-full bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm flex items-center justify-between px-6 sm:px-8 transition-all">
          <Link href="/" className="font-bold text-lg tracking-tight text-[#1c1f22] flex items-center gap-2">
            <Home className="h-5 w-5 text-teal-700" />
            HouseReady
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="#destinations" className="text-gray-600 hover:text-teal-700 transition-colors">Destinations</Link>
            <Link href="#philosophy" className="text-gray-600 hover:text-teal-700 transition-colors">Philosophy</Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-teal-700 transition-colors">How It Works</Link>
          </nav>
          <div className="hidden md:block">
            <Link href="/planner">
              <Button className="bg-teal-700 hover:bg-teal-800 text-white rounded-full px-6 h-10 shadow-glow transition-all">
                Get My House Ready
              </Button>
            </Link>
          </div>
          <button className="md:hidden text-gray-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-28 px-6 md:hidden flex flex-col gap-6 items-center">
          <Link href="#destinations" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold">Destinations</Link>
          <Link href="#philosophy" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold">Philosophy</Link>
          <Link href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold">How It Works</Link>
          <Link href="/planner" onClick={() => setMobileMenuOpen(false)} className="mt-4">
             <Button className="bg-teal-700 text-white rounded-full px-8 h-12 text-lg shadow-glow">
                Get My House Ready
              </Button>
          </Link>
        </div>
      )}

      <main className="flex-grow pt-32 relative z-10">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[80vh] flex flex-col justify-center px-6 lg:px-12 py-12">
          <div className="container mx-auto relative z-10">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-5xl">
              <h1 className="text-5xl md:text-7xl lg:text-[100px] leading-[0.95] font-bold tracking-tighter mb-8 text-[#1c1f22]">
                WE MAKE <br className="hidden sm:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-teal-500">YOUR HOUSE</span><br/>
                READY.
              </h1>
              <p className="text-xl md:text-3xl font-light text-gray-600 max-w-2xl mb-12 leading-relaxed">
                Whatever your home is becoming, we'll coordinate the people and services to get it ready.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/planner">
                  <Button className="bg-[#1c1f22] hover:bg-gray-800 text-white rounded-full px-8 h-14 text-base tracking-wide w-full sm:w-auto shadow-antigravity hover:shadow-antigravity-hover hover:-translate-y-1 transition-all">
                    Get My House Ready
                  </Button>
                </Link>
                <Link href="#destinations">
                  <Button variant="outline" className="rounded-full px-8 h-14 text-base tracking-wide w-full sm:w-auto border-gray-200 bg-white/50 hover:bg-white hover:-translate-y-1 transition-all shadow-sm">
                    See How It Works
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* DESTINATIONS */}
        <section id="destinations" className="py-24 px-6 lg:px-12 relative z-20">
          <div className="container mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-16 text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ready for what?</h2>
              <p className="text-xl text-gray-500 mt-4 max-w-xl mx-auto md:mx-0 font-light">
                Tell us what you want your house to become. We'll help figure out the rest.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {destinations.map((dest, i) => (
                <Link href="/planner" key={i}>
                  <motion.div 
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                    variants={{
                      hidden: { opacity: 0, y: 30, scale: 0.95 },
                      visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" } }
                    }}
                    className={`group relative h-72 ${dest.color} rounded-[2rem] p-8 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-antigravity hover:-translate-y-2 transition-all duration-500 cursor-pointer border`}
                  >
                    <div className="w-14 h-14 rounded-full bg-white/60 backdrop-blur-md flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                      {dest.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight mb-3 group-hover:translate-x-2 transition-transform duration-500">{dest.title}</h3>
                      <p className="text-sm font-medium opacity-80 leading-relaxed group-hover:opacity-100 transition-opacity duration-500">
                        {dest.desc}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICE PHILOSOPHY */}
        <section id="philosophy" className="py-32 px-6 lg:px-12 my-20">
          <div className="container mx-auto max-w-5xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-[#1c1f22] text-white rounded-[3rem] p-10 md:p-20 shadow-antigravity text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 blur-[100px] rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full"></div>
              <h2 className="text-3xl md:text-5xl font-medium leading-snug mb-10 relative z-10 text-gray-100">
                "You don't need to know what services you need. Tell us what you want your house to become. We'll coordinate the people and services to get it ready."
              </h2>
              <Link href="/planner" className="relative z-10 inline-block">
                <Button className="bg-white text-[#1c1f22] hover:bg-gray-100 rounded-full px-10 h-14 text-base font-semibold shadow-glow hover:shadow-lg transition-all hover:scale-105">
                  Start Your Plan
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-24 px-6 lg:px-12">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Simple for you.<br/><span className="text-teal-700">Coordinated by us.</span></h2>
                <p className="text-xl font-light text-gray-600 max-w-md">
                  We build a trusted local network of verified partners so you only have to deal with one team.
                </p>
              </motion.div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {steps.map((step, i) => (
                  <motion.div 
                    key={i}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0, scale: 0.9 },
                      visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: i * 0.1 } }
                    }}
                    className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-center h-48 hover:shadow-antigravity hover:-translate-y-1 transition-all"
                  >
                    <span className="text-teal-700 font-bold text-2xl block mb-3 opacity-50">{step.num}</span>
                    <h4 className="text-xl font-bold text-gray-800">{step.title}</h4>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WHY US & TRUST */}
        <section className="py-32 px-6 lg:px-12 relative z-20">
          <div className="container mx-auto text-center max-w-4xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">You're not hiring five different vendors.</h2>
              <p className="text-xl font-light text-gray-500 mb-16">You're getting one coordinated experience.</p>
              
              <div className="bg-white/60 backdrop-blur-xl p-8 md:p-16 rounded-[3rem] shadow-antigravity border border-white/50 flex flex-col items-center gap-8">
                <div className="px-8 py-4 rounded-2xl bg-gray-100 font-semibold text-gray-600 shadow-sm">You</div>
                <div className="h-10 w-px bg-gray-300"></div>
                <div className="px-10 py-5 rounded-2xl bg-teal-700 text-white font-bold text-lg shadow-glow">HouseReady</div>
                <div className="h-10 w-px bg-gray-300 relative"></div>
                <div className="flex flex-wrap justify-center gap-3 max-w-lg">
                  {['Cleaners', 'Painters', 'Movers', 'Plumbers', 'Technicians'].map((v,i) => (
                    <div key={i} className="px-5 py-2.5 rounded-full bg-white border border-gray-100 shadow-sm text-sm font-medium text-gray-500">{v}</div>
                  ))}
                </div>
                <div className="h-10 w-px bg-gray-300"></div>
                <div className="px-8 py-4 rounded-2xl bg-[#1c1f22] text-white font-bold shadow-md flex items-center gap-2">
                  <Home className="w-5 h-5 text-teal-400" />
                  Ready House
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* PUNE LAUNCH */}
        <section className="py-24 px-6 lg:px-12 relative z-20">
          <div className="container mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-gradient-to-br from-teal-800 to-[#1c1f22] rounded-[3rem] p-10 md:p-16 text-white shadow-antigravity overflow-hidden relative flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="absolute -right-20 -top-20 w-96 h-96 bg-teal-500/30 blur-[100px] rounded-full"></div>
              
              <div className="md:w-1/2 relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Starting in Pune.</h2>
                <p className="text-lg font-light text-gray-300 mb-8 max-w-md">
                  Currently launching in selected neighbourhoods to ensure the highest quality coordination.
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Hinjawadi', 'Wakad', 'Baner', 'Balewadi', 'Kharadi', 'Viman Nagar', 'Hadapsar'].map(area => (
                    <span key={area} className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm font-medium backdrop-blur-md flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-teal-400" /> {area}
                    </span>
                  ))}
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center relative z-10">
                 <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-white/20 flex items-center justify-center relative bg-white/5 backdrop-blur-xl shadow-glow">
                    <div className="absolute w-full h-full border border-teal-400/30 rounded-full scale-[1.15] animate-pulse"></div>
                    <div className="text-center">
                      <MapPin className="w-10 h-10 text-teal-400 mx-auto mb-3" />
                      <span className="text-sm tracking-widest uppercase font-bold text-white">Pune Area</span>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-40 px-6 lg:px-12 text-center relative z-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-12 text-[#1c1f22]">
              Whatever comes next, we'll get your house ready.
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/planner">
                <Button className="bg-teal-700 hover:bg-teal-800 text-white rounded-full px-10 h-16 text-lg font-semibold shadow-glow hover:shadow-antigravity hover:-translate-y-1 transition-all w-full sm:w-auto">
                  Get My House Ready
                </Button>
              </Link>
              <Link href="https://wa.me/919000000000" target="_blank">
                <Button variant="outline" className="border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-full px-10 h-16 text-lg font-semibold shadow-sm hover:shadow-md transition-all w-full sm:w-auto">
                  Talk To Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-white pt-24 pb-12 px-6 lg:px-12 border-t border-gray-200 relative z-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="font-bold text-2xl tracking-tight text-[#1c1f22] flex items-center gap-2 mb-6">
                <Home className="h-6 w-6 text-teal-700" />
                HouseReady
              </Link>
              <p className="text-sm font-medium text-gray-500 mb-8 max-w-xs leading-relaxed">
                An end-to-end managed home-readiness platform for Indian renters and owners.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-gray-900">Destinations</h4>
              <ul className="space-y-4 text-sm font-medium text-gray-500">
                {['Move In', 'Move Out', 'Rent', 'Sell', 'Handover', 'Refresh'].map(link => (
                  <li key={link}><Link href="/planner" className="hover:text-teal-700 transition-colors">{link}</Link></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-gray-900">Company</h4>
              <ul className="space-y-4 text-sm font-medium text-gray-500">
                <li><Link href="#how-it-works" className="hover:text-teal-700 transition-colors">How It Works</Link></li>
                <li><Link href="#" className="hover:text-teal-700 transition-colors">FAQ</Link></li>
                <li><Link href="#" className="hover:text-teal-700 transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm font-medium text-gray-400">
            <p>© {new Date().getFullYear()} HouseReady.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-gray-900 transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-gray-900 transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
