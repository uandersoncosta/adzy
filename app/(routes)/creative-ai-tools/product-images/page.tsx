import React from "react";
import FormInput from "../_components/FormInput";
import PreviewResult from "../_components/PreviewResult";

function Product() {
  return (
    <div>
      <h2 className="font-bold text-2xl mb-3">Ai Product Image Generator</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <FormInput />
        </div>
        <div className="md:grid-cols-2">
          <PreviewResult />
        </div>
      </div>
    </div>
  );
}

export default Product;
