import { auth, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Create a route matcher for protected routes
const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
    '/events(.*)',
    '/meetings(.*)',
    '/availability(.*)',
]);

// Default export for the middleware
export default clerkMiddleware((auth, req) => {
    // Check if the user is authenticated and if the requested route is protected
    if (!auth().userId && isProtectedRoute(req)) {
        return auth().redirectToSignIn();
    }
});

// Configuration for the middleware
export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
