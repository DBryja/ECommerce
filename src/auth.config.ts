import {NextAuthConfig, Session} from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/admin/signIn',
    },
    callbacks : {
        authorized({auth, request: {nextUrl}}){
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith("/admin/dashboard");

            if(isOnDashboard){
                return isLoggedIn;
            } else if(isLoggedIn){
                return Response.redirect(new URL('/admin/dashboard', nextUrl));
            }
            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;