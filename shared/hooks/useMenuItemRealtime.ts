"use client";

import { useEffect, useRef, useState } from "react";
import { Client, Message } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useQueryClient } from "@tanstack/react-query";

export function useMenuItemRealtime() {
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
        "WebSocket URL is not defined for menu items. Check your environment variables."
      );
      return;
    }

    console.log("Connecting to Menu Items WebSocket:", `${WEBSOCKETURL}/cravings/ws`);

    const client = new Client({
      webSocketFactory: () => new SockJS(`${WEBSOCKETURL}/cravings/ws`),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str) => {
        console.log("STOMP Debug (Menu Items):", str);
      },
      onStompError: (frame) => {
        console.error("STOMP error (Menu Items):", frame);
        setIsConnected(false);
      },
      onWebSocketError: (error) => {
        console.error("WebSocket error (Menu Items):", error);
        setIsConnected(false);
      },
      onWebSocketClose: (event) => {
        console.log("WebSocket closed (Menu Items):", event);
        setIsConnected(false);
      },
    });

    client.onConnect = (frame) => {
      console.log("✅ Connected to Menu Items WebSocket", frame);
      setIsConnected(true);

      // Subscribe to menu item creation
      const sub1 = client.subscribe("/topic/menuItems/created", (msg: Message) => {
        console.log("📨 New menu item received:", msg.body);
        try {
          const newItem = JSON.parse(msg.body);
          console.log("Parsed menu item:", newItem);
          
          // Invalidate menu items queries
          queryClient.invalidateQueries({ queryKey: ["menuItems"] });
          queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
        } catch (error) {
          console.error("Error parsing menu item creation message:", error);
        }
      });

      // Subscribe to menu item updates
      const sub2 = client.subscribe("/topic/menuItems/updated", (msg: Message) => {
        console.log("🔄 Menu item updated:", msg.body);
        try {
          const updatedItem = JSON.parse(msg.body);
          console.log("Parsed updated menu item:", updatedItem);
          
          // Invalidate specific menu item and list queries
          queryClient.invalidateQueries({ queryKey: ["menuItems"] });
          queryClient.invalidateQueries({ queryKey: ["menuItems", updatedItem.id] });
          queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
        } catch (error) {
          console.error("Error parsing menu item update message:", error);
        }
      });

      // Subscribe to menu item deletion
      const sub3 = client.subscribe("/topic/menuItems/deleted", (msg: Message) => {
        console.log("🗑️ Menu item deleted:", msg.body);
        try {
          const deletedId = Number(msg.body);
          console.log("Deleted menu item ID:", deletedId);
          
          // Invalidate queries
          queryClient.invalidateQueries({ queryKey: ["menuItems"] });
          queryClient.invalidateQueries({ queryKey: ["menuItems", deletedId] });
          queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
        } catch (error) {
          console.error("Error parsing menu item deletion message:", error);
        }
      });

      console.log("✅ Subscribed to menu item topics", { 
        created: sub1.id, 
        updated: sub2.id, 
        deleted: sub3.id 
      });
    };

    client.onDisconnect = () => {
      console.log("❌ Disconnected from Menu Items WebSocket");
      setIsConnected(false);
    };

    client.activate();
    clientRef.current = client;

    return () => {
      console.log("🧹 Cleaning up Menu Items WebSocket connection");
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, [queryClient, WEBSOCKETURL]);

  // Log connection status
  useEffect(() => {
    console.log("Menu Items WebSocket connection status:", isConnected);
  }, [isConnected]);

  return { isConnected };
}