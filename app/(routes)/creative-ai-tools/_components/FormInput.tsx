"use client";

import { ImagePlus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

function FormInput() {
  const [preview, setPreview] = useState<string | null>();
  const onFileSelected = (files: FileList) => {
    const file = files[0];

    if (!file || files.length == 0) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("A imagem deve ter no máximo 5MB");
      return;
    }

    setPreview(URL.createObjectURL(file));
  };

  return (
    <div>
      <div>
        <h1 className="font-semibold">1. Upload Product Image</h1>
        <div>
          <label
            htmlFor="imageUpload"
            className="mt-2 border-dashed border-2 rounded flex flex-col p-4 items-center justify-center min-h-[200px] cursor-pointer"
          >
            {!preview ? (
              <div className="flex flex-col items-center gap-3">
                <ImagePlus className="h-8 w-8 opacity-40" />
                <h2 className="text-xl">Clique aqui para mandar a imagem</h2>
                <p className="opacity-45">Envie uma imagem de até 5MB</p>
              </div>
            ) : (
              <Image
                src={preview}
                alt="preview"
                width={300}
                height={300}
                className="w-full h-full max-h-[200px] object-contain rounded-lg "
              />
            )}
          </label>
          <input
            type="file"
            id="imageUpload"
            className="hidden"
            accept="image/*"
            onChange={(event) => onFileSelected(event.target.files)}
          />
        </div>
      </div>
    </div>
  );
}

export default FormInput;
