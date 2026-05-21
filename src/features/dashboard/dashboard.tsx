"use client";

import { useState } from "react";
import { Posts } from "@/features/posts/posts";
import { Orders } from "@/features/orders/orders";
import { Notifications } from "@/features/notifications/notifications";

export function Dashboard() {
  const [selectedOrderId, setSelectedOrderId] = useState("");

  return (
    <main className="max-w-7xl mx-auto p-6 flex flex-col gap-4">
      <Notifications orderId={selectedOrderId} />
      <div className="flex flex-col lg:flex-row gap-4">
        <Posts />
        <Orders selectedId={selectedOrderId} onSelect={setSelectedOrderId} />
      </div>
    </main>
  );
}
