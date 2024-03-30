import '@/app/global.css'
import Loading from '@/app/loading'
import { Suspense } from 'react'

export const metadata = {
    title: 'Todo App',
}
const RootLayout = ({ children }) => {
    return (

        <html lang="en">
            <body className="antialiased">
                <Suspense fallback={<Loading />}>
                    {children}
                </Suspense>
            </body>
        </html>)
}

export default RootLayout
