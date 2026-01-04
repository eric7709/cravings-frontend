import { supabase } from "./supabase";

export async function uploadMenuItemImage(file: File, folder: string = ""): Promise<string> {
  if (!file) throw new Error("No file provided");
  const fileName = `${Date.now()}_${file.name}`;
  const filePath = folder ? `${folder}/${fileName}` : fileName;

  const { error } = await supabase.storage
    .from("menuitemimages")
    .upload(filePath, file, { cacheControl: "3600", upsert: false });
  if (error) throw error;

  const { data: publicUrlData } = supabase.storage
    .from("menuitemimages")
    .getPublicUrl(filePath);
  return publicUrlData.publicUrl;
}
