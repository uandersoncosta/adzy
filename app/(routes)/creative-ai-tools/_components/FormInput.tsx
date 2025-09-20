"use client";

import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Loader2Icon, Monitor, Smartphone, Sparkles, Square } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const sampleProduct = [
  "/headphone.png",
  "/juice-can.png",
  "/perfume.png",
  "/burger.png",
  "/ice-creame.png",
];

type Props = {
  onHandleInputChange: any;
  OnGenerate: any;
  loading: boolean;
};

function FormInput({ onHandleInputChange, OnGenerate, loading }: Props) {
  const [preview, setPreview] = useState<string | null>();
  const onFileSelected = (files: FileList) => {
    const file = files[0];

    if (!file || files.length == 0) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("A imagem deve ter no máximo 5MB");
      return;
    }

    onHandleInputChange("file", file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div>
      <div>
        <h1 className="font-semibold">1. 1. Envie a imagem do produto</h1>
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

        <div>
          <h2 className="opacity-40 text-center mt-3">
            Selecione um produto de amostra para testar
          </h2>
          <div className="flex gap-5 items-center">
            {sampleProduct.map((product, index) => (
              <Image
                key={index}
                src={product}
                alt={product}
                width={100}
                height={100}
                className="w-[60px] h-[60px] rounded-lg cursor-pointer hover:scale-105 transition-all"
                onClick={() => {
                  setPreview(product);
                  onHandleInputChange("imageUrl", product);
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="font-semibold">2. Coloque a descrição do produto</h2>
        <Textarea
          placeholder="Aqui descreva sobre o seu produto e como você quer mostrar"
          className="min-h-[150px] mt-2"
          onChange={(event) =>
            onHandleInputChange("description", event.target.value)
          }
        />
      </div>
      <div className="mt-8">
        <h2 className="font-semibold">3. Selecione o tamanho da imagem</h2>
        <Select onValueChange={(value) => onHandleInputChange("size", value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Resolução" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1024x1024">
              <div className="flex gap-2 items-center">
                <Square className="w-4 h-4 " />
                <span>1:1</span>
              </div>
            </SelectItem>
            <SelectItem value="1536x1024">
              <div className="flex gap-2 items-center">
                <Monitor className="w-4 h-4 " />
                <span>16:9</span>
              </div>
            </SelectItem>
            <SelectItem value="1024x1536">
              <div className="flex gap-2 items-center">
                <Smartphone className="w-4 h-4 " />
                <span>9:16</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button
        className="mt-10 w-full text-center"
        onClick={OnGenerate}
        disabled={loading}
      >
        {loading ? <Loader2Icon className="animate-spin" /> : <Sparkles />}
        Generate
      </Button>
      <h2 className="mt-1 text-sm opacity-35">5 Creditos para gerar</h2>
    </div>
  );
}

export default FormInput;
