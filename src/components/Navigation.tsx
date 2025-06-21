
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Search, BarChart3 } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white hover:text-blue-200 transition-colors">
            BioPredictor
          </Link>
          <div className="flex space-x-2">
            <Button
              asChild
              variant={isActive("/") ? "secondary" : "ghost"}
              className={`text-white hover:bg-white/20 ${isActive("/") ? "bg-white/30" : ""}`}
            >
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
            </Button>
            <Button
              asChild
              variant={isActive("/predictor") ? "secondary" : "ghost"}
              className={`text-white hover:bg-white/20 ${isActive("/predictor") ? "bg-white/30" : ""}`}
            >
              <Link to="/predictor">
                <Search className="w-4 h-4 mr-2" />
                Predict
              </Link>
            </Button>
            <Button
              asChild
              variant={isActive("/results") ? "secondary" : "ghost"}
              className={`text-white hover:bg-white/20 ${isActive("/results") ? "bg-white/30" : ""}`}
            >
              <Link to="/results">
                <BarChart3 className="w-4 h-4 mr-2" />
                Results
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
