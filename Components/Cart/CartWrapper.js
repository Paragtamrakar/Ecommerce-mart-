// this code is used for showing cart in everyplace including server components
"use client";

import { useState } from "react";
import FloatingCartBar from "./FloatingCartBar";
import CartModal from "./CartModal";

export default function CartWrapper() {

  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <FloatingCartBar
        onOpen={() => setShowCart(true)}
      />

      <CartModal
        show={showCart}
        onClose={() => setShowCart(false)}
      />
    </>
  );
}