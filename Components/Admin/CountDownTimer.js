"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function CountdownTimer({
  createdAt,
  duration = 120,
  size = "default",
}) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const elapsedSeconds = Math.floor(
    (now - new Date(createdAt).getTime()) / 1000
  );

  const remaining = Math.max(duration - elapsedSeconds, 0);
  const isExpired = remaining <= 0;

  const { label, colorClass, ringColor, pulse } = useMemo(() => {
    if (isExpired) {
      return {
        label: "Exp",
        colorClass: "text-gray-400",
        ringColor: "#D1D5DB",
        pulse: false,
      };
    }

    const m = Math.floor(remaining / 60);
    const s = remaining % 60;
    const formatted = `${m}:${String(s).padStart(2, "0")}`;

    if (remaining > 60) {
      return {
        label: formatted,
        colorClass: "text-emerald-600",
        ringColor: "#10B981",
        pulse: false,
      };
    }

    if (remaining > 30) {
      return {
        label: formatted,
        colorClass: "text-amber-600",
        ringColor: "#F59E0B",
        pulse: false,
      };
    }

    return {
      label: formatted,
      colorClass: "text-red-600",
      ringColor: "#EF4444",
      pulse: true,
    };
  }, [remaining, isExpired]);

  const progress = isExpired ? 0 : remaining / duration;
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  const dimension = size === "compact" ? 44 : 56;

  return (
    <motion.div
      className="relative flex items-center justify-center shrink-0"
      style={{
        width: dimension,
        height: dimension,
      }}
      animate={pulse ? { scale: [1, 1.06, 1] } : { scale: 1 }}
      transition={
        pulse
          ? {
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }
          : {}
      }
    >
      <svg
        width={dimension}
        height={dimension}
        viewBox="0 0 48 48"
        className="-rotate-90"
      >
        <circle
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="4"
        />

        <motion.circle
          cx="24"
          cy="24"
          r={RADIUS}
          fill="none"
          stroke={ringColor}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          animate={{ strokeDashoffset }}
          transition={{
            duration: 0.5,
          }}
        />
      </svg>

      <span
        className={`absolute text-xs font-semibold tabular-nums ${colorClass}`}
      >
        {label}
      </span>
    </motion.div>
  );
}