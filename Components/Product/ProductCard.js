"use client";
import { useState } from "react";
import Image from "next/image";
import { addToCart } from "@/lib/cart";

export default function ProductCard({ product }) {
  const variant = product.variants[0];
  const [isAdded, setIsAdded] = useState(false);

  const discount = Math.round(
    ((variant.mrp - variant.price) / variant.mrp) * 100
  );
  const savings = variant.mrp - variant.price;
  const hasDiscount = discount > 0;

  const handleAddToCart = () => {
    if (isAdded) return;
    addToCart(product, variant);
    setIsAdded(true);
    // Resets after 1.5s — cart quantity badge handles persistence
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    // [1] CARD SHELL
    // Removed top padding — image now anchors the card from edge to edge.
    // Border stays hairline (#E8E6E1). Rounded-2xl preserved.
    // group enables child hover states without JS.
    <div className="bg-white rounded-2xl border border-[#E8E6E1] overflow-hidden flex flex-col group
                    transition-shadow duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]">

      {/* ── PRODUCT IMAGE ───────────────────────────────────────────────── */}
      {/* [2] IMAGE CONTAINER
          - Edge-to-edge: no horizontal padding, image bleeds to card edges.
          - h-36 (144px): taller than before so the product breathes.
          - bg-[#F2F1EE]: neutral tint surface still shows for PNGs/transparent.
          - overflow-hidden clips the image to rounded top corners (inherited from card).
          - relative: anchor for the absolute ADD button inside. */}
      <div className="relative w-full h-36 bg-[#F2F1EE] overflow-hidden flex-shrink-0">

        {/* [3] PRODUCT IMAGE
            - object-contain: preserves aspect ratio for any image shape.
            - p-2: light inner padding so product doesn't touch edges.
            - group-hover:scale-[1.03]: gentle zoom on card hover — product
              feels alive without being distracting. Duration kept slow (300ms)
              so it reads as premium, not cheap. */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
        />

        {/* [4] ADD BUTTON — floats inside image, bottom-right
            Replicates Zepto's pattern exactly:
            - White surface with green border = feels tappable on any background.
            - Shadow-sm gives the "slight elevation" from the brief.
            - active:scale-[0.93] + transition: tactile press feedback.
            - No hover background shift — border color deepens instead (subtler). */}
        <button
          onClick={handleAddToCart}
          disabled={isAdded}
          aria-label={`Add ${product.name} to cart`}
          className={`absolute bottom-2.5 right-2.5
                     text-xs font-bold px-4 py-1.5 rounded-xl
                     transition-all duration-150
                     ${isAdded
              ? "bg-[#329537] text-white border-[0.75px] border-[#084121] shadow-[1px_1px_0px_#084121] cursor-default scale-100"
              : "bg-white text-[#f9105e] border-[0.75px] border-[#f9105e] shadow-[1px_1px_0px_#f9105e] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
            }`}
        >
          {isAdded ? "✓ Added" : "ADD"}
        </button>
      </div>

      {/* ── PRODUCT INFO ────────────────────────────────────────────────── */}
      {/* [5] INFO BLOCK
          px-3 pt-2.5 pb-3: comfortable spacing matching Zepto's density. */}
      <div className="px-3 pt-2.5 pb-3 flex flex-col gap-0">

        {/* [6] PRICE ROW
            Price pill + struck MRP sit side-by-side on one line.
            Zepto puts them at the same vertical level, not stacked. */}
        <div className="flex items-center gap-2">

          {/* [7] PRICE PILL
              - bg-[#18A558] text-white: green pill identical to reference.
              - rounded-lg px-2 py-0.5: compact, label-like shape.
              - text-[13px] font-bold: price is the loudest element on the card. */}
          <span className="inline-flex bg-[#329537] text-white text-[14px] font-bold
                           leading-[16px] rounded-[6px]
                           border-[0.5px] border-[#084121]
                           shadow-[1.5px_1.5px_0px_#761a5b]
                           pt-[4px] pr-[6px] pb-[2px] pl-[6px]">
            ₹{variant.price}
          </span>

          {/* [8] MRP — secondary, struck, muted.
              Appears only when there's an actual discount. */}
          {hasDiscount && (
            <span className="text-[12px] text-[#ACABAB] line-through leading-none font-normal">
              ₹{variant.mrp}
            </span>
          )}
        </div>

        {/* [9] SAVINGS LINE + DASHED DIVIDER
            "₹28 OFF" sits below the price row, styled in muted olive/green.
            A dashed border separates it from the product name — exact Zepto pattern.
            Only renders when there's a real discount. */}
        {hasDiscount && (
          <>
            <p className="text-[10px] font-semibold text-[#5FAD7E] mt-1 tracking-wide uppercase">
              ₹{savings} off
            </p>
            <div className="border-t border-dashed border-[#E0E0DD] my-1.5" />
          </>
        )}

        {/* [10] PRODUCT NAME
            mt-1 when no discount (no divider to create natural gap).
            line-clamp-2: prevents overflow on long names.
            font-medium not semibold — name should support, not compete with price. */}
        <h3 className={`text-[13px] font-medium text-[#1A1A1A] leading-snug line-clamp-2
                        ${!hasDiscount ? "mt-1.5" : ""}`}>
          {product.name}
        </h3>

        {/* [11] VARIANT LABEL
            Tertiary — lightest weight, lightest color.
            mt-0.5 keeps it close to the name (they're a unit). */}
        <p className="text-[11px] text-[#ACABAB] mt-0.5 font-normal">
          {variant.label}
        </p>

      </div>
    </div>
  );
}