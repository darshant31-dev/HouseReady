"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, Check, CheckCircle2, Home, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Suspense } from 'react';

function PlannerContent() {
  const searchParams = useSearchParams();
  const initialGoal = searchParams.get('goal') || "";
  
  const [step, setStep] = useState(initialGoal ? 2 : 1);
  const [formData, setFormData] = useState({
    goal: initialGoal,
    propertySize: "",
    location: "Pune",
    locality: "",
    date: "",
    knowsNeeds: null as boolean | null,
    needs: [] as string[],
    name: "",
    phone: "",
  });

  const goals = ["Move In", "Move Out", "Rent", "Sell", "Handover", "Refresh", "Guests", "Property Care"];
  const sizes = ["1 BHK", "2 BHK", "3 BHK", "4+ BHK", "Villa", "Office", "Other"];
  
  const needsMatrix: Record<string, string[]> = {
    "Move In": ["Cleaning", "Pest Control", "Appliance Installation", "Furniture Assembly", "Electrical", "Plumbing", "Curtains/Blinds", "Packing/Unpacking", "Waste Removal"],
    "Move Out": ["Cleaning", "Painting", "Repairs", "Disposal", "Appliance Removal", "Handover Preparation", "Moving"],
    "Rent": ["Cleaning", "Painting", "Repairs", "Pest Control", "Photography", "Staging", "Fixtures", "Handover"],
    "Sell": ["Decluttering", "Cleaning", "Repairs", "Painting", "Staging", "Photography", "Video", "Listing Preparation"],
    "Handover": ["Inspection", "Cleaning", "Snagging", "Documentation", "Installation", "Setup"],
    "Refresh": ["Painting", "Lighting", "Carpentry", "Plumbing", "Electrical", "Deep Cleaning", "Fixtures", "Decor Installation"],
    "Guests": ["Deep Cleaning", "Bathroom/Kitchen", "Linen coordination", "Appliance checks", "Minor repairs", "Restocking", "Setup"],
    "Property Care": ["Inspection", "Cleaning", "Maintenance", "Repairs", "Vacancy checks", "Owner updates"],
  };

  const getAvailableNeeds = () => needsMatrix[formData.goal] || needsMatrix["Move In"];

  const handleNext = () => setStep((s) => Math.min(s + 1, 8));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const toggleNeed = (need: string) => {
    if (formData.needs.includes(need)) {
      setFormData({ ...formData, needs: formData.needs.filter(n => n !== need) });
    } else {
      setFormData({ ...formData, needs: [...formData.needs, need] });
    }
  };

  const selectDiagnostic = (issue: string) => {
    const recommended = [...formData.needs];
    if (issue === 'dirty' && !recommended.includes('Cleaning')) recommended.push('Cleaning', 'Deep Cleaning');
    if (issue === 'repairs' && !recommended.includes('Repairs')) recommended.push('Repairs', 'Electrical', 'Plumbing');
    if (issue === 'empty' && !recommended.includes('Setup')) recommended.push('Setup', 'Furniture Assembly', 'Appliance Installation');
    if (issue === 'painting' && !recommended.includes('Painting')) recommended.push('Painting');
    if (issue === 'moving' && !recommended.includes('Moving')) recommended.push('Moving', 'Packing/Unpacking');
    if (issue === 'everything') recommended.push(...getAvailableNeeds());
    
    setFormData({ ...formData, needs: Array.from(new Set(recommended)) });
    handleNext();
  };

  const slideVariants = {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -30, scale: 0.95, transition: { duration: 0.3 } }
  };

  const currentProgressStep = step > 7 ? 6 : Math.min(step, 6);

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfbf8] text-[#1c1f22] font-sans selection:bg-teal-500/20 relative overflow-hidden">
      
      {/* Background Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-teal-100 blur-[150px] opacity-60"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-orange-50 blur-[150px] opacity-60"></div>
      </div>

      <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-3xl h-16 rounded-full bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm flex items-center justify-between px-6">
          <Link href="/" className="font-bold text-xl tracking-tight text-[#1c1f22] flex items-center gap-2">
            <Home className="h-6 w-6 text-teal-700" />
            <span className="hidden sm:inline">HouseReady</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium text-gray-400">
              Step {currentProgressStep} / 6
            </div>
            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
              <motion.div 
                className="h-full bg-teal-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentProgressStep / 6) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4 py-32 relative z-10 w-full">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            
            {/* STEP 1: GOAL */}
            {step === 1 && (
              <motion.div key="step1" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 sm:p-12 shadow-antigravity border border-white">
                <div className="mb-10">
                  <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">What are you getting your house ready for?</h1>
                  <p className="text-gray-500 font-medium text-lg">We'll build a custom plan based on your goal.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {goals.map((g) => (
                    <button
                      key={g}
                      onClick={() => {
                        setFormData({ ...formData, goal: g, needs: [] });
                        setTimeout(handleNext, 250);
                      }}
                      className={`text-center p-5 rounded-2xl border-2 transition-all duration-300 font-bold text-lg ${formData.goal === g ? 'border-teal-500 bg-teal-50 text-teal-900 shadow-sm' : 'border-gray-100 bg-white hover:border-teal-200 hover:bg-gray-50 text-gray-700'}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2: SIZE */}
            {step === 2 && (
              <motion.div key="step2" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 sm:p-12 shadow-antigravity border border-white">
                <div className="mb-10">
                  <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">Tell us about your home.</h1>
                  <p className="text-gray-500 font-medium text-lg">What kind of property are we getting ready?</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setFormData({ ...formData, propertySize: s });
                        setTimeout(handleNext, 250);
                      }}
                      className={`px-8 py-5 text-lg rounded-2xl border-2 transition-all duration-300 font-bold ${formData.propertySize === s ? 'border-teal-500 bg-teal-50 text-teal-900 shadow-sm' : 'border-gray-100 bg-white hover:border-teal-200 hover:bg-gray-50 text-gray-700'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between pt-10 mt-6 border-t border-gray-100">
                  <Button variant="ghost" onClick={handleBack} className="text-gray-500 rounded-full uppercase tracking-widest text-xs hover:bg-gray-100">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: LOCATION */}
            {step === 3 && (
              <motion.div key="step3" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 sm:p-12 shadow-antigravity border border-white">
                <div className="mb-10">
                  <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">Where is your home?</h1>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-bold text-gray-700 block mb-2 uppercase tracking-wide">City</label>
                    <Input 
                      value={formData.location}
                      disabled
                      className="h-16 text-xl rounded-2xl border-gray-200 bg-gray-50 px-6 cursor-not-allowed text-gray-500 font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700 block mb-2 uppercase tracking-wide">Locality</label>
                    <Input 
                      placeholder="e.g. Wakad, Baner, Hinjawadi"
                      autoFocus
                      className="h-16 text-xl rounded-2xl border-gray-200 bg-white px-6 focus-visible:ring-2 focus-visible:ring-teal-500 shadow-sm font-bold"
                      value={formData.locality}
                      onChange={(e) => setFormData({...formData, locality: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex justify-between pt-10 mt-6 border-t border-gray-100">
                  <Button variant="ghost" onClick={handleBack} className="text-gray-500 rounded-full uppercase tracking-widest text-xs hover:bg-gray-100">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={handleNext} disabled={!formData.locality} className="bg-[#1c1f22] text-white hover:bg-gray-800 rounded-full px-8 h-14 font-bold shadow-md text-lg">
                    Next <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: DATE */}
            {step === 4 && (
              <motion.div key="step4" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 sm:p-12 shadow-antigravity border border-white">
                <div className="mb-10">
                  <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">When does it need to be ready?</h1>
                  <p className="text-gray-500 font-medium text-lg">Select your target deadline.</p>
                </div>
                <div>
                  <Input 
                    type="date" 
                    className="h-16 text-xl rounded-2xl border-gray-200 bg-white px-6 focus-visible:ring-2 focus-visible:ring-teal-500 shadow-sm"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div className="flex justify-between pt-10 mt-6 border-t border-gray-100">
                  <Button variant="ghost" onClick={handleBack} className="text-gray-500 rounded-full uppercase tracking-widest text-xs hover:bg-gray-100">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={handleNext} disabled={!formData.date} className="bg-[#1c1f22] text-white hover:bg-gray-800 rounded-full px-8 h-14 font-bold shadow-md text-lg">
                    Next <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: NEEDS SPLIT */}
            {step === 5 && (
              <motion.div key="step5" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 sm:p-12 shadow-antigravity border border-white text-center">
                <div className="mb-10">
                  <HelpCircle className="w-16 h-16 text-teal-600 mx-auto mb-6 opacity-50" />
                  <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">Do you know what you need?</h1>
                  <p className="text-gray-500 font-medium text-lg max-w-sm mx-auto">Some people have a checklist. Others just want us to handle it.</p>
                </div>
                
                <div className="flex flex-col gap-4 max-w-md mx-auto">
                  <button 
                    onClick={() => { setFormData({...formData, knowsNeeds: true}); setStep(6); }}
                    className="p-6 rounded-2xl border-2 border-gray-100 bg-white hover:border-teal-500 hover:bg-teal-50 text-gray-800 font-bold text-xl transition-all shadow-sm flex items-center justify-between group"
                  >
                    <span>YES, I KNOW</span>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-teal-600 transition-colors" />
                  </button>
                  <button 
                    onClick={() => { setFormData({...formData, knowsNeeds: false}); setStep(7); }}
                    className="p-6 rounded-2xl border-2 border-gray-100 bg-[#1c1f22] text-white hover:bg-gray-800 font-bold text-xl transition-all shadow-antigravity flex items-center justify-between"
                  >
                    <span>I HAVE NO IDEA 😅</span>
                    <ArrowRight className="w-5 h-5 text-white/50" />
                  </button>
                </div>
                
                <div className="flex justify-start pt-10 mt-6">
                  <Button variant="ghost" onClick={handleBack} className="text-gray-500 rounded-full uppercase tracking-widest text-xs hover:bg-gray-100">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 6: MANUAL NEEDS (If "Yes, I know") */}
            {step === 6 && (
              <motion.div key="step6" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 sm:p-12 shadow-antigravity border border-white">
                <div className="mb-10">
                  <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">What do you think you need?</h1>
                  <p className="text-gray-500 font-medium text-lg">Select everything that applies. We'll finalize this during our consultation.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {getAvailableNeeds().map((need) => (
                    <button
                      key={need}
                      onClick={() => toggleNeed(need)}
                      className={`text-left p-5 rounded-2xl border-2 flex items-center justify-between transition-all duration-300 font-bold text-lg ${formData.needs.includes(need) ? 'border-teal-500 bg-teal-50 text-teal-900 shadow-sm' : 'border-gray-100 bg-white hover:border-teal-200 hover:bg-gray-50 text-gray-700'}`}
                    >
                      <span>{need}</span>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${formData.needs.includes(need) ? 'bg-teal-500 text-white' : 'bg-gray-100'}`}>
                        {formData.needs.includes(need) && <Check className="w-4 h-4" />}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between pt-10 mt-6 border-t border-gray-100">
                  <Button variant="ghost" onClick={() => setStep(5)} className="text-gray-500 rounded-full uppercase tracking-widest text-xs hover:bg-gray-100">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={() => setStep(8)} className="bg-[#1c1f22] text-white hover:bg-gray-800 rounded-full px-8 h-14 font-bold shadow-md text-lg">
                    Build My Ready Plan <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 7: DIAGNOSTIC (If "I have no idea") */}
            {step === 7 && (
              <motion.div key="step7" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 sm:p-12 shadow-antigravity border border-white">
                <div className="mb-10 text-center">
                  <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">No problem.</h1>
                  <p className="text-gray-500 font-medium text-lg">That's exactly what we're here for. What's the biggest problem right now?</p>
                </div>
                
                <div className="flex flex-col gap-3 max-w-md mx-auto">
                  {[
                    { id: 'dirty', label: "The house is dirty" },
                    { id: 'repairs', label: "The house needs repairs" },
                    { id: 'empty', label: "The house is empty" },
                    { id: 'painting', label: "The house needs painting" },
                    { id: 'moving', label: "I need to move things" },
                    { id: 'everything', label: "I need EVERYTHING handled" },
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => selectDiagnostic(opt.id)}
                      className="text-left p-5 rounded-2xl border-2 border-gray-100 bg-white hover:border-teal-500 hover:bg-teal-50 text-gray-800 font-bold text-lg transition-all shadow-sm flex justify-between group"
                    >
                      {opt.label}
                      <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-teal-600 transition-colors" />
                    </button>
                  ))}
                </div>
                
                <div className="flex justify-start pt-10 mt-6">
                  <Button variant="ghost" onClick={() => setStep(5)} className="text-gray-500 rounded-full uppercase tracking-widest text-xs hover:bg-gray-100">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 8: CONTACT INFO */}
            {step === 8 && (
              <motion.div key="step8" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 sm:p-12 shadow-antigravity border border-white">
                <div className="mb-10">
                  <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">Where should we send your plan?</h1>
                  <p className="text-gray-500 font-medium text-lg">We'll build your personalized packages and send them to you.</p>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-bold text-gray-700 block mb-2 uppercase tracking-wide">Name</label>
                    <Input 
                      placeholder="Your name"
                      className="h-16 text-xl rounded-2xl border-gray-200 bg-white px-6 focus-visible:ring-2 focus-visible:ring-teal-500 shadow-sm font-bold"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700 block mb-2 uppercase tracking-wide">WhatsApp Number</label>
                    <Input 
                      type="tel"
                      placeholder="+91"
                      className="h-16 text-xl rounded-2xl border-gray-200 bg-white px-6 focus-visible:ring-2 focus-visible:ring-teal-500 shadow-sm font-bold"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-between pt-10 mt-6 border-t border-gray-100">
                  <Button variant="ghost" onClick={() => setStep(formData.knowsNeeds ? 6 : 7)} className="text-gray-500 rounded-full uppercase tracking-widest text-xs hover:bg-gray-100">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={() => setStep(9)} disabled={!formData.name || !formData.phone} className="bg-teal-700 hover:bg-teal-800 text-white rounded-full px-10 h-14 font-bold shadow-glow text-lg">
                    View My Ready Plan
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 9: FINAL PACKAGES */}
            {step === 9 && (
              <motion.div key="step9" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="w-full max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4 text-[#1c1f22]">Your {formData.goal} Plan</h1>
                  <p className="text-gray-500 font-medium text-xl">{formData.propertySize} • {formData.locality}, {formData.location} • By {formData.date}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  
                  {/* ESSENTIAL TIER */}
                  <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group hover:shadow-antigravity transition-all">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-200"></div>
                    <h3 className="text-2xl font-bold mb-2">Essential</h3>
                    <p className="text-sm text-gray-500 mb-6 font-medium">For customers who just need the basics done right.</p>
                    <ul className="space-y-3 mb-8 flex-grow">
                      {formData.needs.slice(0, 3).map((need, i) => (
                         <li key={i} className="flex items-start gap-3">
                           <CheckCircle2 className="w-5 h-5 text-gray-400 shrink-0" />
                           <span className="text-gray-700 text-sm font-medium">{need}</span>
                         </li>
                      ))}
                    </ul>
                    <div className="pt-6 border-t border-gray-100">
                      <div className="text-sm text-gray-400 font-bold uppercase mb-1">Starting from</div>
                      <div className="text-3xl font-bold text-gray-900 mb-6">₹4,500</div>
                      <Button variant="outline" className="w-full rounded-full h-12 font-bold border-gray-200">Select Essential</Button>
                    </div>
                  </div>

                  {/* COMFORT TIER */}
                  <div className="bg-teal-900 text-white rounded-[2rem] p-8 shadow-antigravity border border-teal-800 flex flex-col relative overflow-hidden transform md:-translate-y-4">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 blur-[80px] rounded-full"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-teal-500"></div>
                    <div className="absolute top-6 right-6 bg-teal-500 text-white text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full">Most Popular</div>
                    
                    <h3 className="text-2xl font-bold mb-2">Comfort</h3>
                    <p className="text-sm text-teal-200 mb-6 font-medium">Everything in Essential, plus the exact things you requested.</p>
                    <ul className="space-y-3 mb-8 flex-grow relative z-10">
                      <li className="flex items-start gap-3 text-teal-100">
                        <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                        <span className="text-sm font-medium">Everything in Essential</span>
                      </li>
                      {formData.needs.map((need, i) => (
                         <li key={i} className="flex items-start gap-3">
                           <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
                           <span className="text-white text-sm font-medium">{need}</span>
                         </li>
                      ))}
                    </ul>
                    <div className="pt-6 border-t border-teal-800 relative z-10">
                      <div className="text-sm text-teal-400 font-bold uppercase mb-1">Starting from</div>
                      <div className="text-3xl font-bold text-white mb-6">₹8,500</div>
                      <Button className="w-full rounded-full h-12 font-bold bg-teal-500 hover:bg-teal-400 text-teal-950 shadow-glow">Book Comfort Plan</Button>
                    </div>
                  </div>

                  {/* ZERO-HASSLE TIER */}
                  <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group hover:shadow-antigravity transition-all">
                    <div className="absolute top-0 left-0 w-full h-1 bg-orange-200"></div>
                    <h3 className="text-2xl font-bold mb-2">Zero-Hassle</h3>
                    <p className="text-sm text-gray-500 mb-6 font-medium">You don't lift a finger. We handle the entire outcome.</p>
                    <ul className="space-y-3 mb-8 flex-grow">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0" />
                        <span className="text-gray-700 text-sm font-medium">Everything in Comfort</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0" />
                        <span className="text-gray-700 text-sm font-medium">Dedicated Project Manager</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0" />
                        <span className="text-gray-700 text-sm font-medium">Priority Scheduling</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0" />
                        <span className="text-gray-700 text-sm font-medium">Final Setup & Staging</span>
                      </li>
                    </ul>
                    <div className="pt-6 border-t border-gray-100">
                      <div className="text-sm text-gray-400 font-bold uppercase mb-1">Starting from</div>
                      <div className="text-3xl font-bold text-gray-900 mb-6">₹14,000</div>
                      <Button variant="outline" className="w-full rounded-full h-12 font-bold border-gray-200">Select Zero-Hassle</Button>
                    </div>
                  </div>

                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-6 max-w-md mx-auto">
                    Indicative estimates. Final price depends on property condition, exact scope and availability.
                  </p>
                  <Link href={`https://wa.me/919000000000?text=Hi, I want to discuss my ${formData.goal} Plan for a ${formData.propertySize} in ${formData.locality}, Pune.`} target="_blank">
                    <Button variant="link" className="text-teal-700 font-bold text-base">
                      Talk to a House Expert instead <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default function PlannerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fcfbf8]"></div>}>
      <PlannerContent />
    </Suspense>
  );
}
