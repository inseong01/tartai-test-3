"use client";

import { useState, useEffect } from "react";
import type { NotificationsList, NotificationStatus } from "../quries";

export function useOrderNotification(orderId: string) {
  const [notification, setNotification] = useState<
    NotificationsList | undefined
  >(undefined);
  const [status, setStatus] = useState<NotificationStatus>("connecting");

  useEffect(() => {
    if (!orderId) return;

    const es = new EventSource(`/api/notifications/subscribe/${orderId}`);

    es.addEventListener("order-status", (e) => {
      const data = JSON.parse(e.data);
      setNotification({ orderId: data.orderId, status: data.status });
      setStatus("connected");
    });

    es.onerror = () => {
      setStatus("error");
      es.close();
    };

    return () => es.close();
  }, [orderId]);

  return { notification, status };
}
