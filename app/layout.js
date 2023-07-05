import './globals.css'
import { Karla } from 'next/font/google'
import Provider from './components/Provider';

const karla = Karla({
    subsets: ['latin']
});

export const metadata = {
    title: 'Blog',
    description: 'Blog',
}

export default function RootLayout({ children }) {
    return (
        <html lang="de">
            <body className={karla.className}>
                <Provider>
                    {children}
                </Provider>
            </body>
        </html>
    )
}
