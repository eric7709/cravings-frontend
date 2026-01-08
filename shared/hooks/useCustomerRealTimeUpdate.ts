import { useBook } from "@/screens/book/store/useBook";
import { Client } from "@stomp/stompjs";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import SockJS from "sockjs-client";

export function useCustomerOrderRealtime() {
  const queryClient = useQueryClient();
  const { customer } = useBook();
  useEffect(() => {
    if (!customer?.id) return;
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      reconnectDelay: 5000,
    });
    client.onConnect = () => {
      console.log("✅ Customer STOMP connected");
      client.subscribe(`/topic/orders/customer/${customer.id}`, () => {
        queryClient.invalidateQueries({
          queryKey: ["customer-orders-today", customer.id],
        });
      });
    };
    client.activate();
    return () => {

      // ✅ MUST be sync
      client.deactivate(); // ignore the Promise
    };
  }, [customer?.id, queryClient]);
}
