"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, Check, CheckCircle2, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PlannerPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    goal: "",
    date: "",
    propertySize: "",
    location: "Pune",
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
  };

  const getAvailableNeeds = () => {
    return needsMatrix[formData.goal] || needsMatrix["Move In"];
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, 7));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const toggleNeed = (need: string) => {
    if (formData.needs.includes(need)) {
      setFormData({ ...formData, needs: formData.needs.filter(n => n !== need) });
    } else {
      setFormData({ ...formData, needs: [...formData.needs, need] });
    }
  };

  const slideVariants = {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -30, scale: 0.95, transition: { duration: 0.3 } }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfbf8] text-[#1c1f22] font-sans selection:bg-teal-500/20 relative overflow-hidden">
      
      {/* Background Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-teal-100 blur-[150px] opacity-60"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-blue-50 blur-[150px] opacity-60"></div>
      </div>

      <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-3xl h-16 rounded-full bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm flex items-center justify-between px-6">
          <Link href="/" className="font-bold text-xl tracking-tight text-[#1c1f22] flex items-center gap-2">
            <Home className="h-6 w-6 text-teal-700" />
            <span className="hidden sm:inline">HouseReady</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium text-gray-400">
              Step {Math.min(step, 6)} / 6
            </div>
            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
              <motion.div 
                className="h-full bg-teal-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(Math.min(step, 6) / 6) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4 py-32 relative z-10">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait">
            
            {step === 1 && (
              <motion.div key="step1" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 sm:p-10 shadow-antigravity border border-white">
                <div className="mb-8">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">What are you getting your house ready for?</h1>
                  <p className="text-gray-500 font-medium text-lg">Select the primary destination for your property.</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {goals.map((g) => (
                    <button
                      key={g}
                      onClick={() => {
                        setFormData({ ...formData, goal: g, needs: [] });
                        setTimeout(handleNext, 250);
                      }}
                      className={`text-center p-4 rounded-2xl border-2 transition-all duration-300 font-bold ${formData.goal === g ? 'border-teal-500 bg-teal-50 text-teal-900 shadow-sm' : 'border-gray-100 bg-white hover:border-teal-200 hover:bg-gray-50 text-gray-700'}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 sm:p-10 shadow-antigravity border border-white">
                <div className="mb-8">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">When do you need it ready?</h1>
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
                <div className="flex justify-between pt-8 mt-4">
                  <Button variant="ghost" onClick={handleBack} className="text-gray-500 rounded-full uppercase tracking-widest text-xs hover:bg-gray-100">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={handleNext} disabled={!formData.date} className="bg-[#1c1f22] text-white hover:bg-gray-800 rounded-full px-8 h-12 font-bold shadow-md">
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 sm:p-10 shadow-antigravity border border-white">
                <div className="mb-8">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">What kind of home?</h1>
                </div>
                <div className="flex flex-wrap gap-3">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setFormData({ ...formData, propertySize: s });
                        setTimeout(handleNext, 250);
                      }}
                      className={`px-6 py-4 rounded-2xl border-2 transition-all duration-300 font-bold ${formData.propertySize === s ? 'border-teal-500 bg-teal-50 text-teal-900 shadow-sm' : 'border-gray-100 bg-white hover:border-teal-200 hover:bg-gray-50 text-gray-700'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between pt-8 mt-4">
                  <Button variant="ghost" onClick={handleBack} className="text-gray-500 rounded-full uppercase tracking-widest text-xs hover:bg-gray-100">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 sm:p-10 shadow-antigravity border border-white">
                <div className="mb-8">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Where is it?</h1>
                </div>
                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-bold text-gray-700 block mb-2">City</label>
                    <Input 
                      value={formData.location}
                      disabled
                      className="h-16 text-lg rounded-2xl border-gray-200 bg-gray-50 px-6 cursor-not-allowed text-gray-500 font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700 block mb-2">Locality (Pune)</label>
                    <Input 
                      placeholder="e.g. Wakad, Baner"
                      autoFocus
                      className="h-16 text-lg rounded-2xl border-gray-200 bg-white px-6 focus-visible:ring-2 focus-visible:ring-teal-500 shadow-sm font-bold"
                    />
                  </div>
                </div>
                <div className="flex justify-between pt-8 mt-4">
                  <Button variant="ghost" onClick={handleBack} className="text-gray-500 rounded-full uppercase tracking-widest text-xs hover:bg-gray-100">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={handleNext} className="bg-[#1c1f22] text-white hover:bg-gray-800 rounded-full px-8 h-12 font-bold shadow-md">
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div key="step5" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 sm:p-10 shadow-antigravity border border-white">
                <div className="mb-8">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">What do you think you need?</h1>
                  <p className="text-gray-500 font-medium text-lg">Select what you think needs to be done. We'll finalize this during our consultation.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {getAvailableNeeds().map((need) => (
                    <button
                      key={need}
                      onClick={() => toggleNeed(need)}
                      className={`text-left p-4 rounded-2xl border-2 flex items-center justify-between transition-all duration-300 font-bold ${formData.needs.includes(need) ? 'border-teal-500 bg-teal-50 text-teal-900 shadow-sm' : 'border-gray-100 bg-white hover:border-teal-200 hover:bg-gray-50 text-gray-700'}`}
                    >
                      <span>{need}</span>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${formData.needs.includes(need) ? 'bg-teal-500 text-white' : 'bg-gray-100'}`}>
                        {formData.needs.includes(need) && <Check className="w-4 h-4" />}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between pt-8 mt-4">
                  <Button variant="ghost" onClick={handleBack} className="text-gray-500 rounded-full uppercase tracking-widest text-xs hover:bg-gray-100">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={handleNext} className="bg-[#1c1f22] text-white hover:bg-gray-800 rounded-full px-8 h-12 font-bold shadow-md">
                    Build My Ready Plan <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div key="step6" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 sm:p-10 shadow-antigravity border border-white">
                <div className="mb-8">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Where should we send your plan?</h1>
                </div>
                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-bold text-gray-700 block mb-2">Name</label>
                    <Input 
                      placeholder="Your name"
                      className="h-16 text-lg rounded-2xl border-gray-200 bg-white px-6 focus-visible:ring-2 focus-visible:ring-teal-500 shadow-sm font-bold"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700 block mb-2">WhatsApp Number</label>
                    <Input 
                      type="tel"
                      placeholder="+91"
                      className="h-16 text-lg rounded-2xl border-gray-200 bg-white px-6 focus-visible:ring-2 focus-visible:ring-teal-500 shadow-sm font-bold"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-between pt-8 mt-4">
                  <Button variant="ghost" onClick={handleBack} className="text-gray-500 rounded-full uppercase tracking-widest text-xs hover:bg-gray-100">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={handleNext} disabled={!formData.name || !formData.phone} className="bg-teal-700 hover:bg-teal-800 text-white rounded-full px-8 h-12 font-bold shadow-glow">
                    View My Ready Plan
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 7 && (
              <motion.div key="step7" variants={slideVariants} initial="initial" animate="animate" exit="exit">
                
                {/* The "Receipt" / Ready Plan */}
                <div className="bg-white/90 backdrop-blur-2xl border border-white p-8 sm:p-12 rounded-[3rem] shadow-antigravity text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 to-teal-600"></div>
                  
                  <motion.div 
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                    className="mx-auto w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mb-6 shadow-sm border border-teal-100"
                  >
                    <CheckCircle2 className="h-10 w-10 text-teal-600" />
                  </motion.div>

                  <div className="mb-10">
                    <h3 className="text-3xl font-bold tracking-tight mb-2 text-gray-900">{formData.goal} Plan</h3>
                    <p className="text-base font-medium text-gray-500">{formData.propertySize} • Pune • By {formData.date}</p>
                  </div>

                  <div className="bg-gray-50 rounded-3xl p-8 text-left mb-10 border border-gray-100 shadow-sm">
                    <h4 className="text-sm font-bold text-gray-800 mb-6 uppercase tracking-wider">Recommended Scope</h4>
                    <ul className="space-y-4">
                      {formData.needs.length > 0 ? formData.needs.map(need => (
                        <li key={need} className="flex items-start gap-4">
                          <CheckCircle2 className="w-6 h-6 text-teal-500 shrink-0" />
                          <span className="text-gray-700 font-bold">{need}</span>
                        </li>
                      )) : (
                        <li className="flex items-start gap-4">
                          <CheckCircle2 className="w-6 h-6 text-teal-500 shrink-0" />
                          <span className="text-gray-700 font-bold">Full {formData.goal} Coordination Package</span>
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="mb-10">
                    <h4 className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wider">Estimated Range</h4>
                    <div className="text-5xl font-bold tracking-tighter text-teal-700">₹8,500 – ₹14,000</div>
                    <p className="text-sm text-gray-500 mt-4 font-medium leading-relaxed max-w-sm mx-auto">
                      Indicative estimate — final quote depends on property condition and exact scope defined during our consultation.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <Button className="w-full bg-[#1c1f22] text-white hover:bg-gray-800 rounded-full h-16 font-bold text-lg shadow-antigravity hover:-translate-y-1 transition-all">
                      Book My Ready Plan
                    </Button>
                    <Link href={`https://wa.me/919000000000?text=Hi, I want to book my ${formData.goal} Ready Plan for a ${formData.propertySize} in Pune by ${formData.date}.`} target="_blank" className="block w-full">
                      <Button variant="outline" className="w-full border-2 border-teal-700 text-teal-700 hover:bg-teal-50 rounded-full h-16 font-bold text-lg transition-all">
                        Talk to a Home Advisor
                      </Button>
                    </Link>
                  </div>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
