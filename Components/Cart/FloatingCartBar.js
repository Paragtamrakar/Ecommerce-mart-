"use client";

import { useEffect, useState } from "react";

export default function FloatingCartBar({ onOpen }) {

    const [cart, setCart] = useState([]);

    useEffect(() => {

        const updateCart = () => {

            const data =
                JSON.parse(
                    localStorage.getItem("cart")
                ) || [];

            setCart(data);

        };

        updateCart();

        window.addEventListener(
            "cartUpdated",
            updateCart
        );

        return () =>
            window.removeEventListener(
                "cartUpdated",
                updateCart
            );

    }, []);

    const totalItems = cart.reduce(
        (sum, item) =>
            sum + item.quantity,
        0
    );

    const totalPrice = cart.reduce(
        (sum, item) =>
            sum +
            item.price * item.quantity,
        0
    );

    if (cart.length === 0) return null;

    return (

        <button
            onClick={onOpen}
            className="fixed bottom-20 left-4 right-4 z-50 bg-green-600 text-white rounded-2xl px-4 py-3 shadow-xl active:scale-[0.98] transition"
        >

            <div className="flex items-center justify-between">

                <div>

                    <p className="font-bold">
                        {totalItems} Items
                    </p>

                    <p className="text-sm text-green-100">
                        ₹{totalPrice}
                    </p>

                </div>

                <span className="font-semibold">
                    View Cart →
                </span>

            </div>

        </button>

    );
}