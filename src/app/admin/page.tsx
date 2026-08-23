import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard, Users, Truck, Settings, FileText, IndianRupee } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1c1f22] text-white flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-800">
          <Link href="/" className="font-bold text-xl flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-teal-500"></div>
            Admin Panel
          </Link>
        </div>
        <nav className="flex-grow py-4 px-3 space-y-1">
          <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-md bg-teal-600 text-white">
            <LayoutDashboard className="w-5 h-5" /> Orders
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 text-gray-300">
            <Users className="w-5 h-5" /> Customers
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 text-gray-300">
            <Truck className="w-5 h-5" /> Vendors
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 text-gray-300">
            <IndianRupee className="w-5 h-5" /> Payments
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 text-gray-300">
            <FileText className="w-5 h-5" /> Issues & Reviews
          </Link>
        </nav>
      </aside>

      <main className="flex-grow flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold">Orders Overview</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">Download Report</Button>
            <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 flex-grow space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Active Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Revenue (MTD)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">₹1.2L</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Vendors Active</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-500">2</div>
              </CardContent>
            </Card>
          </div>

          {/* Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Route</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Margin</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">#HR-8832</TableCell>
                    <TableCell>John D.<br/><span className="text-xs text-gray-500">+91 9876543210</span></TableCell>
                    <TableCell>15 Sep</TableCell>
                    <TableCell>Wakad → Kharadi</TableCell>
                    <TableCell>₹9,000</TableCell>
                    <TableCell className="text-teal-600 font-medium">15%</TableCell>
                    <TableCell><Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Vendor Assigned</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">#HR-8831</TableCell>
                    <TableCell>Priya S.<br/><span className="text-xs text-gray-500">+91 9123456789</span></TableCell>
                    <TableCell>14 Sep</TableCell>
                    <TableCell>Baner (Move-Out Only)</TableCell>
                    <TableCell>₹1,499</TableCell>
                    <TableCell className="text-teal-600 font-medium">20%</TableCell>
                    <TableCell><Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Inspection Pending</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">#HR-8830</TableCell>
                    <TableCell>Rahul K.<br/><span className="text-xs text-gray-500">+91 9988776655</span></TableCell>
                    <TableCell>12 Sep</TableCell>
                    <TableCell>Hinjawadi → Balewadi</TableCell>
                    <TableCell>₹12,500</TableCell>
                    <TableCell className="text-teal-600 font-medium">18%</TableCell>
                    <TableCell><Badge className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
