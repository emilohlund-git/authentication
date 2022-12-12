import React, { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="p-12 flex justify-center">
        <div className="w-[750px]">
          {children}
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Layout;
