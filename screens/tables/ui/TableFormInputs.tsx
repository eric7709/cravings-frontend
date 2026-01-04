"use client";

import { useEmployeeStore } from "@/models/employee/store";
import { useTableStore } from "@/models/table/store";
import { TableValues } from "@/models/table/types";
import FormInput from "@/shared/ui/FormInput";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  register: UseFormRegister<TableValues>;
  errors: FieldErrors<TableValues>;
};

const availabilityOptions = [
  { label: "Available", value: "AVAILABLE" },
  { label: "Unavailable", value: "UNAVAILABLE" },
];

export default function TableFormInputs({ errors, register }: Props) {
  const { waiterOptions, cashierOptions } = useEmployeeStore(); // ✅ waiter options
  const { activeModal } = useTableStore(); // ✅ modal state for table form

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence>
      {activeModal && (
        <motion.div
          key="table-form"
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid p-5 grid-cols-2 gap-5"
        >
          <motion.div variants={itemVariants}>
            <FormInput
              label="Table Name"
              {...register("tableName", { required: "Table name is required" })}
              placeholder="Arkansas"
              error={errors.tableName?.message}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FormInput
              label="Table Number"
              {...register("tableNumber")}
              placeholder="3"
              error={errors.tableNumber?.message}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FormInput
              label="Status"
              {...register("status")}
              options={availabilityOptions}
              error={errors.status?.message}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FormInput
              label="Capacity"
              {...register("capacity")}
              placeholder="4"
              error={errors.capacity?.message}
            />
          </motion.div>

          {waiterOptions.length > 0 && (
            <motion.div variants={itemVariants} className=" w-full">
              <FormInput
                label="Waiter"
                {...register("waiterId")}
                placeholder="Select a Waiter"
                options={waiterOptions}
              />
            </motion.div>
          )}
          {cashierOptions.length > 0 && (
            <motion.div variants={itemVariants} className=" w-full">
              <FormInput
                label="Cashier"
                {...register("cashierId")}
                placeholder="Select a Cashier"
                options={cashierOptions}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
