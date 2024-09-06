import { NextRequest, NextResponse } from 'next/server'
import {isAuthenticated} from '@/utils/auth'
// import { decrypt } from '@/app/lib/session'
// import { cookies } from 'next/headers'
 
// 1. Specify protected and public routes
const protectedRoutes = ['/admin']
const publicRoutes = ['/auth','/login', '/signup', '/']
 
export default async function middleware(req) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

//   const authenticated = isAuthenticated();
 
  // 3. Decrypt the session from the cookie
//   const cookie = cookies().get('session')?.value
//   const session = await decrypt(cookie)
 
  // 5. Redirect to /login if the user is not authenticated
//   if (isProtectedRoute && !session?.userId) {
  if (isProtectedRoute && !authenticated) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
 
  // 6. Redirect to /dashboard if the user is authenticated
//   if (
//     isPublicRoute &&
//     session?.userId &&
//     !req.nextUrl.pathname.startsWith('/dashboard')
//   ) {
//     return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
//   }
 
  return NextResponse.next()
}
 
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}