"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Star, Trash } from "lucide-react"

interface Review {
  id: string
  customer_name: string
  rating: number
  comment: string
  is_featured: boolean
  review_date: string
}

export function ReviewManager() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    setLoading(true)

    const { data, error } = await supabase.from("reviews").select("*").order("review_date", { ascending: false })

    if (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch reviews",
        variant: "destructive",
      })
    } else {
      setReviews(data || [])
    }

    setLoading(false)
  }

  const toggleFeatured = async (id: string, currentValue: boolean) => {
    try {
      const { error } = await supabase.from("reviews").update({ is_featured: !currentValue }).eq("id", id)

      if (error) throw error

      toast({
        title: `Review ${!currentValue ? "featured" : "unfeatured"}`,
        description: `The review has been ${!currentValue ? "added to" : "removed from"} featured reviews.`,
      })

      fetchReviews()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return

    try {
      const { error } = await supabase.from("reviews").delete().eq("id", id)

      if (error) throw error

      toast({
        title: "Review deleted",
        description: "The review has been deleted successfully.",
      })

      fetchReviews()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Reviews</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-center py-4">Loading reviews...</p>
        ) : reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{review.customer_name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-2">
                        {new Date(review.review_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`featured-${review.id}`}
                        checked={review.is_featured}
                        onCheckedChange={() => toggleFeatured(review.id, review.is_featured)}
                      />
                      <span className="text-sm">Featured</span>
                    </div>
                    <Button variant="outline" size="icon" onClick={() => handleDelete(review.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="mt-2">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-4">No reviews found.</p>
        )}
      </CardContent>
    </Card>
  )
}
