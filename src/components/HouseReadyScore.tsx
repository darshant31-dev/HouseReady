"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HouseReadyScore() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(100);
  
  const questions = [
    "Is the kitchen ready?",
    "Are the bathrooms ready?",
    "Are walls in good condition?",
    "Are lights and fans working?",
    "Any plumbing problems?",
    "Any pest problems?",
    "Is furniture assembled?",
    "Is the property clean?"
  ];

  const handleAnswer = (isReady: boolean) => {
    if (!isReady) setScore(prev => prev - 12);
    setStep(prev => prev + 1);
  };

  if (step >= questions.length) {
    return (
      <div className="bg-[#1c1f22] text-white rounded-[3rem] p-10 md:p-14 shadow-antigravity text-center">
        <h3 className="text-sm font-bold text-teal-400 mb-6 uppercase tracking-widest">House Ready Score</h3>
        <div className="text-7xl font-bold mb-4">{Math.max(score, 0)}<span className="text-4xl text-gray-500">/100</span></div>
        <p className="text-xl font-bold mb-8">
          {score > 80 ? "Your house is almost ready." : "Your house needs some work."}
        </p>
        <div className="max-w-md mx-auto space-y-4 mb-8 text-left bg-white/5 p-6 rounded-2xl">
          <p className="text-sm text-gray-400 font-bold uppercase">We found issues to fix:</p>
          <div className="flex items-center gap-3"><AlertCircle className="w-5 h-5 text-orange-400" /> Deep cleaning required</div>
          <div className="flex items-center gap-3"><AlertCircle className="w-5 h-5 text-orange-400" /> Plumbing & electrical checks</div>
        </div>
        <Button className="bg-white text-[#1c1f22] hover:bg-gray-100 rounded-full h-14 px-10 font-bold shadow-glow">
          Fix These For Me <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
      <h3 className="text-sm font-bold text-gray-400 mb-8 uppercase tracking-widest">How ready is your house? Find out in 60s.</h3>
      <div className="text-3xl md:text-4xl font-bold mb-12 h-16 flex items-center justify-center">
        {questions[step]}
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button onClick={() => handleAnswer(true)} variant="outline" className="h-16 px-8 rounded-full border-gray-200 text-lg font-bold hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200">
          <CheckCircle2 className="w-5 h-5 mr-2" /> Yes, it's ready
        </Button>
        <Button onClick={() => handleAnswer(false)} variant="outline" className="h-16 px-8 rounded-full border-gray-200 text-lg font-bold hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200">
          <AlertCircle className="w-5 h-5 mr-2" /> No / Not sure
        </Button>
      </div>
      <div className="mt-8 flex justify-center gap-2">
        {questions.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-full ${i === step ? 'bg-teal-600' : i < step ? 'bg-teal-200' : 'bg-gray-100'}`}></div>
        ))}
      </div>
    </div>
  );
}
