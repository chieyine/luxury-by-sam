"use client";

import { useCart } from "../context/CartContext";

export default function CartToggle({ className = "" }) {
  const { cartCount, openDrawer } = useCart();

  const handleOpen = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openDrawer();
  };

  return (
    <button
      onClick={handleOpen}
      className={`luxury-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`}
    >
      Quote ({cartCount})
    </button>
  );
}
