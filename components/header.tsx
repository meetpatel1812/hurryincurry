"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Order", href: "/order" },
  { name: "Offers", href: "/offers" },
  { name: "Contact", href: "/contact" },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-2xl text-orange-600">
            Curry and Hurry
          </Link>
        </div>

        <nav className="hidden md:flex gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-orange-600 ${
                pathname === item.href ? "text-orange-600" : "text-foreground/60"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Button asChild variant="default" className="bg-orange-600 hover:bg-orange-700">
            <Link href="/order">Order Now</Link>
          </Button>
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col gap-6 mt-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-medium transition-colors hover:text-orange-600 ${
                    pathname === item.href ? "text-orange-600" : "text-foreground/60"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Button asChild variant="default" className="mt-4 bg-orange-600 hover:bg-orange-700">
                <Link href="/order" onClick={() => setIsOpen(false)}>
                  Order Now
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
