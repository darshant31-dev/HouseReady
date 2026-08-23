import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, MapPin, Calendar, Clock, FileText, CheckCircle2, ChevronRight, MessageSquare, Download } from "lucide-react";

export default function CustomerDashboard() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fdfbf7] text-[#1c1f22]">
      <header className="sticky top-0 z-50 bg-[#fdfbf7]/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl tracking-tight text-[#1c1f22] flex items-center gap-2">
            <Home className="h-6 w-6 text-teal-700" />
            HouseReady
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold">
              JD
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back, John</h1>
            <p className="text-gray-600">Here's the status of your upcoming move.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Active Move Card */}
              <Card className="border-teal-100 shadow-md">
                <CardHeader className="bg-teal-50/50 border-b border-teal-100 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-200 border-none mb-2">Vendor Assigned</Badge>
                      <CardTitle className="text-xl">Move to Kharadi</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Calendar className="w-4 h-4" /> 15 September 2026
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Order ID</div>
                      <div className="font-mono font-medium">#HR-8832</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-6 mb-8">
                    <div className="flex-1 relative">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-1">
                          <MapPin className="w-4 h-4 text-gray-500" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider">From</div>
                          <div className="font-medium">Wakad, 2 BHK</div>
                          <div className="text-sm text-gray-600 mt-1">10:00 AM Pickup</div>
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block w-px bg-gray-200"></div>
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center shrink-0 mt-1">
                          <MapPin className="w-4 h-4 text-teal-600" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider">To</div>
                          <div className="font-medium">Kharadi</div>
                          <div className="text-sm text-gray-600 mt-1">Estimated 2:00 PM Drop</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-500">Move Timeline</h4>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <CheckCircle2 className="w-5 h-5 text-teal-600" />
                          <div className="w-px h-full bg-teal-600 my-1"></div>
                        </div>
                        <div className="pb-4">
                          <div className="font-medium">Booking Confirmed</div>
                          <div className="text-xs text-gray-500">Payment received</div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <CheckCircle2 className="w-5 h-5 text-teal-600" />
                          <div className="w-px h-full bg-gray-200 my-1"></div>
                        </div>
                        <div className="pb-4">
                          <div className="font-medium">Vendor Assigned</div>
                          <div className="text-xs text-gray-500">SafeMove Packers & Movers</div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white"></div>
                          <div className="w-px h-full bg-gray-200 my-1"></div>
                        </div>
                        <div className="pb-4">
                          <div className="font-medium text-gray-500">Packing & Loading</div>
                          <div className="text-xs text-gray-400">Scheduled for 15 Sep, 10 AM</div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white"></div>
                        </div>
                        <div>
                          <div className="font-medium text-gray-500">Delivery & Setup</div>
                          <div className="text-xs text-gray-400">Pending</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Documents */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Documents & Reports</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <FileText className="text-red-500" />
                      <div>
                        <div className="font-medium text-sm">Pre-Move Inspection Report</div>
                        <div className="text-xs text-gray-500">PDF • Added 2 days ago</div>
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <FileText className="text-blue-500" />
                      <div>
                        <div className="font-medium text-sm">Payment Receipt</div>
                        <div className="text-xs text-gray-500">PDF • Added 3 days ago</div>
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              {/* Services Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Services Booked</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-600">2 BHK Packing & Moving</span>
                      <span className="font-medium">₹5,500</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-600">Move-in Deep Cleaning</span>
                      <span className="font-medium">₹2,000</span>
                    </li>
                    <li className="flex justify-between text-sm">
                      <span className="text-gray-600">AC Installation (x2)</span>
                      <span className="font-medium">₹1,500</span>
                    </li>
                  </ul>
                  <div className="pt-4 border-t flex justify-between font-bold">
                    <span>Total Paid</span>
                    <span>₹9,000</span>
                  </div>
                </CardContent>
              </Card>

              {/* Support */}
              <Card className="bg-gray-50 border-none shadow-inner">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <MessageSquare className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Need help with your move?</h3>
                  <p className="text-sm text-gray-500 mb-4">Your dedicated move manager is available on WhatsApp.</p>
                  <Link href="https://wa.me/919000000000" target="_blank">
                    <Button className="w-full bg-[#25D366] hover:bg-[#1ebd5a] text-white">
                      Chat with Support
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
