"use client";

import { useEffect, useState } from "react";
import {
    Package,
    MapPin,
    Phone,
    User,
    CheckCircle,
    Clock,
    ShieldCheck,
    Navigation,
} from "lucide-react";

import { socket } from "@/lib/socket";

export default function DeliveryPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const [codes, setCodes] = useState({});
    const [verifying, setVerifying] = useState({});
    const [successOrders, setSuccessOrders] = useState({});

    // TEMPORARY — Login/session implement hone tak
    const deliveryPartnerName = "Vikas Patel";

    // FUTURE:
    // const deliveryPartnerId = session.user.id;


    // --------------------------------
    // Fetch Assigned Orders
    // --------------------------------

    const fetchOrders = async () => {
        try {
            const res = await fetch("/api/delivery/orders");

            const data = await res.json();

            if (data.success) {
                setOrders(data.orders);
            }
        } catch (error) {
            console.error("Fetch delivery orders error:", error);
        } finally {
            setLoading(false);
        }
    };


    // --------------------------------
    // Socket.IO
    // --------------------------------

    useEffect(() => {
        fetchOrders();

        socket.connect();

        socket.on("connect", () => {
            console.log("🚚 Delivery Socket Connected:", socket.id);
        });

        socket.on("orderUpdated", (updatedOrder) => {
            console.log("🔄 Delivery Order Updated:", updatedOrder);

            setOrders((prevOrders) => {
                const exists = prevOrders.some(
                    (order) => order._id === updatedOrder._id
                );

                const belongsToThisDeliveryBoy =
                    updatedOrder.deliveryPartner?.name ===
                    deliveryPartnerName;

                // If order belongs to this delivery boy
                if (belongsToThisDeliveryBoy) {

                    // Delivered order
                    if (updatedOrder.status === "delivered") {
                        return prevOrders.map((order) =>
                            order._id === updatedOrder._id
                                ? updatedOrder
                                : order
                        );
                    }

                    // Existing order → update
                    if (exists) {
                        return prevOrders.map((order) =>
                            order._id === updatedOrder._id
                                ? updatedOrder
                                : order
                        );
                    }

                    // Newly assigned order → add instantly
                    return [updatedOrder, ...prevOrders];
                }

                // Order no longer belongs to this delivery boy
                return prevOrders.filter(
                    (order) => order._id !== updatedOrder._id
                );
            });
        });

        return () => {
            socket.off("connect");
            socket.off("orderUpdated");
            socket.disconnect();
        };
    }, []);


    // --------------------------------
    // Handle Code Input
    // --------------------------------

    const handleCodeChange = (orderId, value) => {
        // Only numbers
        const numericValue = value.replace(/\D/g, "");

        // Maximum 6 digits
        setCodes((prev) => ({
            ...prev,
            [orderId]: numericValue.slice(0, 6),
        }));
    };


    // --------------------------------
    // Verify Delivery
    // --------------------------------

    const handleVerifyDelivery = async (orderId) => {
        const enteredCode = codes[orderId];

        if (!enteredCode || enteredCode.length !== 6) {
            alert("Please enter the 6-digit delivery code.");
            return;
        }

        try {
            setVerifying((prev) => ({
                ...prev,
                [orderId]: true,
            }));

            const res = await fetch(`/api/orders/${orderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status: "delivered",
                    verificationCode: enteredCode,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Invalid delivery code");
                return;
            }

            // Show success UI
            setSuccessOrders((prev) => ({
                ...prev,
                [orderId]: true,
            }));

            // Remove after success animation
            setTimeout(() => {
                setOrders((prevOrders) =>
                    prevOrders.filter(
                        (order) => order._id !== orderId
                    )
                );

                setCodes((prev) => {
                    const updated = { ...prev };
                    delete updated[orderId];
                    return updated;
                });

                setSuccessOrders((prev) => {
                    const updated = { ...prev };
                    delete updated[orderId];
                    return updated;
                });
            }, 1800);

        } catch (error) {
            console.error("Delivery verification error:", error);

            alert("Something went wrong. Please try again.");

        } finally {
            setVerifying((prev) => ({
                ...prev,
                [orderId]: false,
            }));
        }
    };


    // --------------------------------
    // Loading
    // --------------------------------

    if (loading) {
        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">

                    <div className="w-12 h-12 mx-auto rounded-full border-4 border-gray-200 border-t-black animate-spin" />

                    <p className="mt-4 text-gray-500">
                        Loading deliveries...
                    </p>

                </div>
            </main>
        );
    }


    // --------------------------------
    // UI
    // --------------------------------

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">

            {/* Header */}

            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200">

                <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">

                    <div className="flex items-center justify-between">

                        <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-2xl bg-black flex items-center justify-center">

                                <Package
                                    className="text-white"
                                    size={21}
                                />

                            </div>

                            <div>

                                <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                                    Delivery Dashboard
                                </h1>

                                <p className="text-xs sm:text-sm text-gray-500">
                                    Welcome, {deliveryPartnerName}
                                </p>

                            </div>

                        </div>


                        {/* Order Count */}

                        <div className="px-4 py-2 rounded-xl bg-gray-100">

                            <p className="text-xs text-gray-500">
                                Assigned
                            </p>

                            <p className="text-lg font-bold text-gray-900 text-center">
                                {orders.length}
                            </p>

                        </div>

                    </div>

                </div>

            </header>


            {/* Content */}

            <section className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">


                {/* Empty State */}

                {orders.length === 0 && (

                    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm py-20 px-6 text-center">

                        <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 flex items-center justify-center">

                            <CheckCircle
                                size={38}
                                className="text-gray-400"
                            />

                        </div>

                        <h2 className="mt-5 text-xl font-bold text-gray-900">
                            All caught up!
                        </h2>

                        <p className="mt-2 text-gray-500">
                            No orders are currently assigned to you.
                        </p>

                    </div>

                )}


                {/* Orders */}

                <div className="space-y-5">

                    {orders.map((order) => {

                        const isSuccess =
                            successOrders[order._id];

                        return (

                            <div
                                key={order._id}
                                className={`bg-white rounded-3xl border shadow-sm overflow-hidden transition-all duration-500 ${isSuccess
                                        ? "border-emerald-300 shadow-emerald-100"
                                        : "border-gray-200"
                                    }`}
                            >

                                {/* Success Overlay */}

                                {isSuccess ? (

                                    <div className="p-10 text-center">

                                        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center">

                                            <CheckCircle
                                                size={42}
                                                className="text-emerald-600"
                                            />

                                        </div>

                                        <h2 className="mt-5 text-2xl font-bold text-gray-900">
                                            Delivery Successful
                                        </h2>

                                        <p className="mt-2 text-gray-500">
                                            Order #{order._id.slice(-5).toUpperCase()}
                                        </p>

                                    </div>

                                ) : (

                                    <>

                                        {/* Order Header */}

                                        <div className="p-5 sm:p-6 border-b border-gray-100">

                                            <div className="flex items-start justify-between gap-4">

                                                <div className="flex items-center gap-3">

                                                    <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center">

                                                        <Package
                                                            className="text-white"
                                                            size={22}
                                                        />

                                                    </div>

                                                    <div>

                                                        <div className="flex items-center gap-2">

                                                            <h2 className="font-bold text-lg text-gray-900">
                                                                Order #
                                                                {order._id
                                                                    .slice(-5)
                                                                    .toUpperCase()}
                                                            </h2>

                                                            <span className="px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold">

                                                                <span className="flex items-center gap-1">

                                                                    <Clock size={12} />

                                                                    Out for Delivery

                                                                </span>

                                                            </span>

                                                        </div>

                                                        <p className="text-sm text-gray-500 mt-1">
                                                            {new Date(
                                                                order.createdAt
                                                            ).toLocaleString()}
                                                        </p>

                                                    </div>

                                                </div>


                                                <div className="text-right">

                                                    <p className="text-xl font-bold text-gray-900">
                                                        ₹{order.totalAmount}
                                                    </p>

                                                    <p className="text-xs text-gray-500">
                                                        {order.paymentType}
                                                    </p>

                                                </div>

                                            </div>

                                        </div>


                                        {/* Details */}

                                        <div className="p-5 sm:p-6 space-y-5">


                                            {/* Customer */}

                                            <div className="grid sm:grid-cols-2 gap-3">


                                                <div className="p-4 rounded-2xl bg-gray-50 flex gap-3">

                                                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">

                                                        <User size={18} />

                                                    </div>

                                                    <div>

                                                        <p className="text-xs text-gray-500">
                                                            Customer
                                                        </p>

                                                        <p className="font-semibold text-gray-900">
                                                            {order.user?.name || "N/A"}
                                                        </p>

                                                    </div>

                                                </div>


                                                <a
                                                    href={`tel:${order.user?.phone}`}
                                                    className="p-4 rounded-2xl bg-gray-50 flex gap-3 hover:bg-gray-100 transition"
                                                >

                                                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">

                                                        <Phone size={18} />

                                                    </div>

                                                    <div>

                                                        <p className="text-xs text-gray-500">
                                                            Phone
                                                        </p>

                                                        <p className="font-semibold text-gray-900">
                                                            {order.user?.phone || "N/A"}
                                                        </p>

                                                    </div>

                                                </a>

                                            </div>


                                            {/* Address */}

                                            <div className="p-4 rounded-2xl bg-gray-50 flex gap-3">

                                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0">

                                                    <MapPin size={18} />

                                                </div>

                                                <div className="flex-1">

                                                    <p className="text-xs text-gray-500 mb-1">
                                                        Delivery Address
                                                    </p>

                                                    <p className="font-medium text-gray-900 leading-relaxed">
                                                        {order.user?.address || "N/A"}
                                                    </p>

                                                    <button
                                                        onClick={() =>
                                                            window.open(
                                                                `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                                                    order.user?.address || ""
                                                                )}`,
                                                                "_blank"
                                                            )
                                                        }
                                                        className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
                                                    >

                                                        <Navigation size={15} />

                                                        Navigate

                                                    </button>

                                                </div>

                                            </div>


                                            {/* Items */}

                                            <div className="rounded-2xl border border-gray-100 overflow-hidden">

                                                <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">

                                                    <p className="text-xs font-bold text-gray-500">
                                                        ORDER ITEMS
                                                    </p>

                                                </div>

                                                <div className="divide-y divide-gray-100">

                                                    {order.items?.map(
                                                        (item, index) => (

                                                            <div
                                                                key={index}
                                                                className="px-4 py-3 flex items-center justify-between"
                                                            >

                                                                <span className="font-medium text-gray-900">
                                                                    {item.name}
                                                                </span>

                                                                <span className="text-gray-500 font-semibold">
                                                                    × {item.quantity}
                                                                </span>

                                                            </div>

                                                        )
                                                    )}

                                                </div>

                                            </div>


                                            {/* Verification */}

                                            <div className="rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5">

                                                <div className="flex items-center gap-2">

                                                    <ShieldCheck
                                                        size={19}
                                                        className="text-emerald-700"
                                                    />

                                                    <h3 className="font-bold text-emerald-900">
                                                        Delivery Verification
                                                    </h3>

                                                </div>

                                                <p className="text-sm text-emerald-700 mt-2">
                                                    Ask the customer for their
                                                    6-digit delivery code.
                                                </p>


                                                <div className="mt-4 flex flex-col sm:flex-row gap-3">

                                                    <input
                                                        type="text"
                                                        inputMode="numeric"
                                                        maxLength={6}
                                                        placeholder="000000"
                                                        value={
                                                            codes[order._id] || ""
                                                        }
                                                        onChange={(e) =>
                                                            handleCodeChange(
                                                                order._id,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="w-full sm:w-40 bg-white border-2 border-emerald-300 rounded-xl px-4 py-3 text-center text-xl tracking-[0.35em] font-bold text-gray-900 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                                                    />


                                                    <button
                                                        onClick={() =>
                                                            handleVerifyDelivery(
                                                                order._id
                                                            )
                                                        }
                                                        disabled={
                                                            verifying[
                                                            order._id
                                                            ]
                                                        }
                                                        className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                                                    >

                                                        {verifying[
                                                            order._id
                                                        ] ? (

                                                            <>
                                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />

                                                                Verifying...
                                                            </>

                                                        ) : (

                                                            <>
                                                                <CheckCircle
                                                                    size={17}
                                                                />

                                                                Verify & Deliver
                                                            </>

                                                        )}

                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    </>

                                )}

                            </div>

                        );
                    })}

                </div>

            </section>

        </main>
    );
}