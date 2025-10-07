"use client";

import React, { useState } from "react";
import FormInput from "../_components/FormInput";
import PreviewResult from "../_components/PreviewResult";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";
import { useAuthContext } from "@/app/provider";

type FormData = {
  file: File | undefined;
  description: string;
  size: string;
  imageUrl?: string;
};

function Product() {
  const [formData, setFormData] = useState<FormData>();
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();

  const onHandleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const OnGenerate = async () => {
    if (!formData?.file || formData?.imageUrl) {
      alert("É obrigatório escolher uma imagem.");
      return;
    }
    // if (formData?.description || formData?.size) {
    //   alert("Todos os campos são obrigatórios.");
    //   return;
    // }

    setLoading(true);
    const formData_ = new FormData();
    formData_.append("file", formData?.file);
    formData_.append("description", formData?.description ?? "");
    formData_.append("size", formData?.size ?? "1028x1028");
    formData_.append("userEmail", user?.email ?? '');

    // make api call
    const result = await axios.post("/api/generate-product-image", formData_);
    console.log(result.data);
    setLoading(false);
  };

  return (
    <div>
      <h2 className="font-bold text-2xl mb-3">Ai Product Image Generator</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <FormInput
            onHandleInputChange={(filed: string, value: string) =>
              onHandleInputChange(filed, value)
            }
            OnGenerate={OnGenerate}
            loading={loading}
          />
        </div>
        <div className="md:col-span-2">
          <PreviewResult />
        </div>
      </div>
    </div>
  );
}

export default Product;
