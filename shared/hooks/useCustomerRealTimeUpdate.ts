import { useBook } from "@/screens/book/store/useBook";
import { Client } from "@stomp/stompjs";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import SockJS from "sockjs-client";

export function useCustomerOrderRealtime() {
  const queryClient = useQueryClient();
  const { customer } = useBook();
  const WEBSOCKETURL =
    process.env.NEXT_PUBLIC_ENVIRONMENT == "PRODUCTION"
      ? process.env.NEXT_PUBLIC_BACKEND_PRO_URL
      : process.env.NEXT_PUBLIC_BACKEND_DEV_URL;
  useEffect(() => {
    if (!customer?.id) return;
    const client = new Client({
      webSocketFactory: () => new SockJS(`${WEBSOCKETURL}/ws`),
      reconnectDelay: 5000,
    });
    client.onConnect = () => {
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
