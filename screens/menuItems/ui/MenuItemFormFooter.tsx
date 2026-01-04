"use client";

import { useMenuItemStore } from "@/models/menuItems/store";
import { useMenuItemFormStore } from "../hooks/useMenuFormStore";
import { useCreateMenuItem, useUpdateMenuItem } from "@/models/menuItems/hook";
import { LoadingButton } from "@/shared/ui/LoadingButton";
import { uploadMenuItemImage } from "@/shared/utils/uploadMenuItemImage";
import { CancelButton } from "@/shared/ui/CancelButton";

export default function MenuItemFormFooter() {
  const { activeModal, closeModal, selectedMenuItem } = useMenuItemStore();
  const {
    values,
    isPending,
    setIsPendingTrue,
    setIsPendingFalse,
    setErrors,
    reset,
    image,
    setField,
  } = useMenuItemFormStore();

  const createMenuItem = useCreateMenuItem();
  const updateMenuItem = useUpdateMenuItem();

  const onSubmit = async () => {
    const errors = validate(values);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    try {
      setIsPendingTrue();
      let imageUrl = values.imageUrl;

      if (image) {
        imageUrl = await uploadMenuItemImage(image);
        setField("imageUrl", imageUrl);
      }

      const payload = {
        ...values,
        imageUrl,
        categoryId: Number(values.categoryId),
        price: Number(values.price),
      };

      if (activeModal === "create") {
        await createMenuItem.mutateAsync(payload);
      } else if (activeModal === "update" && selectedMenuItem?.id) {
        await updateMenuItem.mutateAsync({
          id: selectedMenuItem.id,
          data: payload,
        });
      }

      reset();
      closeModal();
    } catch (error) {
      console.error(error);
    } finally {
      setIsPendingFalse();
    }
  };

  const submitText = activeModal === "create" ? "Create" : "Update";
  const loadingText = activeModal === "create" ? "Creating..." : "Updating...";

  return (
    <div className="px-4 py-2.5 flex justify-end gap-2 border-t border-gray-200">
      <CancelButton onClick={closeModal} />
      <LoadingButton
        text={submitText}
        loadingText={loadingText}
        isLoading={isPending}
        onClick={onSubmit}
        className="h-12 w-28 bg-blue-600 border border-blue-600 text-white shadow-md"
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               VALIDATION                                   */
/* -------------------------------------------------------------------------- */
function validate(values: any) {
  const errors: Record<string, string> = {};

  if (!values.name.trim()) errors.name = "Menu item name is required";
  if (!values.categoryId) errors.categoryId = "Category is required";
  if (!values.description) errors.description = "Description is required";
  if (!values.price || Number(values.price) <= 0) errors.price = "Enter a valid price";

  return errors;
}
