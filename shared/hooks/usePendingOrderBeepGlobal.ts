"use client";

import { useEffect, useRef } from "react";
import { useOrderStore } from "@/models/orders/store";
import { playBeep, initializeAudio } from "../lib/playBeep";

export function usePendingOrderBeepGlobal() {
  const orders = useOrderStore((state) => state.orders);
  const audioInitializedRef = useRef(false);
  const beepIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize audio on first user interaction
  useEffect(() => {
    const handleUserInteraction = async () => {
      if (!audioInitializedRef.current) {
        await initializeAudio();
        audioInitializedRef.current = true;
        console.log("Audio initialized");
      }
    };

    const events = ["click", "keydown", "touchstart", "mousedown"];
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { once: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction);
      });
    };
  }, []);

  useEffect(() => {
    console.log("orders in beep hook:", orders);

    const hasPendingOrder = orders.some(
      (order) => order.orderStatus === "PENDING"
    );

    console.log("hasPendingOrder:", hasPendingOrder);

    // Clear existing interval
    if (beepIntervalRef.current) {
      clearInterval(beepIntervalRef.current);
      beepIntervalRef.current = null;
    }

    if (hasPendingOrder) {
      console.log("Starting beep interval");
      
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