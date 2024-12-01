"use client";

import { PageTransition } from "./components/Transitions";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <PageTransition>
      {children}
    </PageTransition>
  );
}
