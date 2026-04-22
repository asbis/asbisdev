import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/oppdrag")) {
    const expected = process.env.OPPDRAG_PASSWORD;
    if (!expected) return new NextResponse("Not configured", { status: 503 });

    const auth = req.headers.get("authorization");
    if (auth?.startsWith("Basic ")) {
      const decoded = Buffer.from(auth.slice(6), "base64").toString();
      const pwd = decoded.includes(":") ? decoded.split(":")[1] : decoded;
      if (pwd === expected) {
        const res = NextResponse.next();
        res.headers.set("X-Robots-Tag", "noindex, nofollow");
        return res;
      }
    }
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="oppdrag", charset="UTF-8"',
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  if (pathname.startsWith("/en") || pathname.startsWith("/no")) return NextResponse.next();

  const accept = req.headers.get("accept-language")?.toLowerCase() ?? "";
  const lang =
    accept.startsWith("no") || accept.startsWith("nb") || accept.startsWith("nn") ? "no" : "en";

  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}
