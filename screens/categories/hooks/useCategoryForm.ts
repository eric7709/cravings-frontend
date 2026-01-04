import { useCreateCategory, useUpdateCategory } from "@/models/categories/hook";
import { useCategoryStore } from "@/models/categories/store";
import { CategoryValues } from "@/models/categories/types";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export const useCategoryForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryValues>({
    defaultValues: {
      name: "",
      description: "",
    },
  });
  const {
    addCategory,
    updateCategory,
    activeModal,
    selectedCategory,
    setSelectedCategory,
    closeModal
  } = useCategoryStore();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();

  useEffect(() => {
    if (activeModal == "update" && selectedCategory) {
      reset({
        name: selectedCategory.name,
        description: selectedCategory.description,
      });
    }

    if (activeModal == null) {
      reset();
    }
  }, [activeModal, selectedCategory, setSelectedCategory]);

  useEffect(() => {

    if(activeModal == null){
      reset({
        name: "",
        description: "",
      });
      
    }
    
  }, [activeModal])

  const onSubmit: SubmitHandler<CategoryValues> = async (values) => {
    
    if (activeModal == "update" && selectedCategory) {
      const data = await updateMutation.mutateAsync({
        data: values,
        id: selectedCategory.id,
      });
      updateCategory(data);
      closeModal()
    } else {
      const data = await createMutation.mutateAsync(values);
      addCategory(data);
      closeModal()
    }
  };

  return {
    register,
    errors,
    isPending: isSubmitting,
    onSubmit: handleSubmit(onSubmit),
  };
};
