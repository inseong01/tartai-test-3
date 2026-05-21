# SSE 실시간 알림 수신 불가 트러블슈팅

## 배경

Spring Boot 백엔드에서 SSE(Server-Sent Events)로 주문 상태 변경 알림을 제공하고, Next.js 프론트엔드에서 이를 구독하는 구조.

- 백엔드: `GET /notifications/subscribe/{orderId}` → `SseEmitter` 반환
- 프론트엔드: Next.js App Router + `EventSource`로 구독
- 프록시: `next.config.ts` 리라이트 규칙 `/api/:path*` → Render 백엔드

## 원인

### 1. `fetch` + `res.json()`으로 SSE 연결 시도

```ts
// 잘못된 코드
const res = await fetch(`/api/notifications/subscribe/${orderId}`);
const result = await res.json(); // SSE는 스트림이 닫힐 때까지 응답이 끝나지 않으므로 영원히 대기
```

`fetch`는 응답 전체를 받아야 `res.json()`을 반환한다. SSE 스트림은 연결이 닫히기 전까지 응답이 완료되지 않으므로 이벤트를 수신할 수 없었다.

### 2. Next.js 기본 응답 압축(gzip)으로 인한 버퍼링

Next.js는 기본적으로 응답을 gzip 압축한다. 압축 과정에서 데이터를 버퍼에 모아두다가 연결이 닫힐 때 한 번에 flush하므로, SSE 이벤트가 실시간으로 클라이언트에 전달되지 않았다.

## 해결

### 1. `EventSource` API로 교체

```ts
// notifications.tsx
const es = new EventSource(`/api/notifications/subscribe/${orderId}`);

es.addEventListener("order-status", (e) => {
  const data = JSON.parse(e.data);
  setNotification({ orderId: data.orderId, status: data.status });
});

es.onerror = () => {
  setStatus("error");
  es.close();
};

return () => es.close();
```

`EventSource`는 SSE 전용 브라우저 API로, 스트림에서 이벤트가 도착할 때마다 즉시 콜백을 실행한다.

### 2. Next.js 압축 비활성화

```ts
// next.config.ts
const nextConfig: NextConfig = {
  compress: false,
  // ...
};
```
