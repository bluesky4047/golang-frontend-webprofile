import Introduction from "../components/introduction/Introduction";
import Profile from "../components/profile/Profile";
import WorkProcess from "../components/workProcess/WorkProcess";
import Portfolio from "../components/portfolio/Portfolio";
import WorkTogether from "../components/workTogether/WorkTogether";
import Blog from "../components/blog/Blog";
import Profession from "../components/profession/Profession";
import HappyClients from "../components/happyClients/HappyClients";
import Testimonial from "../components/testimonial/Testimonial";
import Contact from "../components/contact/Contact";
import "../../index.css";
import api from "../../axiosInstance";
import { useEffect, useState } from "react";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [data, setData] = useState({
    home: null,
    about: null,
    process: null,
    portfolio: null,
    blog: null,
    services: null,
    testimonials: null,
    contact: null,
  });

  useEffect(() => {
    // semua API dijalankan paralel
    Promise.all([
      api.get("/home"),
      api.get("/about"),
      api.get("/process"),
      api.get("/portfolio"),
      api.get("/blog"),
      api.get("/services"),
      api.get("/testimonials"),
      api.get("/contact"),
    ])
      .then(
        ([
          homeRes,
          aboutRes,
          processRes,
          portfolioRes,
          blogRes,
          servicesRes,
          testimonialsRes,
          contactRes,
        ]) => {
          setData({
            home: homeRes.data.data,
            about: aboutRes.data.data,
            process: processRes.data.data,
            portfolio: portfolioRes.data.data,
            blog: blogRes.data.data,
            services: servicesRes.data.data,
            testimonials: testimonialsRes.data.data,
            contact: contactRes.data.data,
          });
        }
      )
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-700">Loading...</p>
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
    <div className="relative">
      <div className="introduction-profile-background">
        <div className="content">
          <Introduction data={data.home} />
          <Profile data={data.about} />
        </div>
      </div>

      <div className="bg-soft-white pt-30"></div>

      <Portfolio data={data.portfolio} />

      <div className="bg-gray-900">
        <WorkTogether data={data.services} />
      </div>

      {/* <div className="blog-background">
        <Blog data={data.blog} />
      </div> */}

      <div className="bg-soft-white">
        <Profession data={data.services} />
      </div>

      <HappyClients data={data.testimonials} />
      <Testimonial data={data.testimonials} />
      <Contact data={data.contact} />
    </div>
  );
};

export default Home;
