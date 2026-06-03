"use client";

import { useEffect, useState } from "react";

export default function CartModal({
    show,
    onClose,
}) {

    const [cart, setCart] =
        useState([]);

    useEffect(() => {

        if (!show) return;

        const data =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];

        setCart(data);

    }, [show]);

    const saveCart = (updated) => {

        localStorage.setItem(
            "cart",
            JSON.stringify(updated)
        );

        setCart(updated);

        window.dispatchEvent(
            new Event("cartUpdated")
        );

    };

    const increaseQty = (id) => {

        const updated = cart.map(
            (item) =>
                item._id === id
                    ? {
                        ...item,
                        quantity:
                            item.quantity + 1,
                    }
                    : item
        );

        saveCart(updated);

    };

    const decreaseQty = (id) => {

        const updated = cart
            .map((item) =>
                item._id === id
                    ? {
                        ...item,
                        quantity:
                            item.quantity - 1,
                    }
                    : item
            )
            .filter(
                (item) =>
                    item.quantity > 0
            );

        saveCart(updated);

    };

    const totalPrice = cart.reduce(
        (sum, item) =>
            sum +
            item.price * item.quantity,
        0
    );

    if (!show) return null;

    return (

        <div className="fixed inset-0 z-[999] bg-black/40 flex items-end md:items-center justify-center">

            <div className="bg-white w-full md:max-w-md rounded-t-3xl md:rounded-3xl max-h-[80vh] overflow-y-auto">

                {/* HEADER */}
                <div className="flex items-center justify-between p-4 border-b">

                    <h2 className="font-bold text-lg">
                        Your Cart
                    </h2>

                    <button
                        onClick={onClose}
                    >
                        ✕
                    </button>

                </div>

                {/* ITEMS */}
                <div className="p-4 space-y-4">

                    {cart.length === 0 ? (

                        <p className="text-center text-gray-500">
                            Cart is empty
                        </p>

                    ) : (

                        cart.map((item) => (

                            <div
                                key={item._id}
                                className="flex justify-between items-center"
                            >

                                <div>

                                    <h3 className="font-medium">
                                        {item.name}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        ₹{item.price}
                                    </p>

                                </div>

                                <div className="flex items-center gap-2">

                                    <button
                                        onClick={() =>
                                            decreaseQty(
                                                item._id
                                            )
                                        }
                                        className="w-8 h-8 rounded-lg bg-gray-100"
                                    >
                                        -
                                    </button>

                                    <span>
                                        {item.quantity}
                                    </span>

                                    <button
                                        onClick={() =>
                                            increaseQty(
                                                item._id
                                            )
                                        }
                                        className="w-8 h-8 rounded-lg bg-green-600 text-white"
                                    >
                                        +
                                    </button>

                                </div>

                            </div>

                        ))

                    )}

                </div>

                {/* FOOTER */}
                {cart.length > 0 && (

                    <div className="border-t p-4">

                        <div className="flex justify-between mb-4">

                            <span>Total</span>

                            <span className="font-bold">
                                ₹{totalPrice}
                            </span>

                        </div>

                        {/*
              FUTURE LOGIN CHECK

              const { data: session } = useSession();

              if(!session){
                router.push("/login");
                return;
              }
            */}

                        <button className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold">

                            Proceed To Checkout

                        </button>

                    </div>

                )}

            </div>

        </div>

    );
}