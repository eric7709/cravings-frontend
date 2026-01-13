"use client";

import { useEffect } from "react";
import { Client, Message } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useMenuItemStore } from "@/models/menuItems/store";
import { MenuItem } from "@/models/menuItems/types";

export function useMenuItemRealtime() {
  const { addMenuItem, updateMenuItem, removeMenuItem } = useMenuItemStore();
  const WEBSOCKETURL =
    process.env.NEXT_PUBLIC_ENVIRONMENT == "PRODUCTION"
      ? process.env.NEXT_PUBLIC_BACKEND_PRO_URL
      : process.env.NEXT_PUBLIC_BACKEND_DEV_URL; 
      
  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(`${WEBSOCKETURL}/ws`),
      reconnectDelay: 5000,
    });
    client.onConnect = () => {
      // CREATED
      client.subscribe("/topic/menuItems/created", (msg: Message) => {
        const newItem: MenuItem = JSON.parse(msg.body);
        addMenuItem(newItem);
      });
      // UPDATED
      client.subscribe("/topic/menuItems/updated", (msg: Message) => {
        const updatedItem: MenuItem = JSON.parse(msg.body);
        updateMenuItem(updatedItem);
      });
      // DELETED
      client.subscribe("/topic/menuItems/deleted", (msg: Message) => {
        const deletedId = Number(msg.body);
        removeMenuItem(deletedId);
      });
    };
    client.onStompError = (frame) => {};
    client.activate();
    return () => {
      client.deactivate();
    };
  }, [addMenuItem, updateMenuItem, removeMenuItem]);
}
