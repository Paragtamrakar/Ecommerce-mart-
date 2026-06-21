"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FloatingCartBar({ onOpen }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const updateCart = () => {
      const data = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(data);
    };
    updateCart();
    window.addEventListener("cartUpdated", updateCart);
    return () => window.removeEventListener("cartUpdated", updateCart);
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {cart.length > 0 && (
        // BAR ENTRY / EXIT
        // y: 80 → 0 on mount, 0 → 80 on unmount.
        // whileInView removed — replaced with animate so it triggers
        // on mount rather than only when scrolled into view.
        // The bar is fixed, so whileInView was unreliable.
        <motion.button
          onClick={onOpen}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-20 left-4 right-4 z-50
                     bg-[#329537] text-white rounded-2xl px-4 py-3.5
                     border-[0.5px] border-[#084121]
                     shadow-[2px_2px_0px_#084121]
                     active:shadow-none active:translate-x-[2px] active:translate-y-[2px]
                     transition-[box-shadow,transform] duration-100"
        >
          <div className="flex items-center justify-between">

            {/* ── LEFT BLOCK ─────────────────────────────────────────── */}
            {/* Item count is the label. Price is the value.
                Hierarchy: label (small, muted) → value (large, white, animated).
                Eye lands on price first because it's bigger and brighter. */}
            <div className="flex flex-col gap-0">

              {/* ITEM COUNT — static, no animation.
                  Psychology: animating both count and price creates
                  competing motion — the eye doesn't know where to look.
                  Count is context, not the signal. Keep it calm. */}
              <p className="text-[11px] text-green-200 font-medium leading-tight">
                {totalItems} {totalItems === 1 ? "item" : "items"} in cart
              </p>

              {/* PRICE — the only animated element on the left.
                  Sole animated element = clear signal that something changed.
                  y: 8 → 0: tighter travel than before (was 14px).
                  Shorter travel = more premium, less theatrical.
                  duration 220ms: fast enough to feel snappy,
                  slow enough to be readable mid-animation. */}
              <div className="h-[26px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={totalPrice}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="text-[18px] font-bold leading-[26px] tracking-tight"
                  >
                    ₹{totalPrice}
                  </motion.p>
                </AnimatePresence>
              </div>

            </div>

            {/* ── RIGHT BLOCK — CTA ──────────────────────────────────── */}
            {/* Vertically centered via items-center on parent flex.
                font-semibold + tracking-wide: reads as a clear action,
                not just decorative text.
                Arrow (→) kept — horizontal action on a horizontal bar. */}
            <div className="flex flex-col items-end gap-0">
              <p className="text-[11px] text-green-200 font-medium leading-tight">
                tap to checkout
              </p>
              <p className="text-[15px] font-bold tracking-wide leading-tight">
                View Cart →
              </p>
            </div>

          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}