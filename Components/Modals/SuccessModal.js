"use client";

import { useEffect } from "react";

export default function SuccessModal({
    isOpen,
    title = "Order Placed!",
    description = "Your order has been accepted successfully.",
    buttonText = "Continue",
    autoClose = false,
    autoCloseTime = 2000,
    onClose,
}) {

    useEffect(() => {
        if (!autoClose || !isOpen) return;

        const timer = setTimeout(() => {
            onClose?.();
        }, autoCloseTime);

        return () => clearTimeout(timer);

    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center px-5">

            <div className="bg-white rounded-3xl w-full max-w-sm p-8 text-center shadow-2xl animate-[fadeIn_.25s_ease]">

                {/* Success Icon */}
                <div className="mx-auto mb-6 relative">

                    <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center animate-pulse">

                        <svg
                            viewBox="0 0 24 24"
                            className="w-12 h-12 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>

                    </div>

                </div>

                <h2 className="text-2xl font-bold text-gray-900">
                    {title}
                </h2>

                <p className="mt-3 text-gray-500 leading-relaxed">
                    {description}
                </p>

                <button
                    onClick={onClose}
                    className="mt-8 w-full bg-green-600 hover:bg-green-700 transition text-white font-semibold rounded-xl py-3"
                >
                    {buttonText}
                </button>

            </div>

        </div>
    );
}