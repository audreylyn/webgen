import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';

  // Extract subdomain
  const subdomain = hostname.split('.')[0];

  // Main app domain (app.likhasiteworks.dev or likhasiteworks.dev)
  if (subdomain === 'app' || subdomain === 'likhasiteworks' || hostname === 'likhasiteworks.dev') {
    // Show dashboard/builder - no rewrite needed
    return NextResponse.next();
  }

  // Client subdomain - redirect to preview with subdomain param
  // E.g., client123.likhasiteworks.dev -> /preview/[lookup-id-by-subdomain]
  const url = request.nextUrl.clone();
  url.pathname = `/subdomain-preview/${subdomain}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
