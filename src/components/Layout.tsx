
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Home, BarChart2, Calendar, Settings } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 text-white p-4">
        <div className="text-xl font-bold mb-8 p-2">Course Iteration</div>
        <nav className="space-y-2">
          <Link to="/" className="flex items-center gap-3 p-2 rounded hover:bg-slate-700">
            <Home size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/analytics" className="flex items-center gap-3 p-2 rounded hover:bg-slate-700">
            <BarChart2 size={20} />
            <span>Analytics</span>
          </Link>
          <Link to="/courses" className="flex items-center gap-3 p-2 rounded hover:bg-slate-700">
            <Calendar size={20} />
            <span>Courses</span>
          </Link>
          <Link to="/settings" className="flex items-center gap-3 p-2 rounded hover:bg-slate-700">
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-slate-50">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
