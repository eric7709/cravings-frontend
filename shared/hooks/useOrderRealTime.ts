"use client";

import { useEffect, useRef, useState } from "react";
import { Client, Message } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useQueryClient } from "@tanstack/react-query";

export function useOrderRealtime() {
  const queryClient = useQueryClient();
  const clientRef = useRef<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const WEBSOCKETURL =
    process.env.NEXT_PUBLIC_ENVIRONMENT === "PRODUCTION"
      ? process.env.NEXT_PUBLIC_BACKEND_PRO_URL
      : process.env.NEXT_PUBLIC_BACKEND_DEV_URL;

  useEffect(() => {
    if (!WEBSOCKETURL) {
      console.error(
        "WebSocket URL is not defined. Check your environment variables."
      );
      return;
    }

    console.log("Connecting to WebSocket:", `${WEBSOCKETURL}/ws`);

    const client = new Client({
      webSocketFactory: () => new SockJS(`${WEBSOCKETURL}/ws`),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str) => {
        console.log("STOMP Debug:", str);
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame);
        setIsConnected(false);
      },
      onWebSocketError: (error) => {
        console.error("WebSocket error:", error);
        setIsConnected(false);
      },
      onWebSocketClose: (event) => {
        console.log("WebSocket closed:", event);
        setIsConnected(false);
      },
    });

    client.onConnect = (frame) => {
      console.log("✅ Connected to WebSocket", frame);
      setIsConnected(true);

      // Subscribe to order creation
      const sub1 = client.subscribe("/topic/orders/created", (msg: Message) => {
        console.log("📨 New order received:", msg.body);
        try {
          const order = JSON.parse(msg.body);
          console.log("Parsed order:", order);
          // Invalidate queries
          queryClient.invalidateQueries({ queryKey: ["orders"] });
          queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
        } catch (error) {
          console.error("Error parsing order message:", error);
        }
      });

      // Subscribe to order updates
      const sub2 = client.subscribe("/topic/orders/updated", (msg: Message) => {
        console.log("🔄 Order updated:", msg.body);
        try {
          const order = JSON.parse(msg.body);
          console.log("Parsed updated order:", order);
          
          queryClient.invalidateQueries({ queryKey: ["orders"] });
          queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
        } catch (error) {
          console.error("Error parsing update message:", error);
        }
      });

      console.log("✅ Subscribed to topics", { sub1: sub1.id, sub2: sub2.id });
    };

    client.onDisconnect = () => {
      console.log("❌ Disconnected from WebSocket");
      setIsConnected(false);
    };

    client.activate();
    clientRef.current = client;

    return () => {
      console.log("🧹 Cleaning up WebSocket connection");
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, [queryClient, WEBSOCKETURL]);

  // Log connection status
  useEffect(() => {
    console.log("WebSocket connection status:", isConnected);
  }, [isConnected]);

  return { isConnected };
}