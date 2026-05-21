# 관리자 대시보드

정산 서비스의 관리자 프론트엔드입니다.

## 스택

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **TanStack Query v5** — 서버 상태 관리
- **Deploy**: Vercel

## 기능

### 공지 / 게시판 (`src/features/posts/`)

- 게시글 목록 조회
- 게시글 상세 조회 (목록에서 행 클릭)
- 게시글 작성 (제목, 내용)
- 게시글 삭제 (확인 모달 포함)

### 주문 상태 조회 (`src/features/orders/`)

- 주문 목록 조회 (주문번호, 상태, 금액, 주문일시)
- 주문 상세 조회 (상품 목록, 합계)
- 주문 상태 변경 (`PENDING` / `PAID` / `PREPARING` / `SHIPPED` / `DELIVERED` / `CANCELLED`)

### 실시간 알림 (`src/features/notifications/`)

- 주문 선택 시 SSE(`EventSource`)로 해당 주문의 상태 변경 이벤트 실시간 수신
- 연결 상태 표시 (대기 중 / 연결됨 / 연결 오류)

## 디렉터리 구조

```
src/
  features/
    posts/
      ui/           # 순수 UI 컴포넌트 (props only)
      posts.tsx     # 클라이언트 로직 (상태, 핸들러, API)
      queries.ts    # TanStack Query queryOptions + 타입 정의
    orders/
      ui/
      orders.tsx
      queries.ts
    notifications/
      ui/
      notifications.tsx
      quries.ts     # 타입 정의
  components/
    query-provider.tsx   # TanStack Query 전역 Provider
    confirm-modal.tsx    # 공용 확인 모달
  lib/
    api.ts          # fetch 래퍼 (apiFetch)
app/
  layout.tsx        # 루트 레이아웃 (QueryProvider, ReactQueryDevtools)
  page.tsx          # 대시보드 페이지
```

## API 프록시

`next.config.ts`의 rewrites 규칙으로 `/api/*` 요청을 Render에 배포된 Spring Boot 백엔드로 프록시합니다.

```
/api/:path*  →  https://tartai-test-3.onrender.com/:path*
```

SSE 실시간 수신을 위해 Next.js **기본 응답 압축(`compress`)을 비활성화**했습니다. 자세한 내용은 [`docs/sse-troubleshooting.md`](docs/sse-troubleshooting.md)를 참고하세요.

## 개발 환경 실행

```bash
pnpm install
pnpm dev
```

[http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.
