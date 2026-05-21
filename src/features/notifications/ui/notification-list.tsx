import { NotificationsList, NotificationStatus } from "../quries";

type Props = {
  notification: NotificationsList | undefined;
  status: NotificationStatus;
};

const statusLabel: Record<NotificationStatus, string> = {
  connecting: "대기 중",
  connected: "연결됨",
  error: "연결 오류",
};

const statusColor: Record<NotificationStatus, string> = {
  connecting: "bg-yellow-400",
  connected: "bg-green-500",
  error: "bg-red-500",
};

export function NotificationList({ notification, status }: Props) {
  return (
    <div className="flex items-center gap-3 px-5 py-3 bg-white border border-gray-200 rounded-xl text-sm overflow-hidden">
      <div className="flex items-center gap-1.5 shrink-0">
        <span className={`w-2 h-2 rounded-full ${statusColor[status]}`} />
        <span className="text-xs text-gray-500 font-medium">실시간 알림</span>
        <span className="text-xs text-gray-400">({statusLabel[status]})</span>
      </div>

      <div className="h-4 w-px bg-gray-200 shrink-0" />

      {!notification ? (
        <span className="text-gray-400 text-xs">
          주문을 선택하면 상태 변경을 실시간으로 수신합니다.
        </span>
      ) : (
        <div className="flex gap-4 overflow-x-auto">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-xs text-gray-400">
              {notification.orderId}
            </span>
            <span className="text-xs font-mono text-gray-500"></span>
            <span className="text-xs text-gray-700">
              → {notification.status}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
