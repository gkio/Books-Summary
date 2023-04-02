import './globals.css'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

import {Inter} from 'next/font/google'

const inter = Inter({subsets: ['latin']})

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body>
      <div className="pt-8 pb-16 lg:pt-className:pb-24 dark:bg-gray-900 min-h-screen">
        <div className="fcontainer mx-auto max-w-5xl px-8 pt-2 flex flex-wrap justify-between text-white">
          <main className={inter.className}>{children}</main>
        </div>
      </div>
    </body>
    </html>
  )
}
