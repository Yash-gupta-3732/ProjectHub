// app/(root)/layout.tsx
import NavBar from "@/components/NavBar";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootGroupLayout({ children }: { children: ReactNode }) {
  // no <html> or <body> here, only in the root layout
  return <>
  <main className="text-2xl">
    <NavBar />

  {children}
  <Toaster richColors position="top-right" />
  <Analytics/>
  <SpeedInsights/>
  </main>
  </>;
}