"use client";

import { usePathname } from "next/navigation";
import Footer from "../Footer";
import Header from "../Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <>
      <Header />
      <main className="flex-1">
        {isHomePage ? (
          children
        ) : (
          <div className="py-6">
            <div className="max-w-[1100px] mx-auto px-5">{children}</div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
