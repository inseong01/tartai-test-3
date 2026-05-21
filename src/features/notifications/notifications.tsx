"use client";

import { useOrderNotification } from "./hooks/use-order-notification";
import { NotificationList } from "./ui/notification-list";

type Props = {
  orderId: string;
};

export function Notifications({ orderId }: Props) {
  const { notification, status } = useOrderNotification(orderId);

  return <NotificationList notification={notification} status={status} />;
}
