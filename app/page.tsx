import { Dashboard } from "@/features/dashboard/dashboard";

export default function Home() {
  return (
    <div className="min-h-screen h-full bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-lg font-semibold text-gray-900">관리자 대시보드</h1>
      </header>
      <Dashboard />
    </div>
  );
}
