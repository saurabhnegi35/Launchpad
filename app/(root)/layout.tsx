import React, { ReactNode } from "react";
import Navbar from "../../components/Navbar";
import { Toaster } from "sonner";

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main className="font-work-sans">
      <Navbar />
      <Toaster richColors position="top-right" />
      {children}
    </main>
  );
};

export default Layout;
