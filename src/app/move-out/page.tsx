import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Home, Upload, FileText, Wrench, ShieldAlert } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MoveOutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fdfbf7] text-[#1c1f22]">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-[#fdfbf7]/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tight text-[#1c1f22] flex items-center gap-2">
            <Home className="h-6 w-6 text-teal-700" />
            HouseReady
          </Link>
          <Link href="/pricing">
            <Button className="bg-[#1c1f22] text-white hover:bg-[#1c1f22]/90">
              Plan My Move
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Leaving your rented home?</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Know what to fix before the final handover. Upload your agreement and current photos, and we'll prepare a checklist to help you avoid avoidable deductions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">How it works</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                    <FileText className="text-teal-700 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">1. Upload agreement & photos</h3>
                    <p className="text-gray-600">Share your rental agreement and current photos/videos of the property.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                    <ShieldAlert className="text-teal-700 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">2. We create a checklist</h3>
                    <p className="text-gray-600">We analyze the condition against standard wear-and-tear clauses to identify avoidable issues.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                    <Wrench className="text-teal-700 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">3. Fix issues through verified providers</h3>
                    <p className="text-gray-600">Book our vetted professionals for cleaning, painting, and repairs before handover.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-teal-700 w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">4. Prepare for handover</h3>
                    <p className="text-gray-600">Get documented proof of the flat's condition upon your exit.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Card className="shadow-lg border-gray-200">
                <CardHeader className="bg-gray-50 border-b border-gray-100 pb-6 rounded-t-xl">
                  <CardTitle>Start My Move-Out Check</CardTitle>
                  <CardDescription>Get started in minutes. Pricing from ₹499.</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="locality">Locality (Pune)</Label>
                    <Input id="locality" placeholder="e.g. Wakad, Baner" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bhk">Home Size</Label>
                    <select id="bhk" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option>1 BHK</option>
                      <option>2 BHK</option>
                      <option>3 BHK</option>
                      <option>4+ BHK</option>
                    </select>
                  </div>
                  <div className="space-y-2 pt-2">
                    <Label>Rental Agreement</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                      <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG up to 10MB</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Property Photos</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer">
                      <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Upload photos of all rooms</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white h-12 text-lg">
                    Submit & Pay ₹499
                  </Button>
                </CardFooter>
              </Card>
              <p className="text-center text-xs text-gray-500 mt-4">*Sample prototype pricing only.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
