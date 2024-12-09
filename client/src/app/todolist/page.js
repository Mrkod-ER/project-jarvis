import TodoList from "@/components/ui/TodoSection/TodoSection.js";
import Navbar from "@/components/ui/navbar";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <TodoList />
    </main>
  );
}
