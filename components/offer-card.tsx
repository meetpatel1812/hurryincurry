import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"

interface Offer {
  id: string
  title: string
  description: string | null
  discount_percentage: number | null
  discount_amount: number | null
  start_date: string | null
  end_date: string | null
  image_url: string | null
}

interface OfferCardProps {
  offer: Offer
}

export function OfferCard({ offer }: OfferCardProps) {
  // Format dates
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const startDate = formatDate(offer.start_date)
  const endDate = formatDate(offer.end_date)

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={offer.image_url || "/placeholder.svg?height=200&width=300"}
          alt={offer.title}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
        {offer.description && <p className="text-muted-foreground mb-4">{offer.description}</p>}
        <div className="space-y-2">
          {offer.discount_percentage && <p className="font-medium text-red-600">{offer.discount_percentage}% off</p>}
          {offer.discount_amount && <p className="font-medium text-red-600">${offer.discount_amount.toFixed(2)} off</p>}
          {(startDate || endDate) && (
            <p className="text-sm text-muted-foreground">
              {startDate && endDate
                ? `Valid from ${startDate} to ${endDate}`
                : endDate
                  ? `Valid until ${endDate}`
                  : startDate
                    ? `Valid from ${startDate}`
                    : ""}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full bg-green-600 hover:bg-green-700">
          <Link href="/menu">View Menu</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
