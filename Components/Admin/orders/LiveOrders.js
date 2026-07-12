"use client";
// This page shows the incoming orders 

import { useEffect, useState } from "react";
import OrderHero from "./OrderHero";
import OrderQueue from "./OrderQueue";

export default function LiveOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch("/api/orders");
                const data = await res.json();

                if (!data.success) {
                    throw new Error(data.message);
                }

                setOrders(data.orders);
            } catch (err) {
                setError(err.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Current order (Top Priority)
    const currentOrder = orders[0];

    // Remaining Orders
    const queueOrders = orders.slice(1);

    if (loading) {
        return (
            <section className="p-8">
                <h2 className="text-2xl font-bold">Live Orders</h2>
                <p className="mt-4 text-gray-500">Loading...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="p-8">
                <h2 className="text-2xl font-bold">Live Orders</h2>
                <p className="mt-4 text-red-500">{error}</p>
            </section>
        );
    }

    if (!currentOrder) {
        return (
            <section className="p-8">
                <h2 className="text-2xl font-bold">Live Orders</h2>
                <p className="mt-4 text-gray-500">
                    No Live Orders 🚀
                </p>
            </section>
        );
    }

    return (
        <section className="space-y-8">

            {/* Header */}
            <div className="flex items-center justify-between">

                <div>
                    <h2 className="text-3xl font-bold">
                        Live Orders
                    </h2>

                    <p className="text-gray-500">
                        {orders.length} Active Orders
                    </p>
                </div>

            </div>

            {/* Hero + Queue */}
            <div className="grid grid-cols-12 gap-8">

                {/* Hero Order */}
                <div className="col-span-8">

                    <OrderHero
                        order={currentOrder}
                    />

                </div>

                {/* Queue */}
                <div className="col-span-4">

                    <OrderQueue
                        orders={queueOrders}
                    />

                </div>

            </div>

        </section>
    );
}