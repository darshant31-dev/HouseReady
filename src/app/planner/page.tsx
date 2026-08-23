"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, Check, CheckCircle2 } from "lucide-react";
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
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="font-medium text-xs sm:text-sm tracking-[0.2em] uppercase">
            We Make Your House Ready
          </Link>
          <div className="text-xs tracking-widest text-foreground/50 uppercase font-medium">
            Step {Math.min(step, 6)} of 6
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6 py-32">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            
            {step === 1 && (
              <motion.div key="step1" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="space-y-12">
                <div>
                  <span className="text-primary text-xs tracking-widest uppercase block mb-4">Step 01</span>
                  <h1 className="text-3xl sm:text-5xl font-medium tracking-tight mb-4">What are you getting your house ready for?</h1>
                  <p className="text-foreground/60 font-light text-lg">Select the primary destination for your property.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {goals.map((g) => (
                    <button
                      key={g}
                      onClick={() => {
                        setFormData({ ...formData, goal: g, needs: [] });
                        setTimeout(handleNext, 150);
                      }}
                      className={`text-left p-6 border transition-all duration-300 ${formData.goal === g ? 'border-primary bg-primary/5' : 'border-border bg-white hover:border-foreground/30'}`}
                    >
                      <span className="text-lg font-medium">{g}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="space-y-12">
                <div>
                  <span className="text-primary text-xs tracking-widest uppercase block mb-4">Step 02</span>
                  <h1 className="text-3xl sm:text-5xl font-medium tracking-tight mb-4">When do you need it ready?</h1>
                  <p className="text-foreground/60 font-light text-lg">Select your target deadline.</p>
                </div>
                <div>
                  <Input 
                    type="date" 
                    className="h-16 text-xl rounded-none border-border bg-white px-6 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary shadow-none"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div className="flex justify-between pt-8 border-t border-border">
                  <Button variant="ghost" onClick={handleBack} className="text-foreground/60 rounded-none uppercase tracking-widest text-xs hover:bg-transparent hover:text-foreground">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={handleNext} disabled={!formData.date} className="bg-foreground text-background hover:bg-foreground/90 rounded-none px-8 h-12 uppercase tracking-widest text-xs">
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="space-y-12">
                <div>
                  <span className="text-primary text-xs tracking-widest uppercase block mb-4">Step 03</span>
                  <h1 className="text-3xl sm:text-5xl font-medium tracking-tight mb-4">What kind of home?</h1>
                </div>
                <div className="flex flex-wrap gap-4">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setFormData({ ...formData, propertySize: s });
                        setTimeout(handleNext, 150);
                      }}
                      className={`px-8 py-4 border transition-all duration-300 ${formData.propertySize === s ? 'border-primary bg-primary/5 text-primary' : 'border-border bg-white hover:border-foreground/30'}`}
                    >
                      <span className="text-sm font-medium tracking-wide uppercase">{s}</span>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between pt-8 border-t border-border mt-8">
                  <Button variant="ghost" onClick={handleBack} className="text-foreground/60 rounded-none uppercase tracking-widest text-xs hover:bg-transparent hover:text-foreground">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="space-y-12">
                <div>
                  <span className="text-primary text-xs tracking-widest uppercase block mb-4">Step 04</span>
                  <h1 className="text-3xl sm:text-5xl font-medium tracking-tight mb-4">Where is it?</h1>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="text-xs uppercase tracking-widest font-medium text-foreground/50 block mb-3">City</label>
                    <Input 
                      value={formData.location}
                      disabled
                      className="h-16 text-lg rounded-none border-border bg-foreground/5 px-6 shadow-none cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest font-medium text-foreground/50 block mb-3">Locality (Pune)</label>
                    <Input 
                      placeholder="e.g. Wakad, Baner"
                      autoFocus
                      className="h-16 text-lg rounded-none border-border bg-white px-6 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary shadow-none"
                    />
                  </div>
                </div>
                <div className="flex justify-between pt-8 border-t border-border">
                  <Button variant="ghost" onClick={handleBack} className="text-foreground/60 rounded-none uppercase tracking-widest text-xs hover:bg-transparent hover:text-foreground">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={handleNext} className="bg-foreground text-background hover:bg-foreground/90 rounded-none px-8 h-12 uppercase tracking-widest text-xs">
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div key="step5" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="space-y-12">
                <div>
                  <span className="text-primary text-xs tracking-widest uppercase block mb-4">Step 05</span>
                  <h1 className="text-3xl sm:text-5xl font-medium tracking-tight mb-4">What do you think you need?</h1>
                  <p className="text-foreground/60 font-light text-lg">Select what you think needs to be done to get it {formData.goal} ready. (We'll finalize this during planning).</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {getAvailableNeeds().map((need) => (
                    <button
                      key={need}
                      onClick={() => toggleNeed(need)}
                      className={`text-left p-4 border flex items-center justify-between transition-all duration-300 ${formData.needs.includes(need) ? 'border-primary bg-primary/5' : 'border-border bg-white hover:border-foreground/30'}`}
                    >
                      <span className="text-sm font-medium tracking-wide">{need}</span>
                      <div className={`w-5 h-5 border rounded-sm flex items-center justify-center ${formData.needs.includes(need) ? 'bg-primary border-primary text-white' : 'border-border'}`}>
                        {formData.needs.includes(need) && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between pt-8 border-t border-border">
                  <Button variant="ghost" onClick={handleBack} className="text-foreground/60 rounded-none uppercase tracking-widest text-xs hover:bg-transparent hover:text-foreground">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={handleNext} className="bg-foreground text-background hover:bg-foreground/90 rounded-none px-8 h-12 uppercase tracking-widest text-xs">
                    Build My Ready Plan <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div key="step6" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="space-y-12">
                <div>
                  <span className="text-primary text-xs tracking-widest uppercase block mb-4">Almost There</span>
                  <h1 className="text-3xl sm:text-5xl font-medium tracking-tight mb-4">Where should we send your plan?</h1>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="text-xs uppercase tracking-widest font-medium text-foreground/50 block mb-3">Name</label>
                    <Input 
                      placeholder="Your name"
                      className="h-16 text-lg rounded-none border-border bg-white px-6 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary shadow-none"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-widest font-medium text-foreground/50 block mb-3">WhatsApp Number</label>
                    <Input 
                      type="tel"
                      placeholder="+91"
                      className="h-16 text-lg rounded-none border-border bg-white px-6 focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary shadow-none"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-between pt-8 border-t border-border">
                  <Button variant="ghost" onClick={handleBack} className="text-foreground/60 rounded-none uppercase tracking-widest text-xs hover:bg-transparent hover:text-foreground">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={handleNext} disabled={!formData.name || !formData.phone} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-none px-8 h-12 uppercase tracking-widest text-xs">
                    View My Ready Plan
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 7 && (
              <motion.div key="step7" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="space-y-12">
                
                {/* The "Receipt" / Ready Plan */}
                <div className="bg-white border border-border p-8 sm:p-12 shadow-editorial max-w-xl mx-auto relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                  
                  <div className="text-center mb-10">
                    <h2 className="text-xs tracking-[0.3em] text-foreground/50 uppercase mb-4">Your Home Ready Plan</h2>
                    <h3 className="text-3xl font-medium tracking-tight">{formData.goal}</h3>
                    <p className="text-sm text-foreground/60 mt-2">{formData.propertySize} • Pune • By {formData.date}</p>
                  </div>

                  <div className="mb-10">
                    <h4 className="text-xs tracking-widest uppercase font-medium text-foreground/50 mb-6">Recommended Scope</h4>
                    <ul className="space-y-4">
                      {formData.needs.length > 0 ? formData.needs.map(need => (
                        <li key={need} className="flex items-start gap-4">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                          <span className="text-foreground/80 font-light">{need}</span>
                        </li>
                      )) : (
                        <li className="flex items-start gap-4">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                          <span className="text-foreground/80 font-light">Full {formData.goal} Coordination Package</span>
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="border-t border-border pt-8 mb-10">
                    <h4 className="text-xs tracking-widest uppercase font-medium text-foreground/50 mb-2">Estimated Range</h4>
                    <div className="text-4xl font-medium tracking-tight">₹8,500 – ₹14,000</div>
                    <p className="text-xs text-foreground/40 mt-3 font-light leading-relaxed">
                      Indicative estimate — final quote depends on property condition, specific requirements, and exact scope defined during our consultation.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <Button className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-none h-14 uppercase tracking-widest text-xs font-medium">
                      Book My Ready Plan
                    </Button>
                    <Link href={`https://wa.me/919000000000?text=Hi, I want to book my ${formData.goal} Ready Plan for a ${formData.propertySize} in Pune by ${formData.date}.`} target="_blank" className="block w-full">
                      <Button variant="outline" className="w-full border-border text-foreground hover:bg-background rounded-none h-14 uppercase tracking-widest text-xs font-medium">
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
