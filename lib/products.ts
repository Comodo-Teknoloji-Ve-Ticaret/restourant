import productData from "@/data/products.json";
import type { LocalizedText } from "@/lib/translations";

export interface Product {
  id: number;
  name: LocalizedText;
  image: string;
}

export const products = productData as Product[];