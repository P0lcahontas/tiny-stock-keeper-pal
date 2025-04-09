
import { Link } from "react-router-dom";
import { Box, Package, ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Box className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">StockKeeper</span>
          </Link>
          <div className="hidden md:flex space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/" className="flex items-center space-x-2">
                <ShoppingBasket className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/inventory" className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Inventory</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
