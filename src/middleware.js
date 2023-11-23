import { NextResponse } from "next/server";
import { getUserFromRequest } from "./app/components/Providers";

// This section is made to protect the route
export function middleware(request) {
  const user = getUserFromRequest(request);

  if (request.nextUrl.pathname.startsWith("/home")) {
    return NextResponse.rewrite(new URL("/", request.url));
  }

  // if (request.nextUrl.pathname.startsWith("/items") && !user) {
  //   return NextResponse.rewrite(new URL("/login", request.url));
  // }

  // Continue to the route original
  return NextResponse.next();
}
