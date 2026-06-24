
"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";

export default function CartModal({
    show,
    onClose,
}) {

    // const { data: session } =
    //     useSession();

    // User Details
    const [userDetails, setUserDetails] =
        useState({
            name: "",
            phone: "",
            address: "",
        });

    const [isLoadingUser, setIsLoadingUser] =
        useState(false);

    const [userError, setUserError] =
        useState(null);

    // Cart
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

    // Future DB Fetch
    /*
    useEffect(() => {

        if (!session?.user?.email) return;

        const fetchUser = async () => {

            try {

                setIsLoadingUser(true);
                setUserError(null);

                const res = await fetch(
                    "/api/users/profile"
                );

                if (!res.ok) {
                    throw new Error(
                        "Failed to fetch user"
                    );
                }

                const data =
                    await res.json();

                setUserDetails({
                    name:
                        data.name || "",
                    phone:
                        data.phone || "",
                    address:
                        data.address || "",
                });

            } catch (error) {

                console.error(error);

                setUserError(
                    "Unable to load profile"
                );

            } finally {

                setIsLoadingUser(false);

            }

        };

        fetchUser();

    }, [session]);
    */

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

    const validateOrderDetails =
        () => {

            if (
                !userDetails.phone.trim()
            ) {
                return "Phone number is required";
            }

            if (
                userDetails.phone
                    .trim().length < 10
            ) {
                return "Invalid phone number";
            }

            if (
                !userDetails.address.trim()
            ) {
                return "Address is required";
            }

            return null;

        };

    const handlePlaceOrder =
        async () => {

            const error =
                validateOrderDetails();

            if (error) {
                alert(error);
                return;
            }

            const orderData = {
                items: cart,
                totalPrice,
                customer: {
                    ...userDetails,
                    email:
                        session?.user
                            ?.email,
                },
            };

            console.log(
                "Order Data:",
                orderData
            );

            /*
            Future API Call

            try {

                const res = await fetch(
                    "/api/orders",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json",
                        },
                        body:
                            JSON.stringify(
                                orderData
                            ),
                    }
                );

            } catch (error) {
                console.error(error);
            }
            */
        };

    const totalPrice =
        cart.reduce(
            (sum, item) =>
                sum +
                item.price *
                item.quantity,
            0
        );

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[999] bg-black/40 flex items-end md:items-center justify-center">

            <div className="bg-white w-full md:max-w-md rounded-t-3xl md:rounded-3xl max-h-[80vh] overflow-y-auto">

                {/* Header */}
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

                {/* Items */}
                <div className="p-4 space-y-4">

                    {cart.length === 0 ? (

                        <p className="text-center text-gray-500">
                            Cart is empty
                        </p>

                    ) : (

                        cart.map(
                            (item) => (

                                <div
                                    key={
                                        item._id
                                    }
                                    className="flex justify-between items-center"
                                >

                                    <div>

                                        <h3 className="font-medium">
                                            {
                                                item.name
                                            }
                                        </h3>

                                        <p className="text-sm text-gray-500">
                                            ₹
                                            {
                                                item.price
                                            }
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
                                            {
                                                item.quantity
                                            }
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

                            )
                        )

                    )}

                </div>

                {/* Footer */}
                {cart.length > 0 && (

                    <div className="border-t p-4">

                        <div className="flex justify-between mb-4">

                            <span>
                                Total
                            </span>

                            <span className="font-bold">
                                ₹
                                {totalPrice}
                            </span>

                        </div>

                        {/* {session && ( */}

                            <div className="space-y-3 mb-4">

                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    value={
                                        userDetails.phone
                                    }
                                    onChange={(
                                        e
                                    ) =>
                                        setUserDetails(
                                            (
                                                prev
                                            ) => ({
                                                ...prev,
                                                phone:
                                                    e
                                                        .target
                                                        .value,
                                            })
                                        )
                                    }
                                    className="w-full border rounded-lg p-3"
                                />

                                <textarea
                                    placeholder="Delivery Address"
                                    value={
                                        userDetails.address
                                    }
                                    onChange={(
                                        e
                                    ) =>
                                        setUserDetails(
                                            (
                                                prev
                                            ) => ({
                                                ...prev,
                                                address:
                                                    e
                                                        .target
                                                        .value,
                                            })
                                        )
                                    }
                                    className="w-full border rounded-lg p-3"
                                    rows={
                                        3
                                    }
                                />

                            </div>

                        {/* )} */}

                        {/* {session ? ( */}

                            <button
                                onClick={
                                    handlePlaceOrder
                                }
                                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold"
                            >
                                Place Order
                            </button>

                        {/* ) : ( */}

                            {/* <button
                                onClick={() =>
                                    signIn(
                                        "google"
                                    )
                                }
                                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold"
                            >
                                Login To Place Order
                            </button>

                        )} */}

                    </div>

                )}

            </div>

        </div>
    );
}

