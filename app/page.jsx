import "@/assets/styles/globals.css";
import Link from "next/link";
import Hero from "./components/Hero";
import InfoBoxes from "./components/InfoBoxes";
import InfoBox from "./components/InfoBox";
import HomeProperties from "./components/HomeProperties";
import connectDB from "@/config/database";
const HomePage = () => {
  //connectDB();
  return (
    <>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </>
  );
};

export default HomePage;
