"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    setIsAdding(true);
    addToCart(product, 1);
    
    // Quick visual feedback
    setTimeout(() => {
      setIsAdding(false);
    }, 600);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={isAdding}
      className="w-full mt-4 py-4 text-center bg-foreground text-background text-[10px] uppercase tracking-[0.3em] font-sans hover:bg-foreground/90 transition-colors disabled:opacity-70 flex justify-center items-center"
    >
      {isAdding ? "Adding..." : "Add to quote list"}
    </button>
  );
}
