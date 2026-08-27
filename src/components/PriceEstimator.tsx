"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, ArrowRight, Building, Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function PriceEstimator() {
  const [size, setSize] = useState("2 BHK");
  const [condition, setCondition] = useState("average");
  const [goal, setGoal] = useState("move-in");

  const sizes = ["1 BHK", "2 BHK", "3 BHK", "Villa"];
  const conditions = [
    { id: "good", label: "Good", mult: 1 },
    { id: "average", label: "Average", mult: 1.3 },
    { id: "poor", label: "Needs Work", mult: 1.8 }
  ];
  const goals = [
    { id: "move-in", label: "Move In", base: 4500 },
    { id: "move-out", label: "Move Out", base: 5500 },
    { id: "rent", label: "Rent", base: 6000 },
    { id: "sell", label: "Sell", base: 8000 }
  ];

  const calculateEstimate = () => {
    const sizeMultiplier = size === "1 BHK" ? 1 : size === "2 BHK" ? 1.5 : size === "3 BHK" ? 2 : 3;
    const conditionMultiplier = conditions.find(c => c.id === condition)?.mult || 1;
    const baseCost = goals.find(g => g.id === goal)?.base || 4500;

    const total = baseCost * sizeMultiplier * conditionMultiplier;
    return {
      min: Math.floor(total * 0.9 / 100) * 100,
      max: Math.ceil(total * 1.1 / 100) * 100
    };
  };

  const estimate = calculateEstimate();

  return (
    <div className="bg-white rounded-[3rem] p-8 sm:p-12 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-12 items-center hover:shadow-antigravity transition-shadow duration-500">
      
      <div className="md:w-1/2 space-y-8 w-full">
        <div>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Goal</h3>
          <div className="flex flex-wrap gap-2">
            {goals.map(g => (
              <button 
                key={g.id}
                onClick={() => setGoal(g.id)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${goal === g.id ? 'bg-teal-700 text-white shadow-sm' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Home Size</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map(s => (
              <button 
                key={s}
                onClick={() => setSize(s)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${size === s ? 'bg-teal-700 text-white shadow-sm' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Current Condition</h3>
          <div className="flex flex-wrap gap-2">
            {conditions.map(c => (
              <button 
                key={c.id}
                onClick={() => setCondition(c.id)}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${condition === c.id ? 'bg-teal-700 text-white shadow-sm' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="md:w-1/2 w-full bg-[#fcfbf8] rounded-[2rem] p-8 sm:p-10 border border-gray-100 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-teal-600"></div>
        <Calculator className="w-8 h-8 text-teal-600 mx-auto mb-6 opacity-50" />
        <h4 className="text-lg font-bold text-gray-600 mb-2">Estimated HouseReady Cost</h4>
        
        <div className="h-20 flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            <motion.div 
              key={`${estimate.min}-${estimate.max}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="text-4xl sm:text-5xl font-bold tracking-tighter text-teal-800"
            >
              ₹{estimate.min.toLocaleString()} <span className="text-3xl text-teal-600/50">–</span> ₹{estimate.max.toLocaleString()}
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="text-xs text-gray-400 font-medium mt-4 mb-8">
          Indicative estimate. Final quote depends on exact scope and partner availability.
        </p>

        <Link href="/planner" className="w-full">
          <Button className="w-full bg-[#1c1f22] text-white hover:bg-gray-800 rounded-full h-14 font-bold shadow-md">
            Get a Confirmed Quote <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>

    </div>
  );
}
