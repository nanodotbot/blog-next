import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

CredentialsProvider
export const authOptions = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                const { username, password } = credentials;

                // TODO: keep in mind
                // const res = await fetch('http://localhost:3000/api/login', {
                const res = await fetch('https://main.d3md35boecy4fh.amplifyapp.com/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username,
                        password
                    })
                });

                const user = await res.json();
                console.log(user);

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ],
    callbacks: {
        async session({session, token}) {
            console.log('session callback');
            console.log(session);
            if(token.sub) {
                console.log(token.sub);
                session.user.id = token.sub;
                return session;
            }
            return session;
        }
    },
    // session: {
    //     strategy: "jwt"
    // },
    pages: {
        signIn: '/'
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
