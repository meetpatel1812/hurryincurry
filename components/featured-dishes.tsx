import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function FeaturedDishes() {
  const supabase = createServerComponentClient({ cookies })

  const { data: featuredItems } = await supabase
    .from("menu_items")
    .select("*, categories(*)")
    .eq("is_featured", true)
    .limit(4)

  return (
    <section className="container">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-red-600">Featured Dishes</h2>
        <Button asChild variant="link" className="text-red-600">
          <Link href="/menu">View Full Menu</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredItems?.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative h-48 w-full">
              <Image
                src={item.image_url || "/placeholder.svg?height=200&width=300"}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-lg">{item.name}</h3>
                <span className="font-medium text-red-600">${item.price.toFixed(2)}</span>
              </div>
              <p className="text-muted-foreground text-sm line-clamp-2">{item.description}</p>
              <div className="flex gap-2 mt-3">
                {item.is_vegetarian && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Vegetarian
                  </Badge>
                )}
                {item.is_spicy && (
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    Spicy
                  </Badge>
                )}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                <Link href={`/menu`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}

        {(!featuredItems || featuredItems.length === 0) && (
          <div className="col-span-full text-center py-10">
            <p className="text-muted-foreground">No featured dishes available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  )
}
