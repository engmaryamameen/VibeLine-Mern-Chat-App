import { useState } from "react";

export const useImageUpload = (onUpload: (base64Image: string) => Promise<void>) => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result as string;
      setSelectedImg(base64Image);
      await onUpload(base64Image);
    };
  };

  return {
    selectedImg,
    handleImageUpload,
  };
};

