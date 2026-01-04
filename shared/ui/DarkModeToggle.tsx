'use client';

import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGeneralStore } from '../store/useGeneralStore';

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useGeneralStore();

  return (
    <motion.button
      onClick={toggleDarkMode}
      className={`h-12 w-12 rounded-full flex items-center border-2 justify-center duration-300 cursor-pointer ${darkMode ?"bg-gray-800 border-orange-400" : "bg-white border-orange-500"} shadow-md`}
      whileTap={{ scale: 0.8 }}
      aria-label="Toggle Dark Mode"
    >
      <AnimatePresence mode="wait">
        {darkMode ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          >
            <Moon className="w-6 h-6 text-yellow-400" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 25 }}
          >
            <Sun className="w-6 h-6 text-yellow-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
