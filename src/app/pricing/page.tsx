"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Home, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

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
    // Mock Pricing Logic
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

  return (
    <div className="flex flex-col min-h-screen bg-[#fdfbf7] text-[#1c1f22]">
      <header className="sticky top-0 z-50 bg-[#fdfbf7]/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tight text-[#1c1f22] flex items-center gap-2">
            <Home className="h-6 w-6 text-teal-700" />
            HouseReady
          </Link>
          <div className="text-sm font-medium text-gray-500">
            Step {Math.min(step, 7)} of 7
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-2xl">
          {step === 1 && (
            <Card className="shadow-lg border-none">
              <CardHeader>
                <CardTitle className="text-2xl">What are you planning?</CardTitle>
                <CardDescription>Select the type of service you need help with.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {["Move Out", "Move", "Move In", "Complete Move"].map((plan) => (
                  <Button
                    key={plan}
                    variant={formData.planType === plan ? "default" : "outline"}
                    className={`h-14 justify-start text-lg ${formData.planType === plan ? 'bg-teal-600 hover:bg-teal-700' : ''}`}
                    onClick={() => {
                      setFormData({ ...formData, planType: plan });
                      handleNext();
                    }}
                  >
                    {plan}
                  </Button>
                ))}
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card className="shadow-lg border-none">
              <CardHeader>
                <CardTitle className="text-2xl">Where are you moving from?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label>Locality in Pune</Label>
                  <Input 
                    placeholder="e.g. Wakad" 
                    className="h-12 text-lg"
                    value={formData.fromLocality}
                    onChange={(e) => setFormData({ ...formData, fromLocality: e.target.value })}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={handleBack}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                <Button className="bg-[#1c1f22]" onClick={handleNext} disabled={!formData.fromLocality}>Next <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </CardFooter>
            </Card>
          )}

          {step === 3 && (
            <Card className="shadow-lg border-none">
              <CardHeader>
                <CardTitle className="text-2xl">Where are you moving to?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label>Destination Locality</Label>
                  <Input 
                    placeholder="e.g. Kharadi" 
                    className="h-12 text-lg"
                    value={formData.toLocality}
                    onChange={(e) => setFormData({ ...formData, toLocality: e.target.value })}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={handleBack}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                <Button className="bg-[#1c1f22]" onClick={handleNext} disabled={!formData.toLocality}>Next <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </CardFooter>
            </Card>
          )}

          {step === 4 && (
            <Card className="shadow-lg border-none">
              <CardHeader>
                <CardTitle className="text-2xl">Home size</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                {["1 BHK", "2 BHK", "3 BHK", "4+ BHK"].map((bhk) => (
                  <Button
                    key={bhk}
                    variant={formData.bhk === bhk ? "default" : "outline"}
                    className={`h-16 text-lg ${formData.bhk === bhk ? 'bg-teal-600 hover:bg-teal-700' : ''}`}
                    onClick={() => {
                      setFormData({ ...formData, bhk });
                      handleNext();
                    }}
                  >
                    {bhk}
                  </Button>
                ))}
              </CardContent>
              <CardFooter className="flex justify-between mt-4">
                <Button variant="ghost" onClick={handleBack}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
              </CardFooter>
            </Card>
          )}

          {step === 5 && (
            <Card className="shadow-lg border-none">
              <CardHeader>
                <CardTitle className="text-2xl">Move date</CardTitle>
              </CardHeader>
              <CardContent>
                <Input 
                  type="date" 
                  className="h-12 text-lg"
                  value={formData.moveDate}
                  onChange={(e) => setFormData({ ...formData, moveDate: e.target.value })}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={handleBack}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                <Button className="bg-[#1c1f22]" onClick={handleNext} disabled={!formData.moveDate}>Next <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </CardFooter>
            </Card>
          )}

          {step === 6 && (
            <Card className="shadow-lg border-none">
              <CardHeader>
                <CardTitle className="text-2xl">What do you need?</CardTitle>
                <CardDescription>Select all the services you require.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {["Packing", "Moving", "Cleaning", "Painting", "Repairs", "Appliance installation", "Furniture assembly", "Pest control", "Move-out inspection", "Other"].map((service) => (
                    <div key={service} className="flex items-center space-x-2 border p-4 rounded-lg hover:bg-gray-50">
                      <Checkbox 
                        id={service} 
                        checked={formData.services.includes(service)}
                        onCheckedChange={(checked) => handleCheckboxChange(service, checked as boolean)}
                      />
                      <label htmlFor={service} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-grow">
                        {service}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between mt-4">
                <Button variant="ghost" onClick={handleBack}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                <Button className="bg-[#1c1f22]" onClick={handleNext} disabled={formData.services.length === 0}>Next <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </CardFooter>
            </Card>
          )}

          {step === 7 && (
            <Card className="shadow-lg border-none">
              <CardHeader>
                <CardTitle className="text-2xl">Your details</CardTitle>
                <CardDescription>Where should we send your estimate?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input 
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input 
                    type="tel" 
                    placeholder="+91"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email (Optional)</Label>
                  <Input 
                    type="email" 
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={handleBack}><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
                <Button className="bg-teal-600 hover:bg-teal-700 h-12 px-8 text-lg" onClick={calculateEstimate} disabled={!formData.name || !formData.phone}>
                  Get My Estimate
                </Button>
              </CardFooter>
            </Card>
          )}

          {step === 8 && (
            <Card className="shadow-lg border-none text-center py-8">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-8 w-8 text-teal-600" />
                </div>
                <CardTitle className="text-3xl mb-2">Your Estimate</CardTitle>
                <CardDescription className="text-lg">Based on {formData.bhk} moving from {formData.fromLocality} to {formData.toLocality}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold text-[#1c1f22] mb-6">
                  ₹{estimate?.toLocaleString()}*
                </div>
                <p className="text-sm text-gray-500 mb-8">*This is a sample estimate for prototyping purposes.</p>
                
                <div className="bg-gray-50 rounded-lg p-6 text-left mb-8 border border-gray-100">
                  <h4 className="font-semibold mb-4">Included Services:</h4>
                  <ul className="space-y-2">
                    {formData.services.map(s => (
                      <li key={s} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="h-4 w-4 text-teal-600" /> {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <Link href="/dashboard" className="block w-full">
                    <Button className="w-full bg-[#1c1f22] text-white h-12 text-lg">
                      Confirm & View Dashboard
                    </Button>
                  </Link>
                  <Link href={`https://wa.me/919000000000?text=Hi, I want help planning my move from ${formData.fromLocality} to ${formData.toLocality} on ${formData.moveDate}. ${formData.bhk}. I need ${formData.services.join(", ")}.`} className="block w-full" target="_blank">
                    <Button variant="outline" className="w-full border-teal-600 text-teal-700 h-12 text-lg hover:bg-teal-50">
                      Chat on WhatsApp
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
