import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ArrowRight, ShieldCheck, MapPin, Package, Wrench, Home, MessageSquare } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fdfbf7] text-[#1c1f22]">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-[#fdfbf7]/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tight text-[#1c1f22] flex items-center gap-2">
            <Home className="h-6 w-6 text-teal-700" />
            HouseReady
          </Link>
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-600">
            <Link href="/move-out" className="hover:text-[#1c1f22] transition-colors">Move-Out Check</Link>
            <Link href="#services" className="hover:text-[#1c1f22] transition-colors">Services</Link>
            <Link href="#why-us" className="hover:text-[#1c1f22] transition-colors">Why Us</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="https://wa.me/919000000000" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="hidden sm:flex border-teal-700 text-teal-700 hover:bg-teal-50">
                <MessageSquare className="mr-2 h-4 w-4" />
                WhatsApp Us
              </Button>
            </Link>
            <Link href="/pricing">
              <Button className="bg-[#1c1f22] text-white hover:bg-[#1c1f22]/90">
                Plan My Move
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-20 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-sm text-teal-800 mb-8">
              <MapPin className="mr-2 h-4 w-4" />
              Now live in Hinjawadi, Wakad, Baner & Balewadi
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#1c1f22] mb-6 max-w-4xl mx-auto leading-tight">
              Moving homes is stressful.<br />
              <span className="text-teal-700">Moving with us isn't.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              From rental handover to your new home's setup, we coordinate the people, services and details — so you don't have to.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/pricing" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-[#1c1f22] text-white hover:bg-gray-800 text-base h-12 px-8">
                  Plan My Move
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/move-out" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50 text-base h-12 px-8">
                  Check Move-Out Cost
                </Button>
              </Link>
            </div>
            
            <div className="mt-16 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-6 font-medium uppercase tracking-wider">One move. One price. One responsible team.</p>
              <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
                <div className="flex items-center gap-2"><ShieldCheck className="text-teal-700 h-5 w-5" /><span className="font-medium text-sm">Verified Providers</span></div>
                <div className="flex items-center gap-2"><CheckCircle2 className="text-teal-700 h-5 w-5" /><span className="font-medium text-sm">Transparent Pricing</span></div>
                <div className="flex items-center gap-2"><Package className="text-teal-700 h-5 w-5" /><span className="font-medium text-sm">End-to-End Coordination</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white" id="how-it-works">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">You're not hiring five vendors. You're hiring us.</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">We manage the entire lifecycle of your move. Book once, and let our team of verified service partners handle the rest under our strict supervision.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-none shadow-sm bg-[#fdfbf7]">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center text-teal-700 mb-4">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">1. Move-Out Inspection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">We inspect your old flat, give you a checklist of fixes needed to avoid deposit deductions, and arrange the repairs.</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-[#fdfbf7]">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center text-teal-700 mb-4">
                    <Package className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">2. Professional Move</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Our verified packers and movers safely transport your belongings with complete inventory documentation.</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm bg-[#fdfbf7]">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center text-teal-700 mb-4">
                    <Wrench className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">3. Move-In Ready</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Deep cleaning, appliance installation, and furniture assembly before you even unpack.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Move Out Feature Section */}
        <section className="py-20 px-4 bg-[#1c1f22] text-white">
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Leaving your rented home?</h2>
                <p className="text-gray-400 mb-6 text-lg">
                  Find out what needs to be fixed before handover — and get it sorted without chasing multiple vendors. Reduce the risk of avoidable deductions from your security deposit.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-teal-400 h-6 w-6 shrink-0" />
                    <span className="text-gray-300">Upload your rental agreement and photos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-teal-400 h-6 w-6 shrink-0" />
                    <span className="text-gray-300">Get a detailed move-out checklist</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-teal-400 h-6 w-6 shrink-0" />
                    <span className="text-gray-300">Book deep cleaning, painting, and minor repairs</span>
                  </li>
                </ul>
                <Link href="/move-out">
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white h-12 px-8">
                    Start My Move-Out Check
                  </Button>
                </Link>
                <p className="text-sm text-gray-500 mt-4">*Indicative pricing starts from ₹499</p>
              </div>
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <ShieldCheck className="w-48 h-48" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                      <ShieldCheck className="text-teal-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Handover Preparation</h3>
                      <p className="text-gray-400 text-sm">Document condition accurately</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Deep Cleaning</span>
                        <span className="text-teal-400 text-sm font-medium">Included</span>
                      </div>
                      <p className="text-xs text-gray-400">1BHK standard cleaning before keys handover</p>
                    </div>
                    <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">AC Uninstallation</span>
                        <span className="text-teal-400 text-sm font-medium">Included</span>
                      </div>
                      <p className="text-xs text-gray-400">Professional safe removal</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="py-20 bg-white" id="services">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Choose your level of comfort</h2>
              <p className="text-gray-600">Select a bundle that fits your needs. We coordinate everything.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Package 1 */}
              <Card className="flex flex-col border-gray-200">
                <CardHeader>
                  <CardTitle className="text-xl">Essential Move</CardTitle>
                  <CardDescription>For customers who only need basic moving.</CardDescription>
                  <div className="mt-4 font-bold text-2xl">From ₹3,500*</div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0" /> Packing & Loading</li>
                    <li className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0" /> Safe Transportation</li>
                    <li className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0" /> Unloading</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/pricing" className="w-full">
                    <Button variant="outline" className="w-full">Get Quote</Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Package 2 */}
              <Card className="flex flex-col border-teal-600 shadow-md relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-teal-600 text-white px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider">Most Popular</div>
                <CardHeader>
                  <CardTitle className="text-xl">Easy Move</CardTitle>
                  <CardDescription>Moving + cleaning + selected setup services.</CardDescription>
                  <div className="mt-4 font-bold text-2xl">From ₹6,500*</div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0" /> Everything in Essential</li>
                    <li className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0" /> Move-in Deep Cleaning</li>
                    <li className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0" /> Basic Appliance Setup</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/pricing" className="w-full">
                    <Button className="w-full bg-teal-600 hover:bg-teal-700">Get Quote</Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Package 3 */}
              <Card className="flex flex-col border-gray-200">
                <CardHeader>
                  <CardTitle className="text-xl">Zero-Hassle</CardTitle>
                  <CardDescription>End-to-end managed moving experience.</CardDescription>
                  <div className="mt-4 font-bold text-2xl">From ₹12,000*</div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0" /> Move-out inspection & prep</li>
                    <li className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0" /> Premium Packing & Moving</li>
                    <li className="flex items-start gap-2 text-sm text-gray-600"><CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0" /> Move-in Cleaning & Full Setup</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/pricing" className="w-full">
                    <Button variant="outline" className="w-full">Get Quote</Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
            <p className="text-center text-xs text-gray-500 mt-6">*Sample prototype pricing only.</p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-100 py-12 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="font-bold text-xl tracking-tight text-[#1c1f22] flex items-center gap-2 mb-4">
                <Home className="h-6 w-6 text-teal-700" />
                HouseReady
              </Link>
              <p className="text-gray-500 text-sm max-w-xs mb-6">
                An end-to-end rental move management platform for Indian renters. 
                Moving homes is stressful. Moving with us isn't.
              </p>
              <div className="text-sm font-medium text-gray-700">Currently serving: Pune (Hinjawadi, Wakad, Baner, Balewadi)</div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="/pricing" className="hover:text-teal-700">Move Packages</Link></li>
                <li><Link href="/move-out" className="hover:text-teal-700">Move-Out Check</Link></li>
                <li><Link href="#" className="hover:text-teal-700">Deep Cleaning</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link href="#" className="hover:text-teal-700">About Us</Link></li>
                <li><Link href="#" className="hover:text-teal-700">Moving Guide (Pune)</Link></li>
                <li><Link href="#" className="hover:text-teal-700">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} HouseReady. Prototype Application.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" className="hover:text-teal-700">Terms</Link>
              <Link href="#" className="hover:text-teal-700">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:hidden z-50 flex gap-2">
        <Link href="https://wa.me/919000000000" className="flex-1">
          <Button variant="outline" className="w-full border-teal-700 text-teal-700 h-12">
            WhatsApp
          </Button>
        </Link>
        <Link href="/pricing" className="flex-1">
          <Button className="w-full bg-[#1c1f22] text-white h-12">
            Plan My Move
          </Button>
        </Link>
      </div>
    </div>
  );
}
