
"use client";

import { useEffect, useState } from "react";
import OrderCard from "@/Components/Admin/OrderCard";
import { socket } from "@/lib/socket";
import deliveryPartners from "@/data/deliveryPartners";

export default function AdminPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDelivery, setSelectedDelivery] = useState({});

    useEffect(() => {
        socket.connect();

        socket.on("connect", () => {
            console.log("✅ Connected :", socket.id);
        });

        socket.on("new-order", (newOrder) => {
            console.log("🆕 New Order:", newOrder);

            setOrders((prev) => [newOrder, ...prev]);
        });

        return () => {
            socket.off("connect");
            socket.off("new-order");
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch("/api/orders");
            const data = await res.json();

            if (data.success) {
                setOrders(data.orders);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            const res = await fetch(`/api/orders/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status }),
            });

            const data = await res.json();

            if (data.success) {
                fetchOrders(); // Refresh orders
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleAssignDelivery = async (orderId) => {
        const partnerId = selectedDelivery[orderId];

        if (!partnerId) {
            alert("Please select a delivery partner");
            return;
        }

        const partner = deliveryPartners.find(
            (p) => p.id === partnerId
        );

        const res = await fetch(`/api/orders/${orderId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status: "out-for-delivery",
                deliveryPartner: partner,
            }),
        });

        const data = await res.json();

        if (data.success) {
            fetchOrders();
        }
    };

    if (loading) {
        return <h1 className="p-8 text-xl">Loading...</h1>;
    }

    return (

        <main className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-white border-b shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Admin Dashboard
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Manage and monitor all customer orders
                        </p>
                    </div>

                    <div className="bg-black text-white px-4 py-2 rounded-xl font-semibold">
                        {orders.length} Orders
                    </div>
                </div>
            </header>

            {/* Content */}
            <section className="max-w-7xl mx-auto px-6 py-8">
                {loading ? (
                    <div className="flex justify-center items-center h-[60vh]">
                        <div className="h-12 w-12 rounded-full border-4 border-gray-300 border-t-black animate-spin"></div>
                    </div>
                ) : orders.length > 0 ? (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <OrderCard
                                key={order._id}
                                order={order}
                                handleStatusUpdate={handleStatusUpdate}
                                deliveryPartners={deliveryPartners}
                                selectedDelivery={selectedDelivery}
                                setSelectedDelivery={setSelectedDelivery}
                                handleAssignDelivery={handleAssignDelivery}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border py-20 text-center">
                        <h2 className="text-2xl font-semibold text-gray-700">
                            No Orders Yet
                        </h2>

                        <p className="text-gray-500 mt-2">
                            New customer orders will appear here.
                        </p>
                    </div>
                )}
            </section>
        </main>
    );

}