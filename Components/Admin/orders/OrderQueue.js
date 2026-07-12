"use client";
// This code makes orders in a queue

function QueueCard({ order, queuePosition, isNext }) {
    return (
        <div
            className={`rounded-2xl p-5 transition-all duration-300 hover:shadow-md ${isNext
                    ? "border-2 border-green-500 bg-green-50"
                    : "border border-neutral-200 bg-white"
                }`}
        >
            <div className="flex items-center justify-between">

                <span className="text-sm font-semibold text-neutral-400">
                    #{queuePosition}
                </span>

                {isNext ? (
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                        Up Next
                    </span>
                ) : (
                    <span className="rounded-full bg-neutral-100 px-2 py-1 text-xs font-medium text-neutral-600">
                        Waiting
                    </span>
                )}

            </div>

            <h3 className="mt-4 text-lg font-semibold">
                {order.user.name}
            </h3>

            <p className="mt-1 text-sm text-neutral-500">
                {order.items.length} {order.items.length > 1 ? "Items" : "Item"}
            </p>

            <div className="mt-4 flex items-center justify-between">

                <span className="text-sm text-neutral-500">
                    {order.paymentType}
                </span>

                <span className="text-lg font-bold">
                    ₹{order.totalAmount}
                </span>

            </div>
        </div>
    );
}

export default function OrderQueue({ orders }) {
    return (
        <section className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6">

            <div className="mb-6">

                <h2 className="text-xl font-bold">
                    Next Queue
                </h2>

                <p className="text-sm text-neutral-500">
                    {orders.length} {orders.length === 1 ? "Order" : "Orders"} Waiting
                </p>

            </div>

            <div className="max-h-[650px] space-y-4 overflow-y-auto pr-2">

                {orders.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-neutral-300 p-8 text-center text-neutral-500">
                        No Orders in Queue
                    </div>
                ) : (
                    orders.map((order, index) => (
                        <QueueCard
                            key={order._id}
                            order={order}
                            queuePosition={index + 2}
                            isNext={index === 0}
                        />
                    ))
                )}

            </div>

        </section>
    );
}