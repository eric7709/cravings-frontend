"use client";

import { useEffect, useRef } from "react";
import { Client, Message } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { Order } from "@/models/orders/types";
import { useQueryClient } from "@tanstack/react-query";

export function useOrderRealtime() {
  const queryClient = useQueryClient();
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const WEBSOCKETURL =
      process.env.NEXT_PUBLIC_ENVIRONMENT === "PRODUCTION"
        ? process.env.NEXT_PUBLIC_BACKEND_PRO_URL
        : process.env.NEXT_PUBLIC_BACKEND_DEV_URL;

    if (!WEBSOCKETURL) {
      console.error("WebSocket URL is not defined. Check your environment variables.");
      return;
    }

    console.log("Connecting to WebSocket:", `${WEBSOCKETURL}/ws`);

    const client = new Client({
      webSocketFactory: () => new SockJS(`${WEBSOCKETURL}/ws`),
      reconnectDelay: 5000,
      debug: (str) => {
        console.log("STOMP Debug:", str);
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame);
      },
      onWebSocketError: (error) => {
        console.error("WebSocket error:", error);
      },
    });

    client.onConnect = () => {
      console.log("✅ WebSocket connected");

      client.subscribe("/topic/orders/created", (msg: Message) => {
        console.log("📨 New order received:", msg.body);
        const newOrder: Order = JSON.parse(msg.body);

        queryClient.invalidateQueries({ queryKey: ["orders"] });
        queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
      });

      client.subscribe("/topic/orders/updated", (msg: Message) => {
        console.log("📨 Order updated:", msg.body);
        const updatedOrder: Order = JSON.parse(msg.body);

        queryClient.invalidateQueries({ queryKey: ["orders"] });
        queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
      });
    };

    client.onDisconnect = () => {
      console.log("❌ WebSocket disconnected");
    };

    client.activate();
    clientRef.current = client;

    return () => {
      console.log("🔌 Cleaning up WebSocket connection");
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, [queryClient]);
}