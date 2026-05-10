import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/oppdrag")) {
    // Lokalt (dev): åpent uten passord.
    // Produksjon: ruten eksponeres ikke — returner 404.
    if (process.env.NODE_ENV !== "production") {
      const res = NextResponse.next();
      res.headers.set("X-Robots-Tag", "noindex, nofollow");
      return res;
    }
    return new NextResponse("Not found", { status: 404 });
  }

  if (pathname.startsWith("/en") || pathname.startsWith("/no")) return NextResponse.next();

  const accept = req.headers.get("accept-language")?.toLowerCase() ?? "";
  const lang =
    accept.startsWith("no") || accept.startsWith("nb") || accept.startsWith("nn") ? "no" : "en";

  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}
