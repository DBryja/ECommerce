import {NextAuthConfig, Session} from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/auth',
    },
    callbacks : {
        authorized({auth, request: {nextUrl}}){
            const isLoggedIn = !!auth?.user;
            const isAdmin = auth?.user.name === "admin" //must be using name instead of role
            const isOnDashboard = nextUrl.pathname.startsWith("/admin/dashboard") || nextUrl.pathname.startsWith("/products");

            //adminPath
            if(isAdmin){
                if(isOnDashboard) return isLoggedIn;
                else if(isLoggedIn) return Response.redirect(new URL('/admin/dashboard', nextUrl));
            }
            //userPath
            else {
                if(isOnDashboard) return Response.redirect(new URL('/auth', nextUrl));
                else if(isLoggedIn) return isLoggedIn;
            }
            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;