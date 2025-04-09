
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Item } from "@/types/item";
import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface LowStockAlertProps {
  items: Item[];
  threshold?: number;
}

const LowStockAlert = ({ items, threshold = 5 }: LowStockAlertProps) => {
  const lowStockItems = items.filter((item) => item.quantity <= threshold);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Low Stock Alert</CardTitle>
            <CardDescription>Items that need restocking</CardDescription>
          </div>
          <AlertCircle className="h-5 w-5 text-destructive" />
        </div>
      </CardHeader>
      <CardContent>
        {lowStockItems.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No items are currently low in stock.
          </p>
        ) : (
          <div className="space-y-4">
            {lowStockItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2 last:border-0"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Category: {item.category}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-destructive font-bold">
                    {item.quantity} left
                  </span>
                </div>
              </div>
            ))}
            <div className="pt-2">
              <Link
                to="/inventory"
                className="text-sm text-primary hover:underline"
              >
                View all inventory
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LowStockAlert;
