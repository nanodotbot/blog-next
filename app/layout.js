'use client'

import './globals.css'
import { SessionProvider } from 'next-auth/react'
import { Karla } from 'next/font/google'

const karla = Karla({
    subsets: ['latin']
});

export const metadata = {
    title: 'Login | Registrieren',
    description: 'Blog Login Registrieren',
}

export default function RootLayout({ children }) {
    return (
        <html lang="de">
            <body className={karla.className}>
                <SessionProvider>{children}</SessionProvider>
            </body>
        </html>
    )
}
