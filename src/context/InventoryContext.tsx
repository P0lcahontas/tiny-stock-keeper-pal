
import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { Item } from "@/types/item";

// Sample initial data
const initialItems: Item[] = [
  {
    id: "1",
    name: "Laptop",
    category: "Electronics",
    quantity: 10,
    price: 899.99,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Desk Chair",
    category: "Furniture",
    quantity: 5,
    price: 199.99,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Notebook",
    category: "Office Supplies",
    quantity: 50,
    price: 4.99,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Headphones",
    category: "Electronics",
    quantity: 7,
    price: 149.99,
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Coffee Mug",
    category: "Kitchen",
    quantity: 20,
    price: 12.99,
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Desk Lamp",
    category: "Furniture",
    quantity: 3,
    price: 39.99,
    createdAt: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Wireless Mouse",
    category: "Electronics",
    quantity: 12,
    price: 29.99,
    createdAt: new Date().toISOString(),
  },
];

// Define available categories
const predefinedCategories = [
  "Electronics",
  "Furniture",
  "Office Supplies",
  "Kitchen",
  "Clothing",
  "Books",
  "Tools",
];

interface InventoryContextType {
  items: Item[];
  categories: string[];
  addItem: (item: Item) => void;
  deleteItem: (id: string) => void;
  updateItem: (updatedItem: Item) => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Item[]>(() => {
    // Try to get items from localStorage
    const savedItems = localStorage.getItem("inventory");
    return savedItems ? JSON.parse(savedItems) : initialItems;
  });

  // Derive categories from items plus predefined ones
  const categories = Array.from(
    new Set([
      ...predefinedCategories,
      ...items.map((item) => item.category),
    ])
  ).sort();

  // Save to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(items));
  }, [items]);

  const addItem = (item: Item) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const deleteItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateItem = (updatedItem: Item) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  };

  return (
    <InventoryContext.Provider
      value={{
        items,
        categories,
        addItem,
        deleteItem,
        updateItem,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error("useInventory must be used within an InventoryProvider");
  }
  return context;
};
