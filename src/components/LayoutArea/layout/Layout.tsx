import type { JSX } from "react";
import Routing from "../../../routing/Routing";
import Footer from "../footer/Footer";
import Header from "../header/Header";


function Layout(): JSX.Element {
    return (
      <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <Header />
      <main className="flex-1 px-4 py-1">
        <Routing />
      </main>
      <Footer />
    </div>
    );
  }
  
  export default Layout;