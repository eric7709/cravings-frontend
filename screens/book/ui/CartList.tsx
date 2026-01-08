"use client";

import { motion, AnimatePresence } from "framer-motion";
import CartItem from "./CartItem";
import { useBook } from "../store/useBook";
import { ShoppingCart } from "lucide-react";

export default function CartList() {
  const { items, activeModal } = useBook();

  return (
    <AnimatePresence>
      {activeModal === "cart" && (
        <motion.div
          key="cart"
          className="flex-1 pt-20 p-4 space-y-3 pb-[100px] overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* EMPTY STATE */}
          {items.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="flex flex-col items-center justify-center gap-3 text-gray-400 h-full"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center"
              >
                <ShoppingCart size={24} />
              </motion.div>

              <p className="text-sm font-medium">No selections yet</p>
              <p className="text-xs text-gray-300">Add items to see them here</p>
            </motion.div>
          )}

          {/* ITEMS */}
          {items.map((item, index) => (
            <motion.div
              key={item.menuItemId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
                delay: 0.1 + index * 0.05, // staggered animation
              }}
            >
              <CartItem
                current={index}
                item={item}
                index={index}
                length={items.length}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
