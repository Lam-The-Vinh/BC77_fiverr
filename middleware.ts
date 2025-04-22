import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { pathname } = url;

  const response = NextResponse.next();
  response.headers.set(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate=59"
  );

  // 2) Chỉ bảo vệ những trang cần auth
  const isProtected =
    pathname.startsWith("/admin") || pathname.startsWith("/profile");
  if (!isProtected) {
    return response;
  }

  // 3) Lấy token từ cookie
  const token = req.cookies.get("token")?.value;
  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // 4) Gọi API backend để verify token
  try {
    const verifyRes = await fetch(
      `${process.env.BACKEND_URL}/api/auth/verify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ token }),
      }
    );

    if (verifyRes.ok) {
      const { user } = await verifyRes.json();
      response.headers.set("x-user-id", user.id);
      return response;
    } else {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  } catch (err) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}
