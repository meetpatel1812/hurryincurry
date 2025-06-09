import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Review {
  id: string
  customer_name: string
  rating: number
  comment: string
  review_date: string
}

interface TopReviewsProps {
  reviews: Review[]
}

export function TopReviews({ reviews }: TopReviewsProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Top Reviews</h2>

      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="italic mb-4">"{review.comment}"</p>
                <div className="flex justify-between items-center">
                  <p className="font-medium">{review.customer_name}</p>
                  <p className="text-sm text-muted-foreground">{new Date(review.review_date).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-4">No reviews available at the moment.</p>
      )}
    </div>
  )
}
