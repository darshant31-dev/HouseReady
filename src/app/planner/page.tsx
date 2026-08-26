"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, Home, ArrowRight, Loader2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const goals = [
  { id: "Move In", icon: "📦" },
  { id: "Move Out", icon: "🚚" },
  { id: "Rent", icon: "🔑" },
  { id: "Sell", icon: "🏷️" },
  { id: "Handover", icon: "🏗️" },
  { id: "Refresh", icon: "✨" },
  { id: "Guests", icon: "🛏️" },
  { id: "Property Care", icon: "🛡️" }
];

const getServicesForGoal = (goal: string) => {
  switch(goal) {
    case "Move In": return [
      { name: "Deep Cleaning", reason: "Essential for a hygienic start in a new space." },
      { name: "Pest Control", reason: "Crucial before bringing in food and furniture." },
      { name: "Electrical checks", reason: "Ensure all switches and sockets are safe." },
      { name: "Plumbing checks", reason: "Fix any hidden leaks before you move." },
      { name: "Appliance Installation", reason: "Get your fridge and washing machine running on day 1." },
      { name: "Furniture Assembly", reason: "Sleep in your own bed on your first night." },
      { name: "Curtains / Blinds", reason: "Immediate privacy and light control." }
    ];
    case "Move Out": return [
      { name: "Deep Cleaning", reason: "Required to ensure full deposit return." },
      { name: "Painting / Touch-ups", reason: "Cover up scuffs and picture-frame holes." },
      { name: "Repairs", reason: "Fix minor damages caused during tenancy." },
      { name: "Appliance Removal", reason: "Safely disconnect heavy appliances." },
      { name: "Furniture Dismantling", reason: "Prepare bulky items for the movers." },
      { name: "Disposal", reason: "Get rid of unwanted items responsibly." }
    ];
    case "Rent": return [
      { name: "Deep Cleaning", reason: "Make the property highly attractive to prospects." },
      { name: "Painting", reason: "A fresh coat increases rental value." },
      { name: "Repairs", reason: "Ensure everything works for the new tenant." },
      { name: "Pest Control", reason: "A baseline requirement for a premium rental." },
      { name: "Fixtures", reason: "Replace broken handles and switches." },
      { name: "Photography", reason: "Stand out on listing platforms." },
      { name: "Listing Preparation", reason: "We prepare the property for immediate viewing." }
    ];
    case "Sell": return [
      { name: "Decluttering", reason: "Make the space look larger to buyers." },
      { name: "Deep Cleaning", reason: "Create a flawless first impression." },
      { name: "Repairs", reason: "Fix issues that might lower your valuation." },
      { name: "Painting", reason: "Neutral colors help buyers visualize living there." },
      { name: "Lighting", reason: "Brighten the space for viewings." },
      { name: "Fixtures", reason: "Modernize small details for higher ROI." },
      { name: "Staging", reason: "Furnish the home to sell it faster." },
      { name: "Photography", reason: "Essential for premium property listings." }
    ];
    case "Handover": return [
      { name: "Snag Inspection", reason: "Identify builder defects before signing." },
      { name: "Condition Documentation", reason: "Record the exact state of the property." },
      { name: "Cleaning", reason: "Remove construction dust and debris." },
      { name: "Installation", reason: "Install basic necessary fixtures." }
    ];
    case "Refresh": return [
      { name: "Painting", reason: "The fastest way to revitalize a room." },
      { name: "Lighting", reason: "Upgrade to modern, warm illumination." },
      { name: "Carpentry", reason: "Fix squeaky doors or broken cabinets." },
      { name: "Plumbing", reason: "Resolve annoying minor leaks." },
      { name: "Deep Cleaning", reason: "A full reset for your living space." }
    ];
    case "Guests": return [
      { name: "Deep Cleaning", reason: "Ensure the house is spotless for arrivals." },
      { name: "Kitchen / Bathroom", reason: "The most important areas for guests." },
      { name: "Linen coordination", reason: "Fresh bedding and towels prepared." },
      { name: "Setup", reason: "Arrange the guest room perfectly." }
    ];
    default: return [
      { name: "Deep Cleaning", reason: "A baseline for any home preparation." },
      { name: "Pest Control", reason: "Preventative care for peace of mind." },
      { name: "General Repairs", reason: "Fix pending minor issues." }
    ];
  }
};

