"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Check, MapPin, Menu, X } from "lucide-react";
import { useState } from "react";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const destinations = [
    { title: "MOVE IN", desc: "Your new home, ready before you arrive." },
    { title: "MOVE OUT", desc: "Leave your rental clean, repaired and ready for handover." },
    { title: "RENT", desc: "Turn an empty property into a tenant-ready home." },
    { title: "SELL", desc: "Make your property clean, presentable and listing-ready." },
    { title: "HANDOVER", desc: "From possession day to a home you can actually live in." },
    { title: "REFRESH", desc: "Give your existing home a fresh start." },
    { title: "GUESTS", desc: "Get your home ready before they arrive." },
    { title: "PROPERTY CARE", desc: "Someone you trust looking after your property." },
  ];

  const steps = [
    { num: "01", title: "Tell us your goal" },
    { num: "02", title: "We create your plan" },
    { num: "03", title: "Our verified partners get to work" },
    { num: "04", title: "Your house is ready" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-foreground">
      
      {/* Editorial Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="font-medium text-sm tracking-[0.2em] uppercase">
            We Make Your House Ready
          </Link>
          <nav className="hidden md:flex items-center gap-10 text-sm tracking-wide">
            <Link href="#destinations" className="hover:text-primary transition-colors">Destinations</Link>
            <Link href="#philosophy" className="hover:text-primary transition-colors">Philosophy</Link>
            <Link href="#how-it-works" className="hover:text-primary transition-colors">How It Works</Link>
          </nav>
          <div className="hidden md:block">
            <Link href="/planner">
              <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-none px-6 h-12 uppercase tracking-wider text-xs font-medium">
                Get My House Ready
              </Button>
            </Link>
          </div>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-24 px-6 md:hidden flex flex-col gap-6">
          <Link href="#destinations" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-light">Destinations</Link>
          <Link href="#philosophy" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-light">Philosophy</Link>
          <Link href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-light">How It Works</Link>
        </div>
      )}

      <main className="flex-grow pt-20">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex flex-col justify-center px-6 lg:px-12 py-20">
          {/* Subtle background image/color for editorial feel */}
          <div className="absolute inset-0 z-0 flex md:justify-end justify-center md:items-center items-end opacity-20 md:opacity-40 pointer-events-none overflow-hidden">
             {/* Simulating a large architectural image with a simple graphic or you can replace with actual image */}
             <div className="w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-primary/20 rounded-full blur-[100px]"></div>
          </div>

          <div className="container mx-auto relative z-10">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl">
              <h1 className="text-6xl md:text-8xl lg:text-[140px] leading-[0.9] font-medium tracking-tighter mb-8">
                WE MAKE<br/>
                YOUR HOUSE<br/>
                READY.
              </h1>
              <p className="text-xl md:text-3xl font-light text-foreground/70 max-w-2xl mb-12 leading-relaxed">
                Whatever your home is becoming, we'll help get it ready.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/planner">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-none px-8 h-14 text-sm tracking-widest uppercase w-full sm:w-auto">
                    Get My House Ready
                  </Button>
                </Link>
                <Link href="#destinations">
                  <Button variant="outline" className="rounded-none px-8 h-14 text-sm tracking-widest uppercase w-full sm:w-auto border-foreground/20 hover:bg-foreground/5">
                    See How It Works
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* DESTINATIONS (Second Section) */}
        <section id="destinations" className="py-32 bg-white px-6 lg:px-12">
          <div className="container mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-20">
              <h2 className="text-4xl md:text-6xl font-medium tracking-tight">Ready for what?</h2>
              <p className="text-xl text-foreground/60 mt-4 max-w-xl font-light">
                Tell us what you want your house to become. We'll help figure out the rest.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {destinations.map((dest, i) => (
                <motion.div 
                  key={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } }
                  }}
                  className="group relative h-80 bg-background border border-border p-8 flex flex-col justify-end overflow-hidden hover:bg-primary/5 transition-colors duration-500 cursor-pointer"
                >
                  <h3 className="text-2xl font-medium tracking-tight mb-2 group-hover:-translate-y-2 transition-transform duration-500 z-10">{dest.title}</h3>
                  <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 z-10">
                    <p className="text-sm font-light text-foreground/70 leading-relaxed mb-4">{dest.desc}</p>
                    <ArrowRight className="w-5 h-5 text-primary" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICE PHILOSOPHY */}
        <section id="philosophy" className="py-40 px-6 lg:px-12 bg-foreground text-background text-center flex items-center justify-center">
          <div className="container mx-auto max-w-4xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-3xl md:text-5xl font-light leading-snug mb-12">
                "You don't need to know what services you need. Tell us what you want your house to become. We'll coordinate the people and services to get it ready."
              </h2>
              <Link href="/planner">
                <Button className="bg-background text-foreground hover:bg-background/90 rounded-none px-10 h-14 text-sm tracking-widest uppercase">
                  Start Your Plan
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-32 px-6 lg:px-12 bg-background">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-20">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">Simple for you.<br/>Coordinated by us.</h2>
                <p className="text-xl font-light text-foreground/60 max-w-md">
                  We build a trusted local network of verified partners so you only have to deal with one team.
                </p>
              </motion.div>
              
              <div className="grid sm:grid-cols-2 gap-12">
                {steps.map((step, i) => (
                  <motion.div 
                    key={i}
                    initial="hidden" whileInView="visible" viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: i * 0.15 } }
                    }}
                    className="border-t border-border pt-6"
                  >
                    <span className="text-primary text-sm tracking-widest block mb-4">{step.num}</span>
                    <h4 className="text-xl font-medium">{step.title}</h4>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WHY US & TRUST */}
        <section className="py-32 bg-white px-6 lg:px-12 border-t border-border">
          <div className="container mx-auto text-center max-w-4xl">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6">You're not hiring five different vendors.</h2>
              <p className="text-xl font-light text-foreground/60 mb-20">You're getting one coordinated experience.</p>
              
              {/* Flowchart Visual representation */}
              <div className="flex flex-col items-center gap-6 text-sm tracking-widest uppercase font-medium">
                <div className="p-4 border border-border w-48 text-center bg-background">You</div>
                <div className="h-12 w-px bg-border"></div>
                <div className="p-6 border-2 border-primary w-64 text-center bg-primary/5 text-primary">We Make Your House Ready</div>
                <div className="h-12 w-px bg-border relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-between px-8">
                    {/* decorative lines */}
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-4 max-w-lg">
                  {['Cleaners', 'Painters', 'Movers', 'Plumbers', 'Technicians'].map((v,i) => (
                    <div key={i} className="px-4 py-2 border border-border text-xs text-foreground/60">{v}</div>
                  ))}
                </div>
                <div className="h-12 w-px bg-border"></div>
                <div className="p-4 border border-border w-48 text-center bg-foreground text-background">Ready House</div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* PUNE LAUNCH */}
        <section className="py-24 px-6 lg:px-12 bg-background border-t border-border">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">Starting in Pune.</h2>
              <p className="text-lg font-light text-foreground/60 mb-8 max-w-md">
                Currently launching in selected neighbourhoods to ensure the highest quality coordination.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Hinjawadi', 'Wakad', 'Baner', 'Balewadi', 'Kharadi', 'Viman Nagar', 'Hadapsar'].map(area => (
                  <span key={area} className="px-4 py-2 border border-border text-sm font-light rounded-full flex items-center gap-2">
                    <MapPin className="w-3 h-3 text-primary" /> {area}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="md:w-1/2 flex justify-center">
               <div className="w-64 h-64 md:w-96 md:h-96 rounded-full border border-border flex items-center justify-center relative bg-white shadow-editorial">
                  <div className="absolute w-full h-full border border-primary/20 rounded-full scale-[1.15]"></div>
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-primary mx-auto mb-2 opacity-50" />
                    <span className="text-sm tracking-widest uppercase font-medium">Pune Area</span>
                  </div>
               </div>
            </motion.div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-40 px-6 lg:px-12 bg-white text-center border-t border-border">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-12">
              Whatever comes next, we'll get your house ready.
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/planner">
                <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-none px-10 h-16 text-sm tracking-widest uppercase w-full sm:w-auto">
                  Get My House Ready
                </Button>
              </Link>
              <Link href="https://wa.me/919000000000" target="_blank">
                <Button variant="outline" className="border-border text-foreground hover:bg-background rounded-none px-10 h-16 text-sm tracking-widest uppercase w-full sm:w-auto">
                  Talk To Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-background pt-24 pb-12 px-6 lg:px-12 border-t border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="font-medium text-lg tracking-[0.2em] uppercase block mb-6">
                WE MAKE YOUR<br/>HOUSE READY
              </Link>
              <p className="text-sm font-light text-foreground/60 mb-8">Pune, India</p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-colors">IN</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-6 uppercase tracking-widest text-xs">Destinations</h4>
              <ul className="space-y-4 text-sm font-light text-foreground/70">
                {['Move In', 'Move Out', 'Rent', 'Sell', 'Handover', 'Refresh'].map(link => (
                  <li key={link}><Link href="/planner" className="hover:text-primary transition-colors">{link}</Link></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-6 uppercase tracking-widest text-xs">Company</h4>
              <ul className="space-y-4 text-sm font-light text-foreground/70">
                <li><Link href="#how-it-works" className="hover:text-primary transition-colors">How It Works</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">FAQ</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Home Guide</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-light text-foreground/50">
            <p>© {new Date().getFullYear()} We Make Your House Ready.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Cancellation Policy</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border md:hidden z-50">
        <Link href="/planner" className="block w-full">
          <Button className="w-full bg-primary text-primary-foreground h-14 rounded-none text-sm tracking-widest uppercase shadow-editorial">
            Get My House Ready
          </Button>
        </Link>
      </div>

    </div>
  );
}
