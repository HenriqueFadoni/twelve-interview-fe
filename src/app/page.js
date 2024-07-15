"use client";
import { DataProvider } from "@/contexts/DataContext";
import Home from "@/components/Home/Home";

export default function MainPage() {
  return (
    <main>
      <DataProvider>
        <Home />
      </DataProvider>
    </main>
  );
}
