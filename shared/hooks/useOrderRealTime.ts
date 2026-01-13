"use client";

import { useEffect } from "react";
import { Client, Message } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { Order } from "@/models/orders/types";
import { useOrderStore } from "@/models/orders/store";

import { useQueryClient } from "@tanstack/react-query";

export function useOrderRealtime() {
  const { addOrder, updateOrder } = useOrderStore();
  const queryClient = useQueryClient();
  const WEBSOCKETURL = process.env.NEXT_PUBLIC_ENVIRONMENT == "PRODUCTION" ? process.env.NEXT_PUBLIC_BACKEND_PRO_URL : process.env.NEXT_PUBLIC_BACKEND_DEV_URL

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS(`${WEBSOCKETURL}/ws`),
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      client.subscribe("/topic/orders/created", (msg: Message) => {
        const newOrder: Order = JSON.parse(msg.body);
        addOrder(newOrder);

        // 🔄 REFRESH LIST + STATUS COUNTS
        queryClient.invalidateQueries({ queryKey: ["orders"] });
      });

      client.subscribe("/topic/orders/updated", (msg: Message) => {
        const updatedOrder: Order = JSON.parse(msg.body);
        updateOrder(updatedOrder);

        // 🔄 REFRESH LIST + STATUS COUNTS
        queryClient.invalidateQueries({ queryKey: ["orders"] });
      });
    };

    client.activate();
    return () => {
      client.deactivate();
    };
  }, [addOrder, updateOrder, queryClient]);
}
