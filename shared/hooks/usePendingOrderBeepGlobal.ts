"use client";

import { useEffect, useRef } from "react";
import { playBeep, initializeAudio } from "../lib/playBeep";
import { useOrders } from "@/models/orders/hooks";

export function usePendingOrderBeepGlobal() {
  const { data } = useOrders();
  const orders = data?.orders.content;
  const audioInitializedRef = useRef(false);
  const beepIntervalRef = useRef<NodeJS.Timeout | null>(null);
  // Initialize audio on first user interaction
  useEffect(() => {
    const handleUserInteraction = async () => {
      if (!audioInitializedRef.current) {
        await initializeAudio();
        audioInitializedRef.current = true;
      }
    };

    const events = ["click", "keydown", "touchstart", "mousedown"];
    events.forEach((event) => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, []);

  useEffect(() => {
    const hasPendingOrder = orders?.some(
      (order) => order.orderStatus === "PENDING"
    );

    // Clear existing interval
    if (beepIntervalRef.current) {
      clearInterval(beepIntervalRef.current);
      beepIntervalRef.current = null;
    }

    if (hasPendingOrder) {
      // Play immediately
      if (audioInitializedRef.current) {
        playBeep({
          frequency: 880,
          duration: 350,
          volume: 0.25,
        });
      }

      // Then repeat every 3 seconds (adjust timing as needed)
      beepIntervalRef.current = setInterval(() => {
        if (audioInitializedRef.current) {
          playBeep({
            frequency: 880,
            duration: 350,
            volume: 0.25,
          });
        }
      }, 3000); // Beep every 3 seconds
    }

    // Cleanup interval when component unmounts or no pending orders
    return () => {
      if (beepIntervalRef.current) {
        clearInterval(beepIntervalRef.current);
        beepIntervalRef.current = null;
      }
    };
  }, [orders]);
}
