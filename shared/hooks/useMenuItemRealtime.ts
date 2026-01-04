"use client";

import { useEffect } from "react";
import { Client, Message } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useMenuItemStore } from "@/models/menuItems/store";
import { MenuItem } from "@/models/menuItems/types";

export function useMenuItemRealtime() {
  const { addMenuItem, updateMenuItem, removeMenuItem } =
    useMenuItemStore();

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () =>
        new SockJS("http://localhost:8080/ws"),
      reconnectDelay: 5000,
      debug: (str) => console.log(str), 
    });
    client.onConnect = () => {
      console.log("✅ STOMP connected Menu items");
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
    client.onStompError = (frame) => {
      console.error("❌ STOMP error", frame);
    }
    client.activate();
    return () => {
      client.deactivate();
    };
  }, [addMenuItem, updateMenuItem, removeMenuItem]);
}
