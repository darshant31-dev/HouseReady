"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Home, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PricingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    planType: "",
    fromLocality: "",
    toLocality: "",
    bhk: "",
    moveDate: "",
    services: [] as string[],
    name: "",
    phone: "",
    email: "",
  });

  const [estimate, setEstimate] = useState<number | null>(null);

  const handleNext = () => setStep((s) => Math.min(s + 1, 8));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleCheckboxChange = (service: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, services: [...formData.services, service] });
    } else {
      setFormData({ ...formData, services: formData.services.filter((s) => s !== service) });
    }
  };

  const calculateEstimate = () => {
    let base = 0;
    if (formData.bhk === "1 BHK") base = 3500;
    else if (formData.bhk === "2 BHK") base = 5500;
    else if (formData.bhk === "3 BHK") base = 8000;
    else base = 10000;

    let total = base;
    if (formData.services.includes("Packing")) total += 1500;
    if (formData.services.includes("Cleaning")) total += 2000;
    if (formData.services.includes("Painting")) total += 5000;
    if (formData.services.includes("Appliance installation")) total += 800;
    if (formData.services.includes("Move-out inspection")) total += 499;

    setEstimate(total);
    setStep(8);
  };

  const slideVariants = {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -30, scale: 0.95, transition: { duration: 0.3 } }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfbf8] text-[#1c1f22]">
      {/* Background Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-teal-50 blur-[120px] opacity-60"></div>
      </div>

      <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-3xl h-16 rounded-full bg-white/70 backdrop-blur-xl border border-white/50 shadow-sm flex items-center justify-between px-6">
          <Link href="/" className="font-bold text-xl tracking-tight text-[#1c1f22] flex items-center gap-2">
            <Home className="h-6 w-6 text-teal-700" />
            HouseReady
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium text-gray-400">
              Step {Math.min(step, 7)} / 7
            </div>
            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden hidden sm:block">
              <motion.div 
                className="h-full bg-teal-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(Math.min(step, 7) / 7) * 100}%` }}
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
              <motion.div key="step1" variants={slideVariants} initial="initial" animate="animate" exit="exit">
                <Card className="shadow-antigravity border-0 bg-white/80 backdrop-blur-xl rounded-3xl p-2">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">What are you planning?</CardTitle>
                    <CardDescription className="text-base font-light">Select the type of service you need help with.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    {["Move Out", "Move", "Move In", "Complete Move"].map((plan) => (
                      <Button
                        key={plan}
                        variant="outline"
                        className={`h-16 justify-start text-lg rounded-2xl border-2 transition-all ${formData.planType === plan ? 'border-teal-500 bg-teal-50 text-teal-900' : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'}`}
                        onClick={() => {
                          setFormData({ ...formData, planType: plan });
                          setTimeout(handleNext, 300); // slight delay to show selection
                        }}
                      >
                        {plan}
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Other steps follow similar structure ... */}
            {step === 2 && (
              <motion.div key="step2" variants={slideVariants} initial="initial" animate="animate" exit="exit">
                <Card className="shadow-antigravity border-0 bg-white/80 backdrop-blur-xl rounded-3xl p-2">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">Where are you moving from?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Label className="text-gray-500 font-light">Locality in Pune</Label>
                      <Input 
                        placeholder="e.g. Wakad" 
                        className="h-14 text-lg rounded-2xl bg-gray-50/50 border-gray-200 focus-visible:ring-teal-500"
                        value={formData.fromLocality}
                        onChange={(e) => setFormData({ ...formData, fromLocality: e.target.value })}
                        autoFocus
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between mt-4">
                    <Button variant="ghost" className="rounded-full text-gray-500" onClick={handleBack}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                    <Button className="bg-[#1c1f22] text-white rounded-full px-8 h-12" onClick={handleNext} disabled={!formData.fromLocality}>Next <ArrowRight className="ml-2 h-4 w-4" /></Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" variants={slideVariants} initial="initial" animate="animate" exit="exit">
                <Card className="shadow-antigravity border-0 bg-white/80 backdrop-blur-xl rounded-3xl p-2">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">Where are you moving to?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Label className="text-gray-500 font-light">Destination Locality</Label>
                      <Input 
                        placeholder="e.g. Kharadi" 
                        className="h-14 text-lg rounded-2xl bg-gray-50/50 border-gray-200 focus-visible:ring-teal-500"
                        value={formData.toLocality}
                        onChange={(e) => setFormData({ ...formData, toLocality: e.target.value })}
                        autoFocus
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between mt-4">
                    <Button variant="ghost" className="rounded-full text-gray-500" onClick={handleBack}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                    <Button className="bg-[#1c1f22] text-white rounded-full px-8 h-12" onClick={handleNext} disabled={!formData.toLocality}>Next <ArrowRight className="ml-2 h-4 w-4" /></Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" variants={slideVariants} initial="initial" animate="animate" exit="exit">
                <Card className="shadow-antigravity border-0 bg-white/80 backdrop-blur-xl rounded-3xl p-2">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">Home size</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4">
                    {["1 BHK", "2 BHK", "3 BHK", "4+ BHK"].map((bhk) => (
                      <Button
                        key={bhk}
                        variant="outline"
                        className={`h-20 text-lg rounded-2xl border-2 transition-all ${formData.bhk === bhk ? 'border-teal-500 bg-teal-50 text-teal-900' : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'}`}
                        onClick={() => {
                          setFormData({ ...formData, bhk });
                          setTimeout(handleNext, 300);
                        }}
                      >
                        {bhk}
                      </Button>
                    ))}
                  </CardContent>
                  <CardFooter className="flex justify-between mt-4">
                    <Button variant="ghost" className="rounded-full text-gray-500" onClick={handleBack}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div key="step5" variants={slideVariants} initial="initial" animate="animate" exit="exit">
                <Card className="shadow-antigravity border-0 bg-white/80 backdrop-blur-xl rounded-3xl p-2">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">Move date</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Input 
                      type="date" 
                      className="h-14 text-lg rounded-2xl bg-gray-50/50 border-gray-200 focus-visible:ring-teal-500"
                      value={formData.moveDate}
                      onChange={(e) => setFormData({ ...formData, moveDate: e.target.value })}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between mt-4">
                    <Button variant="ghost" className="rounded-full text-gray-500" onClick={handleBack}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                    <Button className="bg-[#1c1f22] text-white rounded-full px-8 h-12" onClick={handleNext} disabled={!formData.moveDate}>Next <ArrowRight className="ml-2 h-4 w-4" /></Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div key="step6" variants={slideVariants} initial="initial" animate="animate" exit="exit">
                <Card className="shadow-antigravity border-0 bg-white/80 backdrop-blur-xl rounded-3xl p-2">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">What do you need?</CardTitle>
                    <CardDescription className="font-light">Select all the services you require.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {["Packing", "Moving", "Cleaning", "Painting", "Repairs", "Appliance installation", "Furniture assembly", "Pest control", "Move-out inspection", "Other"].map((service) => (
                        <div key={service} className={`flex items-center space-x-3 border-2 p-4 rounded-2xl cursor-pointer transition-colors ${formData.services.includes(service) ? 'border-teal-500 bg-teal-50' : 'border-gray-100 bg-white hover:bg-gray-50 hover:border-gray-200'}`} onClick={() => handleCheckboxChange(service, !formData.services.includes(service))}>
                          <Checkbox 
                            id={service} 
                            checked={formData.services.includes(service)}
                            onCheckedChange={(checked) => handleCheckboxChange(service, checked as boolean)}
                            className="pointer-events-none"
                          />
                          <label className="text-sm font-medium cursor-pointer flex-grow text-gray-700">
                            {service}
                          </label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between mt-4">
                    <Button variant="ghost" className="rounded-full text-gray-500" onClick={handleBack}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                    <Button className="bg-[#1c1f22] text-white rounded-full px-8 h-12" onClick={handleNext} disabled={formData.services.length === 0}>Next <ArrowRight className="ml-2 h-4 w-4" /></Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {step === 7 && (
              <motion.div key="step7" variants={slideVariants} initial="initial" animate="animate" exit="exit">
                <Card className="shadow-antigravity border-0 bg-white/80 backdrop-blur-xl rounded-3xl p-2">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">Your details</CardTitle>
                    <CardDescription className="font-light">Where should we send your estimate?</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="space-y-2">
                      <Label className="text-gray-500 font-light">Name</Label>
                      <Input 
                        placeholder="Enter your name"
                        className="h-14 text-lg rounded-2xl bg-gray-50/50 border-gray-200 focus-visible:ring-teal-500"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-500 font-light">Phone Number</Label>
                      <Input 
                        type="tel" 
                        placeholder="+91"
                        className="h-14 text-lg rounded-2xl bg-gray-50/50 border-gray-200 focus-visible:ring-teal-500"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between mt-4">
                    <Button variant="ghost" className="rounded-full text-gray-500" onClick={handleBack}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                    <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-8 h-12 shadow-md hover:shadow-lg transition-all" onClick={calculateEstimate} disabled={!formData.name || !formData.phone}>
                      Get My Estimate
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            )}

            {step === 8 && (
              <motion.div key="step8" variants={slideVariants} initial="initial" animate="animate" exit="exit">
                <Card className="shadow-antigravity border-0 bg-white/80 backdrop-blur-xl rounded-3xl text-center py-8 px-4">
                  <CardHeader>
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                      className="mx-auto w-20 h-20 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center mb-6 shadow-glow"
                    >
                      <CheckCircle2 className="h-10 w-10 text-white" />
                    </motion.div>
                    <CardTitle className="text-3xl font-bold mb-2">Your Estimate</CardTitle>
                    <CardDescription className="text-lg font-light">Based on {formData.bhk} moving from {formData.fromLocality} to {formData.toLocality}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-6xl font-bold text-[#1c1f22] mb-8 tracking-tighter">
                      ₹{estimate?.toLocaleString()}*
                    </div>
                    
                    <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 text-left mb-8 border border-white">
                      <h4 className="font-semibold mb-4 text-gray-900">Included Services:</h4>
                      <ul className="space-y-3">
                        {formData.services.map(s => (
                          <li key={s} className="flex items-center gap-3 text-sm text-gray-600 font-light">
                            <CheckCircle2 className="h-5 w-5 text-teal-500" /> {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <Link href="/dashboard" className="block w-full">
                        <Button className="w-full bg-[#1c1f22] text-white h-14 rounded-full text-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                          Confirm & View Dashboard
                        </Button>
                      </Link>
                      <Link href={`https://wa.me/919000000000?text=Hi, I want help planning my move from ${formData.fromLocality} to ${formData.toLocality} on ${formData.moveDate}. ${formData.bhk}. I need ${formData.services.join(", ")}.`} className="block w-full" target="_blank">
                        <Button variant="outline" className="w-full border-2 border-teal-600 text-teal-700 h-14 rounded-full text-lg hover:bg-teal-50 transition-colors">
                          Chat on WhatsApp
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
