"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, Menu, X, Home, Check, CheckCircle2, Sparkles, Wrench, PackageOpen, PaintRoller, Camera } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { TransformationStories } from "@/components/TransformationStories";
import { PriceEstimator } from "@/components/PriceEstimator";
import { HouseReadyScore } from "@/components/HouseReadyScore";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  // Animated Hero Words
  const words = ["HOME", "CLEAN", "FIX", "SET UP", "READY"];
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);

  const destinations = [
    { title: "MOVE IN", desc: "Your new home, ready before you arrive.", color: "bg-teal-50 text-teal-900 border-teal-100", icon: <Home className="w-8 h-8 text-teal-600" /> },
    { title: "MOVE OUT", desc: "Leave your rental clean, repaired and ready.", color: "bg-orange-50 text-orange-900 border-orange-100", icon: <ArrowRight className="w-8 h-8 text-orange-600" /> },
    { title: "RENT", desc: "Turn an empty property into a tenant-ready home.", color: "bg-blue-50 text-blue-900 border-blue-100", icon: <MapPin className="w-8 h-8 text-blue-600" /> },
    { title: "SELL", desc: "Make your property clean and listing-ready.", color: "bg-purple-50 text-purple-900 border-purple-100", icon: <Check className="w-8 h-8 text-purple-600" /> },
    { title: "HANDOVER", desc: "From possession day to a home you can live in.", color: "bg-rose-50 text-rose-900 border-rose-100", icon: <Home className="w-8 h-8 text-rose-600" /> },
    { title: "REFRESH", desc: "Give your existing home a fresh start.", color: "bg-emerald-50 text-emerald-900 border-emerald-100", icon: <PaintRoller className="w-8 h-8 text-emerald-600" /> },
    { title: "GUESTS", desc: "Get your home ready before they arrive.", color: "bg-yellow-50 text-yellow-900 border-yellow-100", icon: <Home className="w-8 h-8 text-yellow-600" /> },
    { title: "PROPERTY CARE", desc: "Someone you trust looking after your property.", color: "bg-slate-50 text-slate-900 border-slate-100", icon: <MapPin className="w-8 h-8 text-slate-600" /> },
  ];

  const categories = [
    { id: "clean", label: "CLEAN", icon: <Sparkles className="w-5 h-5"/>, items: ["Deep cleaning", "Kitchen & Bathrooms", "Windows & Balconies", "Appliance cleaning", "Post-construction clean"] },
    { id: "fix", label: "FIX", icon: <Wrench className="w-5 h-5"/>, items: ["Plumbing & leaks", "Electrical switches/boards", "Carpentry repairs", "Fixture mounting", "General handyman"] },
    { id: "move", label: "MOVE", icon: <ArrowRight className="w-5 h-5"/>, items: ["Professional packing", "Safe transport", "Loading & Unloading", "Unpacking assistance", "Carton removal"] },
    { id: "setup", label: "SET UP", icon: <PackageOpen className="w-5 h-5"/>, items: ["Furniture assembly", "Appliance installation", "Curtains & Blinds", "Lights & Fans", "Internet coordination"] },
    { id: "refresh", label: "REFRESH", icon: <PaintRoller className="w-5 h-5"/>, items: ["Interior painting", "Wall touch-ups", "Lighting upgrades", "Fixture replacement", "Decor installation"] },
    { id: "present", label: "PRESENT", icon: <Camera className="w-5 h-5"/>, items: ["Professional photography", "Video walkthroughs", "Virtual staging", "Decluttering", "Listing preparation"] },
  ];
  const [activeCategory, setActiveCategory] = useState("clean");

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
            <Link href="#what-we-do" className="text-gray-600 hover:text-teal-700 transition-colors">What We Do</Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-teal-700 transition-colors">How It Works</Link>
            <Link href="#packages" className="text-gray-600 hover:text-teal-700 transition-colors">Packages</Link>
            <Link href="#guide" className="text-gray-600 hover:text-teal-700 transition-colors">House Guide</Link>
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
          <Link href="#what-we-do" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold">What We Do</Link>
          <Link href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold">How It Works</Link>
          <Link href={`/planner?goal=${encodeURIComponent('Rent')}`} onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold">For Renters</Link>
          <Link href={`/planner?goal=${encodeURIComponent('Sell')}`} onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold">For Owners</Link>
          <Link href="#guide" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold">House Guide</Link>
          <Link href="https://wa.me/919000000000" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-semibold text-teal-600">Contact via WhatsApp</Link>
          <Link href="/planner" onClick={() => setMobileMenuOpen(false)} className="mt-4">
             <Button className="bg-teal-700 text-white rounded-full px-8 h-12 text-lg shadow-glow">
                Get My House Ready
              </Button>
          </Link>
        </div>
      )}

      <main className="flex-grow relative z-10">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[95vh] flex flex-col justify-center px-6 lg:px-12 pt-32 pb-12">
          <div className="container mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-2xl">
                <div className="inline-block px-4 py-2 rounded-full bg-teal-50 border border-teal-100 text-teal-800 font-bold tracking-widest text-xs uppercase mb-8 shadow-sm">
                  Ready for whatever comes next
                </div>
                <h1 className="text-5xl md:text-7xl lg:text-[90px] leading-[0.95] font-bold tracking-tighter mb-8 text-[#1c1f22]">
                  WE MAKE <br/>
                  YOUR HOUSE <br/>
                  READY.
                </h1>
                <p className="text-xl md:text-2xl font-medium text-gray-500 max-w-xl mb-12 leading-relaxed">
                  Moving in, moving out, renting, selling or simply refreshing your home — HouseReady coordinates everything needed to get it ready.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <Link href="/planner">
                    <Button className="bg-[#1c1f22] hover:bg-gray-800 text-white rounded-full px-10 h-16 text-lg font-bold shadow-antigravity hover:shadow-antigravity-hover hover:-translate-y-1 transition-all w-full sm:w-auto group">
                      Get My House Ready <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button variant="outline" className="border-gray-300 text-gray-700 bg-white/50 hover:bg-white backdrop-blur rounded-full px-10 h-16 text-lg font-bold transition-all w-full sm:w-auto">
                      See How It Works
                    </Button>
                  </Link>
                </div>
                <p className="text-sm text-gray-400 font-medium text-center sm:text-left sm:ml-4">
                  Build your personalised plan in about 60 seconds.
                </p>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="relative h-[40vh] lg:h-[70vh] w-full rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden shadow-antigravity mt-8 lg:mt-0">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 lg:bottom-8 lg:left-8 lg:right-8 bg-white/20 backdrop-blur-xl border border-white/40 p-5 lg:p-6 rounded-2xl lg:rounded-3xl text-white">
                  <div className="font-bold tracking-widest text-[10px] lg:text-xs uppercase mb-1 lg:mb-2 opacity-80">Recent Project</div>
                  <div className="text-lg lg:text-xl font-bold">3 BHK Move-In Ready • Wakad</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* DIFFERENTIATION / POSITIONING */}
        <section className="py-24 px-6 lg:px-12 relative z-20 bg-teal-900 text-white rounded-[3rem] mx-4 sm:mx-6 lg:mx-12 overflow-hidden shadow-antigravity">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
          <div className="container mx-auto max-w-5xl relative z-10 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-16 leading-tight">
                Getting a house ready <br className="hidden sm:block" />
                <span className="text-teal-300">is a project.</span>
              </h2>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, delay: 0.1 }} variants={fadeUp} className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-16">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 w-full md:w-1/3">
                <div className="text-sm font-medium text-teal-100 flex flex-col gap-3 text-left">
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div> Cleaning</div>
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div> Painting</div>
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div> Plumbing</div>
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div> Electrical</div>
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div> Pest Control</div>
                  <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div> Repairs</div>
                </div>
              </div>
              <div className="text-teal-400 animate-pulse hidden md:block">
                <ArrowRight className="w-8 h-8" />
              </div>
              <div className="text-teal-400 animate-pulse md:hidden">
                <ArrowRight className="w-6 h-6 rotate-90" />
              </div>
              <div className="bg-teal-800 rounded-2xl p-8 border border-teal-700 w-full md:w-1/3 text-center shadow-inner">
                <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <div className="font-bold text-xl text-white">You</div>
                <div className="text-sm text-teal-300 mt-2">Managing it all</div>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, delay: 0.2 }} variants={fadeUp} className="max-w-2xl mx-auto">
              <h3 className="text-2xl sm:text-4xl font-bold mb-6">One House. One Coordinated Plan.</h3>
              <p className="text-lg sm:text-xl text-teal-100/80 leading-relaxed mb-8">
                You shouldn't have to find, call, schedule, and follow up with five different vendors. 
              </p>
              <div className="p-6 bg-teal-950/50 rounded-2xl border border-teal-800/50">
                <p className="text-lg font-bold text-white mb-2">Tell us what needs to be ready.</p>
                <p className="text-teal-300">We'll figure out exactly what needs to happen.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* READY FOR WHAT? (DESTINATIONS) */}
        <section id="what-we-do" className="py-24 px-6 lg:px-12 relative z-20">
          <div className="container mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">What are you getting your house ready for?</h2>
              <p className="text-xl text-gray-500 mt-4 max-w-2xl font-medium">
                Select your goal. We'll open the House Ready Planner and figure out exactly what needs to be done.
              </p>
            </motion.div>

            <div className="flex overflow-x-auto pb-8 -mx-6 px-6 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0 md:mx-0 md:px-0 gap-4 md:gap-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {destinations.map((dest, i) => (
                <Link href={`/planner?goal=${encodeURIComponent(dest.title)}`} key={i} className="min-w-[240px] md:min-w-0 snap-start">
                  <motion.div 
                    initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                    variants={{
                      hidden: { opacity: 0, y: 30, scale: 0.95 },
                      visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" } }
                    }}
                    className={`group relative h-56 md:h-72 ${dest.color} rounded-[2rem] p-6 md:p-8 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-antigravity hover:-translate-y-2 transition-all duration-500 cursor-pointer border`}
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/60 backdrop-blur-md flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                      {dest.icon}
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2 md:mb-3 group-hover:translate-x-2 transition-transform duration-500">{dest.title}</h3>
                      <p className="text-sm font-medium opacity-80 leading-relaxed group-hover:opacity-100 transition-opacity duration-500">
                        {dest.desc}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mt-16 bg-[#1c1f22] text-white rounded-[2rem] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-antigravity relative overflow-hidden">
               <div className="absolute right-0 top-0 w-64 h-64 bg-teal-500/20 blur-[80px] rounded-full"></div>
               <div className="relative z-10 max-w-xl">
                 <h3 className="text-2xl sm:text-3xl font-bold mb-3">You don't need to know what services you need.</h3>
                 <p className="text-gray-400 font-medium text-lg">Just tell us what's happening. We'll figure out the rest.</p>
               </div>
               <Link href="/planner" className="relative z-10 w-full md:w-auto">
                 <Button className="w-full md:w-auto bg-white text-gray-900 hover:bg-gray-100 rounded-full h-14 px-8 font-bold text-lg shadow-glow">
                   Help Me Figure It Out
                 </Button>
               </Link>
            </motion.div>
          </div>
        </section>

        {/* WHAT WE HANDLE */}
        <section className="py-24 px-6 lg:px-12 bg-white relative z-20 border-y border-gray-100">
          <div className="container mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">You buy the outcome. We coordinate the rest.</h2>
              <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
                We don't sell individual services. We orchestrate our verified partners to handle every aspect of getting your home ready.
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto bg-[#fcfbf8] rounded-[3rem] p-4 sm:p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-8">
              
              <div className="flex flex-row md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 md:w-1/3 hide-scrollbar">
                {categories.map((cat) => (
                  <button 
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-left font-bold transition-all whitespace-nowrap md:whitespace-normal ${activeCategory === cat.id ? 'bg-teal-700 text-white shadow-glow' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    {cat.icon}
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="md:w-2/3 bg-white rounded-[2rem] p-8 sm:p-12 shadow-sm border border-gray-100 min-h-[400px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full"
                  >
                    {categories.map((cat) => cat.id === activeCategory && (
                      <div key={cat.id}>
                        <div className="flex items-center gap-4 mb-8 text-teal-700">
                          <div className="p-4 rounded-full bg-teal-50">
                            {cat.icon}
                          </div>
                          <h3 className="text-3xl font-bold">{cat.label}</h3>
                        </div>
                        <ul className="grid sm:grid-cols-2 gap-y-6 gap-x-8">
                          {cat.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <CheckCircle2 className="w-6 h-6 text-teal-400 shrink-0" />
                              <span className="text-gray-700 font-bold text-lg">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </section>

        {/* READY PACKAGES */}
        <section id="packages" className="py-32 px-6 lg:px-12 relative z-20">
          <div className="container mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Standard Ready Packages</h2>
              <p className="text-xl text-gray-500 font-medium">Popular combinations that guarantee a flawless handover.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Move-In Ready", desc: "Your new home, completely sanitized, set up, and ready for you to live in.", items: ["Deep Cleaning", "Pest Control", "Appliance Install", "Plumbing check"], color: "bg-teal-50 border-teal-100" },
                { title: "Rent-Ready", desc: "Your tenant left. Your next tenant shouldn't have to wait. We make it listing-ready.", items: ["Cleaning", "Repairs", "Painting", "Fixtures", "Photography"], color: "bg-blue-50 border-blue-100" },
                { title: "Fresh Home", desc: "Give your existing home a deep refresh without the hassle of a full renovation.", items: ["Painting", "Deep Cleaning", "Lighting", "Carpentry fixes"], color: "bg-orange-50 border-orange-100" }
              ].map((pkg, i) => (
                <motion.div 
                  key={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }
                  }}
                  className={`rounded-[2.5rem] p-10 border shadow-sm hover:shadow-antigravity transition-all bg-white flex flex-col group`}
                >
                  <div className={`w-16 h-16 rounded-2xl ${pkg.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <PackageOpen className="w-8 h-8 text-gray-800" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{pkg.title}</h3>
                  <p className="text-gray-500 font-medium mb-8 leading-relaxed h-20">{pkg.desc}</p>
                  <ul className="space-y-4 mb-10 flex-grow">
                    {pkg.items.map(item => (
                      <li key={item} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-teal-600" />
                        <span className="font-bold text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/planner?goal=${encodeURIComponent(pkg.title.split(' ')[0])}`} className="block w-full">
                    <Button variant="outline" className="w-full rounded-full h-14 font-bold text-lg border-gray-200 group-hover:bg-gray-900 group-hover:text-white transition-all">
                      Build Package
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* HOUSE READY SCORE */}
        <section className="py-24 px-6 lg:px-12 relative z-20 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto max-w-4xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <HouseReadyScore />
            </motion.div>
          </div>
        </section>

        {/* BEFORE / AFTER */}
        <section className="py-24 px-6 lg:px-12 bg-white relative z-20 border-y border-gray-100 overflow-hidden">
          <div className="container mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12 text-center">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Real HouseReady Transformations.</h2>
              <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
                See exactly what it takes to get a home ready for its next chapter.
              </p>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <TransformationStories />
            </motion.div>
          </div>
        </section>

        {/* WHY HOUSE READY? */}
        <section className="py-24 px-6 lg:px-12 relative z-20">
          <div className="container mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">ONE HOUSE. MULTIPLE TASKS. ONE TEAM.</h2>
              <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
                You shouldn't have to find, call, schedule and follow up with five different vendors. You tell us what needs to be ready. We coordinate the rest.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Traditional */}
              <div className="bg-gray-50 rounded-[3rem] p-10 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-400 mb-8 uppercase tracking-widest">The Traditional Way</h3>
                <ul className="space-y-6">
                  {["Find a cleaner", "Find a painter", "Find a mover", "Call a plumber", "Coordinate timing", "Negotiate prices", "Check quality"].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-gray-500 font-medium strike-through">
                      <X className="w-5 h-5 text-red-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* HouseReady */}
              <div className="bg-teal-900 text-white rounded-[3rem] p-10 shadow-antigravity relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 blur-[80px] rounded-full"></div>
                <h3 className="text-xl font-bold text-teal-200 mb-8 uppercase tracking-widest relative z-10">HouseReady</h3>
                <p className="text-2xl font-bold mb-8 relative z-10">Tell us what needs to be ready. We handle the rest.</p>
                <ul className="space-y-6 relative z-10">
                  {["Plan", "Coordinate", "Execute", "Check", "Ready"].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 font-bold text-lg">
                      <CheckCircle2 className="w-6 h-6 text-teal-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* BUSINESS MODEL / DIFFERENTIATOR */}
        <section className="py-24 px-6 lg:px-12 relative z-20 bg-[#1c1f22] text-white">
          <div className="container mx-auto text-center max-w-4xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16">You don't hire five different people.</h2>
              
              <div className="flex flex-col items-center gap-6">
                <div className="px-8 py-4 rounded-2xl bg-white/10 font-bold">You</div>
                <div className="h-8 w-px bg-white/20"></div>
                <div className="px-10 py-5 rounded-3xl bg-teal-600 text-white font-bold text-xl shadow-glow">HouseReady</div>
                <div className="h-8 w-px bg-white/20"></div>
                <div className="flex flex-wrap justify-center gap-3 max-w-xl">
                  {['Cleaners', 'Painters', 'Movers', 'Plumbers', 'Technicians', 'Installers'].map((v,i) => (
                    <div key={i} className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-gray-300">{v}</div>
                  ))}
                </div>
                <div className="h-8 w-px bg-white/20"></div>
                <div className="px-8 py-4 rounded-2xl bg-white text-[#1c1f22] font-bold text-xl shadow-antigravity flex items-center gap-3">
                  <Home className="w-6 h-6 text-teal-600" />
                  Ready House
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* PRICE ESTIMATOR */}
        <section className="py-32 px-6 lg:px-12 relative z-20">
          <div className="container mx-auto max-w-5xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">How much will it cost?</h2>
              <p className="text-xl text-gray-500 font-medium">Use our estimator to get a rough idea before building your plan.</p>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <PriceEstimator />
            </motion.div>
          </div>
        </section>

        {/* JOB TRACKER PROTOTYPE */}
        <section className="py-24 px-6 lg:px-12 relative z-20 bg-gray-50 border-y border-gray-200">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2 className="text-4xl font-bold tracking-tight mb-6">Track everything from your phone.</h2>
                <p className="text-xl text-gray-500 font-medium mb-8">
                  Once your plan is booked, you get a live dashboard showing the progress of every service. No calling contractors to ask where they are.
                </p>
                <Link href="/planner">
                  <Button className="bg-[#1c1f22] text-white hover:bg-gray-800 rounded-full h-14 px-8 font-bold">Start My Plan</Button>
                </Link>
              </motion.div>
              
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white rounded-[3rem] p-8 shadow-antigravity border border-gray-100 max-w-md mx-auto w-full">
                <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-6">
                  <div>
                    <h4 className="font-bold text-xl">Wakad • 2 BHK</h4>
                    <p className="text-sm text-gray-400 font-medium">Move-In Ready Plan</p>
                  </div>
                  <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 font-bold">
                    65%
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex gap-4 opacity-50">
                    <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    <div><div className="font-bold">Deep Cleaning</div><div className="text-sm">Completed</div></div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-6 h-6 rounded-full border-2 border-teal-500 flex items-center justify-center">
                       <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
                    </div>
                    <div><div className="font-bold">Pest Control</div><div className="text-sm text-teal-600 font-medium">In Progress</div></div>
                  </div>
                  <div className="flex gap-4 opacity-40">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
                    <div><div className="font-bold">Appliance Install</div><div className="text-sm">Scheduled for 4:00 PM</div></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* WHAT HAPPENS AFTER I BOOK? */}
        <section id="how-it-works" className="py-24 px-6 lg:px-12 relative z-20 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto max-w-5xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">What happens after you book?</h2>
              <p className="text-xl text-gray-500 font-medium">A completely managed process, from quote to handover.</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { step: "01", title: "Tell us what's happening.", desc: "Use the planner to share your situation." },
                { step: "02", title: "Get your plan.", desc: "We recommend what needs to be done." },
                { step: "03", title: "Approve the quote.", desc: "Transparent, upfront pricing." },
                { step: "04", title: "We coordinate.", desc: "Our team manages the vendors and timeline." },
                { step: "05", title: "Your house is ready.", desc: "We check the quality before handover." }
              ].map((s, i) => (
                <div key={i} className="p-6 rounded-[2rem] bg-white shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col md:text-center lg:text-left">
                  <div className="text-teal-600/30 font-black text-4xl mb-4">{s.step}</div>
                  <h4 className="font-bold text-lg mb-2 leading-tight">{s.title}</h4>
                  <p className="text-gray-500 text-sm font-medium">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ALTERNATIVE FLOWS */}
        <section className="py-24 px-6 lg:px-12 relative z-20">
          <div className="container mx-auto max-w-5xl">
             <div className="grid md:grid-cols-2 gap-8">
               
               {/* NOT SURE WHAT YOU NEED */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-[#1c1f22] text-white rounded-[3rem] p-10 md:p-12 border border-gray-800 shadow-antigravity text-center flex flex-col justify-between">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Not sure what you need?</h2>
                    <h3 className="text-lg font-medium text-gray-400 mb-8 uppercase tracking-widest">THAT'S OK.</h3>
                    <p className="text-gray-300 font-medium mb-8 leading-relaxed">
                      Tell us what is happening (e.g. "I'm moving into a new flat"). We'll help figure out the rest.
                    </p>
                  </div>
                  <Link href="/planner">
                    <Button className="w-full rounded-full bg-white text-[#1c1f22] hover:bg-gray-100 h-14 font-bold">
                      Help Me Figure It Out <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
               </motion.div>

               {/* SINGLE SERVICE OPTION */}
               <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, delay: 0.1 }} variants={fadeUp} className="bg-white rounded-[3rem] p-10 md:p-12 border border-gray-200 shadow-sm text-center flex flex-col justify-between">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight mb-4 text-[#1c1f22]">Just need one thing?</h2>
                    <h3 className="text-sm font-bold text-gray-400 mb-8 uppercase tracking-widest">I KNOW WHAT I NEED</h3>
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                      {['Cleaning', 'Painting', 'Pest Control', 'Plumbing', 'Electrical', 'Carpentry', 'Moving', 'Other'].map(s => (
                        <div key={s} className="px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-xs font-medium text-gray-600">{s}</div>
                      ))}
                    </div>
                  </div>
                  <Link href="/planner?goal=Single">
                    <Button variant="outline" className="w-full rounded-full border-gray-300 text-gray-700 hover:bg-gray-50 h-14 font-bold">
                      Get An Estimate <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
               </motion.div>
             </div>
          </div>
        </section>

        {/* PUNE LAUNCH */}
        <section className="py-24 px-6 lg:px-12 relative z-20 bg-white">
          <div className="container mx-auto max-w-4xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-[3rem] p-10 md:p-16 border border-teal-100 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-teal-900">Starting in Pune.</h2>
                <p className="text-lg font-medium text-teal-700 mb-8">
                  Currently launching in selected neighbourhoods to ensure the highest quality coordination.
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {['Hinjawadi', 'Wakad', 'Baner', 'Balewadi', 'Kharadi', 'Viman Nagar'].map(area => (
                    <span key={area} className="px-4 py-2 bg-white rounded-full text-sm font-bold text-teal-800 shadow-sm border border-teal-100">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                 <div className="w-64 h-64 rounded-full border-4 border-white flex items-center justify-center bg-teal-600/10 backdrop-blur-sm relative">
                    <div className="absolute w-full h-full border border-teal-400 rounded-full scale-[1.15] animate-pulse"></div>
                    <MapPin className="w-16 h-16 text-teal-600" />
                 </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FUTURE VISION */}
        <section className="py-24 px-6 lg:px-12 relative z-20 border-t border-gray-100 bg-[#fcfbf8]">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white rounded-[2rem] p-10 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-6 right-6 bg-orange-100 text-orange-800 text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full">Coming Soon</div>
                <h3 className="text-2xl font-bold mb-2">HouseReady Passport</h3>
                <p className="text-gray-500 font-medium mb-8">Your property's history, in one place.</p>
                <div className="space-y-4 border-l-2 border-gray-100 pl-6 ml-2">
                  <div className="relative">
                    <div className="absolute w-3 h-3 bg-teal-500 rounded-full -left-[31px] top-1"></div>
                    <div className="text-xs font-bold text-gray-400">Aug 2026</div>
                    <div className="font-bold text-gray-700">Move-In Ready</div>
                  </div>
                  <div className="relative opacity-50">
                    <div className="absolute w-3 h-3 bg-gray-300 rounded-full -left-[31px] top-1"></div>
                    <div className="text-xs font-bold text-gray-400">Dec 2026</div>
                    <div className="font-bold text-gray-700">Plumbing Service</div>
                  </div>
                </div>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-[#1c1f22] text-white rounded-[2rem] p-10 shadow-antigravity relative overflow-hidden">
                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur text-white text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full">Coming Soon</div>
                <h3 className="text-2xl font-bold mb-2">HouseReady Care</h3>
                <p className="text-gray-400 font-medium mb-8">For owners who don't live near their property.</p>
                <div className="flex flex-wrap gap-3">
                  {['Periodic inspection', 'Cleaning', 'Maintenance', 'Repairs', 'Vacancy checks', 'Owner updates'].map(s => (
                    <div key={s} className="px-4 py-2 rounded-xl bg-white/10 text-sm font-medium">{s}</div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="guide" className="py-24 px-6 lg:px-12 relative z-20 bg-white">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                { q: "What exactly is HouseReady?", a: "We are an end-to-end managed home readiness platform. Instead of hiring a cleaner, painter, and plumber separately, you buy an outcome (e.g., 'Make my house Move-In Ready') and we coordinate our verified partners to deliver it." },
                { q: "Do you provide the services yourselves?", a: "We coordinate a trusted network of verified local service partners. You only ever deal with us—we handle the scheduling, quality checks, and payments." },
                { q: "How is pricing calculated?", a: "Pricing is based on the size of your home, its current condition, and the exact scope of work required to achieve your goal. Our planner gives you an indicative estimate." },
                { q: "Can I book just one service?", a: "Our platform is designed for multi-service coordination to achieve a 'Ready' outcome. If you only need a basic cleaning, a generic marketplace might be cheaper. If you need 3-4 things done flawlessly by a deadline, you need HouseReady." }
              ].map((faq, i) => (
                <div key={i} className="p-6 rounded-2xl bg-gray-50 border border-gray-100">
                  <h4 className="font-bold text-lg mb-2">{faq.q}</h4>
                  <p className="text-gray-600 font-medium leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="py-40 px-6 lg:px-12 text-center relative z-20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-12 text-[#1c1f22]">
              Your house has a deadline. We'll get it ready.
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/planner">
                <Button className="bg-teal-700 hover:bg-teal-800 text-white rounded-full px-10 h-16 text-lg font-bold shadow-glow hover:shadow-antigravity hover:-translate-y-1 transition-all w-full sm:w-auto">
                  Get My House Ready
                </Button>
              </Link>
              <Link href="https://wa.me/919000000000" target="_blank">
                <Button variant="outline" className="border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-full px-10 h-16 text-lg font-bold shadow-sm hover:shadow-md transition-all w-full sm:w-auto">
                  Talk To An Expert
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
              <h4 className="font-bold mb-6 text-gray-900">Explore</h4>
              <ul className="space-y-4 text-sm font-medium text-gray-500">
                <li><Link href="#what-we-do" className="hover:text-teal-700 transition-colors">What We Do</Link></li>
                <li><Link href="#how-it-works" className="hover:text-teal-700 transition-colors">How It Works</Link></li>
                <li><Link href={`/planner?goal=${encodeURIComponent('Rent')}`} className="hover:text-teal-700 transition-colors">For Renters</Link></li>
                <li><Link href={`/planner?goal=${encodeURIComponent('Sell')}`} className="hover:text-teal-700 transition-colors">For Owners</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-gray-900">Contact</h4>
              <ul className="space-y-4 text-sm font-medium text-gray-500">
                <li><Link href="https://wa.me/919000000000" target="_blank" className="hover:text-teal-700 transition-colors">WhatsApp</Link></li>
                <li><Link href="mailto:hello@houseready.in" className="hover:text-teal-700 transition-colors">Email</Link></li>
                <li><span className="text-gray-400">Pune, India</span></li>
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
      {/* MOBILE STICKY CTA */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <Link href="/planner">
          <Button className="w-full bg-[#1c1f22] text-white hover:bg-gray-800 rounded-full h-14 font-bold shadow-antigravity text-lg">
            Get My House Ready
          </Button>
        </Link>
      </div>

      {/* FLOATING WHATSAPP */}
      <Link href="https://wa.me/919000000000?text=Hi%20HouseReady,%20I%20need%20help%20getting%20my%20house%20ready." target="_blank" className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
        </svg>
      </Link>
    </div>
  );
}