function PlannerContent() {
  const searchParams = useSearchParams();
  const initialGoal = searchParams.get("goal");

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    goal: "",
    propertySize: "",
    location: "Pune",
    locality: "",
    date: "",
    condition: "",
    needs: [] as string[],
    selectedPackage: "",
    name: "",
    phone: ""
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [calcText, setCalcText] = useState("Analyzing property size...");

  useEffect(() => {
    if (initialGoal) {
      setFormData(prev => ({ ...prev, goal: initialGoal }));
      setStep(2);
    }
  }, [initialGoal]);

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const slideVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  const handleNeedsSubmit = () => {
    setStep(7);
    setIsCalculating(true);
    setTimeout(() => setCalcText("Matching required services..."), 800);
    setTimeout(() => setCalcText("Checking partner availability..."), 1600);
    setTimeout(() => setCalcText("Building your packages..."), 2400);
    setTimeout(() => {
      setIsCalculating(false);
      setStep(8);
    }, 3000);
  };

  const selectPackage = (pkg: string) => {
    setFormData(prev => ({ ...prev, selectedPackage: pkg }));
    setStep(9);
  };

  // Progress logic
  let progress = 0;
  if (step === 1) progress = 10;
  else if (step === 2) progress = 25;
  else if (step === 3) progress = 40;
  else if (step === 4) progress = 55;
  else if (step === 5) progress = 70;
  else if (step === 6) progress = 85;
  else if (step >= 8) progress = 100;

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfbf8] text-[#1c1f22] font-sans selection:bg-teal-500/20 relative overflow-hidden">
      
      {/* Background Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-teal-100 blur-[150px] opacity-60"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-orange-50 blur-[150px] opacity-60"></div>
      </div>

      <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-4xl h-16 rounded-full bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm flex items-center justify-between px-6">
          <Link href="/" className="font-bold text-xl tracking-tight text-[#1c1f22] flex items-center gap-2 hover:opacity-70 transition-opacity">
            <Home className="h-6 w-6 text-teal-700" />
            <span className="hidden sm:inline">HouseReady</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              {progress < 100 ? `Step ${Math.min(step, 6)} of 6` : 'Your Plan'}
            </div>
            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden hidden sm:block">
              <motion.div 
                className="h-full bg-teal-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
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
                      key={g.id}
                      onClick={() => {
                        setFormData({ ...formData, goal: g.id });
                        handleNext();
                      }}
                      className={`h-20 sm:h-24 rounded-2xl flex flex-col items-center justify-center gap-2 font-bold text-lg border-2 transition-all hover:-translate-y-1 ${formData.goal === g.id ? 'border-teal-500 bg-teal-50 text-teal-900 shadow-sm' : 'border-gray-100 bg-white hover:border-teal-200 hover:bg-teal-50/50'}`}
                    >
                      <span className="text-2xl">{g.icon}</span>
                      <span>{g.id}</span>
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
                  <p className="text-gray-500 font-medium text-lg">This helps us estimate the scope of work.</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {['1 BHK', '2 BHK', '3 BHK', '4+ BHK', 'Villa', 'Other'].map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setFormData({ ...formData, propertySize: size });
                        handleNext();
                      }}
                      className={`h-16 rounded-2xl flex items-center justify-center font-bold border-2 transition-all hover:-translate-y-1 ${formData.propertySize === size ? 'border-teal-500 bg-teal-50 text-teal-900 shadow-sm' : 'border-gray-100 bg-white hover:border-teal-200 hover:bg-teal-50/50'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <div className="mt-10">
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
                  <p className="text-gray-500 font-medium text-lg">We are currently operating exclusively in Pune.</p>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-bold text-gray-700 block mb-2 uppercase tracking-wide">City</label>
                    <input 
                      type="text" 
                      value={formData.location}
                      disabled
                      className="w-full h-14 bg-gray-100 border border-gray-200 rounded-2xl px-6 text-lg font-medium text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700 block mb-2 uppercase tracking-wide">Locality</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Wakad, Baner, Hinjawadi..."
                      value={formData.locality}
                      onChange={(e) => setFormData({...formData, locality: e.target.value})}
                      className="w-full h-14 bg-white border-2 border-gray-200 rounded-2xl px-6 text-lg font-medium focus:outline-none focus:border-teal-500 transition-colors"
                      autoFocus
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-100">
                  <Button variant="ghost" onClick={handleBack} className="text-gray-500 rounded-full uppercase tracking-widest text-xs hover:bg-gray-100">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={handleNext} disabled={!formData.locality} className="bg-[#1c1f22] text-white rounded-full px-8 h-12 font-bold hover:bg-gray-800 disabled:opacity-50 transition-all">
                    Next Step <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: DEADLINE */}
            {step === 4 && (
              <motion.div key="step4" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 sm:p-12 shadow-antigravity border border-white">
                <div className="mb-10">
                  <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">When does it need to be ready?</h1>
                  <p className="text-gray-500 font-medium text-lg">Your deadline dictates our coordination speed.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['This Week', 'Next Week', '2-4 Weeks', 'Later'].map((date) => (
                    <button
                      key={date}
                      onClick={() => {
                        setFormData({ ...formData, date: date });
                        handleNext();
                      }}
                      className={`h-16 flex items-center justify-center gap-3 rounded-2xl font-bold border-2 transition-all hover:-translate-y-1 ${formData.date === date ? 'border-teal-500 bg-teal-50 text-teal-900 shadow-sm' : 'border-gray-100 bg-white hover:border-teal-200 hover:bg-teal-50/50'}`}
                    >
                      <Calendar className="w-5 h-5 opacity-50" />
                      {date}
                    </button>
                  ))}
                </div>
                <div className="mt-10">
                  <Button variant="ghost" onClick={handleBack} className="text-gray-500 rounded-full uppercase tracking-widest text-xs hover:bg-gray-100">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 5: CONDITION */}
            {step === 5 && (
              <motion.div key="step5" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 sm:p-12 shadow-antigravity border border-white">
                <div className="mb-10">
                  <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">How is the house right now?</h1>
                  <p className="text-gray-500 font-medium text-lg">Give us an honest assessment so we know what to expect.</p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { id: 'good', icon: '😊', text: 'Pretty good', desc: 'Just needs a final touch-up and clean.' },
                    { id: 'average', icon: '😐', text: 'Needs some work', desc: 'A few repairs, some deep cleaning.' },
                    { id: 'poor', icon: '😵', text: 'Needs a lot of work', desc: 'Requires significant effort to be ready.' },
                    { id: 'unknown', icon: '🤷', text: 'I have no idea', desc: 'I haven\'t seen it or don\'t know.' },
                  ].map((cond) => (
                    <button
                      key={cond.id}
                      onClick={() => {
                        setFormData({ ...formData, condition: cond.text });
                        handleNext();
                      }}
                      className={`p-6 rounded-2xl flex items-center gap-4 text-left border-2 transition-all hover:-translate-y-1 ${formData.condition === cond.text ? 'border-teal-500 bg-teal-50 text-teal-900 shadow-sm' : 'border-gray-100 bg-white hover:border-teal-200 hover:bg-teal-50/50'}`}
                    >
                      <span className="text-4xl">{cond.icon}</span>
                      <div>
                        <div className="font-bold text-xl">{cond.text}</div>
                        <div className="text-sm text-gray-500 font-medium">{cond.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mt-10">
                  <Button variant="ghost" onClick={handleBack} className="text-gray-500 rounded-full uppercase tracking-widest text-xs hover:bg-gray-100">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 6: NEEDS (Dynamic) */}
            {step === 6 && (
              <motion.div key="step6" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 sm:p-12 shadow-antigravity border border-white">
                <div className="mb-10">
                  <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">What would you like us to handle?</h1>
                  <p className="text-gray-500 font-medium text-lg">Based on your goal ({formData.goal}), we recommend these services.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {getServicesForGoal(formData.goal || "Move In").map((serviceObj) => (
                    <button
                      key={serviceObj.name}
                      onClick={() => {
                        const newNeeds = formData.needs.includes(serviceObj.name)
                          ? formData.needs.filter(n => n !== serviceObj.name)
                          : [...formData.needs, serviceObj.name];
                        setFormData({ ...formData, needs: newNeeds });
                      }}
                      className={`p-4 rounded-2xl flex items-center justify-between font-bold border-2 transition-all text-left group hover:-translate-y-1 ${formData.needs.includes(serviceObj.name) ? 'border-teal-500 bg-teal-50 text-teal-900 shadow-sm' : 'border-gray-100 bg-white hover:border-teal-200 hover:bg-teal-50/50'}`}
                    >
                      <div>
                        <div className="text-lg">{serviceObj.name}</div>
                        <div className={`text-xs font-medium mt-1 ${formData.needs.includes(serviceObj.name) ? 'text-teal-700' : 'text-gray-400 group-hover:text-teal-600'}`}>{serviceObj.reason}</div>
                      </div>
                      {formData.needs.includes(serviceObj.name) && <CheckCircle2 className="w-6 h-6 text-teal-500 shrink-0 ml-4" />}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-100">
                  <Button variant="ghost" onClick={handleBack} className="text-gray-500 rounded-full uppercase tracking-widest text-xs hover:bg-gray-100">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button onClick={handleNeedsSubmit} disabled={formData.needs.length === 0} className="bg-[#1c1f22] text-white rounded-full px-10 h-14 font-bold text-lg hover:bg-gray-800 disabled:opacity-50 shadow-glow transition-all">
                    Build My Plan
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 7: CALCULATING LOADING STATE */}
            {step === 7 && isCalculating && (
              <motion.div key="step7" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-16 shadow-antigravity border border-white text-center flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="w-16 h-16 text-teal-600 animate-spin mb-8" />
                <h2 className="text-2xl font-bold text-[#1c1f22] mb-2">Architecting your plan</h2>
                <p className="text-gray-500 font-medium text-lg animate-pulse">{calcText}</p>
              </motion.div>
            )}

            {/* STEP 8: FINAL PACKAGES */}
            {step === 8 && (
              <motion.div key="step8" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="w-full max-w-5xl mx-auto -mt-16 sm:mt-0">
                <div className="text-center mb-10">
                  <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3 text-[#1c1f22]">Your {formData.goal} Plan</h1>
                  <p className="text-gray-500 font-medium text-lg">{formData.propertySize} • {formData.locality}, Pune • By {formData.date}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {/* ESSENTIAL */}
                  <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-200"></div>
                    <h3 className="text-2xl font-bold mb-2">Essential</h3>
                    <p className="text-sm text-gray-500 mb-6 font-medium">The basics to get the house ready.</p>
                    <ul className="space-y-3 mb-8 flex-grow">
                      {formData.needs.slice(0, Math.max(3, Math.floor(formData.needs.length / 2))).map((need, i) => (
                         <li key={i} className="flex items-start gap-3">
                           <CheckCircle2 className="w-5 h-5 text-gray-400 shrink-0" />
                           <span className="text-gray-700 text-sm font-medium leading-tight">{need}</span>
                         </li>
                      ))}
                    </ul>
                    <div className="pt-6 border-t border-gray-100 mt-auto">
                      <div className="text-xs text-gray-400 font-bold uppercase mb-1 tracking-widest">Indicative starting from</div>
                      <div className="text-3xl font-bold text-gray-900 mb-6">₹4,500</div>
                      <Button onClick={() => selectPackage('Essential')} variant="outline" className="w-full rounded-full h-12 font-bold border-gray-200 hover:bg-gray-50">Select Essential</Button>
                    </div>
                  </div>

                  {/* COMFORT */}
                  <div className="bg-teal-900 text-white rounded-[2rem] p-8 shadow-antigravity border border-teal-800 flex flex-col relative overflow-hidden transform md:-translate-y-4">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 blur-[80px] rounded-full"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-teal-500"></div>
                    <div className="absolute top-6 right-6 bg-teal-500 text-white text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full">Recommended</div>
                    <h3 className="text-2xl font-bold mb-2">Comfort</h3>
                    <p className="text-sm text-teal-200 mb-6 font-medium">The recommended HouseReady package.</p>
                    <ul className="space-y-4 mb-8 flex-grow relative z-10">
                      {formData.needs.map((need, i) => {
                         const serviceObj = getServicesForGoal(formData.goal).find(s => s.name === need);
                         return (
                           <li key={i} className="flex items-start gap-3">
                             <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                             <div>
                               <div className="text-white text-sm font-bold leading-tight">{need}</div>
                               {serviceObj && <div className="text-teal-300 text-xs mt-1 font-medium leading-snug">{serviceObj.reason}</div>}
                             </div>
                           </li>
                         );
                      })}
                    </ul>
                    <div className="pt-6 border-t border-teal-800 relative z-10 mt-auto">
                      <div className="text-xs text-teal-400 font-bold uppercase mb-1 tracking-widest">Indicative starting from</div>
                      <div className="text-3xl font-bold text-white mb-6">₹8,500</div>
                      <Button onClick={() => selectPackage('Comfort')} className="w-full rounded-full h-12 font-bold bg-teal-500 hover:bg-teal-400 text-teal-950 shadow-glow">Select Comfort</Button>
                    </div>
                  </div>

                  {/* ZERO-HASSLE */}
                  <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="absolute top-0 left-0 w-full h-1 bg-orange-200"></div>
                    <h3 className="text-2xl font-bold mb-2">Zero-Hassle</h3>
                    <p className="text-sm text-gray-500 mb-6 font-medium">Everything coordinated for you.</p>
                    <ul className="space-y-3 mb-8 flex-grow">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0" />
                        <span className="text-gray-700 text-sm font-medium leading-tight">Everything in Comfort</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0" />
                        <span className="text-gray-700 text-sm font-medium leading-tight">Dedicated Project Manager</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0" />
                        <span className="text-gray-700 text-sm font-medium leading-tight">Priority Scheduling</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0" />
                        <span className="text-gray-700 text-sm font-medium leading-tight">Final Setup & Staging</span>
                      </li>
                    </ul>
                    <div className="pt-6 border-t border-gray-100 mt-auto">
                      <div className="text-xs text-gray-400 font-bold uppercase mb-1 tracking-widest">Indicative starting from</div>
                      <div className="text-3xl font-bold text-gray-900 mb-6">₹14,000</div>
                      <Button onClick={() => selectPackage('Zero-Hassle')} variant="outline" className="w-full rounded-full h-12 font-bold border-gray-200 hover:bg-gray-50">Select Zero-Hassle</Button>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-4 font-bold uppercase tracking-widest">
                    Indicative estimate. Final quote depends on property condition and exact scope.
                  </p>
                  <Button variant="ghost" onClick={() => setStep(6)} className="text-gray-500 rounded-full uppercase tracking-widest text-xs hover:bg-gray-100">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Edit My Needs
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 9: SAVE & CONTACT */}
            {step === 9 && (
              <motion.div key="step9" variants={slideVariants} initial="initial" animate="animate" exit="exit" className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 sm:p-12 shadow-antigravity border border-white max-w-md mx-auto text-center">
                <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-teal-600" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Save Your Plan</h1>
                <p className="text-gray-500 font-medium text-base mb-8">Enter your details to save this {formData.selectedPackage} plan and get your final verified quote.</p>
                
                <div className="space-y-4 mb-8 text-left">
                  <div>
                    <label className="text-xs font-bold text-gray-500 block mb-2 uppercase tracking-widest">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full h-14 bg-white border-2 border-gray-200 rounded-2xl px-6 text-lg font-medium focus:outline-none focus:border-teal-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 block mb-2 uppercase tracking-widest">WhatsApp Number</label>
                    <input 
                      type="tel" 
                      placeholder="+91"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full h-14 bg-white border-2 border-gray-200 rounded-2xl px-6 text-lg font-medium focus:outline-none focus:border-teal-500 transition-colors"
                    />
                  </div>
                </div>

                <Link href={`https://wa.me/919000000000?text=Hi HouseReady, I have a ${formData.propertySize} in ${formData.locality}. I'm getting it ready for ${formData.goal} by ${formData.date}. I want to book the ${formData.selectedPackage} plan. My name is ${formData.name}.`} target="_blank">
                  <Button disabled={!formData.name || !formData.phone} className="w-full bg-[#25D366] hover:bg-[#20b858] text-white rounded-full h-14 font-bold shadow-glow text-lg disabled:opacity-50">
                    Send to WhatsApp
                  </Button>
                </Link>
                <div className="mt-6">
                  <Button variant="ghost" onClick={() => setStep(8)} className="text-gray-400 rounded-full text-xs hover:bg-gray-100">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Packages
                  </Button>
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
