import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextRequest } from 'next/server'


function isProtectedRoute(req: NextRequest) {
    const path = req.nextUrl.pathname;

    const publicRoutes = ['/', '/sign-in', '/sign-up'];
    
    return !publicRoutes.includes(path);
}

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) await auth.protect()
  })

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
