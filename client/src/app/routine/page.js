import RoutineCalendar from "@/components/ui/routine/routine.js";
import Navbar from "@/components/ui/navbar";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <RoutineCalendar />
    </main>
  );
}