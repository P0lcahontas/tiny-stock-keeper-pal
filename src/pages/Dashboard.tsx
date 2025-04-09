
import { Box, DollarSign, PackageOpen, ShoppingBasket } from "lucide-react";
import StatCard from "@/components/Dashboard/StatCard";
import LowStockAlert from "@/components/Dashboard/LowStockAlert";
import CategoryDistribution from "@/components/Dashboard/CategoryDistribution";
import { useInventory } from "@/context/InventoryContext";
import { CURRENCY } from "@/types/item";

const Dashboard = () => {
  const { items } = useInventory();

  // Calculate statistics
  const totalItems = items.length;
  const totalStock = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const uniqueCategories = new Set(items.map((item) => item.category)).size;

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6 text-primary">Inventory Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Products"
          value={totalItems}
          description="Unique products in inventory"
          icon={Box}
        />
        <StatCard
          title="Total Stock"
          value={totalStock}
          description="Items in stock"
          icon={PackageOpen}
        />
        <StatCard
          title="Categories"
          value={uniqueCategories}
          description="Product categories"
          icon={ShoppingBasket}
        />
        <StatCard
          title="Inventory Value"
          value={`${CURRENCY.symbol} ${totalValue.toFixed(2)}`}
          description={`Total value in ${CURRENCY.name}`}
          icon={DollarSign}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <CategoryDistribution items={items} />
        </div>
        <div>
          <LowStockAlert items={items} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
