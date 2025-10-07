import { useAuthContext } from "@/app/provider";
import { db } from "@/configs/firebaseConfig";
import {
  collection,
  onSnapshot,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type PreviewProduct = {
  id: string;
  finalProductImageUrl: string;
  ProductImageUrl: string;
  description: string;
  size: string;
  status: string;
};

function PreviewResult() {
  const { user } = useAuthContext();
  const [productList, setProductList] = useState<PreviewProduct[]>();

  useEffect(() => {
    if (!user?.email) return;
    const q = query(
      collection(db, "user-ads"),
      where("userEmail", "==", user?.email)
    );

    const unSub = onSnapshot(q, (querySnapHot) => {
      const matchedDocs: any = [];
      querySnapHot.forEach((doc) => {
        matchedDocs.push({ id: doc.id, ...doc.data() });
      });
      setProductList(matchedDocs);
    });

    return () => unSub();
  }, [user?.email]);

  return (
    <div>
      <h2 className="font-bold text-2xl">Generated Result</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {productList?.map((product, index) => (
          <div key={index}>
            <Image
              src={product.finalProductImageUrl}
              alt={product.id}
              width={500}
              height={500}
              className="w-full h-[250px] object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PreviewResult;
