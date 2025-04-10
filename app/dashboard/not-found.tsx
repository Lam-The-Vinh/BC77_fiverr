
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg mb-8">Trang bạn tìm không tồn tại.</p>
      <Link href="/" className="px-4 py-2 bg-blue-500 rounded">
        Về trang chủ
      </Link>
    </div>
  );
}
