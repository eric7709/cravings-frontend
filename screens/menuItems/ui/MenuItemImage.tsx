"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useMenuItemFormStore } from "../hooks/useMenuFormStore";
import { useMenuItemStore } from "@/models/menuItems/store";
import Image from "next/image";

export default function MenuItemImage() {
  const [preview, setPreview] = useState<string>("");

  const fileRef = useRef<HTMLInputElement | null>(null);

  const { values, setField, setImage, clearImage, image } = useMenuItemFormStore();
  const { activeModal } = useMenuItemStore();

  const handleSelectImage = () => {
    fileRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    setImage(file);
    setField("imageUrl", "");
    setPreview(url);
  };

  const handleClearImage = () => {
    clearImage();
    setField("imageUrl", "");
    setPreview("");
    if (fileRef.current) fileRef.current.value = "";
  };

  // 🔄 preload imageUrl from store (edit mode)
  useEffect(() => {
    if (values.imageUrl && !image) {
      setPreview(values.imageUrl);
    }
  }, [values.imageUrl, image]);

  // 🧹 cleanup object URL
  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // 🔄 Reset when modal closes
  useEffect(() => {
    if (activeModal === null) {
      handleClearImage();
    }
  }, [activeModal]);

  const hasImage = Boolean(preview);

  return (
    <div className="">
      <label className="block mb-2 text-xs  font-medium">Menu Item Image</label>

      <div
        onClick={!hasImage ? handleSelectImage : undefined}
        className="relative h-52  w-full cursor-pointer overflow-hidden rounded-2xl border border-gray-300 bg-gray-50 flex items-center justify-center"
      >
        {hasImage ? (
          <>
            <Image
              src={preview}
              alt="Preview"
              fill
              className="h-full w-full absolute  object-cover"
            />

            {/* ❌ Clear button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleClearImage();
              }}
              className="absolute top-3 right-3 rounded-full bg-black/60 p-1.5 text-white hover:bg-black transition"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <span className="text-gray-400 text-xs font-medium">Click to Select image</span>
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
