"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ArrowRight, ShieldCheck, MapPin, Package, Wrench, Home, MessageSquare } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HomePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfbf8] text-[#1c1f22] overflow-x-hidden selection:bg-teal-100 selection:text-teal-900" ref={containerRef}>
      
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-teal-50 blur-[120px] opacity-60"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-50 blur-[150px] opacity-40"></div>
      </div>

      {/* Floating Glassmorphic Navigation */}
      <div className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 flex justify-center">
        <motion.header 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl h-16 rounded-full bg-white/70 backdrop-blur-xl border border-white/50 shadow-antigravity flex items-center justify-between px-6"
        >
          <Link href="/" className="font-bold text-xl tracking-tight text-[#1c1f22] flex items-center gap-2 group">
            <motion.div whileHover={{ rotate: 15 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
              <Home className="h-6 w-6 text-teal-700" />
            </motion.div>
            HouseReady
          </Link>
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-600">
            <Link href="/move-out" className="hover:text-[#1c1f22] transition-colors relative group">
              Move-Out Check
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="#services" className="hover:text-[#1c1f22] transition-colors relative group">
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="#why-us" className="hover:text-[#1c1f22] transition-colors relative group">
              Why Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all group-hover:w-full"></span>
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="https://wa.me/919000000000" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" className="hidden sm:flex text-teal-700 hover:bg-teal-50/50 rounded-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>
            </Link>
            <Link href="/pricing">
              <Button className="bg-[#1c1f22] text-white hover:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5">
                Plan My Move
              </Button>
            </Link>
          </div>
        </motion.header>
      </div>

      <main className="flex-grow relative z-10 pt-32 pb-24">
        {/* Hero Section */}
        <motion.section 
          style={{ y, opacity }}
          className="px-4 sm:px-6 lg:px-8 mb-32"
        >
          <div className="container mx-auto max-w-5xl text-center flex flex-col items-center">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center rounded-full border border-teal-100 bg-white/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-teal-800 mb-8 shadow-sm"
            >
              <MapPin className="mr-2 h-4 w-4 text-teal-600" />
              Now live in Hinjawadi, Wakad, Baner & Balewadi
            </motion.div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl font-bold tracking-tight text-[#1c1f22] mb-6 max-w-4xl mx-auto leading-[1.1]"
            >
              Moving homes is stressful.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-teal-500">
                Moving with us isn't.
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
            >
              From rental handover to your new home's setup, we coordinate the people, services and details — so you don't have to.
            </motion.p>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
            >
              <Link href="/pricing" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-[#1c1f22] text-white hover:bg-gray-800 text-base h-14 px-8 rounded-full shadow-antigravity hover:shadow-antigravity-hover hover:-translate-y-1 transition-all duration-300 group">
                  Plan My Move
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/move-out" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-gray-200 bg-white/50 backdrop-blur-sm text-[#1c1f22] hover:bg-white text-base h-14 px-8 rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                  Check Move-Out Cost
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* How It Works - Floating Cards */}
        <section className="py-24 px-4 sm:px-6" id="how-it-works">
          <div className="container mx-auto max-w-6xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">You're not hiring five vendors.<br/>You're hiring us.</h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light">We manage the entire lifecycle of your move. Book once, and let our verified partners handle the rest under our strict supervision.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
              <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent -z-10 hidden md:block"></div>
              
              {[
                { icon: CheckCircle2, title: "1. Move-Out Prep", desc: "We inspect your old flat, give you a checklist of fixes needed to avoid deposit deductions, and arrange the repairs." },
                { icon: Package, title: "2. Professional Move", desc: "Our verified packers and movers safely transport your belongings with complete inventory documentation." },
                { icon: Wrench, title: "3. Move-In Ready", desc: "Deep cleaning, appliance installation, and furniture assembly before you even unpack." }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.2, type: "spring", bounce: 0.4 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="border-0 bg-white/80 backdrop-blur-xl shadow-antigravity hover:shadow-antigravity-hover transition-shadow duration-500 rounded-3xl h-full">
                    <CardHeader className="pb-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100/50 border border-teal-100 flex items-center justify-center text-teal-700 mb-6 shadow-sm">
                        <step.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-500 leading-relaxed font-light">{step.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages Layered Depth Section */}
        <section className="py-32 px-4 sm:px-6 relative overflow-hidden" id="services">
          <div className="container mx-auto max-w-5xl relative z-10">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl font-bold mb-4 tracking-tight">Choose your level of comfort</h2>
              <p className="text-gray-500 font-light text-lg">Select a bundle that fits your needs. We coordinate everything.</p>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch perspective-1000">
              {/* Package 1 */}
              <motion.div 
                className="w-full md:w-1/3"
                initial={{ opacity: 0, rotateY: -15, z: -100 }}
                whileInView={{ opacity: 1, rotateY: 0, z: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.02, zIndex: 10 }}
              >
                <Card className="flex flex-col h-full border border-gray-100 bg-white/60 backdrop-blur-md rounded-3xl shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Essential Move</CardTitle>
                    <CardDescription className="font-light">For customers who only need basic moving.</CardDescription>
                    <div className="mt-6 font-bold text-3xl">From ₹3,500*</div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3 text-gray-600"><CheckCircle2 className="h-5 w-5 text-teal-500 shrink-0" /> Packing & Loading</li>
                      <li className="flex items-start gap-3 text-gray-600"><CheckCircle2 className="h-5 w-5 text-teal-500 shrink-0" /> Safe Transportation</li>
                      <li className="flex items-start gap-3 text-gray-600"><CheckCircle2 className="h-5 w-5 text-teal-500 shrink-0" /> Unloading</li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link href="/pricing" className="w-full">
                      <Button variant="outline" className="w-full rounded-full h-12 bg-transparent border-gray-300">Get Quote</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>

              {/* Package 2 (Highlighted) */}
              <motion.div 
                className="w-full md:w-1/3 z-10"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1.05, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                whileHover={{ scale: 1.08 }}
              >
                <Card className="flex flex-col h-full border-0 bg-white backdrop-blur-xl rounded-3xl shadow-antigravity shadow-glow relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-teal-400 to-teal-600"></div>
                  <div className="absolute top-4 right-4 bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Popular</div>
                  <CardHeader className="pt-8">
                    <CardTitle className="text-2xl font-bold">Easy Move</CardTitle>
                    <CardDescription className="font-light">Moving + cleaning + selected setup services.</CardDescription>
                    <div className="mt-6 font-bold text-4xl text-teal-900">From ₹6,500*</div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0" /> Everything in Essential</li>
                      <li className="flex items-start gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0" /> Move-in Deep Cleaning</li>
                      <li className="flex items-start gap-3 text-gray-700"><CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0" /> Basic Appliance Setup</li>
                    </ul>
                  </CardContent>
                  <CardFooter className="pb-8">
                    <Link href="/pricing" className="w-full">
                      <Button className="w-full rounded-full h-14 bg-teal-600 hover:bg-teal-700 shadow-md hover:shadow-lg text-lg">Get Quote</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>

              {/* Package 3 */}
              <motion.div 
                className="w-full md:w-1/3"
                initial={{ opacity: 0, rotateY: 15, z: -100 }}
                whileInView={{ opacity: 1, rotateY: 0, z: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ scale: 1.02, zIndex: 10 }}
              >
                <Card className="flex flex-col h-full border border-gray-100 bg-white/60 backdrop-blur-md rounded-3xl shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Zero-Hassle</CardTitle>
                    <CardDescription className="font-light">End-to-end managed moving experience.</CardDescription>
                    <div className="mt-6 font-bold text-3xl">From ₹12,000*</div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3 text-gray-600"><CheckCircle2 className="h-5 w-5 text-teal-500 shrink-0" /> Move-out inspection & prep</li>
                      <li className="flex items-start gap-3 text-gray-600"><CheckCircle2 className="h-5 w-5 text-teal-500 shrink-0" /> Premium Packing & Moving</li>
                      <li className="flex items-start gap-3 text-gray-600"><CheckCircle2 className="h-5 w-5 text-teal-500 shrink-0" /> Full Cleaning & Setup</li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link href="/pricing" className="w-full">
                      <Button variant="outline" className="w-full rounded-full h-12 bg-transparent border-gray-300">Get Quote</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white pt-20 pb-12 border-t border-gray-100 relative z-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="font-bold text-2xl tracking-tight text-[#1c1f22] flex items-center gap-2 mb-6">
                <Home className="h-7 w-7 text-teal-700" />
                HouseReady
              </Link>
              <p className="text-gray-500 text-sm max-w-sm mb-6 leading-relaxed font-light">
                An end-to-end rental move management platform for Indian renters. 
                Moving homes is stressful. Moving with us isn't.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 text-xs font-medium text-gray-600">
                <span className="w-2 h-2 rounded-full bg-green-500"></span> Currently serving: Pune
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-gray-900">Services</h4>
              <ul className="space-y-4 text-sm font-light text-gray-500">
                <li><Link href="/pricing" className="hover:text-teal-700 transition-colors">Move Packages</Link></li>
                <li><Link href="/move-out" className="hover:text-teal-700 transition-colors">Move-Out Check</Link></li>
                <li><Link href="#" className="hover:text-teal-700 transition-colors">Deep Cleaning</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6 text-gray-900">Company</h4>
              <ul className="space-y-4 text-sm font-light text-gray-500">
                <li><Link href="#" className="hover:text-teal-700 transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-teal-700 transition-colors">Moving Guide (Pune)</Link></li>
                <li><Link href="#" className="hover:text-teal-700 transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm font-light text-gray-400">
            <p>© {new Date().getFullYear()} HouseReady. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-gray-600 transition-colors">Terms</Link>
              <Link href="#" className="hover:text-gray-600 transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
