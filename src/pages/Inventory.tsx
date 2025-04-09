
import { useState } from "react";
import { useInventory } from "@/context/InventoryContext";
import InventoryList from "@/components/Inventory/InventoryList";
import AddItemForm from "@/components/Inventory/AddItemForm";
import EditItemForm from "@/components/Inventory/EditItemForm";
import InventoryFilter from "@/components/Inventory/InventoryFilter";
import { Item } from "@/types/item";

const Inventory = () => {
  const { items, categories, addItem, deleteItem, updateItem } = useInventory();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Filter items based on search query and category
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEditItem = (item: Item) => {
    setEditingItem(item);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = (updatedItem: Item) => {
    updateItem(updatedItem);
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">Inventory Items</h1>
        <AddItemForm onAddItem={addItem} categories={categories} />
      </div>

      <InventoryFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      <InventoryList
        items={filteredItems}
        onDeleteItem={deleteItem}
        onEditItem={handleEditItem}
      />

      <EditItemForm
        item={editingItem}
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleSaveEdit}
        categories={categories}
      />
    </div>
  );
};

export default Inventory;
