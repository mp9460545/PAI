import { NextResponse } from 'next/server';

export function middleware(request) {
  // Cookie zawiera losowy token UUID wygenerowany przy logowaniu.
  // Pełna walidacja tokenu (sprawdzenie w bazie) jest dostępna w src/lib/session.js
  // i może być użyta w Server Components oraz Route Handlers.
  const token = request.cookies.get('session')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Chronione są wszystkie trasy oprócz: /login, /api/*, pliki statyczne
  matcher: ['/((?!login|api|_next/static|_next/image|favicon.ico|assets).*)'],
};
