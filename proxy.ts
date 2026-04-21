import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/en") || pathname.startsWith("/no")) return NextResponse.next();

  const accept = req.headers.get("accept-language")?.toLowerCase() ?? "";
  const lang =
    accept.startsWith("no") || accept.startsWith("nb") || accept.startsWith("nn") ? "no" : "en";

  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}
