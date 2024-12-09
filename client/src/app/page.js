import Image from "next/image";
import Navbar from "@/components/ui/navbar"
import HeroSection from "@/components/ui/hero/hero";
import Features from "@/components/ui/features/features";
import StoreUserDetails from '@/components/userdetails/userdetails.jsx';


export default function Home() {
  return (
    <div>
      <StoreUserDetails/>
      <Navbar/>
      <HeroSection/>
      <Features/>
      
      </div>
  );
}
