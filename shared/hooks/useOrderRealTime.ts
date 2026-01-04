"use client";

import { useEffect } from "react";
import { Client, Message } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { Order } from "@/models/orders/types";
import { useOrderStore } from "@/models/orders/store";

export function useOrderRealtime() {
  const { addOrder, updateOrder } = useOrderStore();

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      reconnectDelay: 5000,
      debug: (str) => console.log(str),
    });

    client.onConnect = () => {
      console.log("✅ STOMP connected (orders)");

      // CREATED
      client.subscribe("/topic/orders/created", (msg: Message) => {
        const newOrder: Order = JSON.parse(msg.body);
        addOrder(newOrder);
      });

      // UPDATED
      client.subscribe("/topic/orders/updated", (msg: Message) => {
        const updatedOrder: Order = JSON.parse(msg.body);
        updateOrder(updatedOrder);
      });
    };

    client.onStompError = (frame) => {
      console.error("❌ STOMP error (orders)", frame);
    };

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [addOrder, updateOrder]);
}
