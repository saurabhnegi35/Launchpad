import React, { ReactNode } from "react";
import Navbar from "../../components/Navbar";
import { Toaster } from "sonner";

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main className="font-work-sans">
      <Navbar />
      {children}
      <Toaster
        toastOptions={{
          unstyled: true,
          classNames: {
            error: "bg-red-400",
            success: "text-green-400",
            warning: "text-yellow-400",
            info: "bg-blue-400",
          },
        }}
      />
    </main>
  );
};

export default Layout;
