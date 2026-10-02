import { NextResponse, type NextRequest } from "next/server";
import { legacyDestination, localeCookieName } from "./lib/i18n";

export function proxy(request: NextRequest) {
  const destination = legacyDestination(request.nextUrl.pathname, request.cookies.get(localeCookieName)?.value);
  if (!destination) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = destination;
  const response = NextResponse.redirect(url, 307);
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Vary", "Cookie");
  return response;
}

export const config = { matcher: ["/", "/work", "/lab", "/lab/api-rescue-lab"] };
