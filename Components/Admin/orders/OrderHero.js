"use client";
// This page will display currrent active orders in premium way
export default function OrderHero({ order, onAccept, onReject }) {
    if (!order) return null;

    return (
        <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">

            {/* Header */}

            <div className="flex items-start justify-between">

                <div>

                    <div className="flex items-center gap-2">

                        <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />

                        <span className="text-sm font-semibold uppercase tracking-wider text-red-500">
                            Now Processing
                        </span>

                    </div>

                    <h1 className="mt-5 text-4xl font-bold">
                        {order.user.name}
                    </h1>

                    <div className="mt-3 flex gap-4 text-neutral-500">

                        <span>{order.paymentType}</span>

                        <span>•</span>

                        <span>{order.items.length} Items</span>

                    </div>

                </div>

                <div className="text-right">

                    <h2 className="text-4xl font-bold">
                        ₹{order.totalAmount}
                    </h2>

                    {/* Timer Later */}

                    <p className="mt-2 text-neutral-400">
                        02:00
                    </p>

                </div>

            </div>

            {/* Customer */}

            <div className="mt-10 rounded-2xl bg-neutral-50 p-5">

                <p className="font-medium">
                    📞 {order.user.phone}
                </p>

                <p className="mt-3 text-neutral-600">
                    📍 {order.user.address}
                </p>

            </div>

            {/* Items */}

            <div className="mt-8">

                <h3 className="mb-5 text-lg font-semibold">
                    Order Items
                </h3>

                <div className="space-y-3">

                    {order.items.map((item) => (

                        <div
                            key={item.productId}
                            className="flex items-center justify-between rounded-xl border border-neutral-200 p-4"
                        >

                            <div>

                                <h4 className="font-medium">
                                    {item.name}
                                </h4>

                                <p className="text-sm text-neutral-500">
                                    Qty {item.quantity}
                                </p>

                            </div>

                            <span className="font-semibold">
                                ₹{item.price}
                            </span>

                        </div>

                    ))}

                </div>

            </div>

            {/* Footer */}

            <div className="mt-10 flex justify-end gap-4">

                <button
                    onClick={onReject}
                    className="rounded-xl border border-neutral-300 px-8 py-3 font-medium transition hover:bg-neutral-100"
                >
                    Reject
                </button>

                <button
                    onClick={onAccept}
                    className="rounded-xl bg-black px-8 py-3 font-medium text-white transition hover:bg-neutral-800"
                >
                    Accept
                </button>

            </div>

        </section>
    );
}