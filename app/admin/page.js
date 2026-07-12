"use client";
import LiveOrders from "@/Components/Admin/orders/LiveOrders";

export default function AdminPage() {
    return (
        <main className="min-h-screen bg-neutral-100 p-8">
            <div className="mx-auto max-w-7xl">
                <LiveOrders />
            </div>
        </main>
    );
}