import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (/^\/(en|no)(\/|$)/.test(pathname)) return NextResponse.next();

  const accept = req.headers.get("accept-language")?.toLowerCase() ?? "";
  const lang = /^(no|nb|nn)\b/.test(accept) || accept.includes(",nb") || accept.includes(",no") ? "no" : "en";

  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}
