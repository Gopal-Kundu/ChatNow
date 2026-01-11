import cloudinary from "./cloudinary.js";
import getDataUri from "./datauri.js";

export const uploadToCloudinary = async (file) => {
  if (!file) return null;

  const fileUri = getDataUri(file);

  const result = await cloudinary.uploader.upload(
    fileUri.content,
    {
      folder: "chat-app",
      resource_type: "image",
    }
  );

  return result.secure_url;
};