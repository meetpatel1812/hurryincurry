import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
      <div className="relative h-[600px] w-full">
        <Image
          src="/placeholder.svg?height=600&width=1200"
          alt="Indian cuisine"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container">
          <div className="max-w-xl space-y-5">
            <h1 className="text-4xl md:text-6xl font-bold text-white">Authentic Indian Flavors in Every Bite</h1>
            <p className="text-xl text-white/90">
              Experience the rich and diverse tastes of India at Curry and Hurry, Edmonton's premier Indian restaurant.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
                <Link href="/menu">View Menu</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
