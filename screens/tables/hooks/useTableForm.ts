"use client";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTableStore } from "@/models/table/store";
import { useCreateTable, useUpdateTable } from "@/models/table/hooks";
import { TableValues, TablePayload, TABLE_STATUS } from "@/models/table/types";

export const useTableForm = () => {
  const {
    activeModal,
    selectedTable,
    updateTable,
    addTable,
    closeModal,
    tables,
  } = useTableStore();
  const createMutation = useCreateTable();
  const updateMutation = useUpdateTable();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TableValues>({
    defaultValues: {
      tableName: "",
      tableNumber: "",
      waiterId: "",
      cashierId: "",
      status: "AVAILABLE",
      capacity: "",
    },
  });

  // Prefill when editing
  useEffect(() => {
    if (activeModal === "update" && selectedTable) {
      reset({
        tableName: selectedTable.tableName,
        tableNumber: String(selectedTable.tableNumber),
        waiterId: String(selectedTable.waiterId ?? ""),
        cashierId: String(selectedTable.cashierId ?? ""),
        status: selectedTable.status,
        capacity: String(selectedTable.capacity),
      });
    } else if (activeModal === "create") {
      reset();
    }
  }, [activeModal, selectedTable, reset]);

  useEffect(() => {
    if (activeModal == null) {
      reset();
      reset({
        tableName: "",
        tableNumber: "",
        waiterId: "",
        cashierId: "",
        status: "AVAILABLE",
        capacity: "",
      });
    }
  }, [activeModal]);

  const onSubmit: SubmitHandler<TableValues> = async (values) => {
    // Convert numeric fields and validate
    const tableNumber = Number(values.tableNumber);
    const waiterId = values.waiterId ? Number(values.waiterId) : null;
    const cashierId = values.cashierId ? Number(values.cashierId) : null;
    const capacity = Number(values.capacity);

    if (isNaN(tableNumber) || tableNumber <= 0) {
      setError("tableNumber", {
        message: "Table number must be a valid number",
      });
      return;
    }

    if (values.waiterId && (isNaN(waiterId!) || waiterId! <= 0)) {
      setError("waiterId", { message: "Waiter ID must be a valid number" });
      return;
    }
    if (values.cashierId && (isNaN(cashierId!) || cashierId! <= 0)) {
      setError("cashierId", { message: "Waiter ID must be a valid number" });
      return;
    }
    if (isNaN(capacity) || capacity <= 0) {
      setError("capacity", { message: "Capacity must be a valid number" });
      return;
    }

    const tableNumberExists = tables.some(
      (el) => el.tableNumber === tableNumber && el.id !== selectedTable?.id
    );

    if (tableNumberExists) {
      setError("tableNumber", {
        message: "Table number already exists",
      });
      return;
    }

    const tableNameExists = tables.some(
      (el) =>
        el.tableName.trim().toLowerCase() ===
          values.tableName.trim().toLowerCase() && el.id !== selectedTable?.id
    );

    if (tableNameExists) {
      setError("tableName", {
        message: "Table name already exists",
      });
      return;
    }

    const payload: TablePayload = {
      tableName: values.tableName,
      tableNumber,
      waiterId,
      cashierId,
      capacity,
      status: values.status,
    };
    try {
      if (activeModal === "update" && selectedTable) {
        const updated = await updateMutation.mutateAsync({
          id: selectedTable.id,
          data: payload,
        });
        updateTable(updated);
      } else {
        const created = await createMutation.mutateAsync(payload);
        addTable(created);
      }

      reset();
      closeModal();
    } catch (err: any) {
      setError("tableNumber", {
        message: err?.response?.data || "Failed to save table",
      });
    }
  };

  return {
    register,
    errors,
    isPending: isSubmitting,
    onSubmit: handleSubmit(onSubmit),
  };
};
