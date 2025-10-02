import { useAuthContext } from "@/app/provider";
import { db } from "@/configs/firebaseConfig";
import {
  collection,
  onSnapshot,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import React, { useState } from "react";

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

  return (
    <div>
      <h2 className="font-bold text-2xl">Generated Result</h2>
    </div>
  );
}

export default PreviewResult;
