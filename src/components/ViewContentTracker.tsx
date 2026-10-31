"use client";

import { useEffect, useRef } from "react";
import { ProductPackage } from "@/config/site";
import { trackViewContent, whenFbqReady } from "@/lib/metaPixel";

interface ViewContentTrackerProps {
  product: ProductPackage;
}

export const ViewContentTracker: React.FC<ViewContentTrackerProps> = ({ product }) => {
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current || !product) return;

    return whenFbqReady(() => {
      if (firedRef.current) return;
      firedRef.current = true;
      trackViewContent(product);
    });
  }, [product]);

  return null;
};
