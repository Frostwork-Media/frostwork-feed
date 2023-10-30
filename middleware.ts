import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/api/auth/signin",
  },
  callbacks: {
    async authorized({ token, req }) {
      if (req.nextUrl.pathname.startsWith("/admin") && token === null) {
        return false;
      }
      return true;
    },
  },
});

export const config = { matcher: ["/admin"] };
