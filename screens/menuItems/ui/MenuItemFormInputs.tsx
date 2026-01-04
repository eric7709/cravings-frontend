"use client";

import { useCategoryStore } from "@/models/categories/store";
import { MENUITEM_STATUS } from "@/models/menuItems/types";
import FormInput from "@/shared/ui/FormInput";
import { motion, AnimatePresence } from "framer-motion";
import { useMenuItemStore } from "@/models/menuItems/store";
import { useMenuItemFormStore } from "../hooks/useMenuFormStore";
import { useEffect } from "react";

export default function MenuItemFormInputs() {
  const { categories } = useCategoryStore();
  const { setField, values, errors, clearImage} = useMenuItemFormStore()
  const { activeModal, selectedMenuItem, setSelectedMenuItem } = useMenuItemStore();
  const { setValues, reset } = useMenuItemFormStore();

  useEffect(() => {
    // ✅ UPDATE MODE → preload
    if (activeModal === "update" && selectedMenuItem) {
      setValues({
        name: selectedMenuItem.name ?? "",
        categoryId: selectedMenuItem.categoryId.toString() ?? "",
        status: selectedMenuItem.status ?? "AVAILABLE",
        price: String(selectedMenuItem.price ?? ""),
        description: selectedMenuItem.description ?? "",
        imageUrl: selectedMenuItem.imageUrl ?? "",
      });
      return;
    }
    reset();
  }, [activeModal, selectedMenuItem, setValues, reset]);

  useEffect(() => {

    if(activeModal == null){
      setValues({
        name:  "",
        categoryId:  "",
        status:  "AVAILABLE",
        price: "",
        description:  "",
        imageUrl:  "",
      });
      setSelectedMenuItem(null)
      clearImage()
    }
    
  }, [activeModal])

  const categoryOptions = categories.map((el) => ({
    label: el.name,
    value: el.id.toString(),
  }));
  const statusOption = [
    { label: "Available", value: "AVAILABLE" },
    { label: "Unavailable", value: "UNAVAILABLE" },
  ];

  return (
    <AnimatePresence mode="wait">
      {activeModal && (
        <motion.div
          key="menu-item-form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="grid p-5 grid-cols-2 gap-5"
        >
          {/* Item Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: 0 }}
          >
            <FormInput
              label="Item Name"
              onChange={(e) => setField("name", e.target.value)}
              error={errors.name}
              value={values.name}
              capitalize
              placeholder="e.g. Chicken Wings"
            />
          </motion.div>

          {/* Price */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            <FormInput
              label="Price (₦)"
              placeholder="e.g. 3500"
              onChange={(e) => setField("price", e.target.value)}
              error={errors.price}
              value={values.price}
            />
          </motion.div>

          {/* Category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <FormInput
              label="Category"
              options={categoryOptions}
              onChange={(e) => setField("categoryId", e.target.value)}
              error={errors.categoryId}
              value={values.categoryId}
              capitalize

              placeholder="Select category"
            />
          </motion.div>

          {/* Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <FormInput
              label="Status"
              onChange={(e) => setField("status", e.target.value as MENUITEM_STATUS)}
              error={errors.status}
              value={values.status}
              capitalize
              
              options={statusOption}
            />
          </motion.div>

          {/* Description */}
          <motion.div
            className="col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <FormInput
              label="Description"
              placeholder="Brief description of the menu item"
              onChange={(e) => setField("description", e.target.value)}
              error={errors.description}
              value={values.description}
              textarea
              className="w-full"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
