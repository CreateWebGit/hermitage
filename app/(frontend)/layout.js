import Navbar from "@/components/Navbar";
import Context from "../context/context";

export default function Layout({ children }) {
  return (
    <div className="h-full">
      <Context>
        <div className="h-full">{children}</div>
      </Context>
    </div>
  );
}
