import { lazy } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import { SharedLayout } from "./SharedLayout";
const AboutUs = lazy(() => import("./AboutUs"));
const About = lazy(() => import("../pages/About"));
const Home = lazy(() => import("../pages/Home"));
const Payment = lazy(() => import("../pages/Payment"));
const Order = lazy(() => import("../pages/Order"));
const Team = lazy(() => import("./Team"));
const Reviews = lazy(() => import("./Reviews"));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="/about/" element={<About />}>
          <Route path="/about/" element={<AboutUs />} />
          <Route path="team" element={<Team />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="/order" element={<Order />}></Route>
        <Route path="/payment/:id" element={<Payment />}></Route>
      </Route>
    </Routes>
  );
};
