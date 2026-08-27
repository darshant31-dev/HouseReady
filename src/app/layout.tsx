import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL('https://houseready.in'), // Update with actual domain
  title: {
    default: "HouseReady | Managed Home Readiness Services in Pune",
    template: "%s | HouseReady"
  },
  description: "Make your house move-in, move-out, or rent-ready in Pune. We coordinate cleaning, painting, plumbing, and repairs so you buy the outcome, not just a service.",
  keywords: ["home readiness", "move in cleaning", "move out painting", "rent ready", "Pune home services", "property management Pune", "deep cleaning", "home painting"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://houseready.in",
    title: "HouseReady | We Make Your House Ready",
    description: "Tell us what is happening with your house. We'll figure out what needs to happen next.",
    siteName: "HouseReady",
    images: [
      {
        url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop", // Recommended OG size
        width: 1200,
        height: 630,
        alt: "HouseReady - Managed Home Readiness in Pune",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HouseReady | Managed Home Readiness Services",
    description: "Make your house move-in, move-out, or rent-ready in Pune. We coordinate everything.",
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop"],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
