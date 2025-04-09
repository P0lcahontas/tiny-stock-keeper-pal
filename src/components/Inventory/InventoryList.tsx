
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Item, CURRENCY } from "@/types/item";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

interface InventoryListProps {
  items: Item[];
  onDeleteItem: (id: string) => void;
  onEditItem: (item: Item) => void;
}

const InventoryList = ({ items, onDeleteItem, onEditItem }: InventoryListProps) => {
  const { toast } = useToast();
  
  const handleDelete = (id: string, name: string) => {
    onDeleteItem(id);
    toast({
      title: "Item deleted",
      description: `${name} has been removed from inventory.`,
    });
  };

  return (
    <div className="rounded-md border bg-white shadow-sm">
      <Table>
        <TableHeader className="bg-secondary/50">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No items found. Add some items to your inventory.
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item.id} className="hover:bg-secondary/30">
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-primary/10 text-primary-foreground border-primary/20">
                    {item.category}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <span className={item.quantity <= 5 ? "text-destructive font-semibold" : ""}>
                    {item.quantity}
                  </span>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {CURRENCY.symbol} {item.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onEditItem(item)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(item.id, item.name)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default InventoryList;
