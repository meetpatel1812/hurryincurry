import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default async function TestimonialsSection() {
  const supabase = createServerComponentClient({ cookies })

  const { data: reviews } = await supabase
    .from("reviews")
    .select("*")
    .eq("is_featured", true)
    .order("rating", { ascending: false })
    .limit(3)

  return (
    <section className="bg-orange-50 py-16">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews?.map((review) => (
            <Card key={review.id} className="bg-white">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="italic mb-4">"{review.comment}"</p>
                <p className="font-medium">{review.customer_name}</p>
              </CardContent>
            </Card>
          ))}

          {(!reviews || reviews.length === 0) && (
            <div className="col-span-full text-center py-10">
              <p className="text-muted-foreground">No reviews available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
