import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Curry in Hurry - Authentic Indian Restaurant",
  description:
    "Authentic Indian cuisine in Sherwood Park, Alberta. Experience the rich flavors of India at Curry in Hurry.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>

        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            {/*         new code */}
        <script src="https://cdn.popupsmart.com/bundle.js" data-id="966262" async defer></script>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
