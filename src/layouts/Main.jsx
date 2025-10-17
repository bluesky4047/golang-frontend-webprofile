import { Outlet } from "react-router-dom";
import NavBar from "../components/common/navbar/NavBar";
import Footer from "../components/common/footer/Footer";
import ScrollToTop from "../components/common/scrollToTop/ScrollToTop";
import api from "../../axiosInstance";
import { useEffect, useState } from "react";

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // semua API dijalankan paralel
    Promise.all([api.get("/home")])
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-700"></p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 font-semibold">
          Error: {error.message || "Failed to load data"}
        </p>
      </div>
    );
  return (
    <div data-theme={"light"} className="relative">
      <NavBar />
      <Outlet />
      <div className="bg-[#2A374A]">
        <Footer />
      </div>
      <ScrollToTop />
    </div>
  );
};

export default Main;
