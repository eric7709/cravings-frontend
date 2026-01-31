import FormInput from '@/shared/ui/FormInput';
import { MENUITEM_STATUS, MenuItemValues } from '@/models/menuItems/types';
import { useMenuItemStore } from '@/models/menuItems/store';
import { useCategoryStore } from '@/models/categories/store';
import { useMenuItemFormStore } from '../hooks/useMenuFormStore';
import { useEffect } from 'react';
import { useCreateMenuItem, useUpdateMenuItem } from '@/models/menuItems/hook';
import { uploadMenuItemImage } from '@/shared/utils/uploadMenuItemImage';
import MenuItemImage from './MenuItemImage';

export default function MenuItemForm() {
    const { closeModal, activeModal, selectedMenuItem, setSelectedMenuItem } = useMenuItemStore()
    const submitText = activeModal === "create" ? "Create" : "Update"
    const loadingText = activeModal === "create" ? "Creating..." : "Updating..."
    const title = activeModal == "create" ? "Create Menu-item" : activeModal == "update" ? "Update Menu-item" : ""
    const isOpen = activeModal == "create" || activeModal == "update"
    const { categories } = useCategoryStore();
    const {
        values,
        setValues,
        isPending,
        setIsPendingTrue,
        setIsPendingFalse,
        setErrors,
        reset,
        errors, clearImage,
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

        if (activeModal == null) {
            setValues({
                name: "",
                categoryId: "",
                status: "AVAILABLE",
                price: "",
                description: "",
                imageUrl: "",
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
        <div className={`fixed bg-black/20 z-20000 grid grid-cols-[1fr_auto] inset-0 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"} duration-300`}>
            <div className="" onClick={closeModal}></div>
            <div className={`bg-white flex border-l border-gray-100 flex-col ${isOpen ? "w-82" : "w-0"} h-dvh duration-300 `}>
                <div className="text-[15px] px-4 flex items-center h-12 border-b border-gray-200 shadow shadow-gray-100 font-semibold">
                    <p>{title}</p>
                </div>
                <div
                    key="Menu-item-form"
                    className="space-y-4 p-4 flex-1 overflow-y-auto"
                >
                    <MenuItemImage />
                    <FormInput
                        label="Item Name"
                        onChange={(e) => setField("name", e.target.value)}
                        error={errors.name}
                        value={values.name}
                        capitalize
                        placeholder="e.g. Chicken Wings"
                    />
                    {/* Last Name */}
                    <FormInput
                        label="Price (₦)"
                        placeholder="e.g. 3500"
                        onChange={(e) => setField("price", e.target.value)}
                        error={errors.price}
                        value={values.price}
                    />

                    {/* Email */}
                    <FormInput
                        label="Category"
                        options={categoryOptions}
                        onChange={(e) => setField("categoryId", e.target.value)}
                        error={errors.categoryId}
                        value={values.categoryId}
                        capitalize

                        placeholder="Select category"
                    />
                    <FormInput
                        label="Status"
                        onChange={(e) => setField("status", e.target.value as MENUITEM_STATUS)}
                        error={errors.status}
                        value={values.status as string}
                        capitalize
                        options={statusOption}
                    />
                    <FormInput
                        label="Description"
                        placeholder="Brief description of the menu item"
                        onChange={(e) => setField("description", e.target.value)}
                        error={errors.description}
                        value={values.description}
                        textarea
                        className="w-full"
                    />

                </div>
                <div className='px-4 py-1.5 flex justify-end gap-2 border-t border-gray-200'>
                    <button onClick={closeModal} className='px-5 duration-300 active:scale-90 cursor-pointer py-2.5 font-semibold text-xs bg-red-600 hover:bg-red-700 rounded-full shadow-md border-2 text-white'>Cancel</button>
                    <button onClick={onSubmit} className='px-5 duration-300 active:scale-90 cursor-pointer py-2.5 font-semibold text-xs bg-blue-600 hover:bg-blue-700 rounded-full shadow-md border-2 text-white'>{isPending ? loadingText : submitText}</button>
                </div>
            </div>
        </div>
    )
}

function validate(values: any) {
    const errors: Record<string, string> = {};
    if (!values.name.trim()) errors.name = "Menu item name is required";
    if (!values.categoryId) errors.categoryId = "Category is required";
    if (!values.description) errors.description = "Description is required";
    if (!values.price || Number(values.price) <= 0) errors.price = "Enter a valid price";
    return errors;
}
