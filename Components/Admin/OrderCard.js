// This code hadles status update on admin page

"use client";

import {
    Package,
    User,
    MapPin,
    Phone,
    CheckCircle,
    XCircle,
    Clock,
    IndianRupee,
    CreditCard,
} from "lucide-react";


export default function OrderCard({ order, handleStatusUpdate }) {

const statusConfig = {
    pending: {
        label: "Pending",
        className: "bg-amber-100 text-amber-700 border border-amber-200",
    },
    confirmed: {
        label: "Confirmed",
        className: "bg-green-100 text-green-700 border border-green-200",
    },
    packing: {
        label: "Packing",
        className: "bg-blue-100 text-blue-700 border border-blue-200",
    },
    "out-for-delivery": {
        label: "Out for Delivery",
        className: "bg-purple-100 text-purple-700 border border-purple-200",
    },
    delivered: {
        label: "Delivered",
        className: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    },
    cancelled: {
        label: "Cancelled",
        className: "bg-red-100 text-red-700 border border-red-200",
    },
};

const status = statusConfig[order.status];

    return (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 p-6 border-b bg-gradient-to-r from-gray-50 to-white">

                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center">
                        <Package size={24} />
                    </div>

                    <div>
                        <h2 className="text-xl font-bold">
                            Order #{order._id.slice(-6).toUpperCase()}
                        </h2>

                        <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                            <Clock size={14} />
                            {new Date(order.createdAt).toLocaleString()}
                        </div>
                    </div>
                </div>

                <div className="text-right">
                    <span
                        className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${status.className}`}
                    >
                        {status.label}
                    </span>

                    <div className="mt-3 flex items-center justify-end gap-1 text-2xl font-bold">
                        <IndianRupee size={20} />
                        {order.totalAmount}
                    </div>
                </div>
            </div>

            {/* Body */}
            <div className="grid lg:grid-cols-2 gap-6 p-6">

                {/* Customer Card */}
                <div className="bg-gray-50 rounded-2xl border p-5">

                    <h3 className="font-bold text-lg mb-5">
                        Customer Details
                    </h3>

                    <div className="space-y-5">

                        <div className="flex gap-3">
                            <User className="text-gray-500 mt-1" size={18} />
                            <div>
                                <p className="text-xs uppercase text-gray-500">
                                    Customer
                                </p>
                                <p className="font-semibold">
                                    {order.user.name}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Phone className="text-gray-500 mt-1" size={18} />
                            <div>
                                <p className="text-xs uppercase text-gray-500">
                                    Phone
                                </p>
                                <p>{order.user.phone}</p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <MapPin className="text-gray-500 mt-1" size={18} />
                            <div>
                                <p className="text-xs uppercase text-gray-500">
                                    Address
                                </p>
                                <p>{order.user.address}</p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <CreditCard className="text-gray-500 mt-1" size={18} />
                            <div>
                                <p className="text-xs uppercase text-gray-500">
                                    Payment
                                </p>
                                <p className="font-medium">
                                    {order.paymentType}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Items */}
                <div className="bg-gray-50 rounded-2xl border p-5">

                    <h3 className="font-bold text-lg mb-5">
                        Ordered Items
                    </h3>

                    <div className="space-y-3">

                        {order.items.map((item, index) => (

                            <div
                                key={index}
                                className="bg-white rounded-xl border p-4 flex justify-between items-center"
                            >

                                <div>
                                    <h4 className="font-semibold">
                                        {item.name}
                                    </h4>

                                    <p className="text-sm text-gray-500">
                                        Qty : {item.quantity}
                                    </p>
                                </div>

                                <div className="font-bold text-lg">
                                    ₹{item.price * item.quantity}
                                </div>

                            </div>

                        ))}

                    </div>

                    <div className="mt-6 bg-black text-white rounded-2xl px-5 py-4 flex justify-between items-center">

                        <span className="text-lg font-semibold">
                            Grand Total
                        </span>

                        <span className="text-2xl font-bold">
                            ₹{order.totalAmount}
                        </span>

                    </div>

                </div>

            </div>

            {/* Footer */}

            {order.status === "pending" && (

                <div className="border-t bg-gray-50 p-5 flex flex-col sm:flex-row gap-4">

                    <button
                        onClick={() =>
                            handleStatusUpdate(order._id, "confirmed")
                        }
                        className="flex-1 bg-green-600 hover:bg-green-700 hover:scale-[1.02] transition-all duration-200 text-white py-4 rounded-2xl font-semibold flex justify-center items-center gap-2"
                    >
                        <CheckCircle size={20} />
                        Confirm Order
                    </button>

                    <button
                        onClick={() =>
                            handleStatusUpdate(order._id, "cancelled")
                        }
                        className="flex-1 bg-red-600 hover:bg-red-700 hover:scale-[1.02] transition-all duration-200 text-white py-4 rounded-2xl font-semibold flex justify-center items-center gap-2"
                    >
                        <XCircle size={20} />
                        Cancel Order
                    </button>

                </div>

            )}

        </div>
    );
}