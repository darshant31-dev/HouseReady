"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const stories = [
  {
    id: "rent-ready",
    title: "Make it Rent-Ready",
    situation: "Tenant Moved Out",
    condition: "Scuffed walls, dusty fixtures, minor plumbing leaks.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop", // Warm, realistic room
    services: ["Deep Cleaning", "Wall Touch-ups", "Plumbing Repairs", "Pest Control"],
    outcome: "Ready for the next tenant to move in immediately."
  },
  {
    id: "move-in",
    title: "Make it Move-In Ready",
    situation: "Just Got Possession",
    condition: "Construction dust, no appliances, bare walls.",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop", // Empty apartment feel
    services: ["Post-construction Cleaning", "Appliance Setup", "Fixture Checks", "Furniture Assembly"],
    outcome: "Your new home is clean, safe, and ready to live in."
  },
  {
    id: "sell-ready",
    title: "Make it Sell-Ready",
    situation: "Listing Property for Sale",
    condition: "Cluttered, dim lighting, visible wear and tear.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop", // Modern, well-lit Indian-style living area
    services: ["Decluttering", "Premium Deep Clean", "Lighting Upgrades", "Professional Staging"],
    outcome: "Maximizes property valuation and accelerates sale."
  }
];

export function TransformationStories() {
  const [activeStory, setActiveStory] = useState(0);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {stories.map((story, idx) => (
          <button
            key={story.id}
            onClick={() => setActiveStory(idx)}
            className={`px-6 py-3 rounded-full font-bold text-sm sm:text-base transition-all ${
              activeStory === idx 
                ? 'bg-teal-900 text-white shadow-antigravity' 
                : 'bg-white text-gray-500 border border-gray-200 hover:border-teal-300 hover:bg-teal-50'
            }`}
          >
            {story.title}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[3rem] p-6 sm:p-12 shadow-sm border border-gray-100 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Story Flow */}
            <div>
              <div className="mb-10">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Before</div>
                <h3 className="text-2xl font-bold text-[#1c1f22] mb-1">{stories[activeStory].situation}</h3>
                <p className="text-gray-500 font-medium">{stories[activeStory].condition}</p>
              </div>

              <div className="pl-6 border-l-2 border-teal-100 mb-10 relative">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-teal-100 border-2 border-white"></div>
                <div className="text-xs font-bold text-teal-600 uppercase tracking-widest mb-4">What We Coordinate</div>
                <ul className="space-y-3">
                  {stories[activeStory].services.map((service, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-500" />
                      <span className="font-bold text-gray-700">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">After</div>
                <h3 className="text-2xl font-bold text-[#1c1f22] mb-1">{stories[activeStory].title}</h3>
                <p className="text-gray-500 font-medium mb-6">{stories[activeStory].outcome}</p>
                <Link href={`/planner?goal=${encodeURIComponent(stories[activeStory].title.replace('Make it ', '').replace('-', ' '))}`}>
                  <Button className="bg-teal-50 text-teal-800 hover:bg-teal-100 rounded-full h-12 px-8 font-bold">
                    Start This Plan <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Outcome Image */}
            <div className="relative h-[400px] lg:h-[500px] w-full rounded-[2rem] overflow-hidden shadow-md group">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${stories[activeStory].image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-3">
                  The Outcome
                </div>
                <h4 className="text-white text-2xl font-bold">{stories[activeStory].title}</h4>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
